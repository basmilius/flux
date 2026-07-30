---
outline: deep
---

# PR #40 test page

::: danger Temporary
This page exists to review [PR #40](https://github.com/basmilius/flux/pull/40) by hand. Delete `docs/temp-pr40.md`, `docs/code/temp-pr40/` and the sidebar entry before merging.
:::

Every section below covers one thing that changed behaviour rather than shape, so the build cannot catch it. The order is the one from the [review guide](https://dropoff.sh/p/4dxi4muoqgm): most risk first.

## 1. FluxPressable href validation

The one to check first. `sanitizeUrl` was consolidated, reverted, and replaced with `isDangerousUrl`, and it sits behind every component that takes an `href`.

::: render
render=./code/temp-pr40/pressable.vue
:::

::: tip What broke in between
The intermediate version normalized the URL, so a space disappeared from the path, and used an allowlist, so `blob:` and app schemes ended up inert. Both must be gone.
:::

## 2. useScrollPosition timing

::: render
render=./code/temp-pr40/scroll.vue
:::

## 3. The moved components

::: render
render=./code/temp-pr40/subfolders.vue
:::

## 4. useId instead of useComponentId

::: render
render=./code/temp-pr40/useid.vue
:::

## 5. The clamp conversions

::: render
render=./code/temp-pr40/clamp.vue
:::

## What this page cannot test

- **useEventListener without a passive default.** Scroll performance under a listener is not visible in a demo. Read `FluxTabBar` and `FluxContextMenu`, which now pass `{passive: true}` explicitly, and check the six other call sites for a `preventDefault` that would need `{passive: false}`.
- **The peer dependency change.** It only shows up when publishing. Check `.github/workflows/released.yml:61-68`: the `sed` must turn `workspace:^` into `^<version>` and not into a bare version, otherwise the peers pin exactly and the whole change is pointless.
- **The pinia and vue-router build blocker.** Needs a consumer project without those two installed. Deliberately not fixed; see the review guide.
- **SSR hydration.** The docs build renders on the server, so a mismatch would surface there, but a real Nuxt app exercises it better.
