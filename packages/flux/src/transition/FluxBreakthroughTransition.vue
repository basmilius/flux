<template>
    <Transition
        :mode="mode"
        :enter-active-class="isBack ? styles.breakthroughTransitionBackEnterActive : styles.breakthroughTransitionEnterActive"
        :enter-from-class="isBack ? styles.breakthroughTransitionBackEnterFrom : styles.breakthroughTransitionEnterFrom"
        :leave-active-class="isBack ? styles.breakthroughTransitionBackLeaveActive : styles.breakthroughTransitionLeaveActive"
        :leave-to-class="isBack ? styles.breakthroughTransitionBackLeaveTo : styles.breakthroughTransitionLeaveTo">
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
