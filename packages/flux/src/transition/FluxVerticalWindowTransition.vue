<template>
    <Transition
        :mode="mode"
        :enter-active-class="isBack ? $style.verticalWindowTransitionBackEnterActive : $style.verticalWindowTransitionEnterActive"
        :enter-from-class="isBack ? $style.verticalWindowTransitionBackEnterFrom : $style.verticalWindowTransitionEnterFrom"
        :leave-active-class="isBack ? $style.verticalWindowTransitionBackLeaveActive : $style.verticalWindowTransitionLeaveActive"
        :leave-to-class="isBack ? $style.verticalWindowTransitionBackLeaveTo : $style.verticalWindowTransitionLeaveTo">
        <slot/>
    </Transition>
</template>

<script
    lang="ts"
    setup>
    import $style from '@/css/component/Transition.module.scss';

    const {
        mode = 'out-in'
    } = defineProps<{
        readonly isBack?: boolean;
        readonly mode?: 'in-out' | 'out-in';
    }>();
</script>
