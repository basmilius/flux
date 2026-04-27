# useApplicationContextMenu

This composable inspects the current route tree for routes that expose a named view and reports whether a context menu should be rendered. Use it to conditionally render UI that depends on whether the current route has its own context menu — for example a back button in a custom top bar.

## Usage

```ts
import { useApplicationContextMenu } from '@flux-ui/application';

const {hasContextMenu, contextMenuKey} = useApplicationContextMenu();
```

## Type declarations

```ts
declare function useApplicationContextMenu(name?: string): UseApplicationContextMenu;

type UseApplicationContextMenu = {
    readonly contextMenuKey: ComputedRef<string | undefined>;
    readonly hasContextMenu: ComputedRef<boolean>;
};
```

## Parameters

| Name   | Type     | Default  | Description                                                                                       |
|--------|----------|----------|---------------------------------------------------------------------------------------------------|
| `name` | `string` | `'menu'` | The name of the named route view to look for in the matched route records.                       |
