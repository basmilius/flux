---
outline: deep
---

<script setup>
import { english } from '../../../packages/application/src/data/i18n';
</script>

# Translations

The shell renders little text of its own: the labels behind the menu and panel
buttons, and the presets of [Status page](../components/status-page). All of it sits
behind a key under `flux.application`. Translate the key in your own
[vue-i18n](https://vue-i18n.intlify.dev/){target="_blank"} messages and the
components follow, leave it out and the English below is used.

[Translations](../../guide/introduction/translations) covers how the i18n instance
is set up; the keys on this page slot into the same `flux` root.

::: tip
`FluxApplicationSide` takes a `close-label` prop, which wins over
`flux.application.closePanel` for the one panel it is set on. The status page takes
a `title` and a `description` that do the same for its presets.
:::

## Strings

The list is read straight from the source of `@flux-ui/application`, so it is the
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

Here are the official translations for the strings used by Flux Application. If you
have additional translations, feel free to contribute by creating a pull request on
GitHub. :) They live in `docs/.vitepress/data/translations/application.ts`; the
blocks below are generated from it by `bun scripts/generate-translations.ts`.

<!-- translations:start -->

### English

::: code-group

```yaml [en.yaml]
flux:
  application:
    back: "Back"
    closeMenu: "Close menu"
    closePanel: "Close panel"
    statusErrorDescription: "We could not load this page. Try again in a moment."
    statusErrorTitle: "Something went wrong"
    statusMaintenanceDescription: "We are making some improvements. Please check back shortly."
    statusMaintenanceTitle: "Down for maintenance"
    statusNotFoundDescription: "This page does not exist, or it moved somewhere else."
    statusNotFoundTitle: "Page not found"
    statusOfflineDescription: "Check your network and try again."
    statusOfflineTitle: "No connection"
    toggleMenu: "Toggle menu"
```

```json [en.json]
{
  "flux": {
    "application": {
      "back": "Back",
      "closeMenu": "Close menu",
      "closePanel": "Close panel",
      "statusErrorDescription": "We could not load this page. Try again in a moment.",
      "statusErrorTitle": "Something went wrong",
      "statusMaintenanceDescription": "We are making some improvements. Please check back shortly.",
      "statusMaintenanceTitle": "Down for maintenance",
      "statusNotFoundDescription": "This page does not exist, or it moved somewhere else.",
      "statusNotFoundTitle": "Page not found",
      "statusOfflineDescription": "Check your network and try again.",
      "statusOfflineTitle": "No connection",
      "toggleMenu": "Toggle menu"
    }
  }
}
```

:::

### Dutch - Nederlands

::: code-group

```yaml [nl.yaml]
flux:
  application:
    back: "Terug"
    closeMenu: "Menu sluiten"
    closePanel: "Paneel sluiten"
    statusErrorDescription: "We konden deze pagina niet laden. Probeer het zo nog eens."
    statusErrorTitle: "Er ging iets mis"
    statusMaintenanceDescription: "We voeren wat verbeteringen door. Kom straks nog eens terug."
    statusMaintenanceTitle: "In onderhoud"
    statusNotFoundDescription: "Deze pagina bestaat niet, of is verhuisd."
    statusNotFoundTitle: "Pagina niet gevonden"
    statusOfflineDescription: "Controleer je verbinding en probeer het opnieuw."
    statusOfflineTitle: "Geen verbinding"
    toggleMenu: "Menu in- of uitklappen"
```

```json [nl.json]
{
  "flux": {
    "application": {
      "back": "Terug",
      "closeMenu": "Menu sluiten",
      "closePanel": "Paneel sluiten",
      "statusErrorDescription": "We konden deze pagina niet laden. Probeer het zo nog eens.",
      "statusErrorTitle": "Er ging iets mis",
      "statusMaintenanceDescription": "We voeren wat verbeteringen door. Kom straks nog eens terug.",
      "statusMaintenanceTitle": "In onderhoud",
      "statusNotFoundDescription": "Deze pagina bestaat niet, of is verhuisd.",
      "statusNotFoundTitle": "Pagina niet gevonden",
      "statusOfflineDescription": "Controleer je verbinding en probeer het opnieuw.",
      "statusOfflineTitle": "Geen verbinding",
      "toggleMenu": "Menu in- of uitklappen"
    }
  }
}
```

:::

### French - Français

::: code-group

```yaml [fr.yaml]
flux:
  application:
    back: "Retour"
    closeMenu: "Fermer le menu"
    closePanel: "Fermer le panneau"
    statusErrorDescription: "Nous n'avons pas pu charger cette page. Réessayez dans un instant."
    statusErrorTitle: "Une erreur est survenue"
    statusMaintenanceDescription: "Nous apportons quelques améliorations. Revenez dans un moment."
    statusMaintenanceTitle: "En maintenance"
    statusNotFoundDescription: "Cette page n'existe pas, ou elle a été déplacée."
    statusNotFoundTitle: "Page introuvable"
    statusOfflineDescription: "Vérifiez votre connexion et réessayez."
    statusOfflineTitle: "Aucune connexion"
    toggleMenu: "Afficher ou masquer le menu"
```

