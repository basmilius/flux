# Installation

To start using Flux Flow in your Vue application, you'll need to add it to your project alongside `@flux-ui/components`, which provides the shared primitives (icons, tags, badges) that the flow cards build on.

## Step 1

Open your project's root directory in your terminal and run the following command:

::: code-group

```shell [bun]
bun add @flux-ui/flow @flux-ui/components
```

```shell [pnpm]
pnpm install @flux-ui/flow @flux-ui/components
```

```shell [yarn]
yarn add @flux-ui/flow @flux-ui/components
```

```shell [npm]
npm install @flux-ui/flow @flux-ui/components
```

:::

## Step 2

Once the installation is complete, add the following lines to your `main.ts` file:

```ts [main.ts]
import '@flux-ui/flow/style.css'
import '@flux-ui/components/style.css'
```

## Step 3

Make sure the icons used by your flow cards are registered with Font Awesome, then import the components you want to use:

```vue [Flow.vue]
<template>
    <FluxFlow> <!-- [!code focus:11] -->
        <FluxFlowNode id="trigger" :x="0" :y="0">
            <FluxFlowTriggerCard title="Order Placed"/>
        </FluxFlowNode>

        <FluxFlowNode id="ship" :x="0" :y="240">
            <FluxFlowActionCard title="Create Shipment"/>
        </FluxFlowNode>

        <FluxFlowConnection from="trigger" to="ship"/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowConnection, FluxFlowNode, FluxFlowTriggerCard } from '@flux-ui/flow' // [!code focus:2]
</script>
```

::: tip
By default `FluxFlow` sizes its own height to its content, so it drops inline without a wrapper. Add `interactive` for a fixed-size, pannable canvas instead (give that a sized parent).
:::
