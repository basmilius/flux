# Flux v4: icoonverfijning

De iconen zijn afgestemd op de compactere componenten. Brede SVG's blijven nu
binnen hun opgegeven maat. Een toetsenbordprobleem in de sluitknoppen is opgelost.
Deze ronde bouwt voort op de [density-sweep](flux-v4-sweep-brief.md).
De latere [36px-correctie](flux-v4-36px-review.md) past de controlhoogten en regelhoogte aan;
de hieronder beschreven icoonmaten blijven gelden.

Alle ingebouwde vaste icoon- en spinnermaten volgen nu het 3px-grid. Pane headers
gebruiken 15px-iconen en 12px-chevrons in beide densitystanden. Comfortable vergroot
hier de ruimte; de titeltekst en icoonmaat blijven gelijk. Statistiekkoppen gebruiken
15px met een 12px-info-icoon; small gebruikt 12px voor beide iconen.

Menu's hebben nu 9px inset in beide presets. De oude 3px in compact liet hover- en
selectievlakken te dicht tegen de pane-rand staan. De scheidingslijnen blijven over
de volle binnenbreedte lopen. [Menu na correctie](flux-v4-screenshots/menus-compact-light.png).
Vergelijk [headers vóór](flux-v4-screenshots/headers-comparison-before.png) met
[headers na](flux-v4-screenshots/headers-comparison-light.png) en
[dark](flux-v4-screenshots/headers-comparison-dark.png).

## Scope

Full review van de gewijzigde icoongeometrie in Vue 3, met de bestaande SCSS Modules.
De broncontrole omvat components, application en statistics. Browsercontrole omvat
de gebouwde playground en een gerichte componentfixture, compact en Comfortable,
in light en dark. Passly is nog niet getest.

| Categorie | Bekeken | Resultaat |
| --- | --- | --- |
| Typografie | Iconen naast badge-, chip- en tablabels; koppen met meerdere regels; native velden en formtiles | Maten volgen de controlrol; kopiconen lijnen uit op de eerste tekstregel. |
| Oppervlakken | Badge-close, chipranden, paneheaders en geselecteerde controls | Sluitglyph past in de knop; focusring toegevoegd; padding aan icoonzijden gecorrigeerd. |
| Iconen | SVG-renderer, badges/tags/groups, chips, segmented controls, tabs, panes, notices, forms, items, tijdlijn, shell en statistics | Zie de afgehandelde bevindingen hieronder. |
| Animaties | Bestaande chipfade bij selecteren, afgespeeld op 10% snelheid | Breedte blijft gelijk tijdens de vertraagde overgang. Geen nieuwe animaties toegevoegd. |
| Performance | Transitions en will-change in de gewijzigde controls | Transitions noemen hun eigenschappen; geen nieuwe will-change, watchers of animatielibrary. Geen performanceprofiel opgenomen. |

## Afgehandelde bevindingen

Paden onder `packages/components/src/` zijn hieronder relatief aan die directory,
tenzij ze met `packages/` beginnen. De maten beschrijven deze verfijningsronde;
de volledige migratie vanaf main staat in de density-sweep.

