<template>
    <flux-pane class="api-component flux-typography-aware">
        <flux-pane-header
            class="api-component-header api-components-header"
            title="Components"/>

        <api-table title="Components">
            <template #head>
                <tr>
                    <th>Name</th>
                    <th>When to use</th>
                </tr>
            </template>
            <template #body>
                <slot/>
            </template>
        </api-table>
    </flux-pane>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneHeader } from '@fancee/flux';
    import { useSlots } from 'vue';
    import { ApiTable } from '.';

    const slots = useSlots();
</script>

<style lang="scss">
    .api-components-header .flux-pane-header-title {
        color: var(--foreground-prominent);
        font-family: unset;
        font-size: 15px;
        font-weight: 700;

        &::before,
        &::after {
            display: none;
            color: var(--foreground-prominent);
        }
    }
</style>
