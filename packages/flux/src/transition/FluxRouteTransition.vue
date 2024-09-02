<template>
    <Transition
        :mode="mode"
        :enter-active-class="isBack ? styles.routeTransitionBackEnterActive : styles.routeTransitionEnterActive"
        :enter-from-class="isBack ? styles.routeTransitionBackEnterFrom : styles.routeTransitionEnterFrom"
        :leave-active-class="isBack ? styles.routeTransitionBackLeaveActive : styles.routeTransitionLeaveActive"
        :leave-to-class="isBack ? styles.routeTransitionBackLeaveTo : styles.routeTransitionLeaveTo">
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
