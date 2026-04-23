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
    import type { VNode } from 'vue';
    import $style from '$flux/css/component/Overlay.module.scss';

    const {
        mode = 'out-in'
    } = defineProps<{
        readonly mode?: 'in-out' | 'out-in';
    }>();

    defineSlots<{
        default(): VNode[];
    }>();
</script>
