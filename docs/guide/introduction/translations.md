---
outline: deep
---

<script setup>
import { english } from '../../../packages/flux/src/composable/private/useTranslate';
</script>

# Translations

Flux uses a bunch of strings in its library, and the cool part is that they can be easily translated when you use them. To make this translation process smoother, Flux works seamlessly with [vue-i18n](https://vue-i18n.intlify.dev/){target="_blank"}, allowing you to use its translate function. This integration makes the Flux library even easier and more flexible to work with.

## Strings

<table>
<thead>
<tr>
    <th>Key</th>
    <th>Value</th>
</tr>
</thead>
<tbody>
<tr v-for="(value, key) of english">
    <td><code>{{ key }}</code></td>
    <td>{{ value }}</td>
</tr>
</tbody>
</table>

## Pre-translated strings

Here are the official translations for the strings used by Flux. If you have additional translations, feel free to contribute by creating a pull request on GitHub. :)

### Dutch - Nederlands

```yaml
flux:
    back: "Terug"
    cancel: "Annuleren"
    comingSoon: "Binnenkort"
    continue: "Verder"
    customPeriod: "Aangepaste periode"
    filter: "Filter"
    filterReset: "Verwijder alle filters"
    max: "Maximaal"
    min: "Minimaal"
    nSelected: "{n} geselecteerd"
    ok: "Oké"
    optional: "Optioneel"
    preview: "Voorbeeld"
    previewClose: "Voorbeeld sluiten"
    displayingOf: "{from}—{to} van {total}"
    rowsPerPage: "Rijen per pagina"
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
    today: "Vandaag"
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
