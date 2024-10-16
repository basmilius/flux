<template>
    <Transition
        :mode="mode"
        :enter-active-class="$style.tooltipTransitionEnterActive"
        :enter-from-class="$style.tooltipTransitionEnterFrom"
        :leave-active-class="$style.tooltipTransitionLeaveActive"
        :leave-to-class="$style.tooltipTransitionLeaveTo">
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
        readonly mode?: 'in-out' | 'out-in';
    }>();
</script>
