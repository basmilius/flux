import { computed, type ComputedRef, type CSSProperties, getCurrentInstance, onBeforeUnmount } from 'vue';
import { useFluxFlowInjection } from '~flux/flow/composable';
import type { FluxFlowBounds, FluxFlowPosition, FluxFlowSize } from '~flux/flow/data';

type FlowRect = FluxFlowPosition & FluxFlowSize;

type FlowBox = {
    readonly bounds: ComputedRef<FluxFlowBounds | null>;
    readonly style: ComputedRef<CSSProperties>;
};

/**
 * Registers a rectangle drawn behind the nodes, such as a `FluxFlowGroup` frame
 * or a `FluxFlowLane` band, so the canvas sizes itself on it, and hands back the
 * style that places it in the world.
 */
export default function useFlowBox(rect: () => FlowRect | null): FlowBox {
    const uid = getCurrentInstance()!.uid;
    const controller = useFluxFlowInjection();

    const bounds = computed<FluxFlowBounds | null>(() => {
        const value = rect();

        if (!value) {
            return null;
        }

        return {
            minX: value.x,
            minY: value.y,
            maxX: value.x + value.width,
            maxY: value.y + value.height
        };
    });

    const style = computed<CSSProperties>(() => {
        const value = rect();

        return {
            transform: `translate(${value?.x ?? 0}px, ${value?.y ?? 0}px)`,
            width: `${value?.width ?? 0}px`,
            height: `${value?.height ?? 0}px`
        };
    });

    controller.registerBox({id: uid, bounds});

    onBeforeUnmount(() => controller.unregisterBox(uid));

    return {bounds, style};
}
