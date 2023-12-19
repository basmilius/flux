<template>
    <nav
        class="flux-menu-group"
        :class="{'is-horizontal': isHorizontal}">
        <slot/>
    </nav>
</template>

<script
    lang="ts"
    setup>
    export interface Props {
        readonly isHorizontal?: boolean;
    }

    defineProps<Props>();
</script>

<style lang="scss">
    .flux-menu-group {
        display: flex;
        flex-flow: column;
        gap: 1px;

        &.is-horizontal {
            flex-flow: row;
            gap: 3px;
        }

        > .flux-form-input {
            margin-bottom: 9px;
        }
    }
</style>
