---
outline: deep
---

<script setup>
import { english } from '../../../packages/components/src/data/i18n';
</script>

# Translations

Flux reads the strings it renders through [vue-i18n](https://vue-i18n.intlify.dev/){target="_blank"},
a peer dependency of every package that says anything at all. Each string sits behind
a key under the `flux` root: translate that key in your own messages and the components
follow, leave it out and the English below is used.

## Getting set up

Flux reaches for the global scope of your i18n instance, so create it in Composition
API mode.

```ts
import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import nl from './locales/nl.json';

const i18n = createI18n({
    legacy: false,
    locale: 'nl',
    fallbackLocale: 'en',
    messages: {nl}
});

createApp(App)
    .use(i18n)
    .mount('#app');
```

::: tip
The sibling packages carry their own keys under the same `flux` root:
[AI](../../ai/introduction/translations), [Application](../../application/introduction/translations)
and [Flow](../../flow/introduction/translations). `@flux-ui/statistics` renders no
text of its own, but it does put the series, slice and axis names you hand it through
the same translations, which lets you pass keys where you would otherwise pass
finished text.
:::

## Strings

The list is read straight from the source of `@flux-ui/components`, so it is the
set that ships with the version this page documents.

<table>
    <thead>
        <tr>
            <th>Key</th>
            <th>Value</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(value, key) of english" :key="key">
            <td><kbd>{{ key }}</kbd></td>
            <td>{{ value }}</td>
        </tr>
    </tbody>
</table>

## Pre-translated strings

Here are the official translations for the strings used by Flux. If you have
additional translations, feel free to contribute by creating a pull request on
GitHub. :) They live in `docs/.vitepress/data/translations/components.ts`; the
blocks below are generated from it by `bun scripts/generate-translations.ts`.

<!-- translations:start -->

### English

::: code-group

```yaml [en.yaml]
flux:
  allDay: "All day"
  andNMore: "{n} more"
  back: "Back"
  backToTop: "Back to top"
  cancel: "Cancel"
  close: "Close"
  collapseGroup: "Collapse group"
  collapseRow: "Collapse row"
  colorSaturationBrightness: "Color saturation and brightness"
  comingSoon: "Coming soon"
  continue: "Continue"
  createOption: "Create \"{value}\""
  customColor: "Custom color"
  customPeriod: "Custom period"
  decrease: "Decrease"
  delete: "Delete"
  displayingOf: "{from}–{to} of {total}"
  done: "Done"
  dropFilesOrClick: "Drop files here or click to upload"
  expandGroup: "Expand group"
  expandRow: "Expand row"
  filter: "Filter"
  filterRemove: "Remove filter"
  filterReset: "Reset filters"
  focalPoint: "Focal point"
  focalPointValue: "{x}% horizontal, {y}% vertical"
  galleryPlaceholderButton: "Pick image"
  galleryPlaceholderMessage: "Drop an image here or click the button to upload..."
  galleryPlaceholderTitle: "Gallery"
  goToPage: "Go to page {page}"
  grabbedAnnounce: "Item grabbed. Use arrow keys to move, Enter to drop, Escape to cancel."
  hue: "Hue"
  increase: "Increase"
  justNow: "Just now"
  lowerBound: "Lower bound"
  max: "Max"
  min: "Min"
  moreActions: "More actions"
  next: "Next"
  nextMonth: "Next month"
  nextYears: "Next years"
  noItems: "There are no items (left)."
  nSelected: "{n} selected"
  ok: "Ok"
  opacity: "Opacity"
  optional: "Optional"
  pagination: "Pagination"
  paginationNavigateMessage: "Please provide the desired page number you wish to navigate to."
  paginationNavigatePage: "Page"
  paginationNavigateTitle: "Navigate"
  pinDigit: "Digit {index} of {total}"
  preview: "Preview"
  previewClose: "Close preview"
  previous: "Previous"
  previousMonth: "Previous month"
  previousYears: "Previous years"
  readLess: "Read less"
  readMore: "Read more"
  releasedAnnounce: "Item released."
  repeaterAdd: "Add"
  repeaterAddRow: "Add {label}"
  repeaterMoveCancelled: "Move cancelled."
  repeaterRemoveMessage: "This row still contains information. Removing it discards what you entered."
  repeaterRemoveRow: "Remove {label}"
  repeaterRemoveTitle: "Remove {label}?"
  repeaterReorder: "Reorder {label}"
  repeaterRow: "{label} {index} of {total}"
  repeaterRowLabel: "Row"
  resizeColumn: "Resize column"
  search: "Search..."
  selectDate: "Select date"
  selectMonth: "Select month"
  selectYear: "Select year"
  sheetGrabber: "Resize or close the sheet"
  showN: "Show {n}"
  skip: "Skip"
  sort: "Sort"
  sortAscending: "Ascending"
  sortDescending: "Descending"
  sortRemove: "Remove sorting"
  submenu: "Submenu"
  swipeActionsLeading: "Leading actions"
  swipeActionsTrailing: "Trailing actions"
  timezoneAfrica: "Africa"
  timezoneAmerica: "America"
  timezoneAntarctica: "Antarctica"
  timezoneArctic: "Arctic"
  timezoneAsia: "Asia"
  timezoneAtlantic: "Atlantic"
  timezoneAustralia: "Australia"
  timezoneBrazil: "Brazil"
  timezoneCanada: "Canada"
  timezoneChile: "Chile"
  timezoneEtc: "ETC"
  timezoneEurope: "Europe"
  timezoneIndian: "Indian"
  timezoneMexico: "Mexico"
  timezoneOther: "Other"
  timezonePacific: "Pacific"
  timezoneUs: "United States"
  today: "Today"
  togglePasswordVisibility: "Toggle password visibility"
  upperBound: "Upper bound"
```

