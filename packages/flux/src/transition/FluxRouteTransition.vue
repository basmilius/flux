<template>
    <Transition
        :mode="mode"
        :enter-active-class="isBack ? $style.routeTransitionBackEnterActive : $style.routeTransitionEnterActive"
        :enter-from-class="isBack ? $style.routeTransitionBackEnterFrom : $style.routeTransitionEnterFrom"
        :leave-active-class="isBack ? $style.routeTransitionBackLeaveActive : $style.routeTransitionLeaveActive"
        :leave-to-class="isBack ? $style.routeTransitionBackLeaveTo : $style.routeTransitionLeaveTo">
        <slot/>
    </Transition>
</template>

<script
    lang="ts"
    setup>
    import $style from '$flux/css/component/Transition.module.scss';

    const {
        mode = 'out-in'
    } = defineProps<{
        readonly isBack?: boolean;
        readonly mode?: 'in-out' | 'out-in';
    }>();
</script>
