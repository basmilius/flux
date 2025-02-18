<script lang="ts">
    import { unrefTemplateElement } from '@basmilius/flux-internals';
    import { clsx } from 'clsx';
    import { computed, defineComponent, h, ref, unref, watch } from 'vue';
    import { useFluxStore } from '@/data';
    import { FluxTooltipTransition } from '@/transition';
    import $style from '@/css/component/Tooltip.module.scss';

    type Transition = 'above' | 'below' | 'end' | 'start';

    type PositionData = {
        readonly x: number;
        readonly y: number;
        readonly arrowAngle: string;
        readonly arrowX: string;
        readonly arrowY: string;
        readonly transition: Transition;
    };

    export default defineComponent(() => {
        const {tooltip} = useFluxStore();

        const elementRef = ref<HTMLElement | null>(null);
        const position = ref<PositionData | null>(null);

        const content = computed(() => unref(tooltip) ? unref(tooltip)!.contentSlot?.() ?? [unref(tooltip)!.content] : null);
        const has = computed(() => !!unref(tooltip));

        function calculate(): void {
            const element = unrefTemplateElement(elementRef);
            const spec = unref(tooltip);

            if (!spec || !element || !unref(content)) {
                position.value = null;
                return;
            }

            const {direction, origin} = spec;
            const margin = 9;
            const safeZone = 15;

            if (!origin) {
                position.value = null;
                return;
            }

            let {width, height} = element.getBoundingClientRect();
            const {scale} = getComputedStyle(element);
            const {top, left, width: originWidth, height: originHeight} = origin.getBoundingClientRect();

            let s = Number(scale ?? 1);
            s = isNaN(s) ? 1 : s;
            height /= s;
            width /= s;

            if (direction === 'horizontal') {
                position.value = calculateHorizontalPosition(top, left, width, height, originWidth, originHeight, margin, safeZone);
            } else {
                position.value = calculateVerticalPosition(top, left, width, height, originWidth, originHeight, margin, safeZone);
            }
        }

        watch(content, () => requestAnimationFrame(() => calculate()));

        return () => h(FluxTooltipTransition, {}, {
            default: () => {
                if (!unref(has)) {
                    return;
                }

                const pos = unref(position);

                return h('div', {
                    ref: elementRef,
                    class: pos
                        ? clsx(
                            pos.transition === 'above' && $style.tooltipAbove,
                            pos.transition === 'below' && $style.tooltipBelow,
                            pos.transition === 'end' && $style.tooltipEnd,
                            pos.transition === 'start' && $style.tooltipStart
                        )
                        : $style.tooltip,
                    style: {
                        '--x': pos?.x ?? undefined,
                        '--y': pos?.y ?? undefined,
                        '--arrowAngle': pos?.arrowAngle ?? undefined,
                        '--arrowX': pos?.arrowX ?? undefined,
                        '--arrowY': pos?.arrowY ?? undefined
                    }
                }, unref(content));
            }
        });
    });

    function calculateHorizontalPosition(top: number, left: number, width: number, height: number, originWidth: number, originHeight: number, margin: number, safeZone: number): PositionData {
        let x, y, arrowAngle, arrowX, arrowY, transition: Transition;

        if (left > innerWidth / 2) {
            x = left - width - margin;
            y = top + originHeight / 2 - height / 2;
            arrowAngle = '315deg';
            arrowX = '100%';
            arrowY = '50%';
            transition = 'start';
        } else {
            x = left + originWidth + margin;
            y = top + originHeight / 2 - height / 2;
            arrowAngle = '135deg';
            arrowX = '0';
            arrowY = '50%';
            transition = 'end';
        }

        if (y + height > innerHeight - safeZone) {
            const diff = Math.min(y, innerHeight - height - safeZone) - y;
            arrowY = `calc(50% - ${diff}px)`;
            y += diff;
        }

        if (y < safeZone) {
            const diff = Math.max(y, safeZone) - y;
            arrowY = `calc(50% - ${diff}px)`;
            y += diff;
        }

        return {
            x: Math.round(x),
            y: Math.round(y),
            arrowAngle,
            arrowX,
            arrowY,
            transition
        };
    }

    function calculateVerticalPosition(top: number, left: number, width: number, height: number, originWidth: number, originHeight: number, margin: number, safeZone: number): PositionData {
        let x, y, arrowAngle, arrowX, arrowY, transition: Transition;

        if (top > 300) {
            x = left + originWidth / 2 - width / 2;
            y = top - height - margin;
            arrowAngle = '45deg';
            arrowX = '50%';
            arrowY = '100%';
            transition = 'above';
        } else {
            x = left + originWidth / 2 - width / 2;
            y = top + originHeight + margin;
            arrowAngle = '225deg';
            arrowX = '50%';
            arrowY = '0';
            transition = 'below';
        }

        if (x + width > innerWidth - safeZone) {
            const diff = Math.min(x, innerWidth - width - safeZone) - x;
            arrowX = `calc(50% - ${diff}px)`;
            x += diff;
        }

        if (x < safeZone) {
            const diff = Math.max(x, safeZone) - x;
            arrowX = `calc(50% - ${diff}px)`;
            x += diff;
        }

        return {
            x: Math.round(x),
            y: Math.round(y),
            arrowAngle,
            arrowX,
            arrowY,
            transition
        };
    }
</script>
