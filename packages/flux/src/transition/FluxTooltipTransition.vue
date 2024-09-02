<template>
    <Transition
        :mode="mode"
        :enter-active-class="styles.tooltipTransitionEnterActive"
        :enter-from-class="styles.tooltipTransitionEnterFrom"
        :leave-active-class="styles.tooltipTransitionLeaveActive"
        :leave-to-class="styles.tooltipTransitionLeaveTo">
        <slot/>
    </Transition>
</template>

<script
    lang="ts"
    setup>
    import styles from '@/css/component/Transition.module.scss';

    export type Props = {
        readonly mode?: 'out-in' | 'in-out';
    };

    withDefaults(defineProps<Props>(), {
        mode: 'out-in'
    });
</script>