```json [en.json]
{
  "flux": {
    "allDay": "All day",
    "andNMore": "{n} more",
    "back": "Back",
    "backToTop": "Back to top",
    "cancel": "Cancel",
    "close": "Close",
    "collapseGroup": "Collapse group",
    "collapseRow": "Collapse row",
    "colorSaturationBrightness": "Color saturation and brightness",
    "comingSoon": "Coming soon",
    "continue": "Continue",
    "createOption": "Create \"{value}\"",
    "customColor": "Custom color",
    "customPeriod": "Custom period",
    "decrease": "Decrease",
    "delete": "Delete",
    "displayingOf": "{from}–{to} of {total}",
    "done": "Done",
    "dropFilesOrClick": "Drop files here or click to upload",
    "expandGroup": "Expand group",
    "expandRow": "Expand row",
    "filter": "Filter",
    "filterRemove": "Remove filter",
    "filterReset": "Reset filters",
    "focalPoint": "Focal point",
    "focalPointValue": "{x}% horizontal, {y}% vertical",
    "galleryPlaceholderButton": "Pick image",
    "galleryPlaceholderMessage": "Drop an image here or click the button to upload...",
    "galleryPlaceholderTitle": "Gallery",
    "goToPage": "Go to page {page}",
    "grabbedAnnounce": "Item grabbed. Use arrow keys to move, Enter to drop, Escape to cancel.",
    "hue": "Hue",
    "increase": "Increase",
    "justNow": "Just now",
    "lowerBound": "Lower bound",
    "max": "Max",
    "min": "Min",
    "moreActions": "More actions",
    "next": "Next",
    "nextMonth": "Next month",
    "nextYears": "Next years",
    "noItems": "There are no items (left).",
    "nSelected": "{n} selected",
    "ok": "Ok",
    "opacity": "Opacity",
    "optional": "Optional",
    "pagination": "Pagination",
    "paginationNavigateMessage": "Please provide the desired page number you wish to navigate to.",
    "paginationNavigatePage": "Page",
    "paginationNavigateTitle": "Navigate",
    "pinDigit": "Digit {index} of {total}",
    "preview": "Preview",
    "previewClose": "Close preview",
    "previous": "Previous",
    "previousMonth": "Previous month",
    "previousYears": "Previous years",
    "readLess": "Read less",
    "readMore": "Read more",
    "releasedAnnounce": "Item released.",
    "repeaterAdd": "Add",
    "repeaterAddRow": "Add {label}",
    "repeaterMoveCancelled": "Move cancelled.",
    "repeaterRemoveMessage": "This row still contains information. Removing it discards what you entered.",
    "repeaterRemoveRow": "Remove {label}",
    "repeaterRemoveTitle": "Remove {label}?",
    "repeaterReorder": "Reorder {label}",
    "repeaterRow": "{label} {index} of {total}",
    "repeaterRowLabel": "Row",
    "resizeColumn": "Resize column",
    "search": "Search...",
    "selectDate": "Select date",
    "selectMonth": "Select month",
    "selectYear": "Select year",
    "sheetGrabber": "Resize or close the sheet",
    "showN": "Show {n}",
    "skip": "Skip",
    "sort": "Sort",
    "sortAscending": "Ascending",
    "sortDescending": "Descending",
    "sortRemove": "Remove sorting",
    "submenu": "Submenu",
    "swipeActionsLeading": "Leading actions",
    "swipeActionsTrailing": "Trailing actions",
    "timezoneAfrica": "Africa",
    "timezoneAmerica": "America",
    "timezoneAntarctica": "Antarctica",
    "timezoneArctic": "Arctic",
    "timezoneAsia": "Asia",
    "timezoneAtlantic": "Atlantic",
    "timezoneAustralia": "Australia",
    "timezoneBrazil": "Brazil",
    "timezoneCanada": "Canada",
    "timezoneChile": "Chile",
    "timezoneEtc": "ETC",
    "timezoneEurope": "Europe",
    "timezoneIndian": "Indian",
    "timezoneMexico": "Mexico",
    "timezoneOther": "Other",
    "timezonePacific": "Pacific",
    "timezoneUs": "United States",
    "today": "Today",
    "togglePasswordVisibility": "Toggle password visibility",
    "upperBound": "Upper bound"
  }
}
```

:::

### Dutch - Nederlands

::: code-group

