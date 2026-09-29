# Menutoggle als icoonknop

Full review van `FluxApplicationMenuToggle` naast de notificatieknop in de
gebouwde playground. Vue 3, bestaande Flux-knoppen en SCSS Modules.

| Categorie | Bekeken | Resultaat |
| --- | --- | --- |
| Typografie | Icoonknop zonder tekst | Bestaand toegankelijk label behouden. |
| Oppervlakken | Formaat, radius, hover, focus en mobiele inset | Gelijk aan de kleine secondary link button. |
| Iconen | SVG-maat, kleur en centrering | Gelijk aan de bel: 15px compact, 18px Comfortable. |
| Animaties | Hover na voltooide overgang | De gedeelde knoptransitie wordt gebruikt; niet op 10% snelheid beoordeeld. |
| Performance | Gewijzigde component en CSS | Geen nieuwe observers of animatiecode. |

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| MEDIUM | `packages/application/src/component/FluxApplicationMenuToggle.vue:2`, `packages/application/src/css/component/ApplicationMenu.module.scss:292` | Toggle gebruikte een menu-item, met andere padding en hoogte dan de belknop. | Kleine `FluxSecondaryLinkButton`, vierkant op de small-controltoken, custom SVG in het icoonslot. SVG is decoratief voor screenreaders. De gebruikte component is bijgewerkt in `docs/application/components/menu/toggle.md`. | Dezelfde knopbasis maakt formaat, hover en focus consistent. |
| LOW | `packages/application/src/css/component/ApplicationTop.module.scss:90` | Negatieve mobiele marges compenseerden de menu-itemgeometrie. | Toggle volgt de gewone topbarpadding en gap. | De nieuwe vierkante knop krijgt dezelfde uitlijning als andere topbarcontrols. |

| Locatie | Overwogen | Reden om het te behouden |
| --- | --- | --- |
| Toggleglyph | Vervangen door een geregistreerd appicoon | Het bestaande ingebouwde sidebaricoon vereist geen extra iconregistratie. |
| Knop | Menu-item met extra CSS-overrides | De bestaande secondary link button levert ook hover, focus en native knopsemantiek. |

Application en docs bouwen succesvol, inclusief types en declarations.
Gridcheck en diffcheck slagen. 36 browserasserties bevestigen gelijke geometrie,
icoonkleur, hover en focus, bediening met Space/Enter en klikken op mobiel.
De compacte en Comfortable screenshots zijn visueel gecontroleerd.

- [Compact](flux-v4-screenshots/menu-toggle-compact.png)
- [Comfortable](flux-v4-screenshots/menu-toggle-comfortable.png)
- [Metingen](flux-v4-menu-toggle-check.json)

Verdict: Approve. Passly en animaties op 10% snelheid zijn niet geverifieerd.
