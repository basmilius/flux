import { nextTick, onMounted, onUnmounted, ref, type Ref, shallowReactive, watch } from 'vue';

const MARKER_GAP = 6;

type MarkerRegistration = {
    readonly element: Readonly<Ref<HTMLElement | null>>;
};

type MeasuredMarker = {
    readonly x: number;
    readonly top: number;
    readonly bottom: number;
};

/**
 * Draws the connecting line of a timeline as a single SVG path. Each item
 * registers its marker element; the line is measured from the markers that are
 * actually rendered and drawn as vertical segments between consecutive markers,
 * leaving a gap around each one. Because the line lives in a single overlay it
 * never has to be masked against the background, so it works on any surface.
 */
export function useTimeline(container: Readonly<Ref<HTMLElement | null>>) {
    const registrations = shallowReactive(new Set<MarkerRegistration>());
    const linePath = ref('');

    function registerMarker(element: Readonly<Ref<HTMLElement | null>>): () => void {
        const registration: MarkerRegistration = {element};

        registrations.add(registration);
        nextTick(measure);

        return () => {
            registrations.delete(registration);
            nextTick(measure);
        };
    }

    function measure(): void {
        const root = container.value;

        if (!root) {
            linePath.value = '';
            return;
        }

        const rootRect = root.getBoundingClientRect();

        const markers = Array.from(registrations)
            .map((registration): MeasuredMarker | null => {
                const element = registration.element.value;

                if (!element) {
                    return null;
                }

                const rect = element.getBoundingClientRect();
                const top = rect.top - rootRect.top;

                return {
                    x: rect.left - rootRect.left + rect.width / 2,
                    top,
                    bottom: top + rect.height
                };
            })
            .filter((marker): marker is MeasuredMarker => marker !== null)
            .sort((a, b) => a.top - b.top);

        const segments: string[] = [];

        for (let index = 0; index < markers.length - 1; index++) {
            const from = markers[index].bottom + MARKER_GAP;
            const to = markers[index + 1].top - MARKER_GAP;

            if (to > from) {
                segments.push(`M${markers[index].x} ${from}V${to}`);
            }
        }

        linePath.value = segments.join('');
    }

    let observer: ResizeObserver | null = null;

    onMounted(() => {
        observer = new ResizeObserver(() => measure());

        if (container.value) {
            observer.observe(container.value);
        }

        nextTick(measure);
    });

    onUnmounted(() => observer?.disconnect());

    watch(container, element => {
        observer?.disconnect();

        if (observer && element) {
            observer.observe(element);
        }
    });

    return {registerMarker, linePath};
}