```yaml [nl.yaml]
flux:
  allDay: "Hele dag"
  andNMore: "nog {n}"
  back: "Terug"
  backToTop: "Terug naar boven"
  cancel: "Annuleren"
  close: "Sluiten"
  collapseGroup: "Groep inklappen"
  collapseRow: "Rij inklappen"
  colorSaturationBrightness: "Kleurverzadiging en helderheid"
  comingSoon: "Binnenkort"
  continue: "Verder"
  createOption: "Maak \"{value}\" aan"
  customColor: "Aangepaste kleur"
  customPeriod: "Aangepaste periode"
  decrease: "Verlagen"
  delete: "Verwijderen"
  displayingOf: "{from}–{to} van {total}"
  done: "Klaar"
  dropFilesOrClick: "Sleep bestanden hierheen of klik om te uploaden"
  expandGroup: "Groep uitklappen"
  expandRow: "Rij uitklappen"
  filter: "Filter"
  filterRemove: "Verwijder filter"
  filterReset: "Verwijder alle filters"
  focalPoint: "Focuspunt"
  focalPointValue: "{x}% horizontaal, {y}% verticaal"
  galleryPlaceholderButton: "Selecteer afbeeldingen"
  galleryPlaceholderMessage: "Laat hier afbeeldingen vallen om ze te uploaden of klik op de knop om te selecteren."
  galleryPlaceholderTitle: "Afbeeldingen"
  goToPage: "Ga naar pagina {page}"
  grabbedAnnounce: "Item vastgepakt. Gebruik de pijltjestoetsen om te verplaatsen, Enter om los te laten, Escape om te annuleren."
  hue: "Tint"
  increase: "Verhogen"
  justNow: "Zojuist"
  lowerBound: "Ondergrens"
  max: "Maximaal"
  min: "Minimaal"
  moreActions: "Meer acties"
  next: "Volgende"
  nextMonth: "Volgende maand"
  nextYears: "Volgende jaren"
  noItems: "Geen resultaten gevonden"
  nSelected: "{n} geselecteerd"
  ok: "Oké"
  opacity: "Dekking"
  optional: "Optioneel"
  pagination: "Paginatie"
  paginationNavigateMessage: "Naar welke pagina wil je toe navigeren?"
  paginationNavigatePage: "Pagina"
  paginationNavigateTitle: "Navigeer"
  pinDigit: "Cijfer {index} van {total}"
  preview: "Voorbeeld"
  previewClose: "Voorbeeld sluiten"
  previous: "Vorige"
  previousMonth: "Vorige maand"
  previousYears: "Vorige jaren"
  readLess: "Minder lezen"
  readMore: "Meer lezen"
  releasedAnnounce: "Item losgelaten."
  repeaterAdd: "Toevoegen"
  repeaterAddRow: "{label} toevoegen"
  repeaterMoveCancelled: "Verplaatsen geannuleerd."
  repeaterRemoveMessage: "Deze rij bevat nog gegevens. Als je hem verwijdert, gaat verloren wat je hebt ingevuld."
  repeaterRemoveRow: "{label} verwijderen"
  repeaterRemoveTitle: "{label} verwijderen?"
  repeaterReorder: "{label} herschikken"
  repeaterRow: "{label} {index} van {total}"
  repeaterRowLabel: "Rij"
  resizeColumn: "Kolombreedte aanpassen"
  search: "Zoeken..."
  selectDate: "Selecteer datum"
  selectMonth: "Selecteer maand"
  selectYear: "Selecteer jaar"
  sheetGrabber: "Formaat aanpassen of het paneel sluiten"
  showN: "Toon {n}"
  skip: "Overslaan"
  sort: "Sorteer"
  sortAscending: "Oplopend"
  sortDescending: "Aflopend"
  sortRemove: "Verwijder"
  submenu: "Submenu"
  swipeActionsLeading: "Acties aan het begin"
  swipeActionsTrailing: "Acties aan het eind"
  timezoneAfrica: "Afrika"
  timezoneAmerica: "Amerika"
  timezoneAntarctica: "Antarctica"
  timezoneArctic: "Arctisch"
  timezoneAsia: "Azië"
  timezoneAtlantic: "Atlantisch"
  timezoneAustralia: "Australië"
  timezoneBrazil: "Brazilië"
  timezoneCanada: "Canada"
  timezoneChile: "Chili"
  timezoneEtc: "ETC"
  timezoneEurope: "Europa"
  timezoneIndian: "Indisch"
  timezoneMexico: "Mexico"
  timezoneOther: "Overig"
  timezonePacific: "Pacifisch"
  timezoneUs: "Verenigde Staten"
  today: "Vandaag"
  togglePasswordVisibility: "Wachtwoord tonen of verbergen"
  upperBound: "Bovengrens"
```

```json [nl.json]
{
  "flux": {
    "allDay": "Hele dag",
    "andNMore": "nog {n}",
    "back": "Terug",
    "backToTop": "Terug naar boven",
    "cancel": "Annuleren",
    "close": "Sluiten",
    "collapseGroup": "Groep inklappen",
    "collapseRow": "Rij inklappen",
    "colorSaturationBrightness": "Kleurverzadiging en helderheid",
    "comingSoon": "Binnenkort",
    "continue": "Verder",
    "createOption": "Maak \"{value}\" aan",
    "customColor": "Aangepaste kleur",
    "customPeriod": "Aangepaste periode",
    "decrease": "Verlagen",
    "delete": "Verwijderen",
    "displayingOf": "{from}–{to} van {total}",
    "done": "Klaar",
    "dropFilesOrClick": "Sleep bestanden hierheen of klik om te uploaden",
    "expandGroup": "Groep uitklappen",
    "expandRow": "Rij uitklappen",
    "filter": "Filter",
    "filterRemove": "Verwijder filter",
    "filterReset": "Verwijder alle filters",
    "focalPoint": "Focuspunt",
    "focalPointValue": "{x}% horizontaal, {y}% verticaal",
    "galleryPlaceholderButton": "Selecteer afbeeldingen",
    "galleryPlaceholderMessage": "Laat hier afbeeldingen vallen om ze te uploaden of klik op de knop om te selecteren.",
    "galleryPlaceholderTitle": "Afbeeldingen",
    "goToPage": "Ga naar pagina {page}",
    "grabbedAnnounce": "Item vastgepakt. Gebruik de pijltjestoetsen om te verplaatsen, Enter om los te laten, Escape om te annuleren.",
    "hue": "Tint",
    "increase": "Verhogen",
    "justNow": "Zojuist",
    "lowerBound": "Ondergrens",
    "max": "Maximaal",
    "min": "Minimaal",
    "moreActions": "Meer acties",
    "next": "Volgende",
    "nextMonth": "Volgende maand",
    "nextYears": "Volgende jaren",
    "noItems": "Geen resultaten gevonden",
    "nSelected": "{n} geselecteerd",
    "ok": "Oké",
    "opacity": "Dekking",
    "optional": "Optioneel",
    "pagination": "Paginatie",
    "paginationNavigateMessage": "Naar welke pagina wil je toe navigeren?",
    "paginationNavigatePage": "Pagina",
    "paginationNavigateTitle": "Navigeer",
    "pinDigit": "Cijfer {index} van {total}",
    "preview": "Voorbeeld",
    "previewClose": "Voorbeeld sluiten",
    "previous": "Vorige",
    "previousMonth": "Vorige maand",
    "previousYears": "Vorige jaren",
    "readLess": "Minder lezen",
    "readMore": "Meer lezen",
    "releasedAnnounce": "Item losgelaten.",
    "repeaterAdd": "Toevoegen",
    "repeaterAddRow": "{label} toevoegen",
    "repeaterMoveCancelled": "Verplaatsen geannuleerd.",
    "repeaterRemoveMessage": "Deze rij bevat nog gegevens. Als je hem verwijdert, gaat verloren wat je hebt ingevuld.",
    "repeaterRemoveRow": "{label} verwijderen",
    "repeaterRemoveTitle": "{label} verwijderen?",
    "repeaterReorder": "{label} herschikken",
    "repeaterRow": "{label} {index} van {total}",
    "repeaterRowLabel": "Rij",
    "resizeColumn": "Kolombreedte aanpassen",
    "search": "Zoeken...",
    "selectDate": "Selecteer datum",
    "selectMonth": "Selecteer maand",
    "selectYear": "Selecteer jaar",
    "sheetGrabber": "Formaat aanpassen of het paneel sluiten",
    "showN": "Toon {n}",
    "skip": "Overslaan",
    "sort": "Sorteer",
    "sortAscending": "Oplopend",
    "sortDescending": "Aflopend",
    "sortRemove": "Verwijder",
    "submenu": "Submenu",
    "swipeActionsLeading": "Acties aan het begin",
    "swipeActionsTrailing": "Acties aan het eind",
    "timezoneAfrica": "Afrika",
    "timezoneAmerica": "Amerika",
    "timezoneAntarctica": "Antarctica",
    "timezoneArctic": "Arctisch",
    "timezoneAsia": "Azië",
    "timezoneAtlantic": "Atlantisch",
    "timezoneAustralia": "Australië",
    "timezoneBrazil": "Brazilië",
    "timezoneCanada": "Canada",
    "timezoneChile": "Chili",
    "timezoneEtc": "ETC",
    "timezoneEurope": "Europa",
    "timezoneIndian": "Indisch",
    "timezoneMexico": "Mexico",
    "timezoneOther": "Overig",
    "timezonePacific": "Pacifisch",
    "timezoneUs": "Verenigde Staten",
    "today": "Vandaag",
    "togglePasswordVisibility": "Wachtwoord tonen of verbergen",
    "upperBound": "Bovengrens"
  }
}
```

