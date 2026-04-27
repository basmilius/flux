<script setup>
    import { FluxPane, FluxTable, FluxTableRow, FluxTableCell, FluxTableHeader } from '@flux-ui/components';
</script>

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

<FluxPane>
    <FluxTable>
        <template #header>
            <FluxTableRow>
                <FluxTableHeader>Name</FluxTableHeader>
                <FluxTableHeader>Type</FluxTableHeader>
                <FluxTableHeader>Default</FluxTableHeader>
                <FluxTableHeader>Description</FluxTableHeader>
            </FluxTableRow>
        </template>
        <FluxTableRow>
            <FluxTableCell><code>name</code></FluxTableCell>
            <FluxTableCell><code>string</code></FluxTableCell>
            <FluxTableCell><code>'menu'</code></FluxTableCell>
            <FluxTableCell>The name of the named route view to look for in the matched route records.</FluxTableCell>
        </FluxTableRow>
    </FluxTable>
</FluxPane>
