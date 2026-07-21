# Flux Flow

Flux Flow is a collection of declarative building blocks for displaying node based flows: automations, pipelines, decision trees and agent workflows. You compose a flow from plain Vue markup, positioning cards on a pannable canvas and wiring them together with connectors, without reaching for a heavyweight graph library.

The toolkit is display oriented. A full editor (dragging nodes, drawing connections) is intentionally out of scope, but the primitives are shaped so an editor can be layered on top later.

::: render
render=../code/flow/components/flow/preview.vue
:::

## Highlights

- **Declarative.** Write nodes and connectors as Vue markup; connectors reference nodes by id, so cards stay free of wiring props.
- **Opinionated cards.** A base `FluxFlowCard` plus `Trigger`, `Condition` and `Action` variants give you a Flux styled node surface in a single line, always headed by its type icon.
- **Small nodes too.** A `FluxFlowPill` heads a flow with a single named trigger, and a `FluxFlowStep` marks the steps running down its trunk.
- **Runnable.** Connectors accept a `progress-color` and `progress-value`, so you can visualize a flow while it runs.
- **Read only viewport.** Drag to pan, `ctrl`/`cmd` + scroll to zoom, and the canvas fits its content on mount.

Head straight for [Examples](./examples) to see complete flows, or start with [Flow](./components/flow) for the canvas itself.
