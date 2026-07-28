<template>
    <Transition
        :mode="mode"
        :enter-active-class="$style.sheetTransitionEnterActive"
        :enter-from-class="$style.sheetTransitionEnterFrom"
        :leave-active-class="$style.sheetTransitionLeaveActive"
        :leave-to-class="$style.sheetTransitionLeaveTo">
        <slot/>
    </Transition>
</template>

<script
    lang="ts"
    setup>
    import type { VNode } from 'vue';
    import $style from '~flux/components/css/component/Sheet.module.scss';

    const {
        mode = 'out-in'
    } = defineProps<{
        readonly mode?: 'in-out' | 'out-in';
    }>();

    defineSlots<{
        default(): VNode[];
    }>();
</script>
