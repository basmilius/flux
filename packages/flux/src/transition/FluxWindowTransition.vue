<template>
    <Transition
        :mode="mode"
        :enter-active-class="isBack ? styles.windowTransitionBackEnterActive : styles.windowTransitionEnterActive"
        :enter-from-class="isBack ? styles.windowTransitionBackEnterFrom : styles.windowTransitionEnterFrom"
        :leave-active-class="isBack ? styles.windowTransitionBackLeaveActive : styles.windowTransitionLeaveActive"
        :leave-to-class="isBack ? styles.windowTransitionBackLeaveTo : styles.windowTransitionLeaveTo">
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
