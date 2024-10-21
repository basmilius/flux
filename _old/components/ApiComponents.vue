<template>
    <FluxPane
        :class="[$style.apiComponent, $style.apiComponents]"
        data-typography-aware>
        <FluxPaneHeader
            :class="$style.apiComponentHeader"
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
    import { FluxPane, FluxPaneHeader } from '@basmilius/flux';
    import ApiTable from './ApiTable.vue';
</script>

<style
    lang="scss"
    module>
    .apiComponent.apiComponents .apiComponentHeader :is(strong) {
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
