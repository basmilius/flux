import type { Ref } from 'vue';
import { onMounted, onUnmounted, ref } from 'vue';

const BREAKPOINTS = {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280
} as const;

type Breakpoint = keyof typeof BREAKPOINTS;

export default function () {
    const currentBreakpoint = ref<Breakpoint | null>(null);
    const breakpointRefs = Object.fromEntries(
        Object.keys(BREAKPOINTS).map((key) => [key, ref(false)])
    ) as Record<Breakpoint, Ref<boolean>>;

    const updateBreakpoints = () => {
        const width = window.innerWidth;
        let activeBreakpoint: Breakpoint | null = null;

        for (const [key, value] of Object.entries(BREAKPOINTS).reverse() as [
            Breakpoint,
            number
        ][]) {
            if (width >= value) {
                activeBreakpoint = key;
                break;
            }
        }

        currentBreakpoint.value = activeBreakpoint;

        for (const key of Object.keys(BREAKPOINTS) as Breakpoint[]) {
            breakpointRefs[key].value = key === activeBreakpoint;
        }
    };

    onMounted(() => {
        updateBreakpoints();
        window.addEventListener('resize', updateBreakpoints, {passive: true});
    });

    onUnmounted(() => {
        window.removeEventListener('resize', updateBreakpoints);
    });

    return {
        currentBreakpoint,
        ...breakpointRefs
    };
}
