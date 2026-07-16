import { inject } from 'vue';
import { type FluxFlowController, FluxFlowInjectionKey } from '~flux/flow/data';

/**
 * Reads the FluxFlow controller from the surrounding `FluxFlow`. Exposes the
 * reactive viewport, the node registry and the imperative viewport methods
 * (`fitView`, `zoomIn`, `zoomOut`, ...) so consumers can build their own
 * controls on top of a flow.
 */
export default function useFluxFlowInjection(): FluxFlowController {
    const controller = inject(FluxFlowInjectionKey);

    if (!controller) {
        throw new Error('useFluxFlowInjection() must be called within a <FluxFlow>.');
    }

    return controller;
}
