<template>
    <TransitionGroup
        :appear="appear"
        :tag="tag"
        :class="$style.staggerTransition"
        :style="{
            '--stagger-delay': `${delay}ms`,
            '--stagger-max': `${max}ms`
        }"
        :enter-active-class="$style.staggerTransitionEnterActive"
        :enter-from-class="$style.staggerTransitionEnterFrom"
        :leave-active-class="$style.staggerTransitionLeaveActive"
        :leave-to-class="$style.staggerTransitionLeaveTo"
        :move-class="$style.staggerTransitionMove"
        @before-enter="applyIndex">
        <slot/>
    </TransitionGroup>
</template>

<script
    lang="ts"
    setup>
    import { isHtmlElement } from '@basmilius/utils';
    import { nextTick, type VNode } from 'vue';
    import $style from '~flux/components/css/component/Transition.module.scss';

    const {
        delay = 30,
        max = 300,
        tag = 'div'
    } = defineProps<{
        readonly appear?: boolean;
        readonly delay?: number;
        readonly max?: number;
        readonly tag?: keyof HTMLElementTagNameMap;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();

    let index = 0;
    let isResetScheduled = false;

    function applyIndex(elm: Element): void {
        if (!isHtmlElement(elm)) {
            return;
        }

        elm.style.setProperty('--index', index.toString());
        ++index;

        if (isResetScheduled) {
            return;
        }

        isResetScheduled = true;

        nextTick(() => {
            index = 0;
            isResetScheduled = false;
        });
    }
</script>
