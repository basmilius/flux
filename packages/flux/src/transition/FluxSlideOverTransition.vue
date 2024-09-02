<template>
    <Transition
        :mode="mode"
        :enter-active-class="styles.slideOverTransitionEnterActive"
        :enter-from-class="styles.slideOverTransitionEnterFrom"
        :leave-active-class="styles.slideOverTransitionLeaveActive"
        :leave-to-class="styles.slideOverTransitionLeaveTo">
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
