<template>
    <Transition
        :mode="mode"
        :enter-active-class="isBack ? $style.breakthroughTransitionBackEnterActive : $style.breakthroughTransitionEnterActive"
        :enter-from-class="isBack ? $style.breakthroughTransitionBackEnterFrom : $style.breakthroughTransitionEnterFrom"
        :leave-active-class="isBack ? $style.breakthroughTransitionBackLeaveActive : $style.breakthroughTransitionLeaveActive"
        :leave-to-class="isBack ? $style.breakthroughTransitionBackLeaveTo : $style.breakthroughTransitionLeaveTo">
        <slot/>
    </Transition>
</template>

<script
    lang="ts"
    setup>
    import type { VNode } from 'vue';
    import $style from '$flux/css/component/Transition.module.scss';

    const {
        mode = 'out-in'
    } = defineProps<{
        readonly isBack?: boolean;
        readonly mode?: 'in-out' | 'out-in';
    }>();

    defineSlots<{
        default(): VNode[];
    }>();
</script>
