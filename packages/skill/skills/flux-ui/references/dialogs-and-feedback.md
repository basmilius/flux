# Dialogs & feedback

Flux offers **two distinct ways** to show a dialog. Choosing the right one is
the main decision; the APIs don't mix. All four `show*` functions are named
exports from `@flux-ui/components` and require a mounted `FluxRoot` (they
**throw** otherwise — see `references/conventions.md`).

## Decision: programmatic vs template-driven

| Use case                                              | Reach for |
| ----------------------------------------------------- | --------- |
| Complex form, wizard, or deep-link/route target       | `FluxOverlay` (or `FluxSlideOver`), rendered with `v-if`/route |
| Confirm a destructive action ("Are you sure?")        | `showConfirm` |
| One-off message after an action                       | `showSnackbar` |
| Ask for a single value (rename, enter URL, …)         | `showPrompt` |
| Fatal error / forced acknowledgement                  | `showAlert` |

Rule of thumb: **more than one input, or must survive a reload (deep-link) →
`FluxOverlay` via the router.** Anything short and ephemeral → a programmatic
`show*` function. Do **not** mount a `FluxOverlay` from inside a programmatic
dialog handler; route to the overlay and `router.push` from the handler instead.

All `show*` specs share `title` (**required**), `message` (**required**) and an
optional `icon` (registered FA name). Exact options are on each `attention/*`
doc page.

## showConfirm — `Promise<boolean>`

The dominant real-app loop is **confirm → act → snackbar** (see
`references/patterns.md` §4):

```ts
import { showConfirm, showSnackbar } from '@flux-ui/components';

async function deleteProject(project: Project): Promise<void> {
  const confirmed = await showConfirm({
    icon: 'trash',
    title: 'Delete project',
    message: `Delete "${project.name}"? This cannot be undone.`
  });
  if (!confirmed) return;

  await api.deleteProject(project.id);
  showSnackbar({ icon: 'circle-check', color: 'success', message: 'Project deleted.' });
}
```

## showPrompt — `Promise<string | false>`

Resolves to the entered string, or **`false`** when cancelled (not `null`).
Adds `fieldLabel` (required) and optional `fieldPlaceholder` / `fieldType`.

```ts
import { showPrompt } from '@flux-ui/components';

const name = await showPrompt({
  icon: 'pen',
  title: 'Rename workspace',
  message: 'Enter a new name for this workspace.',
  fieldLabel: 'Name',
  fieldPlaceholder: 'E.g. Acme Inc.'
});
if (name !== false) await api.renameWorkspace(name); // false === cancelled
```

## showAlert — `Promise<void>`

For fatal errors / forced acknowledgement. Spec: `icon?`, `title`, `message`.

## showSnackbar — `Promise<void>` (resolves when it closes)

`showSnackbar` shows a transient snackbar and returns `Promise<void>` (or `void`)
— it resolves when the snackbar closes. **It does not return an updatable
handle.** Option fields: `icon`, `title`, `message`, `subMessage`, `color`,
`isCloseable`, `isLoading`, `actions`, plus an optional `duration`, and the
progress fields `progressIndeterminate`, `progressValue`, `progressMin`,
`progressMax`, `progressStatus`.

```ts
import { showSnackbar } from '@flux-ui/components';
showSnackbar({ icon: 'circle-check', color: 'success', message: 'Saved.' });
```

### Live-updating a snackbar (progress)

To drive a progress snackbar you manage it through the store, which exposes the
id and an update method (`showSnackbar` alone can't be updated):

```ts
import { useFluxStore } from '@flux-ui/components';

const store = useFluxStore();
const id = store.addSnackbar({
  icon: 'cloud-arrow-up',
  title: 'Uploading…',
  progressIndeterminate: true,
  isCloseable: false
});

await uploadFile(file, progress => {
  store.updateSnackbar(id, {
    progressIndeterminate: false,
    progressValue: progress,
    progressMax: 100,
    progressStatus: `${progress}%`
  });
});

store.updateSnackbar(id, { icon: 'circle-check', color: 'success', title: 'Uploaded', isCloseable: true });
// store.removeSnackbar(id) to dismiss programmatically
```

## Template-driven surfaces

- `FluxOverlay` — show it conditionally (`v-if`) or via a route. Best when the
  dialog has its own UI/lifecycle.
- `FluxSlideOver` — same idea, slides in from the edge.
- `FluxFlyout` — anchored popover for menus/pickers.
- `FluxTooltip` — hover/focus tooltips (`useTooltipInjection` for custom anchors).
  Also depends on `FluxRoot` (renders via the internal tooltip provider).

> ⚠ **Put the `v-if` on the pane *inside* the overlay/slide-over, never on the
> `FluxOverlay`/`FluxSlideOver` itself.** Keep `@close` (and `is-closeable`) on the
> overlay; toggle only its content:
> ```vue
> <FluxSlideOver is-closeable @close="selected = null">
>   <FluxPane v-if="selected"> … uses selected.* … </FluxPane>
> </FluxSlideOver>
> ```
> Both run through `createDialogRenderer`, which on every render inspects its
> default slot and sets *visible = there is a non-Comment child*. A `v-if="false"`
> renders a Comment node, so the surface **stays mounted and plays its leave
> transition** (and keeps its dialog registration, focus-trap and Esc handling).
> A `v-if` on the `FluxSlideOver`/`FluxOverlay` element unmounts the whole thing
> immediately → no exit animation. Content in the leaving branch isn't re-evaluated
> during the leave, so `selected.*` bindings are safe. (Route-driven overlays — a
> named `overlay`/`over` `<RouterView>`, see `references/patterns.md` §1 — use no
> `v-if`; they mount/unmount with the route, which is fine.)

## Inline (non-blocking) feedback

`FluxNotice` (+ `FluxNoticeStack`), `FluxBadge`, `FluxTag`, `FluxChip`,
`FluxInfo`, `FluxProgressBar`, `FluxSpinner`, `FluxSkeleton`. Use these for
status that shouldn't interrupt the user. `FluxProgressBar` takes `value` (0–1, or
set `:max`), optional `status`, and a `color` (`FluxColor`, default `primary`) for
the fill — reach for it instead of hand-rolling a track/fill `<div>`.

> **Two conventions for these:** (1) put **more than one** notice/badge/tag/info in
> its **stack** — `FluxNoticeStack`, `FluxBadgeStack`, `FluxTagStack`,
> `FluxInfoStack` — rather than loose siblings; the stack owns the spacing.
> (2) `FluxNotice`'s **`is-fluid` is only for a genuinely full-width context** (e.g.
> an app-level banner placed directly in `FluxApplication`). Inside a constrained
> `FluxApplicationContent` section/grid it makes the notice overrun — leave it off
> there.
