<template>
    <Transition
        :mode="mode"
        :enter-active-class="$style.bottomSheetTransitionEnterActive"
        :enter-from-class="$style.bottomSheetTransitionEnterFrom"
        :leave-active-class="$style.bottomSheetTransitionLeaveActive"
        :leave-to-class="$style.bottomSheetTransitionLeaveTo">
        <slot/>
    </Transition>
</template>

<script
    lang="ts"
    setup>
    import type { VNode } from 'vue';
    import $style from '~flux/components/css/component/BottomSheet.module.scss';

    const {
        mode = 'out-in'
    } = defineProps<{
        readonly mode?: 'in-out' | 'out-in';
    }>();

    defineSlots<{
        default(): VNode[];
    }>();
</script>
