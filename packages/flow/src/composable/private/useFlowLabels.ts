import { computed, type ComponentPublicInstance, onBeforeUnmount, onMounted, type Ref, shallowRef } from 'vue';
import type { FluxFlowEdgeRecord, FluxFlowPosition, FluxFlowSize } from '~flux/flow/data';

type FlowLabelBox = FluxFlowSize & FluxFlowPosition;

type FlowLabels = {
    /**
     * The hole each label punches in its own connector: its own box, widened so
     * the line visibly breaks around it instead of ending under its edge.
     */
    readonly boxes: Readonly<Ref<ReadonlyMap<number, FlowLabelBox>>>;
    setElement(id: number, instance: Element | ComponentPublicInstance | null): void;
};

// Air between a connector label and the two line ends it separates.
const LABEL_GAP = 6;

/**
 * Measures the badge of every labelled connector and reports the box its
 * connector is masked against.
 */
export default function useFlowLabels(edges: () => readonly FluxFlowEdgeRecord[]): FlowLabels {
    const sizes = shallowRef(new Map<number, FluxFlowSize>());
    const elements = new Map<number, HTMLElement>();

    let observer: ResizeObserver | null = null;

    onMounted(() => {
        observer = new ResizeObserver(measure);

        for (const element of elements.values()) {
            observer.observe(element);
        }

        measure();
    });

    onBeforeUnmount(() => {
        observer?.disconnect();
        observer = null;
    });

    const boxes = computed(() => {
        const measured = new Map<number, FlowLabelBox>();

        for (const edge of edges()) {
            const spec = edge.spec.value;
            const size = sizes.value.get(edge.id);

            if (spec && size) {
                measured.set(edge.id, {
                    x: spec.labelX - size.width / 2 - LABEL_GAP,
                    y: spec.labelY - size.height / 2 - LABEL_GAP,
                    width: size.width + LABEL_GAP * 2,
                    height: size.height + LABEL_GAP * 2
                });
            }
        }

        return measured;
    });

    function measure(): void {
        const measured = new Map<number, FluxFlowSize>();

        for (const [id, element] of elements) {
            measured.set(id, {width: element.offsetWidth, height: element.offsetHeight});
        }

        sizes.value = measured;
    }

    function setElement(id: number, instance: Element | ComponentPublicInstance | null): void {
        const element = (instance as ComponentPublicInstance | null)?.$el as HTMLElement | undefined;
        const previous = elements.get(id);

        if (previous === element) {
            return;
        }

        if (previous) {
            observer?.unobserve(previous);
        }

        if (element) {
            elements.set(id, element);
            observer?.observe(element);
        } else {
            elements.delete(id);
        }

        measure();
    }

    return {boxes, setElement};
}
