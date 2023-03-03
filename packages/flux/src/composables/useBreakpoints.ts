import { computed, inject, onMounted, onUnmounted, provide, Ref, ref, unref, watch } from 'vue-demi';
import { BREAKPOINTS } from '../constants';

export function useBreakpoints(): UseBreakpoints {
    const breakpoints = inject<UseBreakpoints | null>('flux-breakpoints', null);

    if (!breakpoints) {
        throw new Error('[Flux] No breakpoints provider was found.');
    }

    return breakpoints;
}

export function useBreakpointsProvider(): void {
    const width = ref(innerWidth);

    const breakpoints = computed(() => Object.fromEntries(
        Object.entries(BREAKPOINTS)
            .map(([breakpoint, minWidth]) => [
                breakpoint as Breakpoint,
                unref(width) >= minWidth
            ])
    ) as Breakpoints);

    const breakpoint = computed(() => {
        let current: Breakpoint = 'xs';

        for (let [breakpoint, minWidth] of Object.entries(BREAKPOINTS)) {
            if (unref(width) < minWidth) {
                continue;
            }

            current = breakpoint as Breakpoint;
        }

        return current;
    });

    const isDesktop = computed(() => unref(width) >= BREAKPOINTS.md);
    const isMobile = computed(() => unref(width) < BREAKPOINTS.md);

    const maxWidth = computed(() => BREAKPOINTS[unref(breakpoint)] || null);

    onMounted(() => window.addEventListener('resize', onResize, {passive: false}));
    onUnmounted(() => window.removeEventListener('resize', onResize));

    function onResize(): void {
        width.value = innerWidth;
    }

    provide<UseBreakpoints>('flux-breakpoints', {
        breakpoint,
        breakpoints,
        isDesktop,
        isMobile,
        maxWidth,
        width,
        widths: BREAKPOINTS
    });

    watch(breakpoints, breakpoints => {
        Object.entries(breakpoints).forEach(([breakpoint, active]) => {
            if (active) {
                document.documentElement.setAttribute(breakpoint, '');
            } else {
                document.documentElement.removeAttribute(breakpoint);
            }
        });
    }, {immediate: true});
}

interface UseBreakpoints {
    readonly breakpoint: Ref<Breakpoint>;
    readonly breakpoints: Ref<Breakpoints>;
    readonly isDesktop: Ref<boolean>;
    readonly isMobile: Ref<boolean>;
    readonly maxWidth: Ref<number | null>;
    readonly width: Ref<number>;
    readonly widths: typeof BREAKPOINTS;
}

type Breakpoint = keyof typeof BREAKPOINTS;
type Breakpoints = { [K in Breakpoint]: boolean; };
