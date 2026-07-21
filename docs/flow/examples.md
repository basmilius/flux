---
outline: deep
---

# Examples

The component pages each cover one building block in isolation. This page does the opposite: complete flows, built the way you would build them in an app. Every example is runnable, so open the Code tab to see the whole thing, positions and wiring included.

## Automations

::: example Routing rules || A trigger pill heads the flow, numbered markers run down the trunk, and every condition fans out to a labeled branch. This is the shape most automation builders end up with.
example=../code/flow/examples/routing.vue
:::

::: example Deploy pipeline || A CI/CD flow: a push builds an image, tests gate the release, and the outcome branches to a deploy or an alert. Colored and dashed connectors separate the happy path from the failure path.
example=../code/flow/examples/deploy.vue
:::

::: example Knowledge graph || Data sources feeding structured skills that compile into an output. It combines card rows, colored and dashed connectors and endpoint markers into one dense canvas.
example=../code/flow/examples/knowledge.vue
:::

::: example Branching on ports || A fraud check whose two outcomes each carry their own port, so a branch leaves the card at the answer it belongs to. Terminals open and close the run, and a note explains the manual step.
example=../code/flow/examples/ports.vue
:::

## Live flows

Nothing about a card is read only. Because the body is plain markup, controls inside it keep working on the canvas, which lets a flow double as the control surface for the process it draws.

::: example Enable and disable || A FluxToggle in the trigger card switches the automation on and off; the downstream cards and connectors follow its state.
example=../code/flow/examples/enable.vue
:::

::: example Approval step || A FluxSecondaryButton in a card footer resolves an approval, which activates the next node and fills its connector.
example=../code/flow/examples/approval.vue
:::

::: example Run on demand || A FluxPrimaryButton kicks off a run: a FluxStatisticsMeter animates the build while the connectors fill from stage to stage.
example=../code/flow/examples/live.vue
:::

::: example Running pipeline || A nightly sync walks its own stages: the step that is busy carries a spinner in place of its icon, its connector fills while it runs, and a finished stage flips to a check and a Done badge.
example=../code/flow/examples/running.vue
:::

## Used components

- [Flow](./components/flow)
- [Node](./components/node)
- [Connection](./components/connection)
- [Port](./components/port)
- [Card](./components/card)
- [Pill](./components/pill)
- [Step](./components/step)
- [Terminal](./components/terminal)
- [Note](./components/note)
