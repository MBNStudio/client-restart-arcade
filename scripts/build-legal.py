"""Reprend, mot pour mot, les CGV publiées sur le site actuel de RESTART.

La V3 affichait un brouillon (équipements livrés assemblés et mis en service sur place, livraison comprise
dans les prix) contraire aux CGV en vigueur. Sortie : src/data/legal.generated.json, liste de [balise, texte].

Usage : python scripts/build-legal.py
"""
import json
import os
import re
import urllib.request
from html.parser import HTMLParser

BASE = "https://restart-arcade.fr/"
OUT = os.path.join(os.path.dirname(__file__), "..", "src", "data", "legal.generated.json")
PAGES = {"cgv": "cgv/"}
BLOCKS = {"h1", "h2", "h3", "h4", "h5", "p", "li"}
SKIP_TAGS = {"script", "style", "noscript", "svg", "header", "footer", "nav", "form", "template", "button"}
SKIP_CLASS = re.compile(r"cmplz|popup|elementor-location-(header|footer|popup)|menu")
VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"}


class Extract(HTMLParser):
    """Texte de la page, découpé à chaque début ou fin de bloc (les listes imbriquées restent séparées)."""

    def __init__(self):
        super().__init__()
        self.stack = []  # (balise, masquée)
        self.buffer = []
        self.items = []

    def hidden(self):
        return any(h for _, h in self.stack)

    def block(self):
        return next((t for t, _ in reversed(self.stack) if t in BLOCKS), None)

    def flush(self):
        text = re.sub(r"\s+", " ", "".join(self.buffer)).strip()
        tag = self.block()
        if text and tag:
            self.items.append([tag, text])
        self.buffer = []

    def handle_starttag(self, tag, attrs):
        if tag in VOID:
            if tag == "br":
                self.buffer.append(" ")
            return
        if tag in BLOCKS:
            self.flush()
        cls = " ".join(v or "" for k, v in attrs if k in ("class", "id"))
        hide = tag in SKIP_TAGS or (tag not in ("html", "body") and bool(SKIP_CLASS.search(cls)))
        self.stack.append((tag, hide))

    def handle_endtag(self, tag):
        if tag in BLOCKS:
            self.flush()
        for i in range(len(self.stack) - 1, -1, -1):
            if self.stack[i][0] == tag:
                del self.stack[i:]
                break

    def handle_data(self, data):
        if self.block() and not self.hidden():
            self.buffer.append(data)


def main():
    data = {}
    for key, path in PAGES.items():
        req = urllib.request.Request(BASE + path, headers={"User-Agent": "Mozilla/5.0 (reprise de contenu)"})
        with urllib.request.urlopen(req, timeout=60) as r:
            parser = Extract()
            parser.feed(r.read().decode("utf-8", "replace"))
        items = [i for i in parser.items if not re.match(r"(Inscrivez-vous|Votre panier|Gérer le consentement)", i[1])]
        data[key] = items
        print(key, len(items), "blocs")
    with open(OUT, "w", encoding="utf-8", newline="\n") as fh:
        json.dump(data, fh, ensure_ascii=False, indent=1)
        fh.write("\n")


if __name__ == "__main__":
    main()
