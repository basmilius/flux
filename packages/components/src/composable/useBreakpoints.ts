import { onMounted, onUnmounted, ref, type Ref } from 'vue';

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

        for (const [key, value] of Object.entries(BREAKPOINTS) as [
            Breakpoint,
            number
        ][]) {
            const isActive = width >= value;
            breakpointRefs[key].value = isActive;

            if (isActive) {
                activeBreakpoint = key;
            }
        }

        currentBreakpoint.value = activeBreakpoint;
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
