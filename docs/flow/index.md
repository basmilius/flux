# Flux Flow

Flux Flow is a collection of declarative building blocks for displaying node based flows: automations, pipelines, decision trees and agent workflows. You compose a flow from plain Vue markup, positioning cards on a pannable canvas and wiring them together with connectors, without reaching for a heavyweight graph library.

The toolkit is display oriented. A full editor (dragging nodes, drawing connections) is intentionally out of scope, but the primitives are shaped so an editor can be layered on top later.

::: render
render=../code/flow/components/flow/preview.vue
:::

## Highlights

- **Declarative.** Write nodes and connectors as Vue markup; connectors reference nodes by id, so cards stay free of wiring props.
- **Opinionated cards.** A base `FluxFlowCard` plus `Trigger`, `Condition` and `Action` variants give you a Flux styled node surface in a single line, always headed by its type icon.
- **Small nodes too.** A `FluxFlowPill` heads a flow with a single named trigger, a `FluxFlowTerminal` opens and closes it, a `FluxFlowStep` marks the steps running down its trunk, a `FluxFlowJunction` knots lines together and a `FluxFlowNote` annotates the canvas.
- **Named branches.** A `FluxFlowPort` marks a point inside a card, so the branches of a condition leave it at the outcome they belong to, and a `FluxFlowGate` says out loud whether they meet on `and`, `or` or `xor`.
- **Layout that is not yours to do by hand.** A `FluxFlowChain` places a run of steps and wires it up, `useFlowLayout` turns a branching graph into coordinates, and a `FluxFlowGroup` or a `FluxFlowLane` frames the part of the canvas that belongs together.
- **Runnable.** Connectors accept a `progress-color` and `progress-value`, so you can visualize a flow while it runs.
- **Read only viewport.** Drag to pan, `ctrl`/`cmd` + scroll to zoom, and the canvas fits its content on mount.

Head straight for [Examples](./examples) to see complete flows, or start with [Flow](./components/flow) for the canvas itself.