:::

### French - Français

::: code-group

```yaml [fr.yaml]
flux:
  allDay: "Toute la journée"
  andNMore: "{n} de plus"
  back: "Retour"
  backToTop: "Retour en haut"
  cancel: "Annuler"
  close: "Fermer"
  collapseGroup: "Réduire le groupe"
  collapseRow: "Réduire la ligne"
  colorSaturationBrightness: "Saturation et luminosité de la couleur"
  comingSoon: "Bientôt disponible"
  continue: "Continuer"
  createOption: "Créer \"{value}\""
  customColor: "Couleur personnalisée"
  customPeriod: "Période personnalisée"
  decrease: "Diminuer"
  delete: "Supprimer"
  displayingOf: "{from}–{to} sur {total}"
  done: "Terminé"
  dropFilesOrClick: "Déposez des fichiers ici ou cliquez pour téléverser"
  expandGroup: "Développer le groupe"
  expandRow: "Développer la ligne"
  filter: "Filtrer"
  filterRemove: "Supprimer le filtre"
  filterReset: "Réinitialiser les filtres"
  focalPoint: "Point focal"
  focalPointValue: "{x} % horizontal, {y} % vertical"
  galleryPlaceholderButton: "Choisir une image"
  galleryPlaceholderMessage: "Déposez une image ici ou cliquez sur le bouton pour télécharger..."
  galleryPlaceholderTitle: "Galerie"
  goToPage: "Aller à la page {page}"
  grabbedAnnounce: "Élément saisi. Utilisez les touches fléchées pour déplacer, Entrée pour déposer, Échap pour annuler."
  hue: "Teinte"
  increase: "Augmenter"
  justNow: "À l'instant"
  lowerBound: "Borne inférieure"
  max: "Max"
  min: "Min"
  moreActions: "Plus d'actions"
  next: "Suivant"
  nextMonth: "Mois suivant"
  nextYears: "Années suivantes"
  noItems: "Aucun élément disponible."
  nSelected: "{n} sélectionné(s)"
  ok: "OK"
  opacity: "Opacité"
  optional: "Optionnel"
  pagination: "Pagination"
  paginationNavigateMessage: "Veuillez indiquer le numéro de page souhaité."
  paginationNavigatePage: "Page"
  paginationNavigateTitle: "Naviguer"
  pinDigit: "Chiffre {index} sur {total}"
  preview: "Aperçu"
  previewClose: "Fermer l'aperçu"
  previous: "Précédent"
  previousMonth: "Mois précédent"
  previousYears: "Années précédentes"
  readLess: "Lire moins"
  readMore: "Lire plus"
  releasedAnnounce: "Élément relâché."
  repeaterAdd: "Ajouter"
  repeaterAddRow: "Ajouter {label}"
  repeaterMoveCancelled: "Déplacement annulé."
  repeaterRemoveMessage: "Cette ligne contient encore des informations. La supprimer effacera ce que vous avez saisi."
  repeaterRemoveRow: "Supprimer {label}"
  repeaterRemoveTitle: "Supprimer {label} ?"
  repeaterReorder: "Réorganiser {label}"
  repeaterRow: "{label} {index} sur {total}"
  repeaterRowLabel: "Ligne"
  resizeColumn: "Redimensionner la colonne"
  search: "Recherche..."
  selectDate: "Sélectionner la date"
  selectMonth: "Sélectionner le mois"
  selectYear: "Sélectionner l'année"
  sheetGrabber: "Redimensionner ou fermer la feuille"
  showN: "Afficher {n}"
  skip: "Passer"
  sort: "Trier"
  sortAscending: "Ascendant"
  sortDescending: "Descendant"
  sortRemove: "Supprimer le tri"
  submenu: "Sous-menu"
  swipeActionsLeading: "Actions de début"
  swipeActionsTrailing: "Actions de fin"
  timezoneAfrica: "Afrique"
  timezoneAmerica: "Amérique"
  timezoneAntarctica: "Antarctique"
  timezoneArctic: "Arctique"
  timezoneAsia: "Asie"
  timezoneAtlantic: "Atlantique"
  timezoneAustralia: "Australie"
  timezoneBrazil: "Brésil"
  timezoneCanada: "Canada"
  timezoneChile: "Chili"
  timezoneEtc: "ETC"
  timezoneEurope: "Europe"
  timezoneIndian: "Indien"
  timezoneMexico: "Mexique"
  timezoneOther: "Autre"
  timezonePacific: "Pacifique"
  timezoneUs: "États-Unis"
  today: "Aujourd'hui"
  togglePasswordVisibility: "Afficher ou masquer le mot de passe"
  upperBound: "Borne supérieure"
```

