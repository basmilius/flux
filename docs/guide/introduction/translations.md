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
  back: "Back"
  backToTop: "Back to top"
  bottomSheetGrabber: "Resize or close the sheet"
  cancel: "Cancel"
  close: "Close"
  collapseGroup: "Collapse group"
  collapseRow: "Collapse row"
  comingSoon: "Coming soon"
  continue: "Continue"
  createOption: "Create \"{value}\""
  customPeriod: "Custom period"
  decrease: "Decrease"
  delete: "Delete"
  displayingOf: "{from}–{to} of {total}"
  done: "Done"
  expandGroup: "Expand group"
  expandRow: "Expand row"
  filter: "Filter"
  filterRemove: "Remove filter"
  filterReset: "Reset filters"
  focalPoint: "Focal point"
  focalPointValue: "{x}% horizontal, {y}% vertical"
  increase: "Increase"
  justNow: "Just now"
  max: "Max"
  min: "Min"
  moreActions: "More actions"
  next: "Next"
  noItems: "There are no items (left)."
  nSelected: "{n} selected"
  ok: "Ok"
  optional: "Optional"
  pagination: "Pagination"
  paginationNavigateMessage: "Please provide the desired page number you wish to navigate to."
  paginationNavigatePage: "Page"
  paginationNavigateTitle: "Navigate"
  preview: "Preview"
  previewClose: "Close preview"
  previous: "Previous"
  readLess: "Read less"
  readMore: "Read more"
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
  showN: "Show {n}"
  skip: "Skip"
  sort: "Sort"
  sortAscending: "Ascending"
  sortDescending: "Descending"
  sortRemove: "Remove sorting"
  submenu: "Submenu"
  swipeActionsLeading: "Leading actions"
  swipeActionsTrailing: "Trailing actions"
  today: "Today"
  togglePasswordVisibility: "Toggle password visibility"
  selectMonth: "Select month"
  selectYear: "Select year"
  selectDate: "Select date"
  previousMonth: "Previous month"
  nextMonth: "Next month"
  previousYears: "Previous years"
  nextYears: "Next years"
  allDay: "All day"
  andNMore: "{n} more"
  grabbedAnnounce: "Item grabbed. Use arrow keys to move, Enter to drop, Escape to cancel."
  releasedAnnounce: "Item released."
  goToPage: "Go to page {page}"
  pinDigit: "Digit {index} of {total}"
  dropFilesOrClick: "Drop files here or click to upload"
  colorSaturationBrightness: "Color saturation and brightness"
  customColor: "Custom color"
  hue: "Hue"
  opacity: "Opacity"
  lowerBound: "Lower bound"
  upperBound: "Upper bound"
  galleryPlaceholderButton: "Pick image"
  galleryPlaceholderMessage: "Drop an image here or click the button to upload..."
  galleryPlaceholderTitle: "Gallery"
  timezoneEurope: "Europe"
  timezoneAmerica: "America"
  timezoneUs: "United States"
  timezoneAustralia: "Australia"
  timezoneCanada: "Canada"
  timezoneMexico: "Mexico"
  timezoneAfrica: "Africa"
  timezoneAntarctica: "Antarctica"
  timezoneArctic: "Arctic"
  timezoneAsia: "Asia"
  timezoneAtlantic: "Atlantic"
  timezoneBrazil: "Brazil"
  timezoneChile: "Chile"
  timezoneEtc: "ETC"
  timezoneOther: "Other"
  timezoneIndian: "Indian"
  timezonePacific: "Pacific"
