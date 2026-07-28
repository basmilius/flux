---
outline: deep
---

<script setup>
import { english } from '../../../packages/ai/src/data/i18n';
</script>

# Translations

Everything the components in `@flux-ui/ai` say, including the text only assistive
technology reads, sits behind a key under `flux.ai`. Translate the key in your own
[vue-i18n](https://vue-i18n.intlify.dev/){target="_blank"} messages and the
components follow, leave it out and the English below is used.

[Translations](../../guide/introduction/translations) covers how the i18n instance
is set up; the keys on this page slot into the same `flux` root.

::: tip
A handful of components take a label as a prop as well, such as `label` on
[Conversation](../components/conversation) and `author` on
[Message](../components/message). Those win over the translation, for the one place
they are set.
:::

## Strings

The list is read straight from the source of `@flux-ui/ai`, so it is the set that
ships with the version this page documents. A value wrapped in `{}` takes a value
from the component and is filled in for you.

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

Here are the official translations for the strings used by Flux AI. If you have
additional translations, feel free to contribute by creating a pull request on
GitHub. :) They live in `docs/.vitepress/data/translations/ai.ts`; the blocks below
are generated from it by `bun scripts/generate-translations.ts`.

<!-- translations:start -->

### English

::: code-group

```yaml [en.yaml]
flux:
  ai:
    attach: "Attach files"
    attachments: "Attachments"
    citationSource: "Source {index}"
    code: "Code"
    conversation: "Conversation"
    copiedCode: "Copied"
    copyCode: "Copy code"
    cost: "Cost"
    inputTokens: "Input tokens"
    jumpToLatest: "Jump to latest"
    model: "Model"
    outputTokens: "Output tokens"
    prompt: "Prompt"
    promptMessage: "Message"
    promptPlaceholder: "Ask anything..."
    reasoning: "Reasoning"
    removeAttachment: "Remove {name}"
    roleAssistant: "Assistant"
    roleSystem: "System"
    roleUser: "You"
    selectModel: "Select a model"
    send: "Send"
    stop: "Stop generating"
    suggestions: "Suggestions"
    thinking: "Thinking..."
    thoughtForMinutes: "Thought for {minutes}m {seconds}s"
    thoughtForSeconds: "Thought for {seconds}s"
    tokenLimitNear: "Approaching the token limit"
    tokenLimitReached: "Token limit reached"
    tokenLimitUsage: "{used} of {limit} tokens"
    toolArguments: "Arguments"
    toolCopied: "Copied"
    toolCopy: "Copy"
    toolDuration: "{duration}s"
    toolFailed: "Failed"
    toolResult: "Result"
    toolRunning: "Running"
    toolShowFullResult: "Show full result"
    toolShowLess: "Show less"
    toolSucceeded: "Succeeded"
    usage: "Usage"
```

```json [en.json]
{
  "flux": {
    "ai": {
      "attach": "Attach files",
      "attachments": "Attachments",
      "citationSource": "Source {index}",
      "code": "Code",
      "conversation": "Conversation",
      "copiedCode": "Copied",
      "copyCode": "Copy code",
      "cost": "Cost",
      "inputTokens": "Input tokens",
      "jumpToLatest": "Jump to latest",
      "model": "Model",
      "outputTokens": "Output tokens",
      "prompt": "Prompt",
      "promptMessage": "Message",
      "promptPlaceholder": "Ask anything...",
      "reasoning": "Reasoning",
      "removeAttachment": "Remove {name}",
      "roleAssistant": "Assistant",
      "roleSystem": "System",
      "roleUser": "You",
      "selectModel": "Select a model",
      "send": "Send",
      "stop": "Stop generating",
      "suggestions": "Suggestions",
      "thinking": "Thinking...",
      "thoughtForMinutes": "Thought for {minutes}m {seconds}s",
      "thoughtForSeconds": "Thought for {seconds}s",
      "tokenLimitNear": "Approaching the token limit",
      "tokenLimitReached": "Token limit reached",
      "tokenLimitUsage": "{used} of {limit} tokens",
      "toolArguments": "Arguments",
      "toolCopied": "Copied",
      "toolCopy": "Copy",
      "toolDuration": "{duration}s",
      "toolFailed": "Failed",
      "toolResult": "Result",
      "toolRunning": "Running",
      "toolShowFullResult": "Show full result",
      "toolShowLess": "Show less",
      "toolSucceeded": "Succeeded",
      "usage": "Usage"
    }
  }
}
```

:::

### Dutch - Nederlands

::: code-group

