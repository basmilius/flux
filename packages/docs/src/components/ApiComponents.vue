<template>
    <FluxPane class="api-component flux-typography-aware">
        <FluxPaneHeader
            class="api-component-header api-components-header"
            title="Components"/>

        <ApiTable title="Components">
            <template #head>
                <tr>
                    <th>Name</th>
                    <th>When to use</th>
                </tr>
            </template>

            <template #body>
                <slot/>
            </template>
        </ApiTable>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneHeader } from '@fancee/flux';
    import ApiTable from './ApiTable.vue';
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
