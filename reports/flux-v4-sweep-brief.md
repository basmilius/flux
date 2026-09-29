# Flux v4 density: implementatie en verificatie

De density-implementatie staat op `feat/v4-density`, vanaf `main` op `0960612b`.
De pilot en de negen clusters zijn afgewerkt. De playground heeft een Comfortable-switch;
de migratiegids en CI-check zijn bijgewerkt. Er is niets gecommit of gepubliceerd.
Het oorspronkelijke voorstel staat in [flux-v4-density.html](flux-v4-density.html).

## Keuzes en gedrag

- `[comfortable]` wordt standaard meegeleverd tot v5. Het herstelt de grotere roltokens;
  interne afstanden en kleine controls blijven compact.
- Apps bepalen touch-maten. Er is geen automatische `pointer: coarse`-vergroting.
- Controls gebruiken 9px radius, containers 12px en kleine hoeken 6px. Afgeleide
  binnenhoeken trekken waar nodig de randdikte af. De legacy `--radius` blijft
  beschikbaar voor app-CSS; Flux zelf leest de twee roltokens.
- De basistekst blijft 15/24. Knoppen en menu-items gebruiken 14/24; native velden
  blijven 15/24. H1 wordt 27/36 en h2 21/30.
- De switch op de playground zet `[comfortable]` op het document. Daardoor volgen
  teleported overlays dezelfde stand. Navigatie herstelt de oorspronkelijke
  aanwezigheid en waarde van het attribuut. Op kleine schermen staat de switch
  boven de paletknop wanneer beide naast elkaar te breed zouden zijn.
- Filter blijft op deze main-basis onderdeel van components. Er is geen aparte
  filter-package gebouwd of van de rapportbranch overgenomen.

## Regels uit de pilot

| Regel | Toepassing | Voorbeeld |
| --- | --- | --- |
| R1 | Padding, margin, gap, inset en afmetingen volgen het 3px-grid; 1 en 2px blijven voor hairlines en randcorrecties. | Checkbox 20 → 18; radiodot 8 → 6. |
| R2 | Bij vaste tekstcontrols is hoogte minus regelhoogte even. Controleer ook small, large en comfortable. | Knop 36/24; small badge 21/21, large badge 30/24. |
| R3 | Gebruik roltokens voor maten die apps terug moeten kunnen zetten. | `.formInput` leest `--field-height` en `--field-padding`. |
| R4 | Trek aan iedere icoonkant van een knop 3px van de gewone padding af. Icon-only en loading-only blijven vierkant. | Medium tekst 12/12; leidend icoon 9/12; beide iconen 9/9. |
| R5 | Loading gebruikt dezelfde maat en padding als het icoon. Controleer CSS-lagen, niet alleen specificiteit. | De unlayered spinner-default won van `flux-base`; de knopoverride staat daarom ook buiten die laag. |
| R6 | Herleid afhankelijke geometrie samen. Vervang geen getal in een formule los van zijn tegenhanger. | Kleurswatch: extra breedte = 2 × veldpadding; negatieve marge = −veldpadding. |
| R7 | Behoud native veldtekst op 15/24. Centreer absolute veldiconen met 50% en translate. | Veldhoogte 36 of 30, geen vaste `margin-block: 11px` meer. |
| R8 | Houd minimumhoogte, absolute inhoud en sticky offsets bij hun control. | Geselecteerde menu-itemrij krijgt `height: auto`, `min-height: 0` en dezelfde buitenmaat als het veld; sticky zoekkop volgt `--field-height`. |
| R9 | 18px aan een containerrand wordt 15px; binnen een component meestal 12px. 24px tekst/icoongeometrie blijft staan; 24px afstand wordt doorgaans 18px. | Pane-padding 18 → token 15; textarea verticale padding 9 → 6 en bijbehorende min-height 18 → 12. |
| R10 | Buitenmaten van voorbeelden, afbeeldingen en avatars worden niet mechanisch kleiner. | Docs-pane van 390px en de PIN-veldmaat in ch blijven staan. |
| R11 | Controleer beide richtingen van sliders en faders. | Slidertrack 12 → 6, thumb 24 → 18; verticale breedte volgt dezelfde mapping. |
| R12 | Gebruik de bestaande 24px regel voor checkbox- en radiolabels om het 18px vakje met 3px bovenruimte te centreren. | Dit wijkt bewust af van de 21px labelregel in de mockup. |