```

```json [en.json]
{
  "flux": {
    "back": "Back",
    "backToTop": "Back to top",
    "bottomSheetGrabber": "Resize or close the sheet",
    "cancel": "Cancel",
    "close": "Close",
    "collapseGroup": "Collapse group",
    "collapseRow": "Collapse row",
    "comingSoon": "Coming soon",
    "continue": "Continue",
    "createOption": "Create \"{value}\"",
    "customPeriod": "Custom period",
    "decrease": "Decrease",
    "delete": "Delete",
    "displayingOf": "{from}–{to} of {total}",
    "done": "Done",
    "expandGroup": "Expand group",
    "expandRow": "Expand row",
    "filter": "Filter",
    "filterRemove": "Remove filter",
    "filterReset": "Reset filters",
    "focalPoint": "Focal point",
    "focalPointValue": "{x}% horizontal, {y}% vertical",
    "increase": "Increase",
    "justNow": "Just now",
    "max": "Max",
    "min": "Min",
    "moreActions": "More actions",
    "next": "Next",
    "noItems": "There are no items (left).",
    "nSelected": "{n} selected",
    "ok": "Ok",
    "optional": "Optional",
    "pagination": "Pagination",
    "paginationNavigateMessage": "Please provide the desired page number you wish to navigate to.",
    "paginationNavigatePage": "Page",
    "paginationNavigateTitle": "Navigate",
    "preview": "Preview",
    "previewClose": "Close preview",
    "previous": "Previous",
    "readLess": "Read less",
    "readMore": "Read more",
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
    "showN": "Show {n}",
    "skip": "Skip",
    "sort": "Sort",
    "sortAscending": "Ascending",
    "sortDescending": "Descending",
    "sortRemove": "Remove sorting",
    "submenu": "Submenu",
    "swipeActionsLeading": "Leading actions",
    "swipeActionsTrailing": "Trailing actions",
    "today": "Today",
    "togglePasswordVisibility": "Toggle password visibility",
    "selectMonth": "Select month",
    "selectYear": "Select year",
    "selectDate": "Select date",
    "previousMonth": "Previous month",
    "nextMonth": "Next month",
    "previousYears": "Previous years",
    "nextYears": "Next years",
    "allDay": "All day",
    "andNMore": "{n} more",
    "grabbedAnnounce": "Item grabbed. Use arrow keys to move, Enter to drop, Escape to cancel.",
    "releasedAnnounce": "Item released.",
    "goToPage": "Go to page {page}",
    "pinDigit": "Digit {index} of {total}",
    "dropFilesOrClick": "Drop files here or click to upload",
    "colorSaturationBrightness": "Color saturation and brightness",
    "customColor": "Custom color",
    "hue": "Hue",
    "opacity": "Opacity",
    "lowerBound": "Lower bound",
    "upperBound": "Upper bound",
    "galleryPlaceholderButton": "Pick image",
    "galleryPlaceholderMessage": "Drop an image here or click the button to upload...",
    "galleryPlaceholderTitle": "Gallery",
    "timezoneEurope": "Europe",
    "timezoneAmerica": "America",
    "timezoneUs": "United States",
    "timezoneAustralia": "Australia",
    "timezoneCanada": "Canada",
    "timezoneMexico": "Mexico",
    "timezoneAfrica": "Africa",
    "timezoneAntarctica": "Antarctica",
    "timezoneArctic": "Arctic",
    "timezoneAsia": "Asia",
    "timezoneAtlantic": "Atlantic",
    "timezoneBrazil": "Brazil",
    "timezoneChile": "Chile",
    "timezoneEtc": "ETC",
    "timezoneOther": "Other",
    "timezoneIndian": "Indian",
    "timezonePacific": "Pacific"
  }
}
```

:::

### Dutch - Nederlands

::: code-group

```yaml [nl.yaml]
flux:
  back: "Terug"
  backToTop: "Terug naar boven"
  bottomSheetGrabber: "Formaat aanpassen of het paneel sluiten"
  cancel: "Annuleren"
  close: "Sluiten"
  collapseGroup: "Groep inklappen"
  collapseRow: "Rij inklappen"
  comingSoon: "Binnenkort"
  continue: "Verder"
  createOption: "Maak \"{value}\" aan"
  customPeriod: "Aangepaste periode"
  decrease: "Verlagen"
  delete: "Verwijderen"
  displayingOf: "{from}–{to} van {total}"
  done: "Klaar"
  expandGroup: "Groep uitklappen"
  expandRow: "Rij uitklappen"
  filter: "Filter"
  filterRemove: "Verwijder filter"
  filterReset: "Verwijder alle filters"
  focalPoint: "Focuspunt"
  focalPointValue: "{x}% horizontaal, {y}% verticaal"
  increase: "Verhogen"
  justNow: "Zojuist"
  max: "Maximaal"
  min: "Minimaal"
  moreActions: "Meer acties"
  next: "Volgende"
  noItems: "Geen resultaten gevonden"
  nSelected: "{n} geselecteerd"
  ok: "Oké"
  optional: "Optioneel"
  pagination: "Paginatie"
  paginationNavigateMessage: "Naar welke pagina wil je toe navigeren?"
  paginationNavigatePage: "Pagina"
  paginationNavigateTitle: "Navigeer"
  preview: "Voorbeeld"
  previewClose: "Voorbeeld sluiten"
  previous: "Vorige"
  readLess: "Minder lezen"
  readMore: "Meer lezen"
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
  showN: "Toon {n}"
  skip: "Overslaan"
  sort: "Sorteer"
  sortAscending: "Oplopend"
  sortDescending: "Aflopend"
  sortRemove: "Verwijder"
  submenu: "Submenu"
  swipeActionsLeading: "Acties aan het begin"
  swipeActionsTrailing: "Acties aan het eind"
  today: "Vandaag"
  togglePasswordVisibility: "Wachtwoord tonen of verbergen"
  selectMonth: "Selecteer maand"
  selectYear: "Selecteer jaar"
  selectDate: "Selecteer datum"
  previousMonth: "Vorige maand"
  nextMonth: "Volgende maand"
  previousYears: "Vorige jaren"
  nextYears: "Volgende jaren"
  allDay: "Hele dag"
  andNMore: "nog {n}"
  grabbedAnnounce: "Item vastgepakt. Gebruik de pijltjestoetsen om te verplaatsen, Enter om los te laten, Escape om te annuleren."
  releasedAnnounce: "Item losgelaten."
  goToPage: "Ga naar pagina {page}"
  pinDigit: "Cijfer {index} van {total}"
  dropFilesOrClick: "Sleep bestanden hierheen of klik om te uploaden"
  colorSaturationBrightness: "Kleurverzadiging en helderheid"
  customColor: "Aangepaste kleur"
  hue: "Tint"
  opacity: "Dekking"
  lowerBound: "Ondergrens"
  upperBound: "Bovengrens"
  galleryPlaceholderButton: "Selecteer afbeeldingen"
  galleryPlaceholderMessage: "Laat hier afbeeldingen vallen om ze te uploaden of klik op de knop om te selecteren."
  galleryPlaceholderTitle: "Afbeeldingen"
  timezoneEurope: "Europa"
  timezoneAmerica: "Amerika"
  timezoneUs: "Verenigde Staten"
  timezoneAustralia: "Australië"
  timezoneCanada: "Canada"
  timezoneMexico: "Mexico"
  timezoneAfrica: "Afrika"
  timezoneAntarctica: "Antarctica"
  timezoneArctic: "Arctisch"
  timezoneAsia: "Azië"
  timezoneAtlantic: "Atlantisch"
  timezoneBrazil: "Brazilië"
  timezoneChile: "Chili"
  timezoneEtc: "ETC"
  timezoneOther: "Overig"
  timezoneIndian: "Indisch"
  timezonePacific: "Pacifisch"
