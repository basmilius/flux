# Installation

To start using Flux AI in your Vue application, you'll need to add it to your project alongside `@flux-ui/components`, which provides the primitives (icons, buttons, panes, form controls) that the conversational components build on.

## Step 1

Open your project's root directory in your terminal and run the following command:

::: code-group

```shell [bun]
bun add @flux-ui/ai @flux-ui/components
```

```shell [pnpm]
pnpm install @flux-ui/ai @flux-ui/components
```

```shell [yarn]
yarn add @flux-ui/ai @flux-ui/components
```

```shell [npm]
npm install @flux-ui/ai @flux-ui/components
```

:::

## Step 2

Once the installation is complete, add the following lines to your `main.ts` file:

```ts [main.ts]
import '@flux-ui/ai/style.css'
import '@flux-ui/components/style.css'
```

## Step 3

Make sure the icons used by the components are registered with Font Awesome, then import what you need:

```vue [Chat.vue]
<template>
    <FluxAiConversation> <!-- [!code focus:9] -->
        <FluxAiMessage
            v-for="message of messages"
            :key="message.id"
            :role="message.role">
            <FluxAiStreamingText :content="message.content"/>
        </FluxAiMessage>
    </FluxAiConversation>

    <FluxAiPromptInput @submit="send"/> <!-- [!code focus] -->
</template>

<script
    setup
    lang="ts">
    import { FluxAiConversation, FluxAiMessage, FluxAiPromptInput, FluxAiStreamingText } from '@flux-ui/ai' // [!code focus:2]
</script>
```

::: tip
Flux AI renders markdown with [marked](https://marked.js.org). Raw HTML in a response is escaped rather than rendered, so a model cannot inject markup into your page.
:::
