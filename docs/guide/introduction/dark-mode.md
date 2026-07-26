<script setup>
    import { FluxBadge, FluxBadgeStack, FluxDestructiveButton, FluxPane, FluxPaneBody, FluxPaneHeader, FluxPrimaryButton, FluxSecondaryButton, FluxTable, FluxTableCell, FluxTableHeader, FluxTableRow, FluxTooltip } from '@flux-ui/components';
</script>

# Dark mode

Flux includes full support for both light and dark mode, with a color system that adapts to each. Toggle dark mode by setting the `dark` attribute on the document element, as shown below.

Both panes below are on this same page, and neither of them cares what the page around them is doing.

<ThemePreview>
    <FluxPane>
        <FluxPaneHeader title="Elevation"/>
        <FluxPaneBody>
            A pane sits one level above the page. In light both are near-white and the shadow carries the height; in dark the layer itself has to.
        </FluxPaneBody>
    </FluxPane>
    <div style="display: flex; flex-wrap: wrap; gap: 9px;">
        <FluxPrimaryButton label="Save"/>
        <FluxSecondaryButton label="Cancel"/>
        <FluxDestructiveButton label="Delete"/>
    </div>
    <FluxBadgeStack>
        <FluxBadge label="Neutral"/>
        <FluxBadge color="primary" label="Primary"/>
        <FluxBadge color="info" label="Info"/>
        <FluxBadge color="success" label="Success"/>
        <FluxBadge color="warning" label="Warning"/>
        <FluxBadge color="danger" label="Danger"/>
    </FluxBadgeStack>
    <FluxTooltip content="A tooltip is inverted in both themes.">
        <FluxSecondaryButton label="Hover for a tooltip"/>
    </FluxTooltip>
    <FluxPane>
        <FluxTable>
            <template #header>
                <FluxTableRow>
                    <FluxTableHeader>Item</FluxTableHeader>
                    <FluxTableHeader>State</FluxTableHeader>
                </FluxTableRow>
            </template>
            <FluxTableRow>
                <FluxTableCell>Ordinary row</FluxTableCell>
                <FluxTableCell>Idle</FluxTableCell>
            </FluxTableRow>
            <FluxTableRow color="success">
                <FluxTableCell>Tinted row</FluxTableCell>
                <FluxTableCell>Done</FluxTableCell>
            </FluxTableRow>
            <FluxTableRow color="danger">
                <FluxTableCell>Tinted row</FluxTableCell>
                <FluxTableCell>Failed</FluxTableCell>
            </FluxTableRow>
        </FluxTable>
    </FluxPane>
</ThemePreview>

The attribute sets `color-scheme`, which every colour token resolves against. That has two useful consequences.

The attribute works on any element, not just the document, and it nests. A `dark` section on a light page flips every Flux component inside it:

```vue
<div dark>
    <FluxPane>This pane is dark, the page around it is not.</FluxPane>
</div>
```

And because `color-scheme` is what the browser itself reads, native UI follows without any extra styling: scrollbars, `<select>` popups, the date picker, autofill backgrounds and form controls.

## Following the operating system

If you want the theme to track the OS rather than a toggle, set `color-scheme` yourself and skip the JavaScript below entirely:

```css
:root {
    color-scheme: light dark;
}
```

## Functional API

::: code-group

```ts [theme.ts]
import { useRemembered } from '@flux-ui/internals'

const darkMode = useRemembered("dark-mode", false);

function toggleMode(): void {
    darkMode.value = !darkMode.value;

    if (darkMode.value) {
        document.documentElement.setAttribute("dark", "dark");
    } else {
        document.documentElement.removeAttribute("dark");
    }
}
```

```vue [App.vue]
<template>
    <!-- Your content here -->
</template>

<script 
    lang="ts"
    setup>
    import { onMounted } from 'vue'
    import { useRemembered } from '@flux-ui/internals'
    
    const darkMode = useRemembered("dark-mode", false);
    
    onMounted(() => {
        if (darkMode.value) {
            document.documentElement.setAttribute("dark", "dark");
        }
    });
</script>
```

:::