### Icoongewicht en geometrie

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| MEDIUM | `component/FluxIcon.vue:10` | SVG's met brede of grotere viewBox kregen extra scale op basis van breedte / 512. | Aspectratio blijft behouden binnen het opgegeven vierkante icoonvak. | Een icoon van 16px mag niet buiten zijn gereserveerde ruimte schilderen. |
| MEDIUM | `css/component/Badge.module.scss:8`; `component/FluxBadge.vue`, `FluxTag.vue`, `FluxBadgeGroup.vue` | Losse vaste maten voor leading icons; loading kon door de spinnerdefault groter worden. | Small/medium/large: 12/15/15px compact, 12/15/18px Comfortable. De spinner gebruikt hetzelfde vak. | Tekst en icoon hebben nu een passende verhouding; loading verschuift de badge niet. |
| MEDIUM | `css/component/Badge.module.scss:86` | Close-glyph relatief groot, met padding binnen een klein vak; medium dots 9px. | Close-glyph 12px voor alle maten, zonder interne padding; dots 6/6/9px. | Het sluitkruis domineert het label niet meer en blijft binnen de knop. |
| MEDIUM | `css/component/Chip.module.scss:37`; `component/FluxChip.vue` | Vast icoon van 16px en gelijke padding aan tekst- en icoonzijden. | 15px in beide presets; 3px minder padding aan iedere icoonzijde. | Optische balans tussen rond icoon, tekst en buitenrand. |
| MEDIUM | `css/component/SegmentedControl.module.scss:115`, `Tab.module.scss:271`; `component/FluxSegmentedControlItem.vue`, `FluxTabBarItem.vue` | Vaste iconmaps liepen uiteen met de nieuwe tekstmaten. | Segmented 12/15/15px compact, 15/18/18px Comfortable; tabs volgen de controlicoonrol. | Vergelijkbare navigatiecontrols krijgen vergelijkbaar icoongewicht. |
| MEDIUM | `css/component/Pane.module.scss:98`, `PopConfirm.module.scss:10`, `Info.module.scss:9`, `Notice.module.scss:69`, `Expandable.module.scss:167`; `component/FluxPaneHeader.vue`, `FluxClickablePaneHeader.vue`, `FluxExpandablePane.vue`, `FluxPopConfirm.vue`, `FluxExpandable.vue` | Vaste leading icons van 20px, losse chevronmaten en topcorrecties. | Kopiconen 15px en chevrons 12px in beide presets; notices volgen 15/18px; topcorrectie afgeleid van de eerste tekstregel. | Meerregelige koppen houden hun icoon bij de eerste regel. |
| LOW | `css/component/Form.module.scss:944`, `Form.module.scss:1207`, `Item.module.scss:48`, `FormFader.module.scss`; `component/form/FluxFormCheckboxTile.vue`, `FluxFormRadioTile.vue`, `FluxFormInputAddition.vue:6`; `component/FluxTimelineItem.vue:36` | Tiles en items hadden 20px-iconen; addition en tijdlijn waren groter dan nabijgelegen controls; fadergap 9px. | Tiles 15/18px met regelcentrering; item 18px met 3px topmarge; addition en tijdlijn 15px; fadergap 6px. | De kleine inhoudscomponenten sluiten aan bij velden en labels. |
| LOW | `packages/application/src/css/component/ApplicationMenu.module.scss:300`; `packages/statistics/src/css/Base.module.scss:35` | Menutoggle 18px; statistiekkop 20px; info-icoon verkleind met scale. | Toggle volgt controlrol; statistiekkop 15px en info 12px in beide presets, small 12/12px, met bijbehorende regelcentrering. | Visuele maat en layoutvak komen overeen. |

### 3px-grid en menu-inset

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| MEDIUM | `packages/components/src/css/variables.scss:39`; [alle aanvullende locaties](flux-v4-icon-grid-files.md) | Vaste iconen van 13/14/16/20/22/32px en enkele permanente schaalcorrecties. | Ingebouwde maten volgen 12/15/18/21/30px. Controltoken 15px compact en 18px Comfortable; standalone icon/spinner 18px. Stepper gebruikt direct 15px; checkbox behoudt zijn 12px zonder extra scale. | De maten volgen het afgesproken grid en loading blijft gelijk aan het icoon dat wordt vervangen. |
| MEDIUM | `packages/components/src/css/variables.scss:46`; `css/component/Menu.module.scss:402` | Compact menu had 3px ruimte tot de pane-rand. | `--menu-padding: 9px` in beide presets, voor gewone menu's, menupanes en submenus. | Selectie en hover raken visueel niet meer bijna de rand. |
| LOW | `scripts/density-css.ts:82`; `scripts/density-css.test.ts` | De scanner sloeg iedere font-size over. | Icoon- en spinnerselectors en icon-size tokens worden gecontroleerd; teksttypografie blijft uitgezonderd. | Een nieuwe afwijkende vaste CSS-icoonmaat faalt voortaan in CI. |

