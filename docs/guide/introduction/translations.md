---
outline: deep
---

<script setup>
import { FluxPane, FluxTable, FluxTableRow, FluxTableCell, FluxTableHeader } from '@flux-ui/components';
import { english } from '../../../packages/components/src/data/i18n';
</script>

# Translations

Flux uses a bunch of strings in its library, and the cool part is that they can be easily translated when you use them. To make this translation process smoother, Flux works seamlessly with [vue-i18n](https://vue-i18n.intlify.dev/){target="_blank"}, allowing you to use its translate function. This integration makes the Flux library even easier and more flexible to work with.

## Strings

<FluxPane>
    <FluxTable>
        <template #header>
            <FluxTableRow>
                <FluxTableHeader>Key</FluxTableHeader>
                <FluxTableHeader>Value</FluxTableHeader>
            </FluxTableRow>
        </template>
        <FluxTableRow v-for="(value, key) of english">
            <FluxTableCell><small><kbd>{{ key }}</kbd></small></FluxTableCell>
            <FluxTableCell>{{ value }}</FluxTableCell>
        </FluxTableRow>
    </FluxTable>
</FluxPane>

## Pre-translated strings

Here are the official translations for the strings used by Flux. If you have additional translations, feel free to contribute by creating a pull request on GitHub. :)

### English

::: code-group

