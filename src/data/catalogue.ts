export type Audience = 'entreprise' | 'bar-commerce' | 'particulier'

export const audiences: { id: Audience; label: string; short: string; blurb: string }[] = [
  {
    id: 'entreprise',
    label: 'Entreprise',
    short: 'Pour vos équipes',
    blurb:
      "Des espaces de pause qui font revenir vos collaborateurs au bureau, et qui comptent dans votre bilan QVCT.",
  },
  {
    id: 'bar-commerce',
    label: 'Bar & commerce',
    short: 'Pour vos clients',
    blurb:
      "Un équipement qui allonge le temps passé sur place et le panier moyen, à votre image et avec monnayeur en option.",
  },
  {
    id: 'particulier',
    label: 'Particulier',
    short: 'À la maison',
    blurb: "La salle d'arcade dans votre salon ou votre garage, livrée montée et prête à jouer.",
  },
]

export type Model = {
  sku: string
  slug: string
  name: string
  price: number | null
  headline: string
  audiences: Audience[]
  specs: string[]
  highlight?: string
}

export type Univers = {
  slug: string
  name: string
  navLabel: string
  metaTitle: string
  metaDescription: string
  h1: string
  intro: string
  /** Réponse factuelle courte, optimisée pour les moteurs génératifs (GEO). */
  answer: string
  benefits: Record<Audience, string[]>
  faq: { q: string; a: string }[]
  models: Model[]
  quoteOnly?: boolean
}

