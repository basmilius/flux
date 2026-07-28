<template>
    <Transition
        :appear="appear"
        :mode="mode"
        :enter-active-class="$style.scaleTransitionEnterActive"
        :enter-from-class="$style.scaleTransitionEnterFrom"
        :leave-active-class="$style.scaleTransitionLeaveActive"
        :leave-to-class="$style.scaleTransitionLeaveTo"
        @before-enter="applyVariables"
        @before-leave="applyVariables">
        <slot/>
    </Transition>
</template>

<script
    lang="ts"
    setup>
    import { isHtmlElement } from '@basmilius/utils';
    import type { VNode } from 'vue';
    import $style from '~flux/components/css/component/Transition.module.scss';

    const {
        from = .95,
        mode = 'out-in',
        origin = 'center'
    } = defineProps<{
        readonly appear?: boolean;
        readonly from?: number;
        readonly mode?: 'in-out' | 'out-in';
        readonly origin?: string;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();

    function applyVariables(elm: Element): void {
        if (!isHtmlElement(elm)) {
            return;
        }

        elm.style.setProperty('--scale-from', from.toString());
        elm.style.setProperty('--scale-origin', origin);
    }
</script>
