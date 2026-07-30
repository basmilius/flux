# useFlowInjection

Reads the controller of the surrounding [Flow](../components/flow). It exposes the reactive viewport, the node registry and the imperative viewport methods, which is what [Controls](../components/controls) and [Minimap](../components/minimap) are built on. Use it to build controls of your own: a zoom readout, a jump-to-node list, a button that frames one branch.

::: warning
The composable throws when it is called outside a `FluxFlow`.
:::

## Usage

```ts
import { useFlowInjection } from '@flux-ui/flow';

const flow = useFlowInjection();

flow.fitView();
flow.zoomTo(1.5);
```

The viewport is reactive, so a readout of your own follows the canvas:

```ts
const zoomLabel = computed(() => `${Math.round(flow.viewport.value.zoom * 100)}%`);
```

`nodes` is a registry of everything the flow measured, keyed by node id, so a control can frame or count nodes without owning the list itself:

```ts
const node = flow.getNode('verify');

// node?.position.value  where it sits in world coordinates
// node?.size.value      how large it turned out to be
```

::: tip
A `FluxFlow` also exposes the same methods on its own instance, so a parent that holds a template ref to the flow does not need this composable.
:::

## Type declarations

```ts
declare function useFlowInjection(): FluxFlowController;
```

The full shape of `FluxFlowController` is documented on [Flow](../components/flow).

## Used by

- [Controls](../components/controls)
- [Minimap](../components/minimap)
