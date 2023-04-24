<template>
    <transition
        :mode="mode"
        name="flux-overlay">
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
    .flux-overlay {
        &-enter-active,
        &-leave-active {
            transition: opacity 420ms var(--swift-out);

            > .flux-pane {
                transition: 420ms var(--swift-out);
                transition-property: opacity, transform;
            }
        }

        &-enter,
        &-enter-from {
            opacity: 0;

            > .flux-pane {
                opacity: 0;
                transform: scale3d(1.1, 1.1, 1.1);
            }
        }

        &-leave-to {
            opacity: 0;

            > .flux-pane {
                opacity: 0;
                transform: scale3d(.9, .9, .9);
            }
        }
    }
</style>
