<template>
    <Transition
        :mode="mode"
        name="flux-fade">
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
    .flux-fade {
        &-enter-active,
        &-leave-active {
            transition: opacity 150ms var(--swift-out);
        }

        &-enter,
        &-enter-from,
        &-leave-to {
            opacity: 0;
        }
    }
</style>