```yaml [nl.yaml]
flux:
  ai:
    attach: "Bestanden toevoegen"
    attachments: "Bijlagen"
    citationSource: "Bron {index}"
    code: "Code"
    conversation: "Gesprek"
    copiedCode: "Gekopieerd"
    copyCode: "Code kopiëren"
    cost: "Kosten"
    inputTokens: "Invoertokens"
    jumpToLatest: "Naar het laatste bericht"
    model: "Model"
    outputTokens: "Uitvoertokens"
    prompt: "Prompt"
    promptMessage: "Bericht"
    promptPlaceholder: "Stel gerust een vraag..."
    reasoning: "Redenering"
    removeAttachment: "{name} verwijderen"
    roleAssistant: "Assistent"
    roleSystem: "Systeem"
    roleUser: "Jij"
    selectModel: "Kies een model"
    send: "Versturen"
    stop: "Stoppen met genereren"
    suggestions: "Suggesties"
    thinking: "Aan het nadenken..."
    thoughtForMinutes: "{minutes}m {seconds}s nagedacht"
    thoughtForSeconds: "{seconds}s nagedacht"
    tokenLimitNear: "De tokenlimiet komt in zicht"
    tokenLimitReached: "Tokenlimiet bereikt"
    tokenLimitUsage: "{used} van {limit} tokens"
    toolArguments: "Argumenten"
    toolCopied: "Gekopieerd"
    toolCopy: "Kopiëren"
    toolDuration: "{duration}s"
    toolFailed: "Mislukt"
    toolResult: "Resultaat"
    toolRunning: "Bezig"
    toolShowFullResult: "Volledig resultaat tonen"
    toolShowLess: "Minder tonen"
    toolSucceeded: "Gelukt"
    usage: "Verbruik"
```

```json [nl.json]
{
  "flux": {
    "ai": {
      "attach": "Bestanden toevoegen",
      "attachments": "Bijlagen",
      "citationSource": "Bron {index}",
      "code": "Code",
      "conversation": "Gesprek",
      "copiedCode": "Gekopieerd",
      "copyCode": "Code kopiëren",
      "cost": "Kosten",
      "inputTokens": "Invoertokens",
      "jumpToLatest": "Naar het laatste bericht",
      "model": "Model",
      "outputTokens": "Uitvoertokens",
      "prompt": "Prompt",
      "promptMessage": "Bericht",
      "promptPlaceholder": "Stel gerust een vraag...",
      "reasoning": "Redenering",
      "removeAttachment": "{name} verwijderen",
      "roleAssistant": "Assistent",
      "roleSystem": "Systeem",
      "roleUser": "Jij",
      "selectModel": "Kies een model",
      "send": "Versturen",
      "stop": "Stoppen met genereren",
      "suggestions": "Suggesties",
      "thinking": "Aan het nadenken...",
      "thoughtForMinutes": "{minutes}m {seconds}s nagedacht",
      "thoughtForSeconds": "{seconds}s nagedacht",
      "tokenLimitNear": "De tokenlimiet komt in zicht",
      "tokenLimitReached": "Tokenlimiet bereikt",
      "tokenLimitUsage": "{used} van {limit} tokens",
      "toolArguments": "Argumenten",
      "toolCopied": "Gekopieerd",
      "toolCopy": "Kopiëren",
      "toolDuration": "{duration}s",
      "toolFailed": "Mislukt",
      "toolResult": "Resultaat",
      "toolRunning": "Bezig",
      "toolShowFullResult": "Volledig resultaat tonen",
      "toolShowLess": "Minder tonen",
      "toolSucceeded": "Gelukt",
      "usage": "Verbruik"
    }
  }
}
```

:::

### French - Français

::: code-group

```yaml [fr.yaml]
flux:
  ai:
    attach: "Joindre des fichiers"
    attachments: "Pièces jointes"
    citationSource: "Source {index}"
    code: "Code"
    conversation: "Conversation"
    copiedCode: "Copié"
    copyCode: "Copier le code"
    cost: "Coût"
    inputTokens: "Jetons d'entrée"
    jumpToLatest: "Aller au plus récent"
    model: "Modèle"
    outputTokens: "Jetons de sortie"
    prompt: "Requête"
    promptMessage: "Message"
    promptPlaceholder: "Posez votre question..."
    reasoning: "Raisonnement"
    removeAttachment: "Supprimer {name}"
    roleAssistant: "Assistant"
    roleSystem: "Système"
    roleUser: "Vous"
    selectModel: "Choisir un modèle"
    send: "Envoyer"
    stop: "Arrêter la génération"
    suggestions: "Suggestions"
    thinking: "Réflexion..."
    thoughtForMinutes: "A réfléchi pendant {minutes} min {seconds} s"
    thoughtForSeconds: "A réfléchi pendant {seconds} s"
    tokenLimitNear: "Limite de jetons bientôt atteinte"
    tokenLimitReached: "Limite de jetons atteinte"
    tokenLimitUsage: "{used} jetons sur {limit}"
    toolArguments: "Arguments"
    toolCopied: "Copié"
    toolCopy: "Copier"
    toolDuration: "{duration} s"
    toolFailed: "Échec"
    toolResult: "Résultat"
    toolRunning: "En cours"
    toolShowFullResult: "Afficher le résultat complet"
    toolShowLess: "Afficher moins"
    toolSucceeded: "Réussi"
    usage: "Utilisation"
```

