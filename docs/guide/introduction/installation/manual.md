# Installation

To start using Flux in your Vue application, you'll need to add it to your project. This section provides step-by-step instructions on how to install Flux, ensuring you can quickly integrate its components into your development workflow.

### Step 1

Open your project's root directory in your terminal.

### Step 2

Run the following command to install Flux.

::: code-group

```shell [PNPM]
pnpm install @basmilius/flux
```

```shell [Bun]
bun add @basmilius/flux
```

```shell [Yarn]
yarn add @basmilius/flux
```

```shell [NPM]
npm install @basmilius/flux
```

:::

### Step 3

Once the installation is complete add the following to your main.ts file.

### Step 4

For setting up icons, please refer to [Font Awesome](./font-awesome).

### Step 5

Import the components you want to use, like this:

```vue [App.vue]

<template>
    <FluxPane> <!-- [!code focus:5] -->
        <FluxSecondaryButton
            href="https://flux.bas.dev"
            label="Button"/>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxSecondaryButton } from '@basmilius/flux'; // [!code focus]
</script>
```

```ts
import '@basmilius/flux/style.css';
```