```

```json [nl.json]
{
  "flux": {
    "back": "Terug",
    "backToTop": "Terug naar boven",
    "bottomSheetGrabber": "Formaat aanpassen of het paneel sluiten",
    "cancel": "Annuleren",
    "close": "Sluiten",
    "collapseGroup": "Groep inklappen",
    "collapseRow": "Rij inklappen",
    "comingSoon": "Binnenkort",
    "continue": "Verder",
    "createOption": "Maak \"{value}\" aan",
    "customPeriod": "Aangepaste periode",
    "decrease": "Verlagen",
    "delete": "Verwijderen",
    "displayingOf": "{from}–{to} van {total}",
    "done": "Klaar",
    "expandGroup": "Groep uitklappen",
    "expandRow": "Rij uitklappen",
    "filter": "Filter",
    "filterRemove": "Verwijder filter",
    "filterReset": "Verwijder alle filters",
    "focalPoint": "Focuspunt",
    "focalPointValue": "{x}% horizontaal, {y}% verticaal",
    "increase": "Verhogen",
    "justNow": "Zojuist",
    "max": "Maximaal",
    "min": "Minimaal",
    "moreActions": "Meer acties",
    "next": "Volgende",
    "noItems": "Geen resultaten gevonden",
    "nSelected": "{n} geselecteerd",
    "ok": "Oké",
    "optional": "Optioneel",
    "pagination": "Paginatie",
    "paginationNavigateMessage": "Naar welke pagina wil je toe navigeren?",
    "paginationNavigatePage": "Pagina",
    "paginationNavigateTitle": "Navigeer",
    "preview": "Voorbeeld",
    "previewClose": "Voorbeeld sluiten",
    "previous": "Vorige",
    "readLess": "Minder lezen",
    "readMore": "Meer lezen",
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
    "showN": "Toon {n}",
    "skip": "Overslaan",
    "sort": "Sorteer",
    "sortAscending": "Oplopend",
    "sortDescending": "Aflopend",
    "sortRemove": "Verwijder",
    "submenu": "Submenu",
    "swipeActionsLeading": "Acties aan het begin",
    "swipeActionsTrailing": "Acties aan het eind",
    "today": "Vandaag",
    "togglePasswordVisibility": "Wachtwoord tonen of verbergen",
    "selectMonth": "Selecteer maand",
    "selectYear": "Selecteer jaar",
    "selectDate": "Selecteer datum",
    "previousMonth": "Vorige maand",
    "nextMonth": "Volgende maand",
    "previousYears": "Vorige jaren",
    "nextYears": "Volgende jaren",
    "allDay": "Hele dag",
    "andNMore": "nog {n}",
    "grabbedAnnounce": "Item vastgepakt. Gebruik de pijltjestoetsen om te verplaatsen, Enter om los te laten, Escape om te annuleren.",
    "releasedAnnounce": "Item losgelaten.",
    "goToPage": "Ga naar pagina {page}",
    "pinDigit": "Cijfer {index} van {total}",
    "dropFilesOrClick": "Sleep bestanden hierheen of klik om te uploaden",
    "colorSaturationBrightness": "Kleurverzadiging en helderheid",
    "customColor": "Aangepaste kleur",
    "hue": "Tint",
    "opacity": "Dekking",
    "lowerBound": "Ondergrens",
    "upperBound": "Bovengrens",
    "galleryPlaceholderButton": "Selecteer afbeeldingen",
    "galleryPlaceholderMessage": "Laat hier afbeeldingen vallen om ze te uploaden of klik op de knop om te selecteren.",
    "galleryPlaceholderTitle": "Afbeeldingen",
    "timezoneEurope": "Europa",
    "timezoneAmerica": "Amerika",
    "timezoneUs": "Verenigde Staten",
    "timezoneAustralia": "Australië",
    "timezoneCanada": "Canada",
    "timezoneMexico": "Mexico",
    "timezoneAfrica": "Afrika",
    "timezoneAntarctica": "Antarctica",
    "timezoneArctic": "Arctisch",
    "timezoneAsia": "Azië",
    "timezoneAtlantic": "Atlantisch",
    "timezoneBrazil": "Brazilië",
    "timezoneChile": "Chili",
    "timezoneEtc": "ETC",
    "timezoneOther": "Overig",
    "timezoneIndian": "Indisch",
    "timezonePacific": "Pacifisch"
  }
}
```

:::

### French - Français

::: code-group

```yaml [fr.yaml]
flux:
  back: "Retour"
  backToTop: "Retour en haut"
  bottomSheetGrabber: "Redimensionner ou fermer la feuille"
  cancel: "Annuler"
  close: "Fermer"
  collapseGroup: "Réduire le groupe"
  collapseRow: "Réduire la ligne"
  comingSoon: "Bientôt disponible"
  continue: "Continuer"
  createOption: "Créer \"{value}\""
  customPeriod: "Période personnalisée"
  decrease: "Diminuer"
  delete: "Supprimer"
  displayingOf: "{from}–{to} sur {total}"
  done: "Terminé"
  expandGroup: "Développer le groupe"
  expandRow: "Développer la ligne"
  filter: "Filtrer"
  filterRemove: "Supprimer le filtre"
  filterReset: "Réinitialiser les filtres"
  focalPoint: "Point focal"
  focalPointValue: "{x} % horizontal, {y} % vertical"
  increase: "Augmenter"
  justNow: "À l'instant"
  max: "Max"
  min: "Min"
  moreActions: "Plus d'actions"
  next: "Suivant"
  noItems: "Aucun élément disponible."
  nSelected: "{n} sélectionné(s)"
  ok: "OK"
  optional: "Optionnel"
  pagination: "Pagination"
  paginationNavigateMessage: "Veuillez indiquer le numéro de page souhaité."
  paginationNavigatePage: "Page"
  paginationNavigateTitle: "Naviguer"
  preview: "Aperçu"
  previewClose: "Fermer l'aperçu"
  previous: "Précédent"
  readLess: "Lire moins"
  readMore: "Lire plus"
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
  showN: "Afficher {n}"
  skip: "Passer"
  sort: "Trier"
  sortAscending: "Ascendant"
  sortDescending: "Descendant"
  sortRemove: "Supprimer le tri"
  submenu: "Sous-menu"
  swipeActionsLeading: "Actions de début"
  swipeActionsTrailing: "Actions de fin"
  today: "Aujourd'hui"
  togglePasswordVisibility: "Afficher ou masquer le mot de passe"
  selectMonth: "Sélectionner le mois"
  selectYear: "Sélectionner l'année"
  selectDate: "Sélectionner la date"
  previousMonth: "Mois précédent"
  nextMonth: "Mois suivant"
  previousYears: "Années précédentes"
  nextYears: "Années suivantes"
  allDay: "Toute la journée"
  andNMore: "{n} de plus"
  grabbedAnnounce: "Élément saisi. Utilisez les touches fléchées pour déplacer, Entrée pour déposer, Échap pour annuler."
  releasedAnnounce: "Élément relâché."
  goToPage: "Aller à la page {page}"
  pinDigit: "Chiffre {index} sur {total}"
  dropFilesOrClick: "Déposez des fichiers ici ou cliquez pour téléverser"
  colorSaturationBrightness: "Saturation et luminosité de la couleur"
  customColor: "Couleur personnalisée"
  hue: "Teinte"
  opacity: "Opacité"
  lowerBound: "Borne inférieure"
  upperBound: "Borne supérieure"
  galleryPlaceholderButton: "Choisir une image"
  galleryPlaceholderMessage: "Déposez une image ici ou cliquez sur le bouton pour télécharger..."
  galleryPlaceholderTitle: "Galerie"
  timezoneEurope: "Europe"
  timezoneAmerica: "Amérique"
  timezoneUs: "États-Unis"
  timezoneAustralia: "Australie"
  timezoneCanada: "Canada"
  timezoneMexico: "Mexique"
  timezoneAfrica: "Afrique"
  timezoneAntarctica: "Antarctique"
  timezoneArctic: "Arctique"
  timezoneAsia: "Asie"
  timezoneAtlantic: "Atlantique"
  timezoneBrazil: "Brésil"
  timezoneChile: "Chili"
  timezoneEtc: "ETC"
  timezoneOther: "Autre"
  timezoneIndian: "Indien"
  timezonePacific: "Pacifique"