```json [fr.json]
{
  "flux": {
    "application": {
      "back": "Retour",
      "closeMenu": "Fermer le menu",
      "closePanel": "Fermer le panneau",
      "statusErrorDescription": "Nous n'avons pas pu charger cette page. Réessayez dans un instant.",
      "statusErrorTitle": "Une erreur est survenue",
      "statusMaintenanceDescription": "Nous apportons quelques améliorations. Revenez dans un moment.",
      "statusMaintenanceTitle": "En maintenance",
      "statusNotFoundDescription": "Cette page n'existe pas, ou elle a été déplacée.",
      "statusNotFoundTitle": "Page introuvable",
      "statusOfflineDescription": "Vérifiez votre connexion et réessayez.",
      "statusOfflineTitle": "Aucune connexion",
      "toggleMenu": "Afficher ou masquer le menu"
    }
  }
}
```

:::

### German - Deutsch

::: code-group

```yaml [de.yaml]
flux:
  application:
    back: "Zurück"
    closeMenu: "Menü schließen"
    closePanel: "Bereich schließen"
    statusErrorDescription: "Diese Seite konnte nicht geladen werden. Versuchen Sie es gleich noch einmal."
    statusErrorTitle: "Etwas ist schiefgelaufen"
    statusMaintenanceDescription: "Wir nehmen einige Verbesserungen vor. Schauen Sie später noch einmal vorbei."
    statusMaintenanceTitle: "Wartungsarbeiten"
    statusNotFoundDescription: "Diese Seite gibt es nicht, oder sie ist umgezogen."
    statusNotFoundTitle: "Seite nicht gefunden"
    statusOfflineDescription: "Prüfen Sie Ihre Verbindung und versuchen Sie es erneut."
    statusOfflineTitle: "Keine Verbindung"
    toggleMenu: "Menü ein- oder ausblenden"
```

```json [de.json]
{
  "flux": {
    "application": {
      "back": "Zurück",
      "closeMenu": "Menü schließen",
      "closePanel": "Bereich schließen",
      "statusErrorDescription": "Diese Seite konnte nicht geladen werden. Versuchen Sie es gleich noch einmal.",
      "statusErrorTitle": "Etwas ist schiefgelaufen",
      "statusMaintenanceDescription": "Wir nehmen einige Verbesserungen vor. Schauen Sie später noch einmal vorbei.",
      "statusMaintenanceTitle": "Wartungsarbeiten",
      "statusNotFoundDescription": "Diese Seite gibt es nicht, oder sie ist umgezogen.",
      "statusNotFoundTitle": "Seite nicht gefunden",
      "statusOfflineDescription": "Prüfen Sie Ihre Verbindung und versuchen Sie es erneut.",
      "statusOfflineTitle": "Keine Verbindung",
      "toggleMenu": "Menü ein- oder ausblenden"
    }
  }
}
```

:::

### Swedish - Svenska

::: code-group

```yaml [sv.yaml]
flux:
  application:
    back: "Tillbaka"
    closeMenu: "Stäng menyn"
    closePanel: "Stäng panelen"
    statusErrorDescription: "Vi kunde inte läsa in sidan. Försök igen om en stund."
    statusErrorTitle: "Något gick fel"
    statusMaintenanceDescription: "Vi gör några förbättringar. Kom tillbaka om en stund."
    statusMaintenanceTitle: "Underhåll pågår"
    statusNotFoundDescription: "Sidan finns inte, eller så har den flyttat."
    statusNotFoundTitle: "Sidan hittades inte"
    statusOfflineDescription: "Kontrollera din anslutning och försök igen."
    statusOfflineTitle: "Ingen anslutning"
    toggleMenu: "Visa eller dölj menyn"
```

```json [sv.json]
{
  "flux": {
    "application": {
      "back": "Tillbaka",
      "closeMenu": "Stäng menyn",
      "closePanel": "Stäng panelen",
      "statusErrorDescription": "Vi kunde inte läsa in sidan. Försök igen om en stund.",
      "statusErrorTitle": "Något gick fel",
      "statusMaintenanceDescription": "Vi gör några förbättringar. Kom tillbaka om en stund.",
      "statusMaintenanceTitle": "Underhåll pågår",
      "statusNotFoundDescription": "Sidan finns inte, eller så har den flyttat.",
      "statusNotFoundTitle": "Sidan hittades inte",
      "statusOfflineDescription": "Kontrollera din anslutning och försök igen.",
      "statusOfflineTitle": "Ingen anslutning",
      "toggleMenu": "Visa eller dölj menyn"
    }
  }
}
```

:::

<!-- translations:end -->
