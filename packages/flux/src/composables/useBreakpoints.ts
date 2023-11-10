import { computed, inject, onMounted, onUnmounted, provide, ref, unref } from 'vue-demi';
import { FluxBreakpointsInjection, FluxBreakpointsInjectionKey } from '@/data';

// note(Bas): These breakpoints are also defined in ../scss/mixin/_breakpoints.scss, please
//  keep them synced.
const BREAKPOINTS = {
    'xs': 0,
    'sm': 640,
    'md': 768,
    'lg': 1024,
    'xl': 1280
} as const;

export function useBreakpoints(): FluxBreakpointsInjection {
    const breakpoints = inject(FluxBreakpointsInjectionKey, null);

    if (!breakpoints) {
        throw new Error('[Flux] No breakpoints provider was found.');
    }

    return breakpoints;
}

export function useBreakpointsProvider(): void {
    const width = ref(0);

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

    onMounted(() => {
        window.addEventListener('resize', onResize, {passive: false});
        onResize();
    });

    onUnmounted(() => {
        window.removeEventListener('resize', onResize);
    });

    function onResize(): void {
        width.value = innerWidth;
    }

    provide(FluxBreakpointsInjectionKey, {
        breakpoint,
        breakpoints,
        isDesktop,
        isMobile,
        maxWidth,
        width
    });
}

export type Breakpoint = keyof typeof BREAKPOINTS;
export type Breakpoints = { [K in Breakpoint]: boolean; };