```

```json [fr.json]
{
  "flux": {
    "back": "Retour",
    "backToTop": "Retour en haut",
    "bottomSheetGrabber": "Redimensionner ou fermer la feuille",
    "cancel": "Annuler",
    "close": "Fermer",
    "collapseGroup": "Réduire le groupe",
    "collapseRow": "Réduire la ligne",
    "comingSoon": "Bientôt disponible",
    "continue": "Continuer",
    "createOption": "Créer \"{value}\"",
    "customPeriod": "Période personnalisée",
    "decrease": "Diminuer",
    "delete": "Supprimer",
    "displayingOf": "{from}–{to} sur {total}",
    "done": "Terminé",
    "expandGroup": "Développer le groupe",
    "expandRow": "Développer la ligne",
    "filter": "Filtrer",
    "filterRemove": "Supprimer le filtre",
    "filterReset": "Réinitialiser les filtres",
    "focalPoint": "Point focal",
    "focalPointValue": "{x} % horizontal, {y} % vertical",
    "increase": "Augmenter",
    "justNow": "À l'instant",
    "max": "Max",
    "min": "Min",
    "moreActions": "Plus d'actions",
    "next": "Suivant",
    "noItems": "Aucun élément disponible.",
    "nSelected": "{n} sélectionné(s)",
    "ok": "OK",
    "optional": "Optionnel",
    "pagination": "Pagination",
    "paginationNavigateMessage": "Veuillez indiquer le numéro de page souhaité.",
    "paginationNavigatePage": "Page",
    "paginationNavigateTitle": "Naviguer",
    "preview": "Aperçu",
    "previewClose": "Fermer l'aperçu",
    "previous": "Précédent",
    "readLess": "Lire moins",
    "readMore": "Lire plus",
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
    "showN": "Afficher {n}",
    "skip": "Passer",
    "sort": "Trier",
    "sortAscending": "Ascendant",
    "sortDescending": "Descendant",
    "sortRemove": "Supprimer le tri",
    "submenu": "Sous-menu",
    "swipeActionsLeading": "Actions de début",
    "swipeActionsTrailing": "Actions de fin",
    "today": "Aujourd'hui",
    "togglePasswordVisibility": "Afficher ou masquer le mot de passe",
    "selectMonth": "Sélectionner le mois",
    "selectYear": "Sélectionner l'année",
    "selectDate": "Sélectionner la date",
    "previousMonth": "Mois précédent",
    "nextMonth": "Mois suivant",
    "previousYears": "Années précédentes",
    "nextYears": "Années suivantes",
    "allDay": "Toute la journée",
    "andNMore": "{n} de plus",
    "grabbedAnnounce": "Élément saisi. Utilisez les touches fléchées pour déplacer, Entrée pour déposer, Échap pour annuler.",
    "releasedAnnounce": "Élément relâché.",
    "goToPage": "Aller à la page {page}",
    "pinDigit": "Chiffre {index} sur {total}",
    "dropFilesOrClick": "Déposez des fichiers ici ou cliquez pour téléverser",
    "colorSaturationBrightness": "Saturation et luminosité de la couleur",
    "customColor": "Couleur personnalisée",
    "hue": "Teinte",
    "opacity": "Opacité",
    "lowerBound": "Borne inférieure",
    "upperBound": "Borne supérieure",
    "galleryPlaceholderButton": "Choisir une image",
    "galleryPlaceholderMessage": "Déposez une image ici ou cliquez sur le bouton pour télécharger...",
    "galleryPlaceholderTitle": "Galerie",
    "timezoneEurope": "Europe",
    "timezoneAmerica": "Amérique",
    "timezoneUs": "États-Unis",
    "timezoneAustralia": "Australie",
    "timezoneCanada": "Canada",
    "timezoneMexico": "Mexique",
    "timezoneAfrica": "Afrique",
    "timezoneAntarctica": "Antarctique",
    "timezoneArctic": "Arctique",
    "timezoneAsia": "Asie",
    "timezoneAtlantic": "Atlantique",
    "timezoneBrazil": "Brésil",
    "timezoneChile": "Chili",
    "timezoneEtc": "ETC",
    "timezoneOther": "Autre",
    "timezoneIndian": "Indien",
    "timezonePacific": "Pacifique"
  }
}
```

:::

### German - Deutsch

::: code-group

```yaml [de.yaml]
flux:
  back: "Zurück"
  backToTop: "Nach oben"
  bottomSheetGrabber: "Ansicht anpassen oder schließen"
  cancel: "Abbrechen"
  close: "Schließen"
  collapseGroup: "Gruppe einklappen"
  collapseRow: "Zeile einklappen"
  comingSoon: "Demnächst"
  continue: "Weiter"
  createOption: "\"{value}\" erstellen"
  customPeriod: "Benutzerdefinierter Zeitraum"
  decrease: "Verringern"
  delete: "Löschen"
  displayingOf: "{from}–{to} von {total}"
  done: "Fertig"
  expandGroup: "Gruppe ausklappen"
  expandRow: "Zeile ausklappen"
  filter: "Filter"
  filterRemove: "Filter entfernen"
  filterReset: "Filter zurücksetzen"
  focalPoint: "Fokuspunkt"
  focalPointValue: "{x} % horizontal, {y} % vertikal"
  increase: "Erhöhen"
  justNow: "Gerade eben"
  max: "Max"
  min: "Min"
  moreActions: "Weitere Aktionen"
  next: "Weiter"
  noItems: "Es sind keine Einträge (mehr) vorhanden."
  nSelected: "{n} ausgewählt"
  ok: "Ok"
  optional: "Optional"
  pagination: "Seitennummerierung"
  paginationNavigateMessage: "Bitte geben Sie die gewünschte Seitenzahl ein."
  paginationNavigatePage: "Seite"
  paginationNavigateTitle: "Navigieren"
  preview: "Vorschau"
  previewClose: "Vorschau schließen"
  previous: "Zurück"
  readLess: "Weniger anzeigen"
  readMore: "Mehr anzeigen"
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
  showN: "{n} anzeigen"
  skip: "Überspringen"
  sort: "Sortieren"
  sortAscending: "Aufsteigend"
  sortDescending: "Absteigend"
  sortRemove: "Sortierung entfernen"
  submenu: "Untermenü"
  swipeActionsLeading: "Vordere Aktionen"
  swipeActionsTrailing: "Hintere Aktionen"
  today: "Heute"
  togglePasswordVisibility: "Passwort ein- oder ausblenden"
  selectMonth: "Monat auswählen"
  selectYear: "Jahr auswählen"
  selectDate: "Datum auswählen"
  previousMonth: "Vorheriger Monat"
  nextMonth: "Nächster Monat"
  previousYears: "Vorherige Jahre"
  nextYears: "Nächste Jahre"
  allDay: "Ganztägig"
  andNMore: "{n} weitere"
  grabbedAnnounce: "Element aufgenommen. Mit den Pfeiltasten verschieben, Enter zum Ablegen, Escape zum Abbrechen."
  releasedAnnounce: "Element abgelegt."
  goToPage: "Zu Seite {page}"
  pinDigit: "Ziffer {index} von {total}"
  dropFilesOrClick: "Dateien hierher ziehen oder zum Hochladen klicken"
  colorSaturationBrightness: "Farbsättigung und Helligkeit"
  customColor: "Benutzerdefinierte Farbe"
  hue: "Farbton"
  opacity: "Deckkraft"
  lowerBound: "Untergrenze"
  upperBound: "Obergrenze"
  galleryPlaceholderButton: "Bild auswählen"
  galleryPlaceholderMessage: "Bild hierher ziehen oder auf die Schaltfläche klicken, um es hochzuladen..."
  galleryPlaceholderTitle: "Galerie"
  timezoneEurope: "Europa"
  timezoneAmerica: "Amerika"
  timezoneUs: "Vereinigte Staaten"
  timezoneAustralia: "Australien"
  timezoneCanada: "Kanada"
  timezoneMexico: "Mexiko"
  timezoneAfrica: "Afrika"
  timezoneAntarctica: "Antarktis"
  timezoneArctic: "Arktis"
  timezoneAsia: "Asien"
  timezoneAtlantic: "Atlantik"
  timezoneBrazil: "Brasilien"
  timezoneChile: "Chile"
  timezoneEtc: "ETC"
  timezoneOther: "Sonstige"
  timezoneIndian: "Indischer Ozean"
  timezonePacific: "Pazifik"