export const univers: Univers[] = [
  {
    slug: 'borne-arcade',
    name: "Borne d'arcade",
    navLabel: "Bornes d'arcade",
    metaTitle: "Borne d'arcade personnalisée : 5 modèles de 899 € à 2 478 €",
    metaDescription:
      "Bornes d'arcade multijeux jusqu'à 5 000 jeux, covering personnalisable à votre image, norme CE, livrées montées partout en France. Modèles enfant, salon, bar et entreprise.",
    h1: "Bornes d'arcade personnalisées",
    intro:
      "De la borne enfant à la borne professionnelle avec monnayeur, cinq modèles couvrent tous les usages. Toutes sont livrées montées, prêtes à jouer, et personnalisables à votre image.",
    answer:
      "RESTART propose 5 modèles de bornes d'arcade multijeux, de 899 € (R-KIDS, format enfant) à 2 478 € (R-PRO, 5 000 jeux avec monnayeur en option). Toutes sont aux normes CE, personnalisables par covering PVC, et livrées montées partout en France depuis Villette-d'Anthon (Isère).",
    benefits: {
      entreprise: [
        'Un point de rassemblement qui fait sortir les équipes de leur bureau à la pause',
        'Aucune maintenance : pas de cartouche, pas de mise à jour, écran et électronique garantis',
        "Covering aux couleurs et au logo de votre entreprise",
        'Achat ou location selon le traitement comptable que vous préférez',
      ],
      'bar-commerce': [
        'Monnayeur en option : la borne devient une source de revenu, pas une charge',
        'Rétroéclairage LED et verre securit, pensés pour un usage intensif en salle',
        'Allonge le temps passé sur place entre deux commandes',
        'Habillage à votre enseigne pour renforcer votre identité de lieu',
      ],
      particulier: [
        "Jusqu'à 5 000 jeux, des classiques des années 80 aux titres 32 bits",
        'Livrée montée : vous branchez et vous jouez, aucun assemblage',
        'Formats compacts (61 cm de large) qui passent dans un salon',
        'Paiement en 2x, 3x ou 4x',
      ],
    },
    faq: [
      {
        q: "Combien coûte une borne d'arcade ?",
        a: "Chez RESTART, une borne d'arcade neuve va de 899 € pour le modèle enfant R-KIDS à 2 478 € pour la R-PRO professionnelle. La R-LEVEL à 990 € est le modèle d'entrée pour un usage domestique, la R-EVOLUTION à 1 590 € offre 5 000 jeux et un écran 22 pouces.",
      },
      {
        q: "Combien de jeux contient une borne d'arcade RESTART ?",
        a: "Selon le modèle : 1 000 jeux sur la R-LEVEL, et jusqu'à 5 000 jeux sur les R-EVOLUTION et R-PRO. La sélection couvre les grands classiques des salles d'arcade et des consoles rétro.",
      },
      {
        q: 'Peut-on personnaliser la borne à ses couleurs ?',
        a: "Oui, sur les modèles R-TWIN, R-EVOLUTION, R-PRO et R-DART PRO : le covering PVC, la couleur des boutons et le T-Molding sont au choix. Un logo d'entreprise ou d'enseigne peut être intégré au visuel.",
      },
      {
        q: 'La borne est-elle livrée montée ?',
        a: "Oui. Les bornes sont livrées assemblées et testées, avec installation sur place. Il suffit de les brancher sur une prise standard : la R-EVOLUTION consomme 60 watts.",
      },
      {
        q: "Peut-on louer une borne au lieu de l'acheter ?",
        a: "Oui, la location est proposée aux entreprises, bars et commerces, avec ou sans monnayeur. Elle inclut la livraison, l'installation et la maintenance. Le tarif dépend de la durée et du modèle : demandez un devis.",
      },
    ],
    models: [
      {
        sku: 'R-KIDS',
        slug: 'r-kids',
        name: 'R-KIDS',
        price: 899,
        headline: 'Le format enfant, à hauteur des plus jeunes',
        audiences: ['particulier'],
        specs: [
          '61 × 115 × 68 cm',
          'Norme CE',
          'Borne livrée en noir',
          'Stickers en option',
          'T-Molding et boutons au choix',
          'Son mono',
          'Écran LG/Samsung 4/3',
          'Verre securit',
          'Épaisseur 16 mm',
          'Monnayeur en option',
        ],
        highlight: 'Le meilleur prix du catalogue',
      },
      {
        sku: 'R-LEVEL',
        slug: 'r-level',
        name: 'R-LEVEL',
        price: 990,
        headline: '1 000 jeux, le format salon qui ne prend pas de place',
        audiences: ['particulier'],
        specs: [
          '1 000 jeux',
          '61 × 124 × 58 cm, 50 kg',
          'Norme CE',
          'Borne noire uniquement',
          'Son mono',
          'Écran LG/Samsung 19"',
          'Épaisseur 16 mm',
        ],
      },
      {
        sku: 'R-TWIN',
        slug: 'r-twin',
        name: 'R-TWIN',
        price: 1440,
        headline: 'Le format cocktail : on joue assis, face à face',
        audiences: ['particulier', 'bar-commerce'],
        specs: [
          'Format table 86 × 76 × 56 cm',
          'Norme CE',
          'Covering PVC personnalisable',
          'T-Molding et boutons au choix',
          'Son stéréo',
          'Écran LG/Samsung 21/10e',
          'Verre securit',
          'Épaisseur 19 mm',
          'Rétroéclairage LED',
          'Bouton lumineux et monnayeur en option',
        ],
      },
      {
        sku: 'R-EVOLUTION',
        slug: 'r-evolution',
        name: 'R-EVOLUTION',
        price: 1590,
        headline: '5 000 jeux et un écran 22 pouces, entièrement à votre image',
        audiences: ['particulier', 'entreprise', 'bar-commerce'],
        specs: [
          '5 000 jeux',
          '61 × 172 × 58 cm',
          'Covering PVC personnalisable',
          'Couleur des boutons au choix',
          'Son stéréo',
          'Écran 22 pouces',
          'Verre securit',
          'Épaisseur 16 mm',
          'Consommation 60 W',
        ],
        highlight: 'Le plus demandé',
      },
      {
        sku: 'R-PRO',
        slug: 'r-pro',
        name: 'R-PRO',
        price: 2478,
        headline: 'La borne pensée pour un usage intensif et rentable',
        audiences: ['entreprise', 'bar-commerce'],
        specs: [
          '5 000 jeux',
          '61 × 174 × 68 cm',
          'Monnayeur en option',
          'Électronique qualité professionnelle',
          'Covering PVC personnalisable',
          'Couleur boutons et T-Molding au choix',
          'Son stéréo',
          'Écran 21:10',
          'Verre securit',
          'Épaisseur 16 mm',
          'Rétroéclairage LED',
          'Roulettes et poignées',
        ],
      },
    ],
  },
  {
    slug: 'flechettes',
    name: 'Fléchettes électroniques',
    navLabel: 'Fléchettes',
    metaTitle: 'Fléchettes électroniques : cible murale ou borne pro personnalisée',
    metaDescription:
      "Cibles de fléchettes électroniques avec plus de 30 modes de jeu. Modèle mural à 1 790 € ou borne professionnelle personnalisable à 2 638,80 €, livrées installées.",
    h1: 'Fléchettes électroniques',
    intro:
      "Comptage automatique, plus de trente modes de jeu et de challenge : la fléchette électronique se joue à deux comme à huit, sans arbitre et sans craie.",
    answer:
      "RESTART propose deux cibles de fléchettes électroniques : la R-DART murale à 1 790 € (écran LG/Samsung 21/10e, plus de 30 modes de jeu, finitions Marshall, Jack Daniel's ou neutre) et la R-DART PRO sur pied à 2 638,80 €, personnalisable par covering PVC avec porte-gobelet et monnayeur en option.",
    benefits: {
      entreprise: [
        'Se joue en 5 minutes : compatible avec une vraie pause, pas seulement un afterwork',
        "Format mural possible : aucun mètre carré de bureau sacrifié",
        "Le comptage automatique évite les débats et les parties qui s'éternisent",
        "Habillage aux couleurs de l'entreprise sur le modèle PRO",
      ],
      'bar-commerce': [
        'Plus de 30 modes de jeu : de quoi organiser des tournois hebdomadaires',
        'Monnayeur en option sur la R-DART PRO',
        'Porte-gobelet intégré : la consommation reste en main',
        'Un motif de retour régulier pour une clientèle fidèle',
      ],
      particulier: [
        "Finitions Marshall, Jack Daniel's ou neutre selon la déco de la pièce",
        'Version murale : se pose dans un couloir ou un garage',
        'Pointes plastique, sans danger pour un mur ou des enfants',
        'Comptage et classement automatiques',
      ],
    },
    faq: [
      {
        q: 'Quelle différence entre la R-DART et la R-DART PRO ?',
        a: "La R-DART (1 790 €) est une cible murale : elle se fixe au mur et occupe zéro surface au sol. La R-DART PRO (2 638,80 €) est une borne complète sur pied de 2,20 m de haut, avec covering personnalisable, son stéréo, rétroéclairage LED, roulettes, et des options porte-gobelet et monnayeur.",
      },
      {
        q: 'Combien de modes de jeu propose une cible électronique ?',
        a: "Plus d'une trentaine de modes de jeu et d'entraînement sur la R-DART, du 501 classique au Cricket en passant par les modes de progression individuelle.",
      },
      {
        q: "Faut-il un espace particulier pour installer une cible de fléchettes ?",
        a: "Comptez environ 2,4 m de recul devant la cible pour respecter la distance de jet réglementaire, et une largeur d'environ 1,5 m. La R-DART PRO occupe 68 cm de large sur 54 cm de profondeur.",
      },
    ],
    models: [
      {
        sku: 'R-DART',
        slug: 'r-dart',
        name: 'R-DART murale',
        price: 1790,
        headline: 'La cible murale : zéro mètre carré au sol',
        audiences: ['particulier', 'entreprise'],
        specs: [
          'Norme CE',
          'Écran LG/Samsung 21/10e',
          'Décoration sans vis',
          "Modèles Marshall, Jack Daniel's ou neutre",
          "Plus de 30 modes de jeu et d'entraînement",
        ],
      },
      {
        sku: 'R-DART PRO',
        slug: 'r-dart-pro',
        name: 'R-DART PRO',
        price: 2638.8,
        headline: 'La borne fléchettes complète, à votre image',
        audiences: ['bar-commerce', 'entreprise'],
        specs: [
          '68 × 220 × 54 cm',
          'Norme CE',
          'Covering PVC personnalisable',
          'T-Molding et boutons au choix',
          'Son stéréo',
          'Écran LG/Samsung 21/10e',
          'Verre securit',
          'Épaisseur 19 mm',
          'Décoration sans vis',
          'Roulette et poignée',
          'Rétroéclairage LED',
          'Bouton lumineux, porte-gobelet et monnayeur en option',
        ],
        highlight: 'Version professionnelle',
      },
    ],
  },
  {
    slug: 'baby-foot',
    name: 'Baby-foot',
    navLabel: 'Baby-foot',
    metaTitle: 'Baby-foot personnalisable : 4 modèles de 1 249 € à 2 199 €',
    metaDescription:
      "Baby-foot intérieur en hêtre massif ou extérieur en polyéthylène, joueurs peints à la main, garantie jusqu'à 3 ans, 6 à 8 couleurs au choix. Modèle XXL 6 joueurs disponible.",
    h1: 'Baby-foot',
    intro:
      "Du modèle d'entrée en mélaminé au hêtre massif personnalisable, en passant par deux modèles conçus pour rester dehors toute l'année.",
    answer:
      "RESTART propose 4 baby-foot : BF-START (1 249 €, intérieur, 6 couleurs), BF 4 SAISONS (1 599 €, extérieur, garantie 3 ans), BF-PREMIUM (1 890 €, hêtre massif, joueurs aluminium, 8 couleurs) et BF 4 SAISONS 6 joueurs (2 199 €, format XXL 223 cm, extérieur). Tous ont des joueurs peints à la main et des balles en liège.",
    benefits: {
      entreprise: [
        "Le classique qui fonctionne sans mode d'emploi : tout le monde sait jouer",
        'Une partie dure 5 minutes, le format d\'une vraie pause',
        'Modèle 6 joueurs pour faire jouer une équipe entière ensemble',
        'Version extérieure pour les terrasses et espaces de pause en plein air',
      ],
      'bar-commerce': [
        "Le BF 4 SAISONS résiste à l'eau, aux UV et au gel : terrasse toute l'année",
        "Caisse polyéthylène haute densité, nettoyage au jet d'eau",
        'Barres acier triple chromage, dimensionnées pour un usage intensif',
        'Garantie 3 ans sur les modèles 4 SAISONS et PREMIUM',
      ],
      particulier: [
        "6 à 8 couleurs au choix pour l'accorder à votre intérieur",
        'Joueurs peints à la main, balles en liège comme au café',
        'Barres télescopiques : sans danger pour les enfants',
        'Version XXL 6 joueurs pour les grandes tablées',
      ],
    },
    faq: [
      {
        q: "Quel baby-foot choisir pour l'extérieur ?",
        a: "Les modèles BF 4 SAISONS (1 599 €) et BF 4 SAISONS 6 joueurs (2 199 €) sont conçus pour rester dehors : caisse en polyéthylène haute densité, tapis linoléum hydrofuge anti-moisissures, barres en acier triple chromage. Ils résistent à l'eau, aux UV, aux insectes et aux températures extrêmes, et se nettoient à l'eau.",
      },
      {
        q: 'Quelle est la différence entre le BF-START et le BF-PREMIUM ?',
        a: "Le BF-START (1 249 €) a une caisse en panneau mélaminé, des joueurs en métal, des barres en acier chromé et 2 ans de garantie. Le BF-PREMIUM (1 890 €) est en hêtre massif, avec des joueurs en aluminium peints à la main, des barres télescopiques en acier inoxydable, un tapis à angles relevés, 8 couleurs au choix et 3 ans de garantie.",
      },
      {
        q: 'Les baby-foot sont-ils personnalisables ?',
        a: "Oui : 6 couleurs au choix sur le BF-START, 8 sur le BF-PREMIUM. Une personnalisation aux couleurs ou au logo de votre entreprise est possible sur devis.",
      },
      {
        q: "Quelle place prévoir autour d'un baby-foot ?",
        a: "Comptez environ 1 mètre de dégagement de chaque côté en plus des dimensions de la table. Le BF-START mesure 150 × 105 cm, le BF-PREMIUM 154 × 98 cm, et le modèle 6 joueurs 223 × 107 cm.",
      },
    ],
    models: [
      {
        sku: 'BF-START',
        slug: 'bf-start',
        name: 'BF-START',
        price: 1249,
        headline: "L'essentiel, bien fait, au meilleur prix",
        audiences: ['particulier'],
        specs: [
          '150 × 105 × 95 cm, 72 kg',
          '6 couleurs au choix',
          'Tapis Gerflex linoléum',
          'Caisse panneau mélaminé',
          'Garantie 2 ans',
          'Joueurs en métal',
          'Barres télescopiques acier chromé',
          '2 balles en liège',
          'Usage intérieur',
        ],
      },
      {
        sku: 'BF 4 SAISONS',
        slug: 'bf-4-saisons',
        name: 'BF 4 SAISONS',
        price: 1599,
        headline: "Il reste dehors toute l'année, sans housse",
        audiences: ['particulier', 'bar-commerce', 'entreprise'],
        specs: [
          '156 × 100 × 95 cm, 78,5 kg',
          'Tapis linoléum hydrofuge anti-moisissures',
          'Caisse polyéthylène haute densité',
          'Garantie 3 ans',
          'Joueurs métal peints à la main',
          'Barres acier triple chromage',
          '2 balles en liège',
          "Conçu pour l'extérieur",
        ],
        highlight: 'Extérieur',
      },
      {
        sku: 'BF-PREMIUM',
        slug: 'bf-premium',
        name: 'BF-PREMIUM',
        price: 1890,
        headline: 'Hêtre massif et joueurs aluminium peints à la main',
        audiences: ['particulier', 'entreprise'],
        specs: [
          '154 × 98 × 90 cm, 75 kg',
          '8 couleurs au choix',
          'Tapis à angles relevés',
          'Caisse hêtre massif',
          'Garantie 3 ans',
          'Joueurs aluminium peints à la main',
          'Barres télescopiques acier inoxydable',
          '5 balles en liège',
          'Usage intérieur',
        ],
        highlight: 'Haut de gamme',
      },
      {
        sku: 'BF 4 SAISONS 6 JOUEURS',
        slug: 'bf-4-saisons-6-joueurs',
        name: 'BF 4 SAISONS 6 joueurs',
        price: 2199,
        headline: 'Le format XXL : six joueurs autour de la table',
        audiences: ['entreprise', 'bar-commerce'],
        specs: [
          '223 × 107 × 93 cm, 107 kg',
          'Tapis linoléum hydrofuge anti-moisissures',
          'Caisse polyéthylène haute densité',
          'Garantie 3 ans',
          'Joueurs métal peints à la main',
          'Barres acier triple chromage',
          '2 balles en liège',
          "Conçu pour l'extérieur",
        ],
      },
    ],
  },
  {
    slug: 'fauteuil-massant',
    name: 'Fauteuil massant',
    navLabel: 'Fauteuil massant',
    metaTitle: 'Fauteuil massant zéro gravité : 7 zones de massage, 1 558,80 €',
    metaDescription:
      "Fauteuil massant M-SERENITY : 7 zones de massage, 3 rouleaux, 5 niveaux d'intensité, mode zéro gravité et chauffage lombaire. Pour le bureau comme pour la maison.",
    h1: 'Fauteuil massant',
    intro:
      "Une pause de vingt minutes qui change une fin de journée. Le M-SERENITY combine mode zéro gravité, chauffage lombaire et sept zones de massage.",
    answer:
      "Le fauteuil massant M-SERENITY de RESTART coûte 1 558,80 €. Il propose 7 zones de massage, 3 rouleaux, 5 niveaux d'intensité, un mode zéro gravité, un chauffage lombaire et des séances jusqu'à 30 minutes. Dimensions : 144 × 119 × 73 cm pour 84 kg, revêtement simili noir.",
    benefits: {
      entreprise: [
        'Un dispositif QVCT concret et mesurable, au-delà des chartes',
        'Séances de 20 à 30 minutes, compatibles avec une pause déjeuner',
        'Aucun consommable, aucun prestataire à planifier',
        'Argument tangible sur la prévention des TMS et du mal de dos',
      ],
      'bar-commerce': [
        "Une offre de détente différenciante pour un hôtel, un spa ou un club",
        'Peut être proposé en service payant à la séance',
        'Revêtement simili, nettoyage immédiat entre deux usages',
        'Encombrement maîtrisé : 144 × 119 cm au sol',
      ],
      particulier: [
        "7 zones de massage et 5 niveaux d'intensité, réglables au fil des séances",
        'Mode zéro gravité pour décharger complètement la colonne',
        'Chauffage lombaire intégré',
        "Séances programmables jusqu'à 30 minutes",
      ],
    },
    faq: [
      {
        q: 'Combien coûte un fauteuil massant professionnel ?',
        a: "Le M-SERENITY est proposé à 1 558,80 €, livraison et installation comprises. Il est également disponible en location pour les entreprises et les établissements recevant du public.",
      },
      {
        q: "Qu'est-ce que le mode zéro gravité ?",
        a: "Le fauteuil bascule dans une position où les jambes remontent au-dessus du niveau du cœur. Le poids du corps se répartit uniformément et la pression sur la colonne vertébrale est fortement réduite : c'est la position la plus efficace pour un massage du dos.",
      },
      {
        q: 'Quelle place prévoir pour un fauteuil massant ?',
        a: "Le M-SERENITY mesure 144 × 119 × 73 cm en position assise. Prévoyez environ 40 cm de dégagement derrière le dossier pour l'inclinaison complète.",
      },
    ],
    models: [
      {
        sku: 'M-SERENITY',
        slug: 'm-serenity',
        name: 'M-SERENITY',
        price: 1558.8,
        headline: 'Zéro gravité, 7 zones, chauffage lombaire',
        audiences: ['particulier', 'entreprise', 'bar-commerce'],
        specs: [
          '144 × 119 × 73 cm, 84 kg',
          'Simili noir',
          'Dossier mousse polyuréthane',
          '7 zones de massage',
          '3 rouleaux',
          "5 niveaux d'intensité",
          'Mode zéro gravité',
          'Chauffage lombaire',
          "Séances jusqu'à 30 minutes",
        ],
      },
    ],
  },
  {
    slug: 'billard',
    name: 'Billard',
    navLabel: 'Billard',
    metaTitle: 'Billard professionnel : location ou achat, avec ou sans monnayeur',
    metaDescription:
      "Billards professionnels robustes, personnalisables, avec ou sans monnayeur, en location ou à l'achat. Livraison et installation partout en France. Devis sous 48 h.",
    h1: 'Billards professionnels',
    intro:
      "Le billard reste l'équipement qui retient le plus longtemps autour de lui. Disponible à l'achat comme en location, avec ou sans monnayeur.",
    answer:
      "RESTART fournit des billards professionnels en location ou à l'achat, avec ou sans monnayeur, personnalisables (tapis, finitions, habillage). Ils sont destinés aux bars, commerces et espaces d'entreprise. Le tarif dépend du modèle et de la formule : le devis est établi sous 48 heures.",
    benefits: {
      entreprise: [
        "Un usage plus long que les autres jeux : idéal pour un espace de convivialité dédié",
        'Formule location tout compris : livraison, installation et maintenance',
        'Personnalisation du tapis et des finitions',
        'Sans monnayeur pour un usage libre par les collaborateurs',
      ],
      'bar-commerce': [
        'Avec monnayeur : un revenu direct et régulier',
        'Construction renforcée pour un usage quotidien intensif',
        "Formule location : aucune immobilisation de trésorerie",
        'Maintenance assurée, y compris le retapissage',
      ],
      particulier: [
        "Modèles disponibles à l'achat pour un usage domestique",
        'Personnalisation du tapis et des finitions',
        'Livraison et installation par nos équipes',
        'Conseil sur les dimensions de la pièce avant commande',
      ],
    },
    faq: [
      {
        q: "Peut-on louer un billard plutôt que l'acheter ?",
        a: "Oui. La location est la formule la plus courante pour les bars et les entreprises : elle comprend la livraison, l'installation et la maintenance, sans immobiliser de trésorerie. L'achat reste possible pour tous les modèles.",
      },
      {
        q: "Le billard peut-il être équipé d'un monnayeur ?",
        a: "Oui, le monnayeur est disponible en option sur tous les modèles professionnels. C'est le choix le plus fréquent en bar, où le billard devient une source de revenu.",
      },
      {
        q: 'Quelle surface prévoir pour installer un billard ?',
        a: "Il faut compter environ 1,50 m de dégagement tout autour de la table pour manœuvrer la queue confortablement. Nous validons les dimensions de votre espace avant toute commande.",
      },
    ],
    quoteOnly: true,
    models: [],
  },
  {
    slug: 'flipper-numerique',
    name: 'Flipper numérique',
    navLabel: 'Flipper',
    metaTitle: 'Flipper numérique : plus de 500 tables, retour de force, garantie 2 ans',
    metaDescription:
      "Flipper numérique nouvelle génération : plus de 500 tables de jeu, retour de force et accéléromètre intégrés, personnalisable à votre image, garantie 2 ans.",
    h1: 'Flippers numériques',
    intro:
      "Toute une collection de flippers dans une seule machine : plus de 500 tables, avec le retour de force et l'accéléromètre qui rendent la sensation fidèle au flipper mécanique.",
    answer:
      "Le flipper numérique de RESTART regroupe plus de 500 tables de jeu dans une seule machine. Il intègre un retour de force et un accéléromètre pour reproduire les sensations d'un flipper mécanique, est personnalisable à votre image et garanti 2 ans. Disponible à l'achat comme en location, tarif sur devis.",
    benefits: {
      entreprise: [
        "Plus de 500 tables : la nouveauté ne s'épuise jamais",
        "Aucune maintenance mécanique, contrairement à un flipper d'époque",
        "Habillage personnalisable aux couleurs de l'entreprise",
        'Garantie 2 ans',
      ],
      'bar-commerce': [
        'Un flipper qui ne tombe jamais en panne mécanique un vendredi soir',
        "Plus de 500 tables : de quoi renouveler l'intérêt en permanence",
        "Retour de force et accéléromètre : la sensation d'un vrai flipper",
        'Habillage à votre enseigne',
      ],
      particulier: [
        "Une collection entière de flippers dans l'encombrement d'une seule machine",
        'Retour de force et accéléromètre intégrés',
        'Installation simple, aucun réglage mécanique',
        'Garantie 2 ans',
      ],
    },
    faq: [
      {
        q: "Un flipper numérique donne-t-il les mêmes sensations qu'un flipper mécanique ?",
        a: "Le retour de force et l'accéléromètre reproduisent les vibrations et la réaction de la machine au tilt. La différence tient surtout à l'entretien : un flipper numérique n'a ni bobine, ni cible mécanique, ni ampoule à remplacer.",
      },
      {
        q: 'Combien de tables de jeu sont disponibles ?',
        a: "Plus de 500 tables numériques sont installées, des classiques historiques aux créations récentes.",
      },
      {
        q: 'Quelle est la garantie sur un flipper numérique ?',
        a: "La garantie est de 2 ans. L'installation est réalisée par nos équipes.",
      },
    ],
    quoteOnly: true,
    models: [],
  },
  {
    slug: 'cocon-de-repos',
    name: 'Cocon de repos',
    navLabel: 'Cocon de repos',
    metaTitle: 'Cocon de repos Nap&Up : la micro-sieste au bureau, QVT et RSE',
    metaDescription:
      "Cocon de repos Nap&Up : un fauteuil ergonomique conçu pour la micro-sieste en entreprise. Un dispositif QVT et RSE concret, installé clé en main dans vos locaux.",
    h1: 'Cocon de repos',
    intro:
      "Vingt minutes de récupération réelle, dans un espace isolé du bruit et de la lumière. Le cocon Nap&Up est conçu pour la micro-sieste en entreprise.",
    answer:
      "Le cocon de repos Nap&Up proposé par RESTART est un fauteuil ergonomique conçu pour la micro-sieste en entreprise. Il s'inscrit dans une démarche QVT/RSE et s'installe clé en main dans les locaux professionnels. Tarif sur devis selon la configuration et le nombre de postes.",
    benefits: {
      entreprise: [
        'La micro-sieste de 20 minutes est le dispositif de récupération le mieux documenté',
        'Un équipement QVT/RSE visible, qui compte dans un bilan social',
        'Isolation phonique et lumineuse : la récupération est réelle',
        'Installation clé en main, sans travaux',
      ],
      'bar-commerce': [
        "Pertinent pour les hôtels, espaces de coworking et lieux d'attente",
        'Peut être proposé comme service à la séance',
        'Aucune installation lourde ni raccordement particulier',
        'Entretien simple entre deux utilisations',
      ],
      particulier: [
        'Conçu pour un usage professionnel, nous consulter pour un projet à domicile',
        'Ergonomie pensée pour une position de repos courte',
        'Isolation du bruit et de la lumière ambiante',
        "Installation et conseil d'implantation inclus",
      ],
    },
    faq: [
      {
        q: 'À quoi sert un cocon de repos en entreprise ?',
        a: "Il permet une micro-sieste de 10 à 20 minutes dans un espace isolé du bruit et de la lumière. C'est un dispositif QVT concret qui répond à la fatigue de l'après-déjeuner, particulièrement pertinent pour les métiers en horaires décalés ou à forte charge cognitive.",
      },
      {
        q: 'Combien de place faut-il pour installer un cocon ?',
        a: "Le cocon s'installe dans un espace de quelques mètres carrés, sans travaux ni raccordement particulier. Nous validons l'implantation avec vous lors de l'audit gratuit.",
      },
      {
        q: 'Le cocon de repos est-il disponible en location ?',
        a: "Oui, comme l'ensemble de nos équipements professionnels. La formule location inclut la livraison, l'installation et la maintenance.",
      },
    ],
    quoteOnly: true,
    models: [],
  },
]

export const findUnivers = (slug: string) => univers.find((u) => u.slug === slug)

export const allModels = univers.flatMap((u) =>
  u.models.map((m) => ({ ...m, universSlug: u.slug, universName: u.name })),
)

export type ListedModel = (typeof allModels)[number]

export const findModel = (universSlug: string, modelSlug: string) =>
  allModels.find((m) => m.universSlug === universSlug && m.slug === modelSlug)

export const modelsFor = (a: Audience) => allModels.filter((m) => m.audiences.includes(a))

export const formatPrice = (n: number) =>
  new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: n % 1 ? 2 : 0,
    maximumFractionDigits: n % 1 ? 2 : 0,
  }).format(n)