```json [fr.json]
{
  "flux": {
    "ai": {
      "attach": "Joindre des fichiers",
      "attachments": "Pièces jointes",
      "citationSource": "Source {index}",
      "code": "Code",
      "conversation": "Conversation",
      "copiedCode": "Copié",
      "copyCode": "Copier le code",
      "cost": "Coût",
      "inputTokens": "Jetons d'entrée",
      "jumpToLatest": "Aller au plus récent",
      "model": "Modèle",
      "outputTokens": "Jetons de sortie",
      "prompt": "Requête",
      "promptMessage": "Message",
      "promptPlaceholder": "Posez votre question...",
      "reasoning": "Raisonnement",
      "removeAttachment": "Supprimer {name}",
      "roleAssistant": "Assistant",
      "roleSystem": "Système",
      "roleUser": "Vous",
      "selectModel": "Choisir un modèle",
      "send": "Envoyer",
      "stop": "Arrêter la génération",
      "suggestions": "Suggestions",
      "thinking": "Réflexion...",
      "thoughtForMinutes": "A réfléchi pendant {minutes} min {seconds} s",
      "thoughtForSeconds": "A réfléchi pendant {seconds} s",
      "tokenLimitNear": "Limite de jetons bientôt atteinte",
      "tokenLimitReached": "Limite de jetons atteinte",
      "tokenLimitUsage": "{used} jetons sur {limit}",
      "toolArguments": "Arguments",
      "toolCopied": "Copié",
      "toolCopy": "Copier",
      "toolDuration": "{duration} s",
      "toolFailed": "Échec",
      "toolResult": "Résultat",
      "toolRunning": "En cours",
      "toolShowFullResult": "Afficher le résultat complet",
      "toolShowLess": "Afficher moins",
      "toolSucceeded": "Réussi",
      "usage": "Utilisation"
    }
  }
}
```

:::

### German - Deutsch

::: code-group

```yaml [de.yaml]
flux:
  ai:
    attach: "Dateien anhängen"
    attachments: "Anhänge"
    citationSource: "Quelle {index}"
    code: "Code"
    conversation: "Unterhaltung"
    copiedCode: "Kopiert"
    copyCode: "Code kopieren"
    cost: "Kosten"
    inputTokens: "Eingabe-Tokens"
    jumpToLatest: "Zum Neuesten springen"
    model: "Modell"
    outputTokens: "Ausgabe-Tokens"
    prompt: "Eingabe"
    promptMessage: "Nachricht"
    promptPlaceholder: "Stellen Sie Ihre Frage..."
    reasoning: "Gedankengang"
    removeAttachment: "{name} entfernen"
    roleAssistant: "Assistent"
    roleSystem: "System"
    roleUser: "Sie"
    selectModel: "Modell auswählen"
    send: "Senden"
    stop: "Generierung stoppen"
    suggestions: "Vorschläge"
    thinking: "Denkt nach..."
    thoughtForMinutes: "{minutes} Min. {seconds} Sek. nachgedacht"
    thoughtForSeconds: "{seconds} Sek. nachgedacht"
    tokenLimitNear: "Token-Limit fast erreicht"
    tokenLimitReached: "Token-Limit erreicht"
    tokenLimitUsage: "{used} von {limit} Tokens"
    toolArguments: "Argumente"
    toolCopied: "Kopiert"
    toolCopy: "Kopieren"
    toolDuration: "{duration} s"
    toolFailed: "Fehlgeschlagen"
    toolResult: "Ergebnis"
    toolRunning: "Läuft"
    toolShowFullResult: "Vollständiges Ergebnis anzeigen"
    toolShowLess: "Weniger anzeigen"
    toolSucceeded: "Erfolgreich"
    usage: "Verbrauch"
```