```

```json [de.json]
{
  "flux": {
    "back": "Zurück",
    "backToTop": "Nach oben",
    "bottomSheetGrabber": "Ansicht anpassen oder schließen",
    "cancel": "Abbrechen",
    "close": "Schließen",
    "collapseGroup": "Gruppe einklappen",
    "collapseRow": "Zeile einklappen",
    "comingSoon": "Demnächst",
    "continue": "Weiter",
    "createOption": "\"{value}\" erstellen",
    "customPeriod": "Benutzerdefinierter Zeitraum",
    "decrease": "Verringern",
    "delete": "Löschen",
    "displayingOf": "{from}–{to} von {total}",
    "done": "Fertig",
    "expandGroup": "Gruppe ausklappen",
    "expandRow": "Zeile ausklappen",
    "filter": "Filter",
    "filterRemove": "Filter entfernen",
    "filterReset": "Filter zurücksetzen",
    "focalPoint": "Fokuspunkt",
    "focalPointValue": "{x} % horizontal, {y} % vertikal",
    "increase": "Erhöhen",
    "justNow": "Gerade eben",
    "max": "Max",
    "min": "Min",
    "moreActions": "Weitere Aktionen",
    "next": "Weiter",
    "noItems": "Es sind keine Einträge (mehr) vorhanden.",
    "nSelected": "{n} ausgewählt",
    "ok": "Ok",
    "optional": "Optional",
    "pagination": "Seitennummerierung",
    "paginationNavigateMessage": "Bitte geben Sie die gewünschte Seitenzahl ein.",
    "paginationNavigatePage": "Seite",
    "paginationNavigateTitle": "Navigieren",
    "preview": "Vorschau",
    "previewClose": "Vorschau schließen",
    "previous": "Zurück",
    "readLess": "Weniger anzeigen",
    "readMore": "Mehr anzeigen",
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
    "showN": "{n} anzeigen",
    "skip": "Überspringen",
    "sort": "Sortieren",
    "sortAscending": "Aufsteigend",
    "sortDescending": "Absteigend",
    "sortRemove": "Sortierung entfernen",
    "submenu": "Untermenü",
    "swipeActionsLeading": "Vordere Aktionen",
    "swipeActionsTrailing": "Hintere Aktionen",
    "today": "Heute",
    "togglePasswordVisibility": "Passwort ein- oder ausblenden",
    "selectMonth": "Monat auswählen",
    "selectYear": "Jahr auswählen",
    "selectDate": "Datum auswählen",
    "previousMonth": "Vorheriger Monat",
    "nextMonth": "Nächster Monat",
    "previousYears": "Vorherige Jahre",
    "nextYears": "Nächste Jahre",
    "allDay": "Ganztägig",
    "andNMore": "{n} weitere",
    "grabbedAnnounce": "Element aufgenommen. Mit den Pfeiltasten verschieben, Enter zum Ablegen, Escape zum Abbrechen.",
    "releasedAnnounce": "Element abgelegt.",
    "goToPage": "Zu Seite {page}",
    "pinDigit": "Ziffer {index} von {total}",
    "dropFilesOrClick": "Dateien hierher ziehen oder zum Hochladen klicken",
    "colorSaturationBrightness": "Farbsättigung und Helligkeit",
    "customColor": "Benutzerdefinierte Farbe",
    "hue": "Farbton",
    "opacity": "Deckkraft",
    "lowerBound": "Untergrenze",
    "upperBound": "Obergrenze",
    "galleryPlaceholderButton": "Bild auswählen",
    "galleryPlaceholderMessage": "Bild hierher ziehen oder auf die Schaltfläche klicken, um es hochzuladen...",
    "galleryPlaceholderTitle": "Galerie",
    "timezoneEurope": "Europa",
    "timezoneAmerica": "Amerika",
    "timezoneUs": "Vereinigte Staaten",
    "timezoneAustralia": "Australien",
    "timezoneCanada": "Kanada",
    "timezoneMexico": "Mexiko",
    "timezoneAfrica": "Afrika",
    "timezoneAntarctica": "Antarktis",
    "timezoneArctic": "Arktis",
    "timezoneAsia": "Asien",
    "timezoneAtlantic": "Atlantik",
    "timezoneBrazil": "Brasilien",
    "timezoneChile": "Chile",
    "timezoneEtc": "ETC",
    "timezoneOther": "Sonstige",
    "timezoneIndian": "Indischer Ozean",
    "timezonePacific": "Pazifik"
  }
}
```

:::

### Swedish - Svenska

::: code-group

```yaml [sv.yaml]
flux:
  back: "Tillbaka"
  backToTop: "Till toppen"
  bottomSheetGrabber: "Ändra storlek eller stäng panelen"
  cancel: "Avbryt"
  close: "Stäng"
  collapseGroup: "Fäll ihop grupp"
  collapseRow: "Fäll ihop rad"
  comingSoon: "Kommer snart"
  continue: "Fortsätt"
  createOption: "Skapa \"{value}\""
  customPeriod: "Anpassad period"
  decrease: "Minska"
  delete: "Ta bort"
  displayingOf: "{from}–{to} av {total}"
  done: "Klar"
  expandGroup: "Expandera grupp"
  expandRow: "Expandera rad"
  filter: "Filter"
  filterRemove: "Ta bort filter"
  filterReset: "Återställ filter"
  focalPoint: "Fokuspunkt"
  focalPointValue: "{x} % horisontellt, {y} % vertikalt"
  increase: "Öka"
  justNow: "Just nu"
  max: "Max"
  min: "Min"
  moreActions: "Fler åtgärder"
  next: "Nästa"
  noItems: "Det finns inga poster (kvar)."
  nSelected: "{n} valda"
  ok: "Ok"
  optional: "Valfritt"
  pagination: "Sidnavigering"
  paginationNavigateMessage: "Ange vilket sidnummer du vill gå till."
  paginationNavigatePage: "Sida"
  paginationNavigateTitle: "Navigera"
  preview: "Förhandsgranska"
  previewClose: "Stäng förhandsgranskningen"
  previous: "Föregående"
  readLess: "Visa mindre"
  readMore: "Läs mer"
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
  showN: "Visa {n}"
  skip: "Hoppa över"
  sort: "Sortera"
  sortAscending: "Stigande"
  sortDescending: "Fallande"
  sortRemove: "Ta bort sortering"
  submenu: "Undermeny"
  swipeActionsLeading: "Inledande åtgärder"
  swipeActionsTrailing: "Avslutande åtgärder"
  today: "I dag"
  togglePasswordVisibility: "Visa eller dölj lösenord"
  selectMonth: "Välj månad"
  selectYear: "Välj år"
  selectDate: "Välj datum"
  previousMonth: "Föregående månad"
  nextMonth: "Nästa månad"
  previousYears: "Föregående år"
  nextYears: "Nästa år"
  allDay: "Heldag"
  andNMore: "{n} till"
  grabbedAnnounce: "Objektet är taget. Använd piltangenterna för att flytta, Enter för att släppa, Escape för att avbryta."
  releasedAnnounce: "Objektet är släppt."
  goToPage: "Gå till sida {page}"
  pinDigit: "Siffra {index} av {total}"
  dropFilesOrClick: "Släpp filer här eller klicka för att ladda upp"
  colorSaturationBrightness: "Färgmättnad och ljusstyrka"
  customColor: "Anpassad färg"
  hue: "Nyans"
  opacity: "Opacitet"
  lowerBound: "Undre gräns"
  upperBound: "Övre gräns"
  galleryPlaceholderButton: "Välj bild"
  galleryPlaceholderMessage: "Släpp en bild här eller klicka på knappen för att ladda upp..."
  galleryPlaceholderTitle: "Galleri"
  timezoneEurope: "Europa"
  timezoneAmerica: "Amerika"
  timezoneUs: "USA"
  timezoneAustralia: "Australien"
  timezoneCanada: "Kanada"
  timezoneMexico: "Mexiko"
  timezoneAfrica: "Afrika"
  timezoneAntarctica: "Antarktis"
  timezoneArctic: "Arktis"
  timezoneAsia: "Asien"
  timezoneAtlantic: "Atlanten"
  timezoneBrazil: "Brasilien"
  timezoneChile: "Chile"
  timezoneEtc: "ETC"
  timezoneOther: "Övrigt"
  timezoneIndian: "Indiska oceanen"
  timezonePacific: "Stilla havet"
