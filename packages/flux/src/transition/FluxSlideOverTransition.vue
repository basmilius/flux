<template>
    <Transition
        :mode="mode"
        :enter-active-class="$style.slideOverTransitionEnterActive"
        :enter-from-class="$style.slideOverTransitionEnterFrom"
        :leave-active-class="$style.slideOverTransitionLeaveActive"
        :leave-to-class="$style.slideOverTransitionLeaveTo">
        <slot/>
    </Transition>
</template>

<script
    lang="ts"
    setup>
    import $style from '@/css/component/Overlay.module.scss';

    const {
        mode = 'out-in'
    } = defineProps<{
        readonly mode?: 'in-out' | 'out-in';
    }>();
</script>