De expliciete componenttabel in het rapport gaat vóór de algemene mappingtabel.
De codemod zette een tussenstap; de handmatige sweep heeft daarna de specifieke
componentmaten toegepast. Map deze waarden niet nogmaals.

Andere afwegingen uit de pilot:

- Small comfortable-velden zijn 33px, tegenover de oude 34px. Het grid blijft geldig;
  de preset belooft geen pixel-exacte v3.
- Small badges houden 12px tekst met 21px regelhoogte. Large badges gebruiken 14/24;
  comfortable large gaat naar 14/21 bij 33px hoogte. Zo geldt R2 ook voor die maten.
- Segmented-track heeft 3px padding en een inset-stroke zonder geometrische border.
  De items van 24/30/36 geven daarmee tracks van exact 30/36/42.
- Faders volgen de veldhoogte. Hun label en waarde volgen de control-regelhoogte,
  zodat comfortable geen halve tekstpixel introduceert.
- De toggle is als één geheel naar 42 × 24 gebracht: thumb 18, verplaatsing 18,
  icooncentra op 12 en 30. De kleine PIN-typografie en de sterren van FormRating
  zijn niet met de spacingmapping verkleind.

## Handmatige sweep

Alle 70 afwegingen uit de codemod hebben een uiteindelijke declaratie en beslissing
in [manual-resolutions](flux-v4-manual-resolutions.json). De belangrijkste wijzigingen:

| Cluster | Resultaat |
| --- | --- |
| Menu en commando's | Rijen 36/42, menupadding 9, commandopalet 540 breed met zoekrij 42 en tabs 24; actions volgen de kleine controlmaat. |
| Tabel, tree en tabs | Cellen 6/12, tabelspacing 15, tree-indent en marker 21 in CSS én TypeScript. Tabs gebruiken padding 6, gap 18 en pills 30. De onderlijn telt niet meer bij de hoogte op. |
| Overlays en panes | Pane-padding en radius via rollen, tooltip 13/18 met padding 6/9, snackbar 480 breed en padding 12/15. |
| Data en inhoud | Chips 30, badges 21/24/30, tijdlijniconen 27, stepper 27 met lijn 3 en progress 6. |
| Layout en overig | Interne afstanden verkleind; inhoudsmaten en gekoppelde geometrie gecontroleerd. Prose-ritme 15; lijst- en quote-indent 18. |
| Application | Topbar 48, menu 240, ingeklapt 54. Lokale defaults verwijderd zodat Comfortable de shell bereikt. Safe-area-expressies behouden. |
| Statistics | Pane-padding via rollen, interne afstanden verkleind, tooltipiconen 12 en gauge-detail 27. Sparkline-bleed volgt de pane-padding. |
| Flow en AI | Compacte binnenafstanden en container-/controlradius per oppervlak. |
| Filter en visuals | Filter 270 breed met sticky offsets gekoppeld aan veld- en menuhoogte. Bestaande off-grid waarden gecorrigeerd. |

Bewust behouden: de 24px ruimte voor trackervertakkingen, gekoppelde divider- en
speeddialformules, 1px shine-randen, de instelbare AdaptiveSlot-gap en de maten van
expliciet aangeleverde iconen, afbeeldingen en avatars. De persona in de playground
laat de voorgestelde avatar van 33px zien.

De docs gebruikten een algemene button-regel die de compacte lettergrootte won.
Die staat nu in de resetlaag. Het voorbeeld met connected radios gebruikt tiles,
zodat de aaneengesloten randen bij het gebruikte component passen. Dit voorbeeld
staat verticaal zodat de labels ook in de smalle mobiele pane passen. Lange checkbox-
en radiolabels mogen binnen een smalle tile afbreken, zodat tekst niet over de
control heen loopt.

## 36px als standaard

De medium controlhoogte is na de eerste sweep verhoogd naar 36px. De reeks is nu
30/36/42/48px, met 24px control-regelhoogte. Velden, menu- en treerijen volgen 36px;
chips en tab-pills gebruiken 30px. De [36px-review](flux-v4-36px-review.md) beschrijft
de gekoppelde maten, AI-controls en verificatie.

## Icoonverfijning

De aanvullende [icoonreview](flux-v4-icon-polish.md) corrigeert de verhouding tussen
iconen en compacte labels, SVG-schaling, uitlijning op meerregelige koppen en
toetsenbordbediening van sluitknoppen. Compact en Comfortable hebben eigen maten.
144 aanvullende browserasserties slagen, inclusief loading, focus en chipanimatie
op 10% snelheid. Zie [icoonmetingen](flux-v4-icon-check.json). Een aanvullende
headercontrole voegt 59 geslaagde asserties toe: pane-iconen zijn 15px en chevrons
12px in beide presets. Zie [headermetingen](flux-v4-header-check.json).

