<template>
    <div
        class="flux-separator"
        :class="{
            'is-horizontal': axis === 'horizontal',
            'is-vertical': axis === 'vertical'
        }"
        role="separator"/>
</template>

<script
    lang="ts"
    setup>
    export interface Props {
        readonly axis?: 'horizontal' | 'vertical';
    }

    withDefaults(defineProps<Props>(), {
        axis: 'horizontal'
    });
</script>

<style lang="scss">
    .flux-separator {
        background: rgb(var(--gray-3));

        &.is-horizontal {
            height: 1px;
        }

        &.is-vertical {
            width: 1px;
        }
    }
</style>
