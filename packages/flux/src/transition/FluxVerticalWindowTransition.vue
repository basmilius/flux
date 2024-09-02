<template>
    <Transition
        :mode="mode"
        :enter-active-class="isBack ? styles.verticalWindowTransitionBackEnterActive : styles.verticalWindowTransitionEnterActive"
        :enter-from-class="isBack ? styles.verticalWindowTransitionBackEnterFrom : styles.verticalWindowTransitionEnterFrom"
        :leave-active-class="isBack ? styles.verticalWindowTransitionBackLeaveActive : styles.verticalWindowTransitionLeaveActive"
        :leave-to-class="isBack ? styles.verticalWindowTransitionBackLeaveTo : styles.verticalWindowTransitionLeaveTo">
        <slot/>
    </Transition>
</template>

<script
    lang="ts"
    setup>
    import styles from '@/css/component/Transition.module.scss';

    export type Props = {
        readonly isBack?: boolean;
        readonly mode?: 'in-out' | 'out-in';
    };

    withDefaults(defineProps<Props>(), {
        mode: 'out-in'
    });
</script>
