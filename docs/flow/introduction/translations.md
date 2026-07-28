---
outline: deep
---

<script setup>
import { english } from '../../../packages/flow/src/data/i18n';
</script>

# Translations

The only text a flow renders itself is on [Controls](../components/controls): the
zoom buttons, the fit action and the fullscreen toggle. All of it sits behind a key
under `flux.flow`. Translate the key in your own
[vue-i18n](https://vue-i18n.intlify.dev/){target="_blank"} messages and the controls
follow, leave it out and the English below is used.

[Translations](../../guide/introduction/translations) covers how the i18n instance
is set up; the keys on this page slot into the same `flux` root.

::: tip
`FluxFlowControls` still takes every one of these as a prop, such as `zoom-label` and
`fit-label`. A prop that is set wins over the translation, for that one flow.
:::

## Strings

The list is read straight from the source of `@flux-ui/flow`, so it is the set that
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

Here are the official translations for the strings used by Flux Flow. If you have
additional translations, feel free to contribute by creating a pull request on
GitHub. :) They live in `docs/.vitepress/data/translations/flow.ts`; the blocks below
are generated from it by `bun scripts/generate-translations.ts`.

<!-- translations:start -->

### English

::: code-group

```yaml [en.yaml]
flux:
  flow:
    exitFullscreen: "Exit fullscreen"
    fitView: "Fit view"
    fullscreen: "Fullscreen"
    zoom: "Zoom"
    zoomIn: "Zoom in"
    zoomOut: "Zoom out"
```

```json [en.json]
{
  "flux": {
    "flow": {
      "exitFullscreen": "Exit fullscreen",
      "fitView": "Fit view",
      "fullscreen": "Fullscreen",
      "zoom": "Zoom",
      "zoomIn": "Zoom in",
      "zoomOut": "Zoom out"
    }
  }
}
```

:::

### Dutch - Nederlands

::: code-group

```yaml [nl.yaml]
flux:
  flow:
    exitFullscreen: "Volledig scherm verlaten"
    fitView: "Passend maken"
    fullscreen: "Volledig scherm"
    zoom: "Zoom"
    zoomIn: "Inzoomen"
    zoomOut: "Uitzoomen"
```

```json [nl.json]
{
  "flux": {
    "flow": {
      "exitFullscreen": "Volledig scherm verlaten",
      "fitView": "Passend maken",
      "fullscreen": "Volledig scherm",
      "zoom": "Zoom",
      "zoomIn": "Inzoomen",
      "zoomOut": "Uitzoomen"
    }
  }
}
```

:::

### French - Français

::: code-group

```yaml [fr.yaml]
flux:
  flow:
    exitFullscreen: "Quitter le plein écran"
    fitView: "Ajuster la vue"
    fullscreen: "Plein écran"
    zoom: "Zoom"
    zoomIn: "Zoom avant"
    zoomOut: "Zoom arrière"
```

```json [fr.json]
{
  "flux": {
    "flow": {
      "exitFullscreen": "Quitter le plein écran",
      "fitView": "Ajuster la vue",
      "fullscreen": "Plein écran",
      "zoom": "Zoom",
      "zoomIn": "Zoom avant",
      "zoomOut": "Zoom arrière"
    }
  }
}
```

:::

### German - Deutsch

::: code-group

```yaml [de.yaml]
flux:
  flow:
    exitFullscreen: "Vollbild beenden"
    fitView: "Ansicht einpassen"
    fullscreen: "Vollbild"
    zoom: "Zoom"
    zoomIn: "Vergrößern"
    zoomOut: "Verkleinern"
```

```json [de.json]
{
  "flux": {
    "flow": {
      "exitFullscreen": "Vollbild beenden",
      "fitView": "Ansicht einpassen",
      "fullscreen": "Vollbild",
      "zoom": "Zoom",
      "zoomIn": "Vergrößern",
      "zoomOut": "Verkleinern"
    }
  }
}
```

:::

### Swedish - Svenska

::: code-group

```yaml [sv.yaml]
flux:
  flow:
    exitFullscreen: "Avsluta helskärm"
    fitView: "Anpassa vyn"
    fullscreen: "Helskärm"
    zoom: "Zoom"
    zoomIn: "Zooma in"
    zoomOut: "Zooma ut"
```

```json [sv.json]
{
  "flux": {
    "flow": {
      "exitFullscreen": "Avsluta helskärm",
      "fitView": "Anpassa vyn",
      "fullscreen": "Helskärm",
      "zoom": "Zoom",
      "zoomIn": "Zooma in",
      "zoomOut": "Zooma ut"
    }
  }
}
```

:::

<!-- translations:end -->
