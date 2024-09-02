<template>
    <Transition
        :mode="mode"
        :enter-active-class="styles.overlayTransitionEnterActive"
        :enter-from-class="styles.overlayTransitionEnterFrom"
        :leave-active-class="styles.overlayTransitionLeaveActive"
        :leave-to-class="styles.overlayTransitionLeaveTo">
        <slot/>
    </Transition>
</template>

<script
    lang="ts"
    setup>
    import styles from '@/css/component/Overlay.module.scss';

    export type Props = {
        readonly mode?: 'in-out' | 'out-in';
    };

    withDefaults(defineProps<Props>(), {
        mode: 'out-in'
    });
</script>
