<template>
    <transition
        :mode="mode"
        name="flux-slide-over">
        <slot/>
    </transition>
</template>

<script
    lang="ts"
    setup>
    export interface Props {
        readonly mode?: 'in-out' | 'out-in';
    }

    withDefaults(defineProps<Props>(), {
        mode: 'out-in'
    });
</script>

<style lang="scss">
    .flux-slide-over {
        &-enter-active,
        &-leave-active {
            transition: opacity 600ms var(--swift-out);

            > .flux-pane {
                transition: 600ms var(--swift-out);
                transition-property: opacity, transform;
            }
        }

        &-enter,
        &-enter-from,
        &-leave-to {
            opacity: 0;
            transition-delay: 210ms;

            > .flux-pane {
                transform: translate3d(100%, 0, 0);
            }
        }
    }
</style>