## Gridcheck en codemod

```sh
bun scripts/check-grid.ts --check
bun scripts/check-grid.ts --json
bun test scripts/density-css.test.ts
```

CI draait nu met `--check` en faalt bij meldingen.

| Package | Voor | Na pilot | Na sweep |
| --- | ---: | ---: | ---: |
| components | 50 | 29 | 0 |
| application | 5 | 5 | 0 |
| statistics | 7 | 7 | 0 |
| visuals | 1 | 1 | 0 |
| ai | 0 | 0 | 0 |
| flow | 0 | 0 | 0 |
| **Totaal** | **63** | **42** | **0** |

De beginmeting hierboven controleerde spacing en dimensies. De eindcontrole omvat
inmiddels ook vaste icoonmaten; ook daarmee blijft het totaal nul.

De scanner controleert px-literals in spacing- en dimension-declaraties, ook in
`calc()`, multiline waarden, logische eigenschappen en negatieve marges. Hij slaat
comments, strings, teksttypografie en radius over. Icoon- en spinnerfontmaten en
icon-size tokens vallen wel onder de controle. Het is geen evaluator van custom
properties of Sass-maps. Geometrie en tokenwaarden zijn daarom ook in de browser
gecontroleerd. De comfortabele badge van 28px is een bewuste migratie-uitzondering.
Zie [voor](flux-v4-grid-before.json) en [na](flux-v4-grid-after.json).

De codemod is een eenmalige migratie vanaf main. Hij wijzigde 255 regels in 72
bestanden vóór de handmatige sweep. `--write` weigert bestanden die inmiddels
handmatig zijn aangepast. Draai hem niet opnieuw over deze eindstand.

## Verificatie

- Alle zeven package-builds slagen, inclusief TypeScript en declaration generation:
  internals, visuals, components, application, statistics, flow en ai.
- De VitePress-productiebuild slaagt. De bestaande waarschuwingen over de
  extensieloze Vite-configimport en grote docsbundels blijven staan.
- 402 contrastchecks, 0 fouten; geen legacy palettokens. Vertaalchecks slagen voor
  components, ai, application en flow. Drie scannerregressietests slagen.
- 114 browserasserties op de gebouwde componenten controleren knopmaten, icon-only,
  loading, tekstpariteit, velden, badges, segmented controls, tokenoverrides en
  toetsenbordfocus. Zie [componentmetingen](flux-v4-browser-check.json).
- 53 browserasserties op de gebouwde playground slagen. De site is lokaal geladen via request-interceptie, zonder
  devserver. De checks controleren compact en Comfortable, typografie, shell,
  dialogen, teleported flyouts, toetsenbordbediening en herstel bij navigatie.
  Zie [playgroundmetingen](flux-v4-playground-check.json).
- Screenshots van formulieren, tabellen, tabs, menu's, dialogen en de shell zijn
  bekeken in light en dark, met en zonder Comfortable. Externe voorbeeldafbeeldingen
  zijn tijdens deze checks geblokkeerd; hun netwerkgedrag is niet getest.
  Voorbeelden: [formulier compact](flux-v4-screenshots/forms-compact-light.png),
  [formulier Comfortable](flux-v4-screenshots/forms-comfortable-dark.png),
  [tabel](flux-v4-screenshots/tables-compact-light.png),
  [dialog](flux-v4-screenshots/dialog-comfortable-dark.png),
  [shell](flux-v4-screenshots/application-compact-light.png) en
  [mobiele switch](flux-v4-screenshots/playground-small.png).
- [Dist-CSS-diff](flux-v4-dist-css-diff.json) bevat 987 gewijzigde selector/eigenschap-
  paren tegenover main. Deze vergelijking neemt de laatste declaratie per exact
  selector-/at-rulepad en resolveert `var()` tegen compact root. De browserchecks
  toetsen de daadwerkelijke cascade en geërfde preset.
- `git diff --check` is groen. Zie ook [diffstat](flux-v4-diffstat.txt).

## Buiten deze lokale implementatie

Er is geen beta uitgebracht en er is nog geen echte consumer-app gedogfood.
Dat blijft de controle vóór v4 stable. De implementatie, docs en lokale verificatie
zijn gereed; de wijzigingen blijven ongecommit zoals eerder afgesproken.