### Leading inset van badges

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| LOW | `css/component/Badge.module.scss:46`, `Badge.module.scss:130`, `Badge.module.scss:138`, `Badge.module.scss:173`, `Badge.module.scss:238` | Medium/large icoon stond 6/9px van de binnenrand; dots en leading group-iconen hadden geen correctie. | Iconen en loaders 3px naar links bij medium/large, small behoudt 3px inset. Dots en leading group-iconen schuiven 3px op. Keyboard-shortcut-tags behouden veilige randruimte; group-iconen na een startslot en trailing iconen krijgen geen extra negatieve marge. | Minder ruimte vóór het icoon geeft een betere optische balans. De ruimte tussen icoon en label blijft 6px. |

[Badges vóór](flux-v4-screenshots/badge-inset-before.png) en
[na](flux-v4-screenshots/status-compact-light.png).

### Zoektekst boven selectopties

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| MEDIUM | `css/component/Form.module.scss:629` | Zoektekst begon bij de veldpadding, links van de menu-itemtekst. Een lokale paddingoverride verwijderde ook de extra ruimte voor het zoekicoon. | Zoekvelden vóór een menu gebruiken menu-inset + 12px itempadding. De gewone inputregel reserveert weer ruimte voor het trailing icoon. | Zoektekst en opties zonder leading icoon beginnen op dezelfde lijn; tekst loopt niet onder het zoekicoon. |

17 gerichte browserasserties slagen: compact en Comfortable hebben 0px verschil
tussen zoektekst en menu-itemtekst, 9px ruimte vóór het zoekicoon en de verwachte
36/42px veldhoogte. Een aangepaste menu-inset van 15px houdt beide teksten uitgelijnd.
Filteren en selecteren met ArrowDown/Enter werken. Components en docs zijn opnieuw
gebouwd; gridcheck en diffcheck zijn schoon. Deze controle geldt voor de gewone
searchable select; tree-selectlabels hebben hun eigen inspringing.
Zie [metingen](flux-v4-search-check.json) en
[beeld](flux-v4-screenshots/select-search-compact.png).

### Focus en toetsenbord

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| HIGH | `component/FluxPressable.vue:114` | De wrapper onderschepte ook Enter en spatie op een geneste native sluitknop. | Alleen toetsenbordevents gericht op de wrapper zelf worden omgezet naar een wrapperclick. | De sluitknop werkt weer met Enter en spatie; de wrapper blijft zelf bedienbaar. |
| MEDIUM | `css/component/Badge.module.scss:101` | Sluitknop had geen eigen expliciete focusring. | Bestaande focus-ringmixin met 1px offset. | Toetsenbordfocus blijft zichtbaar op het kleine sluitknopje. |

De [icon-docs](../docs/components/icon.md) beschrijven het vierkante SVG-vak.
De [migratiegids](../docs/guide/introduction/upgrading-v4.md) vermeldt de nieuwe
icoonmaten en het behoud van expliciet opgegeven maten.

## Overwogen en behouden

| Locatie | Kandidaat | Reden om het te behouden |
| --- | --- | --- |
| App-overrides en proportionele iconen | Iedere opgegeven of relatieve maat automatisch afronden | De ingebouwde vaste maten volgen het grid. Expliciete appmaten en proporties binnen avatars, boxed icons en tekstlinks blijven de verantwoordelijkheid van die context. |
| Iconregistratie | Glyphs of strokegewicht aanpassen | Apps kiezen hun eigen iconset. Flux corrigeert de schaal en ruimte, niet de vorm van aangeleverde glyphs. |
| Badge-close en andere kleine controls | Automatische vergroting voor touch | De gebruiker heeft touchmaten aan apps overgelaten. Deze ronde verandert de bestaande klikvakken niet. |
| Teksttypografie | Alle 13/14px tekst ook afronden | Deze correctie gaat over iconen en menu-insets; de eerder afgesproken tekstschaal blijft behouden. |
| Chipselectie | Nieuwe icoonanimatie introduceren | De bestaande fade blijft stabiel en geselecteerde kleur plus checkmark geven al feedback. |

