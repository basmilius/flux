<template>
    <Transition
        :mode="mode"
        :enter-active-class="$style.overlayTransitionEnterActive"
        :enter-from-class="$style.overlayTransitionEnterFrom"
        :leave-active-class="$style.overlayTransitionLeaveActive"
        :leave-to-class="$style.overlayTransitionLeaveTo">
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
