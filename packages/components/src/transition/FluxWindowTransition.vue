<template>
    <Transition
        :mode="mode"
        :enter-active-class="isBack ? $style.windowTransitionBackEnterActive : $style.windowTransitionEnterActive"
        :enter-from-class="isBack ? $style.windowTransitionBackEnterFrom : $style.windowTransitionEnterFrom"
        :leave-active-class="isBack ? $style.windowTransitionBackLeaveActive : $style.windowTransitionLeaveActive"
        :leave-to-class="isBack ? $style.windowTransitionBackLeaveTo : $style.windowTransitionLeaveTo">
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
