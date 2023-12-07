<template>
    <Transition
        :mode="mode"
        :name="isBack ? 'flux-breakthrough-back' : 'flux-breakthrough'">
        <slot/>
    </Transition>
</template>

<script
    lang="ts"
    setup>
    export interface Props {
        readonly isBack?: boolean;
        readonly mode?: 'in-out' | 'out-in';
    }

    withDefaults(defineProps<Props>(), {
        mode: 'out-in'
    });
</script>

<style lang="scss">
    .flux-breakthrough {
        &-enter-active,
        &-back-enter-active,
        &-leave-active,
        &-back-leave-active {
            transform-origin: top center;
            transition-property: opacity, scale, translate;
        }

        &-enter-active,
        &-back-enter-active {
            transition-duration: 180ms;
            transition-timing-function: var(--deceleration-curve);
        }

        &-leave-active,
        &-back-leave-active {
            transition-duration: 120ms;
            transition-timing-function: var(--acceleration-curve);
        }

        &-enter,
        &-enter-from,
        &-back-leave-to {
            opacity: 0;
            scale: .975;
        }

        &-leave-to,
        &-back-enter,
        &-back-enter-from {
            opacity: 0;
            scale: 1.025;
        }
    }
</style>
