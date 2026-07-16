import { onMounted, onUnmounted, ref, type Ref } from 'vue';

const BREAKPOINTS = {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280
} as const;

type Breakpoint = keyof typeof BREAKPOINTS;

const currentBreakpoint = ref<Breakpoint | null>(null);
const breakpointRefs = Object.fromEntries(
    Object.keys(BREAKPOINTS).map((key) => [key, ref(false)])
) as Record<Breakpoint, Ref<boolean>>;

let listenerCount = 0;

function updateBreakpoints(): void {
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
}

export default function () {
    onMounted(() => {
        updateBreakpoints();

        if (++listenerCount === 1) {
            window.addEventListener('resize', updateBreakpoints, {passive: true});
        }
    });

    onUnmounted(() => {
        if (--listenerCount === 0) {
            window.removeEventListener('resize', updateBreakpoints);
        }
    });

    return {
        currentBreakpoint,
        ...breakpointRefs
    };
}
