<template>
    <div :class="clsx($style.readMore, hasToggle && !isExpanded && $style.isFaded)">
        <div
            ref="content"
            :class="clsx($style.readMoreContent, isClamped && $style.isClamped)"
            :id="contentId"
            :style="{'--lines': lines}">
            <slot/>
        </div>

        <slot
            v-if="hasToggle"
            v-bind="{contentId, isExpanded, toggle}"
            name="toggle">
            <button
                :class="$style.readMoreToggle"
                type="button"
                :aria-controls="contentId"
                :aria-expanded="isExpanded"
                @click="toggle">
                {{ label }}
            </button>
        </slot>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { useMutationObserver, useResizeObserver } from '@basmilius/common';
    import { prefersReducedMotion, unrefTemplateElement } from '@flux-ui/internals';
    import { clsx } from 'clsx';
    import { computed, nextTick, onScopeDispose, ref, unref, useId, useTemplateRef, type VNode, watch } from 'vue';
    import { useTranslate } from '~flux/components/composable/private';
    import $style from '~flux/components/css/component/ReadMore.module.scss';

    const DURATION = 300;
    const EASING = 'cubic-bezier(0.55, 0, 0.1, 1)';

    const isExpanded = defineModel<boolean>('isExpanded', {
        default: false
    });

    const {
        labelLess,
        labelMore,
        lines = 3
    } = defineProps<{
        readonly labelLess?: string;
        readonly labelMore?: string;
        readonly lines?: number;
    }>();

    defineSlots<{
        default(): VNode[];

        toggle(props: {
            readonly contentId: string;
            readonly isExpanded: boolean;
            toggle(): void;
        }): VNode[];
    }>();

    const contentRef = useTemplateRef<HTMLElement>('content');
    const contentId = useId();
    const translate = useTranslate();

    const isClamped = ref(!unref(isExpanded));
    const isOverflowing = ref(false);

    let animation: Animation | null = null;
    let sequence = 0;

    const hasToggle = computed(() => unref(isOverflowing) || unref(isExpanded));

    const label = computed(() => {
        if (unref(isExpanded)) {
            return labelLess ?? translate('flux.readLess');
        }

        return labelMore ?? translate('flux.readMore');
    });

    useResizeObserver(contentRef, () => measure());
    useMutationObserver(contentRef, () => measure(), {characterData: true, childList: true, subtree: true});

    watch(isExpanded, expanded => reveal(expanded));

    onScopeDispose(() => {
        sequence++;
        animation?.cancel();
        animation = null;
    });

    function measure(): void {
        const element = unrefTemplateElement(contentRef);

        if (!element || !unref(isClamped)) {
            return;
        }

        const clamped = element.clientHeight;

        // Lifting the clamp and reading back happens within this task, so the browser
        // never paints the unclamped content.
        element.style.setProperty('-webkit-line-clamp', 'unset');
        const full = element.scrollHeight;
        element.style.removeProperty('-webkit-line-clamp');

        isOverflowing.value = full - clamped > 1;
    }

    async function reveal(expanded: boolean): Promise<void> {
        const element = unrefTemplateElement(contentRef);

        if (!element) {
            isClamped.value = !expanded;
            return;
        }

        const token = ++sequence;
        const from = element.offsetHeight;

        animation?.cancel();
        animation = null;
        element.style.removeProperty('height');
        element.style.removeProperty('overflow');

        if (prefersReducedMotion()) {
            isClamped.value = !expanded;
            return;
        }

        // Both target heights are measured within this task, so the browser never paints
        // the intermediate clamp.
        isClamped.value = true;
        await nextTick();
        const collapsedHeight = element.offsetHeight;

        isClamped.value = false;
        await nextTick();
        const to = expanded ? element.offsetHeight : collapsedHeight;

        if (token !== sequence) {
            return;
        }

        element.style.height = `${to}px`;
        element.style.overflow = 'hidden';

        const current = element.animate({height: [`${from}px`, `${to}px`]}, {
            duration: DURATION,
            easing: EASING
        });

        animation = current;

        try {
            await current.finished;
        } catch {
            return;
        }

        if (token !== sequence) {
            return;
        }

        animation = null;
        isClamped.value = !expanded;
        await nextTick();

        element.style.removeProperty('height');
        element.style.removeProperty('overflow');
        measure();
    }

    function toggle(): void {
        isExpanded.value = !unref(isExpanded);
    }

    defineExpose({
        contentId,
        isExpanded,
        toggle
    });
</script>
