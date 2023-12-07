<template>
    <Transition
        :mode="mode"
        name="flux-tooltip">
        <slot/>
    </Transition>
</template>

<script
    lang="ts"
    setup>
    export interface Props {
        readonly mode?: 'out-in' | 'in-out';
    }

    withDefaults(defineProps<Props>(), {
        mode: 'out-in'
    });
</script>

<style lang="scss">
    .flux-tooltip {
        &-enter-active,
        &-leave-active {
            transition: 210ms var(--swift-out);
            transition-property: opacity, scale;
        }

        &-enter-from {
            scale: .975;
        }

        &-enter-from,
        &-leave-to {
            opacity: 0;
        }
    }
</style>
