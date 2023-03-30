<template>
    <th
        class="flux-table-cell flux-table-header"
        :class="{
            'is-shrinking': isShrinking,
            'is-sticky': isSticky
        }">
        <slot/>
    </th>
</template>

<script
    lang="ts"
    setup>
    export interface Props {
        readonly isShrinking?: boolean;
        readonly isSticky?: boolean;
        readonly minWidth?: number;
    }

    withDefaults(defineProps<Props>(), {
        minWidth: 0
    });
</script>

<style lang="scss">
    .flux-table-header {
        min-width: calc(v-bind(minWidth) * 1px);
        padding: 15px;
        background: rgb(var(--gray-0));
        border-bottom: 2px solid rgb(var(--gray-4) / .75);
        color: var(--foreground-prominent);
        font-size: 14px;
        vertical-align: middle;

        &.is-shrinking {
            width: 0;
            white-space: nowrap;
        }

        &.is-sticky {
            position: sticky;
            top: 0;
            background: rgb(var(--gray-1));
        }
    }
</style>
