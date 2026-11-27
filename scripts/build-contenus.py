"""Reprend, mot pour mot, les textes de présentation du site actuel de RESTART (V4, retours du 27/11/2026 :
« le gros du contenu doit déjà être présent car il y a tout le contenu de notre site encore en ligne »).

Sortie : src/data/contenus.generated.json, une liste de blocs { titre, textes } par page (accueil ou gamme + public).
Les titres (h1 à h4) et les paragraphes sont lus dans le HTML public ; menus, pied de page, bandeau de cookies,
fenêtres, avis et fiches produit sont écartés. À relire par RESTART.

Usage : python scripts/build-contenus.py
"""
import json
import os
import re
import urllib.request
from html.parser import HTMLParser

BASE = "https://restart-arcade.fr/"
OUT = os.path.join(os.path.dirname(__file__), "..", "src", "data", "contenus.generated.json")

# clé « public/gamme » -> adresse sur le site actuel
PAGES = {
    "entreprise/borne-arcade": "borne-arcade/",
    "entreprise/flechettes": "flechettes/",
    "entreprise/baby-foot": "baby-foot/",
    "entreprise/billard": "billard/",
    "entreprise/flipper-numerique": "flipper-numerique/",
    "entreprise/fauteuil-massant": "fauteuil-massant/",
    "entreprise/cocon-de-repos": "cocon-de-repos/",
    "bar-commerce/borne-arcade": "borne-arcade-bars-commerces/",
    "bar-commerce/flechettes": "flechettes-bars-commerces/",
    "bar-commerce/baby-foot": "baby-foot-bars-commerces/",
    "bar-commerce/billard": "billard-bars-commerces/",
    "bar-commerce/flipper-numerique": "flipper-numerique-bars-commerces/",
    "particulier/borne-arcade": "borne-darcade-particulier/",
    "particulier/flechettes": "flechettes-particulier/",
    "particulier/baby-foot": "baby-foot-particulier/",
    "particulier/fauteuil-massant": "fauteuil-massant-particulier/",
}

SKIP_TAGS = {"script", "style", "noscript", "svg", "header", "footer", "nav", "form", "template", "button"}
SKIP_CLASS = re.compile(r"cmplz|ti-widget|ti-review|popup|woocommerce-|elementor-location-(header|footer|popup)|menu")
VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"}
BLOCKS = {"h1", "h2", "h3", "h4", "p"}
# Paragraphes de service (formulaire, avis, brochure) qui ne sont pas du contenu éditorial.
NOISE = re.compile(r"cliquez et choisissez|recommand|nous prendrons en compte|inscrivez-vous|newsletter|basé sur \d+ avis|évaluez-nous", re.I)


class Extract(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []  # (balise, masquée)
        self.current = None
        self.buffer = []
        self.items = []

    def hidden(self):
        return any(h for _, h in self.stack)

    def handle_starttag(self, tag, attrs):
        if tag in VOID:
            if tag == "br" and self.current:
                self.buffer.append(" ")
            return
        cls = " ".join(v or "" for k, v in attrs if k in ("class", "id"))
        # <body> porte des classes « menu » : jamais masqué.
        hide = tag in SKIP_TAGS or (tag not in ("html", "body") and bool(SKIP_CLASS.search(cls)))
        self.stack.append((tag, hide))
        if tag in BLOCKS and not self.hidden():
            self.current, self.buffer = tag, []

    def handle_endtag(self, tag):
        if tag == self.current:
            text = re.sub(r"\s+", " ", "".join(self.buffer)).strip()
            if text:
                self.items.append((tag, text))
            self.current = None
        for i in range(len(self.stack) - 1, -1, -1):
            if self.stack[i][0] == tag:
                del self.stack[i:]
                break

    def handle_data(self, data):
        if self.current and not self.hidden():
            self.buffer.append(data)


def blocks(items, key):
    """Regroupe les paragraphes sous le dernier titre rencontré."""
    out, title, seen = [], None, set()
    for tag, text in items:
        if tag != "p":
            title = text
            continue
        if len(text) < 55 or text in seen or NOISE.search(text) or text.startswith("("):
            continue
        # Phrase coupée par la mise en page d'origine (chiffres clés) : commence par une minuscule.
        if text[0].islower():
            continue
        # Coquille du site actuel : des pages billard et flipper se terminent par un paragraphe sur les bornes.
        if not key.endswith("borne-arcade") and "Nos bornes d’arcade sont disponibles" in text:
            continue
        seen.add(text)
        if not out or out[-1]["titre"] != title:
            out.append({"titre": title, "textes": []})
        out[-1]["textes"].append(text)
    return out


def main():
    data = {}
    for key, path in PAGES.items():
        req = urllib.request.Request(BASE + path, headers={"User-Agent": "Mozilla/5.0 (reprise de contenu)"})
        with urllib.request.urlopen(req, timeout=40) as r:
            parser = Extract()
            parser.feed(r.read().decode("utf-8", "replace"))
        data[key] = blocks(parser.items, key)
        print(key, sum(len(b["textes"]) for b in data[key]), "paragraphes")
    with open(OUT, "w", encoding="utf-8", newline="\n") as fh:
        json.dump(data, fh, ensure_ascii=False, indent=2)
        fh.write("\n")


if __name__ == "__main__":
    main()
