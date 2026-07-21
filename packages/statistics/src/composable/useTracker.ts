import { type InjectionKey, nextTick, onMounted, onUnmounted, ref, type Ref, shallowReactive, watch } from 'vue';

const BRANCH_HEIGHT = 24;
const MARKER_GAP = 6;

type ElementRef = Readonly<Ref<HTMLElement | null>>;

type Registration = {
    readonly element: ElementRef;
};

type Group = {
    readonly steps: Set<Registration>;
};

type MeasuredMarker = {
    readonly x: number;
    readonly top: number;
    readonly bottom: number;
};

export interface TrackerGroupContext {
    readonly registerStep: (element: ElementRef) => () => void;
    readonly dispose: () => void;
}

export interface TrackerContext {
    readonly registerMarker: (element: ElementRef) => () => void;
    readonly registerGroup: () => TrackerGroupContext;
}

export const FluxStatisticsTrackerInjectionKey: InjectionKey<TrackerContext> = Symbol('flux-statistics-tracker');
export const FluxStatisticsTrackerGroupInjectionKey: InjectionKey<TrackerGroupContext> = Symbol('flux-statistics-tracker-group');

/**
 * Draws every line of a tracker as a single SVG overlay. Rows register their
 * marker and step groups register their steps; the lines are measured from the
 * elements that are actually rendered and drawn as segments between them,
 * leaving a gap around each marker. Because nothing is masked against a
 * background, the tracker works on any surface.
 */
export function useTracker(container: ElementRef) {
    const markers = shallowReactive(new Set<Registration>());
    const groups = shallowReactive(new Set<Group>());
    const linePath = ref('');
    const dashPath = ref('');

    function registerMarker(element: ElementRef): () => void {
        const registration: Registration = {element};

        markers.add(registration);
        nextTick(measure);

        return () => {
            markers.delete(registration);
            nextTick(measure);
        };
    }

    function registerGroup(): TrackerGroupContext {
        const group: Group = {steps: shallowReactive(new Set<Registration>())};

        groups.add(group);
        nextTick(measure);

        return {
            registerStep(element: ElementRef): () => void {
                const registration: Registration = {element};

                group.steps.add(registration);
                nextTick(measure);

                return () => {
                    group.steps.delete(registration);
                    nextTick(measure);
                };
            },
            dispose(): void {
                groups.delete(group);
                nextTick(measure);
            }
        };
    }

    function measureAll(registrations: Iterable<Registration>, rootRect: DOMRect): MeasuredMarker[] {
        return Array.from(registrations)
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
            .sort((first, second) => first.top - second.top);
    }

    function measure(): void {
        const root = container.value;

        if (!root) {
            linePath.value = '';
            dashPath.value = '';
            return;
        }

        const rootRect = root.getBoundingClientRect();
        const rail = measureAll(markers, rootRect);

        if (rail.length === 0) {
            linePath.value = '';
            dashPath.value = '';
            return;
        }

        const railX = rail[0].x;
        const lastMarker = rail[rail.length - 1];

        const lines: string[] = [];
        const dashes: string[] = [];

        let railEnd = lastMarker.bottom + MARKER_GAP;

        for (const group of groups) {
            const steps = measureAll(group.steps, rootRect);

            if (steps.length === 0) {
                continue;
            }

            const stepX = steps[0].x;
            const first = steps[0];
            const last = steps[steps.length - 1];

            // Both branches stay clear of the markers they pass, so a group that
            // sits tight against a row does not draw a line across it.
            const enterTo = first.top - MARKER_GAP;
            const enterFrom = Math.max(enterTo - BRANCH_HEIGHT, markerBoundary(rail, enterTo, 'above'));

            lines.push(branch(railX, enterFrom, stepX, enterTo));

            for (let index = 0; index < steps.length - 1; index++) {
                const from = steps[index].bottom + MARKER_GAP;
                const to = steps[index + 1].top - MARKER_GAP;

                if (to > from) {
                    dashes.push(`M${stepX} ${from}V${to}`);
                }
            }

            const leaveFrom = last.bottom + MARKER_GAP;
            const leaveTo = Math.min(leaveFrom + BRANCH_HEIGHT, markerBoundary(rail, leaveFrom, 'below'));

            lines.push(branch(stepX, leaveFrom, railX, leaveTo));

            railEnd = Math.max(railEnd, leaveTo);
        }

        for (let index = 0; index < rail.length - 1; index++) {
            const from = rail[index].bottom + MARKER_GAP;
            const to = rail[index + 1].top - MARKER_GAP;

            if (to > from) {
                lines.push(`M${railX} ${from}V${to}`);
            }
        }

        if (railEnd > lastMarker.bottom + MARKER_GAP) {
            lines.push(`M${railX} ${lastMarker.bottom + MARKER_GAP}V${railEnd}`);
        }

        linePath.value = lines.join('');
        dashPath.value = dashes.join('');
    }

    function markerBoundary(rail: MeasuredMarker[], y: number, side: 'above' | 'below'): number {
        if (side === 'above') {
            const previous = rail.filter(marker => marker.bottom <= y).pop();

            return previous ? previous.bottom + MARKER_GAP : 0;
        }

        const next = rail.find(marker => marker.top >= y);

        return next ? next.top - MARKER_GAP : Number.POSITIVE_INFINITY;
    }

    // Vertical at both ends, so the curve blends into the lines it connects.
    function branch(fromX: number, fromY: number, toX: number, toY: number): string {
        const middle = (fromY + toY) / 2;

        return `M${fromX} ${fromY}C${fromX} ${middle} ${toX} ${middle} ${toX} ${toY}`;
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

    return {dashPath, linePath, registerGroup, registerMarker};
}