```yaml [en.yaml]
flux:
  back: "Back"
  cancel: "Cancel"
  close: "Close"
  collapseGroup: "Collapse group"
  collapseRow: "Collapse row"
  expandGroup: "Expand group"
  expandRow: "Expand row"
  comingSoon: "Coming soon"
  continue: "Continue"
  createOption: 'Create "{value}"'
  customPeriod: "Custom period"
  delete: "Delete"
  done: "Done"
  filter: "Filter"
  filterRemove: "Remove filter"
  filterReset: "Reset filters"
  justNow: "Just now"
  max: "Max"
  min: "Min"
  nSelected: "{n} selected"
  ok: "Ok"
  optional: "Optional"
  preview: "Preview"
  previewClose: "Close preview"
  displayingOf: "{from}–{to} of {total}"
  showN: "Show {n}"
  skip: "Skip"
  next: "Next"
  noItems: "There are no items (left)."
  pagination: "Pagination"
  paginationNavigateTitle: "Navigate"
  paginationNavigateMessage: "Please provide the desired page number you wish to navigate to."
  paginationNavigatePage: "Page"
  previous: "Previous"
  search: "Search..."
  sort: "Sort"
  sortAscending: "Ascending"
  sortDescending: "Descending"
  sortRemove: "Remove sorting"
  submenu: "Submenu"
  today: "Today"
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
    "cancel": "Cancel",
    "close": "Close",
    "collapseGroup": "Collapse group",
    "collapseRow": "Collapse row",
    "expandGroup": "Expand group",
    "expandRow": "Expand row",
    "comingSoon": "Coming soon",
    "continue": "Continue",
    "createOption": "Create \"{value}\"",
    "customPeriod": "Custom period",
    "delete": "Delete",
    "done": "Done",
    "filter": "Filter",
    "filterRemove": "Remove filter",
    "filterReset": "Reset filters",
    "justNow": "Just now",
    "max": "Max",
    "min": "Min",
    "nSelected": "{n} selected",
    "ok": "Ok",
    "optional": "Optional",
    "preview": "Preview",
    "previewClose": "Close preview",
    "displayingOf": "{from}–{to} of {total}",
    "showN": "Show {n}",
    "skip": "Skip",
    "next": "Next",
    "noItems": "There are no items (left).",
    "pagination": "Pagination",
    "paginationNavigateTitle": "Navigate",
    "paginationNavigateMessage": "Please provide the desired page number you wish to navigate to.",
    "paginationNavigatePage": "Page",
    "previous": "Previous",
    "search": "Search...",
    "sort": "Sort",
    "sortAscending": "Ascending",
    "sortDescending": "Descending",
    "sortRemove": "Remove sorting",
    "submenu": "Submenu",
    "today": "Today",
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
  cancel: "Annuleren"
  close: "Sluiten"
  collapseGroup: "Groep inklappen"
  collapseRow: "Rij inklappen"
  expandGroup: "Groep uitklappen"
  expandRow: "Rij uitklappen"
  comingSoon: "Binnenkort"
  continue: "Verder"
  createOption: 'Maak "{value}" aan'
  customPeriod: "Aangepaste periode"
  delete: "Verwijderen"
  done: "Klaar"
  filter: "Filter"
  filterRemove: "Verwijder filter"
  filterReset: "Verwijder alle filters"
  justNow: "Zojuist"
  max: "Maximaal"
  min: "Minimaal"
  nSelected: "{n} geselecteerd"
  ok: "Oké"
  optional: "Optioneel"
  preview: "Voorbeeld"
  previewClose: "Voorbeeld sluiten"
  displayingOf: "{from}–{to} van {total}"
  showN: "Toon {n}"
  skip: "Overslaan"
  next: "Volgende"
  noItems: "Geen resultaten gevonden"
  pagination: "Paginatie"
  paginationNavigateTitle: "Navigeer"
  paginationNavigateMessage: "Naar welke pagina wil je toe navigeren?"
  paginationNavigatePage: "Pagina"
  previous: "Vorige"
  search: "Zoeken..."
  sort: "Sorteer"
  sortAscending: "Oplopend"
  sortDescending: "Aflopend"
  sortRemove: "Verwijder"
  submenu: "Submenu"
  today: "Vandaag"
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
    "cancel": "Annuleren",
    "close": "Sluiten",
    "collapseGroup": "Groep inklappen",
    "collapseRow": "Rij inklappen",
    "expandGroup": "Groep uitklappen",
    "expandRow": "Rij uitklappen",
    "comingSoon": "Binnenkort",
    "continue": "Verder",
    "createOption": "Maak \"{value}\" aan",
    "customPeriod": "Aangepaste periode",
    "delete": "Verwijderen",
    "done": "Klaar",
    "filter": "Filter",
    "filterRemove": "Verwijder filter",
    "filterReset": "Verwijder alle filters",
    "justNow": "Zojuist",
    "max": "Maximaal",
    "min": "Minimaal",
    "nSelected": "{n} geselecteerd",
    "ok": "Oké",
    "optional": "Optioneel",
    "preview": "Voorbeeld",
    "previewClose": "Voorbeeld sluiten",
    "displayingOf": "{from}–{to} van {total}",
    "showN": "Toon {n}",
    "skip": "Overslaan",
    "next": "Volgende",
    "noItems": "Geen resultaten gevonden",
    "pagination": "Paginatie",
    "paginationNavigateTitle": "Navigeer",
    "paginationNavigateMessage": "Naar welke pagina wil je toe navigeren?",
    "paginationNavigatePage": "Pagina",
    "previous": "Vorige",
    "search": "Zoeken...",
    "sort": "Sorteer",
    "sortAscending": "Oplopend",
    "sortDescending": "Aflopend",
    "sortRemove": "Verwijder",
    "submenu": "Submenu",
    "today": "Vandaag",
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
  cancel: "Annuler"
  close: "Fermer"
  collapseGroup: "Réduire le groupe"
  collapseRow: "Réduire la ligne"
  expandGroup: "Développer le groupe"
  expandRow: "Développer la ligne"
  comingSoon: "Bientôt disponible"
  continue: "Continuer"
  createOption: 'Créer "{value}"'
  customPeriod: "Période personnalisée"
  delete: "Supprimer"
  done: "Terminé"
  filter: "Filtrer"
  filterRemove: "Supprimer le filtre"
  filterReset: "Réinitialiser les filtres"
  justNow: "À l'instant"
  max: "Max"
  min: "Min"
  nSelected: "{n} sélectionné(s)"
  ok: "OK"
  optional: "Optionnel"
  preview: "Aperçu"
  previewClose: "Fermer l'aperçu"
  displayingOf: "{from}–{to} sur {total}"
  showN: "Afficher {n}"
  skip: "Passer"
  next: "Suivant"
  noItems: "Aucun élément disponible."
  pagination: "Pagination"
  paginationNavigateTitle: "Naviguer"
  paginationNavigateMessage: "Veuillez indiquer le numéro de page souhaité."
  paginationNavigatePage: "Page"
  previous: "Précédent"
  search: "Recherche..."
  sort: "Trier"
  sortAscending: "Ascendant"
  sortDescending: "Descendant"
  sortRemove: "Supprimer le tri"
  submenu: "Sous-menu"
  today: "Aujourd'hui"
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
    "cancel": "Annuler",
    "close": "Fermer",
    "collapseGroup": "Réduire le groupe",
    "collapseRow": "Réduire la ligne",
    "expandGroup": "Développer le groupe",
    "expandRow": "Développer la ligne",
    "comingSoon": "Bientôt disponible",
    "continue": "Continuer",
    "createOption": "Créer \"{value}\"",
    "customPeriod": "Période personnalisée",
    "delete": "Supprimer",
    "done": "Terminé",
    "filter": "Filtrer",
    "filterRemove": "Supprimer le filtre",
    "filterReset": "Réinitialiser les filtres",
    "justNow": "À l'instant",
    "max": "Max",
    "min": "Min",
    "nSelected": "{n} sélectionné(s)",
    "ok": "OK",
    "optional": "Optionnel",
    "preview": "Aperçu",
    "previewClose": "Fermer l'aperçu",
    "displayingOf": "{from}–{to} sur {total}",
    "showN": "Afficher {n}",
    "skip": "Passer",
    "next": "Suivant",
    "noItems": "Aucun élément disponible.",
    "pagination": "Pagination",
    "paginationNavigateTitle": "Naviguer",
    "paginationNavigateMessage": "Veuillez indiquer le numéro de page souhaité.",
    "paginationNavigatePage": "Page",
    "previous": "Précédent",
    "search": "Recherche...",
    "sort": "Trier",
    "sortAscending": "Ascendant",
    "sortDescending": "Descendant",
    "sortRemove": "Supprimer le tri",
    "submenu": "Sous-menu",
    "today": "Aujourd'hui",
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