```json [fr.json]
{
  "flux": {
    "allDay": "Toute la journée",
    "andNMore": "{n} de plus",
    "back": "Retour",
    "backToTop": "Retour en haut",
    "cancel": "Annuler",
    "close": "Fermer",
    "collapseGroup": "Réduire le groupe",
    "collapseRow": "Réduire la ligne",
    "colorSaturationBrightness": "Saturation et luminosité de la couleur",
    "comingSoon": "Bientôt disponible",
    "continue": "Continuer",
    "createOption": "Créer \"{value}\"",
    "customColor": "Couleur personnalisée",
    "customPeriod": "Période personnalisée",
    "decrease": "Diminuer",
    "delete": "Supprimer",
    "displayingOf": "{from}–{to} sur {total}",
    "done": "Terminé",
    "dropFilesOrClick": "Déposez des fichiers ici ou cliquez pour téléverser",
    "expandGroup": "Développer le groupe",
    "expandRow": "Développer la ligne",
    "filter": "Filtrer",
    "filterRemove": "Supprimer le filtre",
    "filterReset": "Réinitialiser les filtres",
    "focalPoint": "Point focal",
    "focalPointValue": "{x} % horizontal, {y} % vertical",
    "galleryPlaceholderButton": "Choisir une image",
    "galleryPlaceholderMessage": "Déposez une image ici ou cliquez sur le bouton pour télécharger...",
    "galleryPlaceholderTitle": "Galerie",
    "goToPage": "Aller à la page {page}",
    "grabbedAnnounce": "Élément saisi. Utilisez les touches fléchées pour déplacer, Entrée pour déposer, Échap pour annuler.",
    "hue": "Teinte",
    "increase": "Augmenter",
    "justNow": "À l'instant",
    "lowerBound": "Borne inférieure",
    "max": "Max",
    "min": "Min",
    "moreActions": "Plus d'actions",
    "next": "Suivant",
    "nextMonth": "Mois suivant",
    "nextYears": "Années suivantes",
    "noItems": "Aucun élément disponible.",
    "nSelected": "{n} sélectionné(s)",
    "ok": "OK",
    "opacity": "Opacité",
    "optional": "Optionnel",
    "pagination": "Pagination",
    "paginationNavigateMessage": "Veuillez indiquer le numéro de page souhaité.",
    "paginationNavigatePage": "Page",
    "paginationNavigateTitle": "Naviguer",
    "pinDigit": "Chiffre {index} sur {total}",
    "preview": "Aperçu",
    "previewClose": "Fermer l'aperçu",
    "previous": "Précédent",
    "previousMonth": "Mois précédent",
    "previousYears": "Années précédentes",
    "readLess": "Lire moins",
    "readMore": "Lire plus",
    "releasedAnnounce": "Élément relâché.",
    "repeaterAdd": "Ajouter",
    "repeaterAddRow": "Ajouter {label}",
    "repeaterMoveCancelled": "Déplacement annulé.",
    "repeaterRemoveMessage": "Cette ligne contient encore des informations. La supprimer effacera ce que vous avez saisi.",
    "repeaterRemoveRow": "Supprimer {label}",
    "repeaterRemoveTitle": "Supprimer {label} ?",
    "repeaterReorder": "Réorganiser {label}",
    "repeaterRow": "{label} {index} sur {total}",
    "repeaterRowLabel": "Ligne",
    "resizeColumn": "Redimensionner la colonne",
    "search": "Recherche...",
    "selectDate": "Sélectionner la date",
    "selectMonth": "Sélectionner le mois",
    "selectYear": "Sélectionner l'année",
    "sheetGrabber": "Redimensionner ou fermer la feuille",
    "showN": "Afficher {n}",
    "skip": "Passer",
    "sort": "Trier",
    "sortAscending": "Ascendant",
    "sortDescending": "Descendant",
    "sortRemove": "Supprimer le tri",
    "submenu": "Sous-menu",
    "swipeActionsLeading": "Actions de début",
    "swipeActionsTrailing": "Actions de fin",
    "timezoneAfrica": "Afrique",
    "timezoneAmerica": "Amérique",
    "timezoneAntarctica": "Antarctique",
    "timezoneArctic": "Arctique",
    "timezoneAsia": "Asie",
    "timezoneAtlantic": "Atlantique",
    "timezoneAustralia": "Australie",
    "timezoneBrazil": "Brésil",
    "timezoneCanada": "Canada",
    "timezoneChile": "Chili",
    "timezoneEtc": "ETC",
    "timezoneEurope": "Europe",
    "timezoneIndian": "Indien",
    "timezoneMexico": "Mexique",
    "timezoneOther": "Autre",
    "timezonePacific": "Pacifique",
    "timezoneUs": "États-Unis",
    "today": "Aujourd'hui",
    "togglePasswordVisibility": "Afficher ou masquer le mot de passe",
    "upperBound": "Borne supérieure"
  }
}
```

:::

### German - Deutsch

::: code-group

