<script lang="ts">
    import { storeToRefs } from 'pinia';
    import { computed, defineComponent, h, ref, unref } from 'vue-demi';
    import { useBreakpoints } from '../composables';
    import { useFluxStore } from '../data';
    import { FluxFadeTransition } from '../transition';
    import { render } from '../utils';

    interface TooltipPositionData {
        readonly x: number;
        readonly y: number;
        readonly arrowAngle: string;
        readonly arrowX: string;
        readonly arrowY: string;
    }

    export default defineComponent({
        setup() {
            const breakpoints = useBreakpoints();
            const fluxStore = useFluxStore();
            const {tooltip} = storeToRefs(fluxStore);

            const elementRef = ref<HTMLElement | null>(null);

            const content = computed(() => tooltip.value ? tooltip.value.contentSlot?.() ?? [tooltip.value.content] : null);
            const has = computed(() => !!tooltip.value);
            const position = computed<TooltipPositionData | null>(() => {
                const spec = unref(tooltip);
                const element = unref(elementRef);

                if (!spec || !element || !content.value) {
                    return null;
                }

                const {axis, origin} = spec;
                const margin = 9;
                const safeZone = 15;

                if (!origin) {
                    return null;
                }

                getComputedStyle(element);

                const {width, height} = element.getBoundingClientRect();
                const {top, left, width: originWidth, height: originHeight} = origin.getBoundingClientRect();

                switch (axis) {
                    case 'horizontal':
                        return calculateHorizontalPosition(top, left, width, height, originWidth, originHeight, margin, safeZone);

                    case 'vertical':
                        return calculateVerticalPosition(top, left, width, height, originWidth, originHeight, margin, safeZone);
                }
            });

            function calculateHorizontalPosition(top: number, left: number, width: number, height: number, originWidth: number, originHeight: number, margin: number, safeZone: number): TooltipPositionData {
                let x, y, arrowAngle, arrowX, arrowY;

                if (left > innerWidth / 2) {
                    x = left - width - margin;
                    y = top + originHeight / 2 - height / 2;
                    arrowAngle = '315deg';
                    arrowX = '100%';
                    arrowY = '50%';
                } else {
                    x = left + originWidth + margin;
                    y = top + originHeight / 2 - height / 2;
                    arrowAngle = '135deg';
                    arrowX = '0';
                    arrowY = '50%';
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
                    arrowY
                };
            }

            function calculateVerticalPosition(top: number, left: number, width: number, height: number, originWidth: number, originHeight: number, margin: number, safeZone: number): TooltipPositionData {
                let x, y, arrowAngle, arrowX, arrowY;

                if (top > 300) {
                    x = left + originWidth / 2 - width / 2;
                    y = top - height - margin;
                    arrowAngle = '45deg';
                    arrowX = '50%';
                    arrowY = '100%';
                } else {
                    x = left + originWidth / 2 - width / 2;
                    y = top + originHeight + margin;
                    arrowAngle = '225deg';
                    arrowX = '50%';
                    arrowY = '0';
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
                    arrowY
                };
            }

            return () => render(FluxFadeTransition, {
                slots: {
                    default: () => {
                        if (unref(breakpoints.isMobile) || !unref(has)) {
                            return null;
                        }

                        const pos = unref(position);

                        return h('div', {
                            ref: elementRef,
                            class: 'flux-tooltip',
                            style: {
                                '--x': pos?.x ?? null,
                                '--y': pos?.y ?? null,
                                '--arrowAngle': pos?.arrowAngle ?? null,
                                '--arrowX': pos?.arrowX ?? null,
                                '--arrowY': pos?.arrowY ?? null
                            }
                        }, unref(content));
                    }
                }
            });
        }
    });
</script>

<style lang="scss">
    @use '../scss/mixin' as flux;

    .flux-tooltip {
        position: fixed;
        display: flex;
        top: 0;
        left: 0;
        max-width: 360px;
        padding: 9px 15px;
        flex-flow: column;
        background: rgb(var(--gray-11) / .9);
        backdrop-filter: blur(5px) saturate(180%);
        border-radius: var(--radius);
        color: rgb(var(--gray-0));
        font-size: 14px;
        font-variant-numeric: tabular-nums;
        pointer-events: none;
        transform: translate3d(calc(var(--x) * 1px), calc(var(--y) * 1px), 0);
        z-index: 100000;

        &::after {
            position: absolute;
            display: block;
            top: var(--arrowY);
            left: var(--arrowX);
            height: 9px;
            width: 9px;
            content: '';
            background: inherit;
            backdrop-filter: inherit;
            border-radius: 0 0 4px 0;
            clip-path: polygon(100% 100%, 99% 0%, 0% 99%);
            rotate: var(--arrowAngle);
            transform-origin: center;
            translate: -50% -50%;
            z-index: 1;
        }
    }

    @include flux.dark-mode {
        .flux-tooltip {
            background: rgb(0 0 0 / .9);
            color: var(--foreground-prominent);
        }
    }
</style>
