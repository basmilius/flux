---
outline: deep
---

<script setup>
import { english } from '../../../packages/internals/src/data/i18n/filter';
</script>

# Translations

The filters render a handful of strings of their own: the back action, the min and
max labels of a range, the summary of a multiple selection and the label of a date
range that spans several years. Unlike the other packages, these keys do not sit
under `flux.filter`. They came out of `@flux-ui/components` and kept their names, so
a translation you already had still applies. Translate a key in your own [vue-i18n](https://vue-i18n.intlify.dev/){target="_blank"}
messages and the filters follow, leave it out and the English below is used.

[Translations](../../guide/introduction/translations) covers how the i18n instance
is set up; the keys on this page slot into the same `flux` root.

::: tip
The filter bar also renders `flux.filter` and `flux.filterReset`. It shares them with
the [Action bar](../../components/action-bar), so they are listed with the
[component strings](../../guide/introduction/translations).
:::

## Strings

The list is read straight from the Flux source, so it is the set that
ships with the version this page documents.

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

Here are the official translations for the strings used by Flux Filter. If you have
additional translations, feel free to contribute by creating a pull request on
GitHub. :) They live in `docs/.vitepress/data/translations/filter.ts`; the blocks below
are generated from it by `bun scripts/generate-translations.ts`.

<!-- translations:start -->

### English

::: code-group

```yaml [en.yaml]
flux:
  back: "Back"
  customPeriod: "Custom period"
  filterRemove: "Remove filter"
  max: "Max"
  min: "Min"
  nSelected: "{n} selected"
```

```json [en.json]
{
  "flux": {
    "back": "Back",
    "customPeriod": "Custom period",
    "filterRemove": "Remove filter",
    "max": "Max",
    "min": "Min",
    "nSelected": "{n} selected"
  }
}
```

:::

### Dutch - Nederlands

::: code-group

```yaml [nl.yaml]
flux:
  back: "Terug"
  customPeriod: "Aangepaste periode"
  filterRemove: "Verwijder filter"
  max: "Maximaal"
  min: "Minimaal"
  nSelected: "{n} geselecteerd"
```

```json [nl.json]
{
  "flux": {
    "back": "Terug",
    "customPeriod": "Aangepaste periode",
    "filterRemove": "Verwijder filter",
    "max": "Maximaal",
    "min": "Minimaal",
    "nSelected": "{n} geselecteerd"
  }
}
```

:::

### French - Français

::: code-group

```yaml [fr.yaml]
flux:
  back: "Retour"
  customPeriod: "Période personnalisée"
  filterRemove: "Supprimer le filtre"
  max: "Max"
  min: "Min"
  nSelected: "{n} sélectionné(s)"
```

```json [fr.json]
{
  "flux": {
    "back": "Retour",
    "customPeriod": "Période personnalisée",
    "filterRemove": "Supprimer le filtre",
    "max": "Max",
    "min": "Min",
    "nSelected": "{n} sélectionné(s)"
  }
}
```

:::

### German - Deutsch

::: code-group

```yaml [de.yaml]
flux:
  back: "Zurück"
  customPeriod: "Benutzerdefinierter Zeitraum"
  filterRemove: "Filter entfernen"
  max: "Max"
  min: "Min"
  nSelected: "{n} ausgewählt"
```

```json [de.json]
{
  "flux": {
    "back": "Zurück",
    "customPeriod": "Benutzerdefinierter Zeitraum",
    "filterRemove": "Filter entfernen",
    "max": "Max",
    "min": "Min",
    "nSelected": "{n} ausgewählt"
  }
}
```

:::

### Swedish - Svenska

::: code-group

```yaml [sv.yaml]
flux:
  back: "Tillbaka"
  customPeriod: "Anpassad period"
  filterRemove: "Ta bort filter"
  max: "Max"
  min: "Min"
  nSelected: "{n} valda"
```

```json [sv.json]
{
  "flux": {
    "back": "Tillbaka",
    "customPeriod": "Anpassad period",
    "filterRemove": "Ta bort filter",
    "max": "Max",
    "min": "Min",
    "nSelected": "{n} valda"
  }
}
```

:::

<!-- translations:end -->