```yaml [de.yaml]
flux:
  allDay: "Ganztägig"
  andNMore: "{n} weitere"
  back: "Zurück"
  backToTop: "Nach oben"
  cancel: "Abbrechen"
  close: "Schließen"
  collapseGroup: "Gruppe einklappen"
  collapseRow: "Zeile einklappen"
  colorSaturationBrightness: "Farbsättigung und Helligkeit"
  comingSoon: "Demnächst"
  continue: "Weiter"
  createOption: "\"{value}\" erstellen"
  customColor: "Benutzerdefinierte Farbe"
  customPeriod: "Benutzerdefinierter Zeitraum"
  decrease: "Verringern"
  delete: "Löschen"
  displayingOf: "{from}–{to} von {total}"
  done: "Fertig"
  dropFilesOrClick: "Dateien hierher ziehen oder zum Hochladen klicken"
  expandGroup: "Gruppe ausklappen"
  expandRow: "Zeile ausklappen"
  filter: "Filter"
  filterRemove: "Filter entfernen"
  filterReset: "Filter zurücksetzen"
  focalPoint: "Fokuspunkt"
  focalPointValue: "{x} % horizontal, {y} % vertikal"
  galleryPlaceholderButton: "Bild auswählen"
  galleryPlaceholderMessage: "Bild hierher ziehen oder auf die Schaltfläche klicken, um es hochzuladen..."
  galleryPlaceholderTitle: "Galerie"
  goToPage: "Zu Seite {page}"
  grabbedAnnounce: "Element aufgenommen. Mit den Pfeiltasten verschieben, Enter zum Ablegen, Escape zum Abbrechen."
  hue: "Farbton"
  increase: "Erhöhen"
  justNow: "Gerade eben"
  lowerBound: "Untergrenze"
  max: "Max"
  min: "Min"
  moreActions: "Weitere Aktionen"
  next: "Weiter"
  nextMonth: "Nächster Monat"
  nextYears: "Nächste Jahre"
  noItems: "Es sind keine Einträge (mehr) vorhanden."
  nSelected: "{n} ausgewählt"
  ok: "Ok"
  opacity: "Deckkraft"
  optional: "Optional"
  pagination: "Seitennummerierung"
  paginationNavigateMessage: "Bitte geben Sie die gewünschte Seitenzahl ein."
  paginationNavigatePage: "Seite"
  paginationNavigateTitle: "Navigieren"
  pinDigit: "Ziffer {index} von {total}"
  preview: "Vorschau"
  previewClose: "Vorschau schließen"
  previous: "Zurück"
  previousMonth: "Vorheriger Monat"
  previousYears: "Vorherige Jahre"
  readLess: "Weniger anzeigen"
  readMore: "Mehr anzeigen"
  releasedAnnounce: "Element abgelegt."
  repeaterAdd: "Hinzufügen"
  repeaterAddRow: "{label} hinzufügen"
  repeaterMoveCancelled: "Verschieben abgebrochen."
  repeaterRemoveMessage: "Diese Zeile enthält noch Angaben. Beim Entfernen gehen sie verloren."
  repeaterRemoveRow: "{label} entfernen"
  repeaterRemoveTitle: "{label} entfernen?"
  repeaterReorder: "{label} verschieben"
  repeaterRow: "{label} {index} von {total}"
  repeaterRowLabel: "Zeile"
  resizeColumn: "Spaltenbreite ändern"
  search: "Suchen..."
  selectDate: "Datum auswählen"
  selectMonth: "Monat auswählen"
  selectYear: "Jahr auswählen"
  sheetGrabber: "Ansicht anpassen oder schließen"
  showN: "{n} anzeigen"
  skip: "Überspringen"
  sort: "Sortieren"
  sortAscending: "Aufsteigend"
  sortDescending: "Absteigend"
  sortRemove: "Sortierung entfernen"
  submenu: "Untermenü"
  swipeActionsLeading: "Vordere Aktionen"
  swipeActionsTrailing: "Hintere Aktionen"
  timezoneAfrica: "Afrika"
  timezoneAmerica: "Amerika"
  timezoneAntarctica: "Antarktis"
  timezoneArctic: "Arktis"
  timezoneAsia: "Asien"
  timezoneAtlantic: "Atlantik"
  timezoneAustralia: "Australien"
  timezoneBrazil: "Brasilien"
  timezoneCanada: "Kanada"
  timezoneChile: "Chile"
  timezoneEtc: "ETC"
  timezoneEurope: "Europa"
  timezoneIndian: "Indischer Ozean"
  timezoneMexico: "Mexiko"
  timezoneOther: "Sonstige"
  timezonePacific: "Pazifik"
  timezoneUs: "Vereinigte Staaten"
  today: "Heute"
  togglePasswordVisibility: "Passwort ein- oder ausblenden"
  upperBound: "Obergrenze"
```

