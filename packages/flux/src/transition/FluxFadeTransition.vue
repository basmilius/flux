<template>
    <Transition
        :mode="mode"
        :enter-active-class="styles.fadeTransitionEnterActive"
        :enter-from-class="styles.fadeTransitionEnterFrom"
        :enter-to-class="styles.fadeTransitionEnterTo"
        :leave-active-class="styles.fadeTransitionLeaveActive"
        :leave-from-class="styles.fadeTransitionLeaveFrom"
        :leave-to-class="styles.fadeTransitionLeaveTo">
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
