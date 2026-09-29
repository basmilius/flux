# Ruimere tabelheaders

Full review van de headerhoogte in `FluxTable` en `FluxDataTable`: Vue 3 met
SCSS Modules, compact en Comfortable. De gebouwde playground is gecontroleerd;
Passly is niet getest.

| Categorie | Bekeken | Resultaat |
| --- | --- | --- |
| Typografie | Factuur- en deploymentheaders, uitlijning met kolommen | Bestaande tekstmaten blijven passend. |
| Oppervlakken | Headerpadding, tabelrijen, sticky header | Header krijgt 6px meer hoogte; bodyrijen houden hun hoogte. |
| Iconen | Selectiecheckbox en sorteerknop | Beide blijven verticaal gecentreerd. |
| Animaties | Gewijzigde CSS | Geen animatie betrokken bij deze wijziging. |
| Performance | Gewijzigde CSS en bestaande hoogtemeting | Geen nieuwe observers of transitions; bestaande meting volgt de hogere header. |

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| LOW | `packages/components/src/css/component/Table.module.scss:93`, `css/variables.scss:48`, `css/comfortable.scss:21` | Headers deelden 6/12px verticale padding met bodycellen. | Eigen `--table-header-padding-block`: 9px compact, 15px Comfortable. Gedocumenteerd in `docs/guide/introduction/upgrading-v4.md`. | Meer ruimte rond de kolomnamen maakt de kop beter herkenbaar; de spacing volgt het 3px-grid. |

De overige CSS-paden in de rij zijn relatief aan `packages/components/src/`.

| Locatie | Overwogen | Reden om het te behouden |
| --- | --- | --- |
| Bodycellen | Alle celpadding vergroten | De feedback betreft de header; grotere bodycellen verminderen het aantal zichtbare rijen. |
| Header | Vaste hoogte instellen | Padding laat meerregelige koppen en eigen slotinhoud meegroeien. |

Components en docs bouwen succesvol, inclusief typecontrole en declarations.
`bun scripts/check-grid.ts --check` en `git diff --check` slagen.
31 browserasserties bevestigen de extra 6px, gelijke bodyhoogten, gecentreerde
controls, selecteren/wissen, sorteren en de bijgewerkte sticky-hoogte in beide presets.
De screenshots zijn visueel gecontroleerd.

- [Compact](flux-v4-screenshots/table-header-compact.png)
- [Comfortable](flux-v4-screenshots/table-header-comfortable.png)
- [Metingen](flux-v4-table-header-check.json)

Verdict: Approve. Integratie in Passly is niet geverifieerd.
