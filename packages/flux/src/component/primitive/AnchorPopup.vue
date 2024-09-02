<template>
    <div
        ref="popupRef"
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
    import { ComponentPublicInstance, onMounted, onUnmounted, reactive, ref, unref, watchEffect } from 'vue';
    import { useMutationObserver } from '@/composable';
    import { isHtmlElement } from '@/util';

    export type Props = {
        readonly anchor?: ComponentPublicInstance | HTMLElement;
        readonly axis?: 'horizontal' | 'vertical';
        readonly margin?: number;
        readonly position?:
            | 'top' | 'top-left' | 'top-right'
            | 'left' | 'left-top' | 'left-bottom'
            | 'right' | 'right-top' | 'right-bottom'
            | 'bottom' | 'bottom-left' | 'bottom-right';
        readonly useAnchorWidth?: boolean;
    };

    const props = withDefaults(defineProps<Props>(), {
        axis: 'vertical',
        margin: 12
    });

    const anchorRef = ref<HTMLElement>();
    const popupRef = ref<HTMLElement>();

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

        switch (props.position) {
            case 'top':
                px = x + width / 2 - popupWidth / 2;
                py = y - popupHeight - props.margin;
                break;

            case 'top-left':
                px = x;
                py = y - popupHeight - props.margin;
                break;

            case 'top-right':
                px = x - popupWidth + width;
                py = y - popupHeight - props.margin;
                break;

            case 'left':
                px = x - popupWidth - props.margin;
                py = y + height / 2 - popupHeight / 2;
                break;

            case 'left-top':
                px = x - popupWidth - props.margin;
                py = y;
                break;

            case 'left-bottom':
                px = x - popupWidth - props.margin;
                py = y + height - popupHeight;
                break;

            case 'right':
                px = x + width + props.margin;
                py = y + height / 2 - popupHeight / 2;
                break;

            case 'right-top':
                px = x + width + props.margin;
                py = y;
                break;

            case 'right-bottom':
                px = x + width + props.margin;
                py = y + height - popupHeight;
                break;

            case 'bottom':
                px = x + width / 2 - popupWidth / 2;
                py = y + height + props.margin;
                break;

            case 'bottom-left':
                px = x;
                py = y + height + props.margin;
                break;

            case 'bottom-right':
                px = x - popupWidth + width;
                py = y + height + props.margin;
                break;

            default:
                if (props.axis === 'horizontal') {
                    px = x + width + props.margin;
                    py = y + height / 2 - popupHeight / 2;

                    if (px + popupWidth > innerWidth) {
                        px = x - popupWidth - props.margin;
                    }
                } else {
                    px = x + width / 2 - popupWidth / 2;
                    py = y + height + props.margin;

                    if (py + popupHeight > innerHeight) {
                        py = y - popupHeight - props.margin;
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
        state.width = props.useAnchorWidth ? width : null;
    }

    function onResize(): void {
        resize();
        reposition();
    }

    function onScroll(): void {
        reposition();
    }

    watchEffect(() => {
        if (!props.anchor || (!isHtmlElement(props.anchor) && !props.anchor.$el)) {
            return;
        }

        anchorRef.value = isHtmlElement(props.anchor) ? props.anchor : props.anchor.$el;

        requestAnimationFrame(resize);
        requestAnimationFrame(reposition);
    });
</script>