```

```json [sv.json]
{
  "flux": {
    "back": "Tillbaka",
    "backToTop": "Till toppen",
    "bottomSheetGrabber": "Ändra storlek eller stäng panelen",
    "cancel": "Avbryt",
    "close": "Stäng",
    "collapseGroup": "Fäll ihop grupp",
    "collapseRow": "Fäll ihop rad",
    "comingSoon": "Kommer snart",
    "continue": "Fortsätt",
    "createOption": "Skapa \"{value}\"",
    "customPeriod": "Anpassad period",
    "decrease": "Minska",
    "delete": "Ta bort",
    "displayingOf": "{from}–{to} av {total}",
    "done": "Klar",
    "expandGroup": "Expandera grupp",
    "expandRow": "Expandera rad",
    "filter": "Filter",
    "filterRemove": "Ta bort filter",
    "filterReset": "Återställ filter",
    "focalPoint": "Fokuspunkt",
    "focalPointValue": "{x} % horisontellt, {y} % vertikalt",
    "increase": "Öka",
    "justNow": "Just nu",
    "max": "Max",
    "min": "Min",
    "moreActions": "Fler åtgärder",
    "next": "Nästa",
    "noItems": "Det finns inga poster (kvar).",
    "nSelected": "{n} valda",
    "ok": "Ok",
    "optional": "Valfritt",
    "pagination": "Sidnavigering",
    "paginationNavigateMessage": "Ange vilket sidnummer du vill gå till.",
    "paginationNavigatePage": "Sida",
    "paginationNavigateTitle": "Navigera",
    "preview": "Förhandsgranska",
    "previewClose": "Stäng förhandsgranskningen",
    "previous": "Föregående",
    "readLess": "Visa mindre",
    "readMore": "Läs mer",
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
    "showN": "Visa {n}",
    "skip": "Hoppa över",
    "sort": "Sortera",
    "sortAscending": "Stigande",
    "sortDescending": "Fallande",
    "sortRemove": "Ta bort sortering",
    "submenu": "Undermeny",
    "swipeActionsLeading": "Inledande åtgärder",
    "swipeActionsTrailing": "Avslutande åtgärder",
    "today": "I dag",
    "togglePasswordVisibility": "Visa eller dölj lösenord",
    "selectMonth": "Välj månad",
    "selectYear": "Välj år",
    "selectDate": "Välj datum",
    "previousMonth": "Föregående månad",
    "nextMonth": "Nästa månad",
    "previousYears": "Föregående år",
    "nextYears": "Nästa år",
    "allDay": "Heldag",
    "andNMore": "{n} till",
    "grabbedAnnounce": "Objektet är taget. Använd piltangenterna för att flytta, Enter för att släppa, Escape för att avbryta.",
    "releasedAnnounce": "Objektet är släppt.",
    "goToPage": "Gå till sida {page}",
    "pinDigit": "Siffra {index} av {total}",
    "dropFilesOrClick": "Släpp filer här eller klicka för att ladda upp",
    "colorSaturationBrightness": "Färgmättnad och ljusstyrka",
    "customColor": "Anpassad färg",
    "hue": "Nyans",
    "opacity": "Opacitet",
    "lowerBound": "Undre gräns",
    "upperBound": "Övre gräns",
    "galleryPlaceholderButton": "Välj bild",
    "galleryPlaceholderMessage": "Släpp en bild här eller klicka på knappen för att ladda upp...",
    "galleryPlaceholderTitle": "Galleri",
    "timezoneEurope": "Europa",
    "timezoneAmerica": "Amerika",
    "timezoneUs": "USA",
    "timezoneAustralia": "Australien",
    "timezoneCanada": "Kanada",
    "timezoneMexico": "Mexiko",
    "timezoneAfrica": "Afrika",
    "timezoneAntarctica": "Antarktis",
    "timezoneArctic": "Arktis",
    "timezoneAsia": "Asien",
    "timezoneAtlantic": "Atlanten",
    "timezoneBrazil": "Brasilien",
    "timezoneChile": "Chile",
    "timezoneEtc": "ETC",
    "timezoneOther": "Övrigt",
    "timezoneIndian": "Indiska oceanen",
    "timezonePacific": "Stilla havet"
  }
}
```

:::

<!-- translations:end -->
