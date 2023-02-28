<template>
    <div
        class="flux-separator"
        :class="{
            'flux-separator-horizontal': axis === 'horizontal',
            'flux-separator-vertical': axis === 'vertical'
        }"/>
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
        background: var(--surface-stroke);

        &-horizontal {
            height: 1px;
        }

        &-vertical {
            width: 1px;
        }
    }
</style>