## Verificatie

- `bun run --cwd packages/<package> build`: alle zeven packages slagen, inclusief
  declaration generation. Components is na de toetsenbordfix opnieuw gebouwd.
- `node scripts/transform-dts.mjs` en `bun run --cwd docs build` slagen.
- `bun scripts/check-grid.ts --check`: 0 meldingen. Contrast: 402 checks, 0 fouten;
  paletreferenties en vertalingen slagen. `git diff --check` is schoon.
- `bun test scripts/density-css.test.ts`: 3 tests slagen. De aanvullende broncontrole
  vindt geen off-grid numerieke `size` op FluxIcon/FluxSpinner in packages of docsvoorbeelden.
- `node /tmp/flux-v4-header-check.cjs`: 59 asserties slagen voor gewone, klikbare,
  uitgeschakelde en expandable-headers, Info en StatisticsBase (ook small).
  Compact en Comfortable houden iconen op de eerste regel gecentreerd.
  Focus-visible, Enter/spatie en open/dicht zijn gecontroleerd.
  Zie [headermetingen](flux-v4-header-check.json). Alle zeven packages en docs
  zijn na de gridcorrectie opnieuw gebouwd; de onderstaande drie
  browsersuites zijn opnieuw uitgevoerd.
- `node /tmp/flux-v4-icon-check.cjs`: 144 asserties slagen op de gebouwde componenten.
  Controle van alle badge/tagmaten, leading insets, keyboard-shortcut-randruimte,
  loading, groups, close-overflow, dots, segmented
  controls, chips, meerregelige koppen, SVG-viewBoxes en een expliciete 24px-slotmaat.
  Enter/spatie verwijderen ieder eenmaal; wrapperactivatie blijft werken; hover en
  focus-visible zijn gecontroleerd. Chipbreedte blijft gelijk op 10% snelheid.
  Zie [metingen](flux-v4-icon-check.json).
- `node /tmp/flux-v4-browser-check.cjs`: 114 density-asserties slagen.
  `node /tmp/flux-v4-docs-check.cjs`: 53 playgroundasserties slagen, inclusief
  Comfortable-switch, teleports, mobiele plaatsing en herstel bij navigatie. De extra menuchecks meten
  9px inset aan alle vier de kanten, selected-rijen, ononderbroken separators,
  submenu-inset en openen/sluiten met ArrowRight/Escape inclusief focusherstel.
  De scripts zijn lokale verificatiehulpen; hun resultaten staan in dit rapport.
- Visueel bekeken: fixture in light/dark, statusvoorbeelden in compact light en
  Comfortable dark, formulieren in beide standen en tabs/menu's in compact dark.
  Deze beelden tonen ook selected, disabled, loading, empty inputs en foutmeldingen.

Beelden: [voor de icoonronde](flux-v4-screenshots/icons-before.png),
[compact](flux-v4-screenshots/status-compact-light.png),
[Comfortable dark](flux-v4-screenshots/status-comfortable-dark.png),
[alle icoonvarianten](flux-v4-screenshots/icons-fixture-light.png).

**Verdict: Approve voor deze lokale wijziging.** Geen open bevindingen in het
gecontroleerde bereik. Niet geverifieerd: Passly, de font-renderer met een echte
appfont, PopConfirm na deze laatste maatcorrectie en externe voorbeeldafbeeldingen.
StatisticsBase is nu ook gerenderd; overige statistics-componenten zijn in de bron
gecontroleerd en gebouwd. Dit is geen volledige
interactietest van iedere Flux-component.
