# Hogere tabs

Full review van tabhoogten in de gebouwde playground: Vue 3, bestaande SCSS-tokens,
gewone tabs en pills in compact en Comfortable. Passly is niet getest.

| Categorie | Bekeken | Resultaat |
| --- | --- | --- |
| Typografie | Tablabels naast iconen | Bestaande tekstmaten behouden. |
| Oppervlakken | Tabhoogten en actieve markering | Gewone tabs 42/48px; pills 36/42px. |
| Iconen | Centrering in beide densitystanden | 15/18px-iconen blijven verticaal gecentreerd. |
| Animaties | Positie en maat van markering na selectie | Eindpositie klopt; vertraagde animatie niet opnieuw beoordeeld. |
| Performance | Gewijzigde tokens | Geen extra layoutcode, observers of transitions. |

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| LOW | `packages/components/src/css/variables.scss:50`, `packages/components/src/css/comfortable.scss:25`, `docs/guide/introduction/upgrading-v4.md:81` | Compact: gewone tabs 36px, pills 30px. Comfortable: pills 36px. | Compact: 9px verticale padding maakt gewone tabs 42px; pills worden 36px. Comfortable houdt gewone tabs op 48px en krijgt pills van 42px. | Meer verticale ruimte maakt de navigatie minder gedrongen. Alle maten volgen het 3px-grid. |

| Locatie | Overwogen | Reden om het te behouden |
| --- | --- | --- |
| Gewone tabs | Grotere tekst en iconen | De feedback betreft hoogte; extra padding geeft ruimte met dezelfde teksthiërarchie. |
| Comfortable | Gewone tabs ook 6px vergroten | De bestaande 48px biedt al meer ruimte dan de nieuwe compacte 42px. |

Components en docs bouwen succesvol. Gridcheck en diffcheck slagen.
40 browserasserties controleren hoogten, icooncentrering, hover, selectie via
ArrowRight/Home, focus, disabled tabs, actieve markeringen en bereikbaarheid van
de laatste tab op 375px. Screenshots zijn visueel gecontroleerd.

- [Gewone tabs, compact](flux-v4-screenshots/tabs-default-compact.png)
- [Pills, Comfortable](flux-v4-screenshots/tabs-pills-comfortable.png)
- [Metingen](flux-v4-tabs-height-check.json)

Verdict: Approve. Passly en animaties op 10% snelheid zijn niet geverifieerd.
