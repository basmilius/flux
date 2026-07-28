# useApplicationContextRegistration

Registers the component that calls it as a context on the surrounding [`FluxApplication`](../components/application), for the lifetime of that component. The context is pushed when the component mounts, updated whenever the info changes and removed again before it unmounts, so the [Context stack](../components/menu/context-stack) and the [Context switcher](../components/menu/context-switcher) follow the route without any bookkeeping of your own.

Pass a getter rather than a plain object; it is watched, so a title that depends on loaded data ends up in the menu as soon as it arrives.

## Usage

```ts
import { useApplicationContextRegistration } from '@flux-ui/application';
import { computed } from 'vue';

const project = computed(() => store.project);

useApplicationContextRegistration(() => ({
    icon: 'folder',
    title: project.value?.name ?? 'Project',
    to: {name: 'project', params: {id: project.value?.id}}
}));
```

::: info
Outside a `FluxApplication` the composable does nothing at all. It does not throw, which is what lets a menu component be rendered on its own in a test or a story.
:::

## Type declarations

```ts
declare function useApplicationContextRegistration(
    info: () => Omit<FluxApplicationContextInfo, 'id'>
): void;
```

## Used by

- [Application menu](../components/menu/)
    - [Context](../components/menu/context)
