<template>
    <nav
        v-focus-trap
        class="flux-menu"
        :class="{'is-large': isLarge}">
        <slot/>
    </nav>
</template>

<script
    lang="ts"
    setup>
    import { focusTrap } from '../directives';

    export interface Props {
        readonly isLarge?: boolean;
    }

    defineProps<Props>();

    const vFocusTrap = focusTrap;
</script>

<style lang="scss">
    .flux-menu {
        display: flex;
        flex-flow: column;
        gap: 9px;
    }

    .flux-menu .flux-separator {
        margin-left: 0;
        margin-right: 0;
    }

    .flux-pane > .flux-menu {
        margin-left: 9px;
        margin-right: 9px;

        &:first-child {
            margin-top: 9px;
        }

        &:last-child {
            margin-bottom: 9px;
        }

        .flux-separator {
            margin-left: -9px;
            margin-right: -9px;
        }
    }

    .flux-expandable-body > .flux-menu {
        margin-left: 9px;
        margin-right: 9px;

        &:last-child {
            margin-bottom: 9px;
        }

        > .flux-separator {
            margin-left: 21px;
            margin-right: 21px;
        }
    }
</style>
