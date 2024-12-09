<template>
    <div
        ref="popup"
        :style="{
                '--x': `${state.x}px`,
                '--y': `${state.y}px`,
                '--width': state.width ? `${state.width}px` : undefined
            }">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { isHtmlElement } from '@basmilius/utils';
    import { ComponentPublicInstance, onMounted, onUnmounted, reactive, ref, unref, useTemplateRef, watchEffect } from 'vue';
    import { useMutationObserver } from '@/composable';
    import type { Axis } from '@/types';

    const {
        anchor,
        axis = 'vertical',
        position,
        margin = 12,
        useAnchorWidth
    } = defineProps<{
        readonly anchor?: ComponentPublicInstance | HTMLElement | null;
        readonly axis?: Axis;
        readonly margin?: number;
        readonly position?:
            | 'top' | 'top-left' | 'top-right'
            | 'left' | 'left-top' | 'left-bottom'
            | 'right' | 'right-top' | 'right-bottom'
            | 'bottom' | 'bottom-left' | 'bottom-right';
        readonly useAnchorWidth?: boolean;
    }>();

    defineSlots<{
        default(): any;
    }>();

    const anchorRef = ref<HTMLElement>();
    const popupRef = useTemplateRef('popup');

    const state = reactive({
        x: 0,
        y: 0,
        width: null as number | null
    });

    onMounted(() => {
        window.addEventListener('resize', onResize, {passive: true});
        window.addEventListener('scroll', onScroll, {capture: true, passive: true});
    });

    onUnmounted(() => {
        window.removeEventListener('resize', onResize);
        window.removeEventListener('scroll', onScroll);
    });

    useMutationObserver(popupRef, () => {
        reposition();
    }, {childList: true, subtree: true});

    function reposition(): void {
        const anchor = unref(anchorRef);
        const popup = unref(popupRef);

        if (!anchor || !popup) {
            return;
        }

        const {x, y, height, width} = anchor.getBoundingClientRect();
        const {height: popupHeight, width: popupWidth} = popup.getBoundingClientRect();

        let px: number,
            py: number;

        switch (position) {
            case 'top':
                px = x + width / 2 - popupWidth / 2;
                py = y - popupHeight - margin;
                break;

            case 'top-left':
                px = x;
                py = y - popupHeight - margin;
                break;

            case 'top-right':
                px = x - popupWidth + width;
                py = y - popupHeight - margin;
                break;

            case 'left':
                px = x - popupWidth - margin;
                py = y + height / 2 - popupHeight / 2;
                break;

            case 'left-top':
                px = x - popupWidth - margin;
                py = y;
                break;

            case 'left-bottom':
                px = x - popupWidth - margin;
                py = y + height - popupHeight;
                break;

            case 'right':
                px = x + width + margin;
                py = y + height / 2 - popupHeight / 2;
                break;

            case 'right-top':
                px = x + width + margin;
                py = y;
                break;

            case 'right-bottom':
                px = x + width + margin;
                py = y + height - popupHeight;
                break;

            case 'bottom':
                px = x + width / 2 - popupWidth / 2;
                py = y + height + margin;
                break;

            case 'bottom-left':
                px = x;
                py = y + height + margin;
                break;

            case 'bottom-right':
                px = x - popupWidth + width;
                py = y + height + margin;
                break;

            default:
                if (axis === 'horizontal') {
                    px = x + width + margin;
                    py = y + height / 2 - popupHeight / 2;

                    if (px + popupWidth > innerWidth) {
                        px = x - popupWidth - margin;
                    }
                } else {
                    px = x + width / 2 - popupWidth / 2;
                    py = y + height + margin;

                    if (py + popupHeight > innerHeight) {
                        py = y - popupHeight - margin;
                    }
                }
                break;
        }

        state.x = px;
        state.y = py;
    }

    function resize(): void {
        const anchor = unref(anchorRef);

        if (!anchor) {
            return;
        }

        const {width} = anchor.getBoundingClientRect();
        state.width = useAnchorWidth ? width : null;
    }

    function onResize(): void {
        resize();
        reposition();
    }

    function onScroll(): void {
        reposition();
    }

    watchEffect(() => {
        if (!anchor || (!isHtmlElement(anchor) && !anchor.$el)) {
            return;
        }

        anchorRef.value = isHtmlElement(anchor) ? anchor : anchor.$el;

        requestAnimationFrame(resize);
        requestAnimationFrame(reposition);
    });
</script>