```json [de.json]
{
  "flux": {
    "allDay": "Ganztägig",
    "andNMore": "{n} weitere",
    "back": "Zurück",
    "backToTop": "Nach oben",
    "cancel": "Abbrechen",
    "close": "Schließen",
    "collapseGroup": "Gruppe einklappen",
    "collapseRow": "Zeile einklappen",
    "colorSaturationBrightness": "Farbsättigung und Helligkeit",
    "comingSoon": "Demnächst",
    "continue": "Weiter",
    "createOption": "\"{value}\" erstellen",
    "customColor": "Benutzerdefinierte Farbe",
    "customPeriod": "Benutzerdefinierter Zeitraum",
    "decrease": "Verringern",
    "delete": "Löschen",
    "displayingOf": "{from}–{to} von {total}",
    "done": "Fertig",
    "dropFilesOrClick": "Dateien hierher ziehen oder zum Hochladen klicken",
    "expandGroup": "Gruppe ausklappen",
    "expandRow": "Zeile ausklappen",
    "filter": "Filter",
    "filterRemove": "Filter entfernen",
    "filterReset": "Filter zurücksetzen",
    "focalPoint": "Fokuspunkt",
    "focalPointValue": "{x} % horizontal, {y} % vertikal",
    "galleryPlaceholderButton": "Bild auswählen",
    "galleryPlaceholderMessage": "Bild hierher ziehen oder auf die Schaltfläche klicken, um es hochzuladen...",
    "galleryPlaceholderTitle": "Galerie",
    "goToPage": "Zu Seite {page}",
    "grabbedAnnounce": "Element aufgenommen. Mit den Pfeiltasten verschieben, Enter zum Ablegen, Escape zum Abbrechen.",
    "hue": "Farbton",
    "increase": "Erhöhen",
    "justNow": "Gerade eben",
    "lowerBound": "Untergrenze",
    "max": "Max",
    "min": "Min",
    "moreActions": "Weitere Aktionen",
    "next": "Weiter",
    "nextMonth": "Nächster Monat",
    "nextYears": "Nächste Jahre",
    "noItems": "Es sind keine Einträge (mehr) vorhanden.",
    "nSelected": "{n} ausgewählt",
    "ok": "Ok",
    "opacity": "Deckkraft",
    "optional": "Optional",
    "pagination": "Seitennummerierung",
    "paginationNavigateMessage": "Bitte geben Sie die gewünschte Seitenzahl ein.",
    "paginationNavigatePage": "Seite",
    "paginationNavigateTitle": "Navigieren",
    "pinDigit": "Ziffer {index} von {total}",
    "preview": "Vorschau",
    "previewClose": "Vorschau schließen",
    "previous": "Zurück",
    "previousMonth": "Vorheriger Monat",
    "previousYears": "Vorherige Jahre",
    "readLess": "Weniger anzeigen",
    "readMore": "Mehr anzeigen",
    "releasedAnnounce": "Element abgelegt.",
    "repeaterAdd": "Hinzufügen",
    "repeaterAddRow": "{label} hinzufügen",
    "repeaterMoveCancelled": "Verschieben abgebrochen.",
    "repeaterRemoveMessage": "Diese Zeile enthält noch Angaben. Beim Entfernen gehen sie verloren.",
    "repeaterRemoveRow": "{label} entfernen",
    "repeaterRemoveTitle": "{label} entfernen?",
    "repeaterReorder": "{label} verschieben",
    "repeaterRow": "{label} {index} von {total}",
    "repeaterRowLabel": "Zeile",
    "resizeColumn": "Spaltenbreite ändern",
    "search": "Suchen...",
    "selectDate": "Datum auswählen",
    "selectMonth": "Monat auswählen",
    "selectYear": "Jahr auswählen",
    "sheetGrabber": "Ansicht anpassen oder schließen",
    "showN": "{n} anzeigen",
    "skip": "Überspringen",
    "sort": "Sortieren",
    "sortAscending": "Aufsteigend",
    "sortDescending": "Absteigend",
    "sortRemove": "Sortierung entfernen",
    "submenu": "Untermenü",
    "swipeActionsLeading": "Vordere Aktionen",
    "swipeActionsTrailing": "Hintere Aktionen",
    "timezoneAfrica": "Afrika",
    "timezoneAmerica": "Amerika",
    "timezoneAntarctica": "Antarktis",
    "timezoneArctic": "Arktis",
    "timezoneAsia": "Asien",
    "timezoneAtlantic": "Atlantik",
    "timezoneAustralia": "Australien",
    "timezoneBrazil": "Brasilien",
    "timezoneCanada": "Kanada",
    "timezoneChile": "Chile",
    "timezoneEtc": "ETC",
    "timezoneEurope": "Europa",
    "timezoneIndian": "Indischer Ozean",
    "timezoneMexico": "Mexiko",
    "timezoneOther": "Sonstige",
    "timezonePacific": "Pazifik",
    "timezoneUs": "Vereinigte Staaten",
    "today": "Heute",
    "togglePasswordVisibility": "Passwort ein- oder ausblenden",
    "upperBound": "Obergrenze"
  }
}
```

:::

### Swedish - Svenska

::: code-group

```yaml [sv.yaml]
flux:
  allDay: "Heldag"
  andNMore: "{n} till"
  back: "Tillbaka"
  backToTop: "Till toppen"
  cancel: "Avbryt"
  close: "Stäng"
  collapseGroup: "Fäll ihop grupp"
  collapseRow: "Fäll ihop rad"
  colorSaturationBrightness: "Färgmättnad och ljusstyrka"
  comingSoon: "Kommer snart"
  continue: "Fortsätt"
  createOption: "Skapa \"{value}\""
  customColor: "Anpassad färg"
  customPeriod: "Anpassad period"
  decrease: "Minska"
  delete: "Ta bort"
  displayingOf: "{from}–{to} av {total}"
  done: "Klar"
  dropFilesOrClick: "Släpp filer här eller klicka för att ladda upp"
  expandGroup: "Expandera grupp"
  expandRow: "Expandera rad"
  filter: "Filter"
  filterRemove: "Ta bort filter"
  filterReset: "Återställ filter"
  focalPoint: "Fokuspunkt"
  focalPointValue: "{x} % horisontellt, {y} % vertikalt"
  galleryPlaceholderButton: "Välj bild"
  galleryPlaceholderMessage: "Släpp en bild här eller klicka på knappen för att ladda upp..."
  galleryPlaceholderTitle: "Galleri"
  goToPage: "Gå till sida {page}"
  grabbedAnnounce: "Objektet är taget. Använd piltangenterna för att flytta, Enter för att släppa, Escape för att avbryta."
  hue: "Nyans"
  increase: "Öka"
  justNow: "Just nu"
  lowerBound: "Undre gräns"
  max: "Max"
  min: "Min"
  moreActions: "Fler åtgärder"
  next: "Nästa"
  nextMonth: "Nästa månad"
  nextYears: "Nästa år"
  noItems: "Det finns inga poster (kvar)."
  nSelected: "{n} valda"
  ok: "Ok"
  opacity: "Opacitet"
  optional: "Valfritt"
  pagination: "Sidnavigering"
  paginationNavigateMessage: "Ange vilket sidnummer du vill gå till."
  paginationNavigatePage: "Sida"
  paginationNavigateTitle: "Navigera"
  pinDigit: "Siffra {index} av {total}"
  preview: "Förhandsgranska"
  previewClose: "Stäng förhandsgranskningen"
  previous: "Föregående"
  previousMonth: "Föregående månad"
  previousYears: "Föregående år"
  readLess: "Visa mindre"
  readMore: "Läs mer"
  releasedAnnounce: "Objektet är släppt."
  repeaterAdd: "Lägg till"
  repeaterAddRow: "Lägg till {label}"
  repeaterMoveCancelled: "Flytten avbröts."
  repeaterRemoveMessage: "Raden innehåller fortfarande information. Om du tar bort den försvinner det du har fyllt i."
  repeaterRemoveRow: "Ta bort {label}"
  repeaterRemoveTitle: "Ta bort {label}?"
  repeaterReorder: "Flytta {label}"
  repeaterRow: "{label} {index} av {total}"
  repeaterRowLabel: "Rad"
  resizeColumn: "Ändra kolumnbredd"
  search: "Sök..."
  selectDate: "Välj datum"
  selectMonth: "Välj månad"
  selectYear: "Välj år"
  sheetGrabber: "Ändra storlek eller stäng panelen"
  showN: "Visa {n}"
  skip: "Hoppa över"
  sort: "Sortera"
  sortAscending: "Stigande"
  sortDescending: "Fallande"
  sortRemove: "Ta bort sortering"
  submenu: "Undermeny"
  swipeActionsLeading: "Inledande åtgärder"
  swipeActionsTrailing: "Avslutande åtgärder"
  timezoneAfrica: "Afrika"
  timezoneAmerica: "Amerika"
  timezoneAntarctica: "Antarktis"
  timezoneArctic: "Arktis"
  timezoneAsia: "Asien"
  timezoneAtlantic: "Atlanten"
  timezoneAustralia: "Australien"
  timezoneBrazil: "Brasilien"
  timezoneCanada: "Kanada"
  timezoneChile: "Chile"
  timezoneEtc: "ETC"
  timezoneEurope: "Europa"
  timezoneIndian: "Indiska oceanen"
  timezoneMexico: "Mexiko"
  timezoneOther: "Övrigt"
  timezonePacific: "Stilla havet"
  timezoneUs: "USA"
  today: "I dag"
  togglePasswordVisibility: "Visa eller dölj lösenord"
  upperBound: "Övre gräns"
```

