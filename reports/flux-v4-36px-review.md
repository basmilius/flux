# Flux: 36px als standaard controlhoogte

De standaard controlhoogte is 36px. De overige controlmaten volgen dezelfde reeks,
met 24px regelhoogte voor gecentreerde labels. Compact blijft 14px tekst gebruiken;
native velden blijven 15px. De icoonmaten volgen het eerder afgesproken 3px-grid.

| Onderdeel | Vorige compacte maat | Nieuwe compacte maat |
| --- | --- | --- |
| Knop small / medium / large / xl | 27 / 33 / 39 / 45px | 30 / 36 / 42 / 48px |
| Veld / condensed veld | 33 / 27px | 36 / 30px |
| Menu- en treerij / grote menurij | 33 / 39px | 36 / 42px |
| Controltekst | 14/21 | 14/24 |
| Segmented item small / medium / large | 21 / 27 / 33px | 24 / 30 / 36px |
| Segmented buitenmaat | 27 / 33 / 39px | 30 / 36 / 42px |
| Chip / tab-pill | 27px | 30px |
| AI-suggestie / toolheader / attachment | 33 / 27 / 27px | 36 / 30 / 30px |

## Review

Full review van deze wijziging, binnen Vue 3 en de bestaande SCSS Modules.

| Categorie | Bekeken | Resultaat |
| --- | --- | --- |
| Typografie | Knoppen, menu's, segmented items, chips, selectrijen en AI-suggesties | De nieuwe regelhoogte voorkomt een halve pixel bij verticale tekstcentrering. |
| Oppervlakken | Alle knopmaten, normale en condensed veldgroepen, selectrijen, horizontale en verticale faders; playgroundformulieren en menu's | Samenhangende maten; velden en knoppen binnen een groep sluiten aan. |
| Iconen | Leading, icon-only en loading; de bestaande icoonfixture | Maten blijven gelijk; loading verandert de controlbreedte niet. |
| Animaties | Selecteerbare chip op 10% snelheid | Breedte blijft gelijk. Geen animaties gewijzigd. |
| Performance | Wijzigingen in tokens en drie AI-stylesheets | Geen nieuwe JavaScript-logica of effecten. Geen performanceprofiel opgenomen. |

### Afgehandelde bevindingen

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| MEDIUM | `packages/components/src/css/variables.scss:34` | Standaardhoogte 33px; afhankelijkheden op 27/33/39/45px. | Hoogtereeks 30/36/42/48px; velden, menurijen, segmented items, chips en tab-pills aangepast via hun roltokens. Control-regelhoogte 24px. | Een wijziging naar 36px moet ook aangrenzende en samengestelde controls meenemen. |
| MEDIUM | `packages/ai/src/css/component/AiSuggestions.module.scss:13` | Vaste 33px hoogte en 21px regelhoogte. | Medium controlhoogte en controltypografie via tokens: 36px compact, 42px Comfortable. | Suggesties passen bij de normale knoppen in dezelfde composer. |
| LOW | `packages/ai/src/css/component/AiToolCall.module.scss:20`; `packages/ai/src/css/component/AiPromptInput.module.scss:44` | Beide vast 27px. | Toolheader volgt small controlhoogte; attachment volgt chiphoogte. | Deze controls blijven niet achter op de oude maat. |

De migratietabel en tokenvoorbeelden in
[upgrading-v4](../docs/guide/introduction/upgrading-v4.md) en de implementatieregels
in [CLAUDE.md](../CLAUDE.md) zijn bijgewerkt.

### Bewust behouden

| Locatie | Overwogen wijziging | Reden om te behouden |
| --- | --- | --- |
| Comfortable | Ook deze preset 3px hoger maken | De preset houdt de afgesproken ruimere 42px-basishoogte. |
| Iconen, pane-padding en menu-inset | Alles mee vergroten | De kleinere iconen en 9px-menu-inset zijn net afgestemd. De hogere controls hebben daar voldoende ruimte omheen. |
| Badges, checkbox/radio, avatars en skeletoncirkels | Alle losse 27/33px-maten mechanisch vervangen | Inline inhoud, markers en avatars hebben een eigen geometrie en zijn niet de standaard knop of veldhoogte. |

## Verificatie

- Alle zeven package-builds en de docs-build slagen; declaration generation is
  gecontroleerd. De bestaande Vite-config- en docsbundelwaarschuwingen blijven staan.
- `node /tmp/flux-v4-browser-check.cjs`: 114 asserties slagen. Naast de bestaande
  controles zijn condensed velden, beide veldgroepen, horizontale/verticale faders
  en de drie gewijzigde AI-controls in compact en Comfortable gemeten.
- `node /tmp/flux-v4-docs-check.cjs`: 53 asserties slagen op de gebouwde playground,
  inclusief menu-insets, submenus, overlays, mobiele switch en navigatieherstel.
- `node /tmp/flux-v4-icon-check.cjs`: 108 asserties slagen, inclusief loading,
  toetsenbordbediening en chipanimatie op 10% snelheid.
- `bun scripts/check-grid.ts --check`: 0 meldingen. `git diff --check`: schoon.
- Visueel bekeken: compacte formulieren in light, tabs/menu's in dark. De vorige
  33px-beelden zijn bewaard voor vergelijking.

Voorbeelden: [33px](flux-v4-screenshots/33px-forms-compact-light.png),
[36px](flux-v4-screenshots/forms-compact-light.png),
[tabs en menu's](flux-v4-screenshots/tab-compact-dark.png).

**Verdict: Approve voor deze lokale wijziging.** Niet geverifieerd: Passly en de
volledige interacties van alle AI-componenten. Hun gewijzigde geometrie is wel in
de browser gecontroleerd. Dit vervangt de eerdere 33px-maatkeuzes in het voorstel.
