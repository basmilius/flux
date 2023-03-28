<template>
    <transition
        :mode="mode"
        :name="isBack ? 'flux-vertical-window-back' : 'flux-vertical-window'">
        <slot/>
    </transition>
</template>

<script
    lang="ts"
    setup>
    export interface Props {
        readonly isBack?: boolean;
        readonly mode: 'in-out' | 'out-in';
    }

    withDefaults(defineProps<Props>(), {
        mode: 'out-in'
    });
</script>

<style lang="scss">
    .flux-vertical-window {
        overflow: auto;
        transition: height 150ms var(--deceleration-curve);

        &-enter-active,
        &-back-enter-active {
            transition: 150ms var(--deceleration-curve);
            transition-property: opacity, transform;
        }

        &-leave-active,
        &-back-leave-active {
            transition: 150ms var(--acceleration-curve);
            transition-property: opacity, transform;
        }

        &-enter,
        &-enter-from,
        &-back-leave-to {
            opacity: 0;
            transform: translate3d(15px, 0, 0);
        }

        &-leave-to,
        &-back-enter,
        &-back-enter-from {
            opacity: 0;
            transform: translate3d(-15px, 0, 0);
        }
    }
</style>