```json [sv.json]
{
  "flux": {
    "allDay": "Heldag",
    "andNMore": "{n} till",
    "back": "Tillbaka",
    "backToTop": "Till toppen",
    "cancel": "Avbryt",
    "close": "Stäng",
    "collapseGroup": "Fäll ihop grupp",
    "collapseRow": "Fäll ihop rad",
    "colorSaturationBrightness": "Färgmättnad och ljusstyrka",
    "comingSoon": "Kommer snart",
    "continue": "Fortsätt",
    "createOption": "Skapa \"{value}\"",
    "customColor": "Anpassad färg",
    "customPeriod": "Anpassad period",
    "decrease": "Minska",
    "delete": "Ta bort",
    "displayingOf": "{from}–{to} av {total}",
    "done": "Klar",
    "dropFilesOrClick": "Släpp filer här eller klicka för att ladda upp",
    "expandGroup": "Expandera grupp",
    "expandRow": "Expandera rad",
    "filter": "Filter",
    "filterRemove": "Ta bort filter",
    "filterReset": "Återställ filter",
    "focalPoint": "Fokuspunkt",
    "focalPointValue": "{x} % horisontellt, {y} % vertikalt",
    "galleryPlaceholderButton": "Välj bild",
    "galleryPlaceholderMessage": "Släpp en bild här eller klicka på knappen för att ladda upp...",
    "galleryPlaceholderTitle": "Galleri",
    "goToPage": "Gå till sida {page}",
    "grabbedAnnounce": "Objektet är taget. Använd piltangenterna för att flytta, Enter för att släppa, Escape för att avbryta.",
    "hue": "Nyans",
    "increase": "Öka",
    "justNow": "Just nu",
    "lowerBound": "Undre gräns",
    "max": "Max",
    "min": "Min",
    "moreActions": "Fler åtgärder",
    "next": "Nästa",
    "nextMonth": "Nästa månad",
    "nextYears": "Nästa år",
    "noItems": "Det finns inga poster (kvar).",
    "nSelected": "{n} valda",
    "ok": "Ok",
    "opacity": "Opacitet",
    "optional": "Valfritt",
    "pagination": "Sidnavigering",
    "paginationNavigateMessage": "Ange vilket sidnummer du vill gå till.",
    "paginationNavigatePage": "Sida",
    "paginationNavigateTitle": "Navigera",
    "pinDigit": "Siffra {index} av {total}",
    "preview": "Förhandsgranska",
    "previewClose": "Stäng förhandsgranskningen",
    "previous": "Föregående",
    "previousMonth": "Föregående månad",
    "previousYears": "Föregående år",
    "readLess": "Visa mindre",
    "readMore": "Läs mer",
    "releasedAnnounce": "Objektet är släppt.",
    "repeaterAdd": "Lägg till",
    "repeaterAddRow": "Lägg till {label}",
    "repeaterMoveCancelled": "Flytten avbröts.",
    "repeaterRemoveMessage": "Raden innehåller fortfarande information. Om du tar bort den försvinner det du har fyllt i.",
    "repeaterRemoveRow": "Ta bort {label}",
    "repeaterRemoveTitle": "Ta bort {label}?",
    "repeaterReorder": "Flytta {label}",
    "repeaterRow": "{label} {index} av {total}",
    "repeaterRowLabel": "Rad",
    "resizeColumn": "Ändra kolumnbredd",
    "search": "Sök...",
    "selectDate": "Välj datum",
    "selectMonth": "Välj månad",
    "selectYear": "Välj år",
    "sheetGrabber": "Ändra storlek eller stäng panelen",
    "showN": "Visa {n}",
    "skip": "Hoppa över",
    "sort": "Sortera",
    "sortAscending": "Stigande",
    "sortDescending": "Fallande",
    "sortRemove": "Ta bort sortering",
    "submenu": "Undermeny",
    "swipeActionsLeading": "Inledande åtgärder",
    "swipeActionsTrailing": "Avslutande åtgärder",
    "timezoneAfrica": "Afrika",
    "timezoneAmerica": "Amerika",
    "timezoneAntarctica": "Antarktis",
    "timezoneArctic": "Arktis",
    "timezoneAsia": "Asien",
    "timezoneAtlantic": "Atlanten",
    "timezoneAustralia": "Australien",
    "timezoneBrazil": "Brasilien",
    "timezoneCanada": "Kanada",
    "timezoneChile": "Chile",
    "timezoneEtc": "ETC",
    "timezoneEurope": "Europa",
    "timezoneIndian": "Indiska oceanen",
    "timezoneMexico": "Mexiko",
    "timezoneOther": "Övrigt",
    "timezonePacific": "Stilla havet",
    "timezoneUs": "USA",
    "today": "I dag",
    "togglePasswordVisibility": "Visa eller dölj lösenord",
    "upperBound": "Övre gräns"
  }
}
```

:::

<!-- translations:end -->