```json [de.json]
{
  "flux": {
    "ai": {
      "attach": "Dateien anhängen",
      "attachments": "Anhänge",
      "citationSource": "Quelle {index}",
      "code": "Code",
      "conversation": "Unterhaltung",
      "copiedCode": "Kopiert",
      "copyCode": "Code kopieren",
      "cost": "Kosten",
      "inputTokens": "Eingabe-Tokens",
      "jumpToLatest": "Zum Neuesten springen",
      "model": "Modell",
      "outputTokens": "Ausgabe-Tokens",
      "prompt": "Eingabe",
      "promptMessage": "Nachricht",
      "promptPlaceholder": "Stellen Sie Ihre Frage...",
      "reasoning": "Gedankengang",
      "removeAttachment": "{name} entfernen",
      "roleAssistant": "Assistent",
      "roleSystem": "System",
      "roleUser": "Sie",
      "selectModel": "Modell auswählen",
      "send": "Senden",
      "stop": "Generierung stoppen",
      "suggestions": "Vorschläge",
      "thinking": "Denkt nach...",
      "thoughtForMinutes": "{minutes} Min. {seconds} Sek. nachgedacht",
      "thoughtForSeconds": "{seconds} Sek. nachgedacht",
      "tokenLimitNear": "Token-Limit fast erreicht",
      "tokenLimitReached": "Token-Limit erreicht",
      "tokenLimitUsage": "{used} von {limit} Tokens",
      "toolArguments": "Argumente",
      "toolCopied": "Kopiert",
      "toolCopy": "Kopieren",
      "toolDuration": "{duration} s",
      "toolFailed": "Fehlgeschlagen",
      "toolResult": "Ergebnis",
      "toolRunning": "Läuft",
      "toolShowFullResult": "Vollständiges Ergebnis anzeigen",
      "toolShowLess": "Weniger anzeigen",
      "toolSucceeded": "Erfolgreich",
      "usage": "Verbrauch"
    }
  }
}
```

:::

### Swedish - Svenska

::: code-group

```yaml [sv.yaml]
flux:
  ai:
    attach: "Bifoga filer"
    attachments: "Bilagor"
    citationSource: "Källa {index}"
    code: "Kod"
    conversation: "Konversation"
    copiedCode: "Kopierat"
    copyCode: "Kopiera kod"
    cost: "Kostnad"
    inputTokens: "Indatatoken"
    jumpToLatest: "Gå till det senaste"
    model: "Modell"
    outputTokens: "Utdatatoken"
    prompt: "Prompt"
    promptMessage: "Meddelande"
    promptPlaceholder: "Fråga vad du vill..."
    reasoning: "Resonemang"
    removeAttachment: "Ta bort {name}"
    roleAssistant: "Assistent"
    roleSystem: "System"
    roleUser: "Du"
    selectModel: "Välj en modell"
    send: "Skicka"
    stop: "Sluta generera"
    suggestions: "Förslag"
    thinking: "Tänker..."
    thoughtForMinutes: "Tänkte i {minutes} min {seconds} s"
    thoughtForSeconds: "Tänkte i {seconds} s"
    tokenLimitNear: "Närmar sig tokengränsen"
    tokenLimitReached: "Tokengränsen är nådd"
    tokenLimitUsage: "{used} av {limit} token"
    toolArguments: "Argument"
    toolCopied: "Kopierat"
    toolCopy: "Kopiera"
    toolDuration: "{duration} s"
    toolFailed: "Misslyckades"
    toolResult: "Resultat"
    toolRunning: "Körs"
    toolShowFullResult: "Visa hela resultatet"
    toolShowLess: "Visa mindre"
    toolSucceeded: "Lyckades"
    usage: "Användning"
```

```json [sv.json]
{
  "flux": {
    "ai": {
      "attach": "Bifoga filer",
      "attachments": "Bilagor",
      "citationSource": "Källa {index}",
      "code": "Kod",
      "conversation": "Konversation",
      "copiedCode": "Kopierat",
      "copyCode": "Kopiera kod",
      "cost": "Kostnad",
      "inputTokens": "Indatatoken",
      "jumpToLatest": "Gå till det senaste",
      "model": "Modell",
      "outputTokens": "Utdatatoken",
      "prompt": "Prompt",
      "promptMessage": "Meddelande",
      "promptPlaceholder": "Fråga vad du vill...",
      "reasoning": "Resonemang",
      "removeAttachment": "Ta bort {name}",
      "roleAssistant": "Assistent",
      "roleSystem": "System",
      "roleUser": "Du",
      "selectModel": "Välj en modell",
      "send": "Skicka",
      "stop": "Sluta generera",
      "suggestions": "Förslag",
      "thinking": "Tänker...",
      "thoughtForMinutes": "Tänkte i {minutes} min {seconds} s",
      "thoughtForSeconds": "Tänkte i {seconds} s",
      "tokenLimitNear": "Närmar sig tokengränsen",
      "tokenLimitReached": "Tokengränsen är nådd",
      "tokenLimitUsage": "{used} av {limit} token",
      "toolArguments": "Argument",
      "toolCopied": "Kopierat",
      "toolCopy": "Kopiera",
      "toolDuration": "{duration} s",
      "toolFailed": "Misslyckades",
      "toolResult": "Resultat",
      "toolRunning": "Körs",
      "toolShowFullResult": "Visa hela resultatet",
      "toolShowLess": "Visa mindre",
      "toolSucceeded": "Lyckades",
      "usage": "Användning"
    }
  }
}
```

:::

<!-- translations:end -->
