<template>
    <FluxFadeTransition>
        <slot
            v-if="isVisible"
            :css-class="cssClass"
            :scroll-to-top="scrollToTop">
            <FluxTooltip :content="accessibleLabel">
                <FluxSecondaryButton
                    :class="cssClass"
                    icon-leading="arrow-up"
                    :aria-label="accessibleLabel"
                    @click="scrollToTop"/>
            </FluxTooltip>
        </slot>
    </FluxFadeTransition>
</template>

<script
    lang="ts"
    setup>
    import { useScrollPosition } from '@basmilius/common';
    import { prefersReducedMotion } from '@basmilius/utils';
    import { clsx } from 'clsx';
    import { computed, toRef, type VNode } from 'vue';
    import { useTranslate } from '~flux/components/composable/private';
    import { FluxFadeTransition } from '~flux/components/transition';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import FluxTooltip from './FluxTooltip.vue';
    import $style from '~flux/components/css/component/BackToTop.module.scss';

    const {
        label,
        offset = 300,
        position = 'end',
        target
    } = defineProps<{
        readonly label?: string;
        readonly offset?: number;
        readonly position?: 'start' | 'end';
        readonly target?: HTMLElement | null;
    }>();

    defineSlots<{
        default?(props: {
            readonly cssClass: string;
            scrollToTop(): void;
        }): VNode[];
    }>();

    const translate = useTranslate();
    const {y} = useScrollPosition(toRef(() => target ?? document));

    const accessibleLabel = computed(() => label ?? translate('flux.backToTop'));
    const cssClass = computed(() => clsx($style.backToTop, position === 'start' ? $style.isStart : $style.isEnd));
    const isVisible = computed(() => y.value > offset);

    function scrollToTop(): void {
        const scroller = target ?? document.scrollingElement;

        scroller?.scrollTo({
            top: 0,
            behavior: prefersReducedMotion() ? 'instant' : 'smooth'
        });

        resetFocus();
    }

    function resetFocus(): void {
        const element = target ?? document.body;

        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '-1');
            element.addEventListener('blur', () => element.removeAttribute('tabindex'), {once: true});
        }

        element.focus({preventScroll: true});
    }
</script>
