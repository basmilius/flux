import type { FluxFilterOptionHeader, FluxFilterOptionItem } from '$flux/types';

export function isFluxFilterOptionHeader(obj: object): obj is FluxFilterOptionHeader {
    return 'title' in obj;
}

export function isFluxFilterOptionItem(obj: object): obj is FluxFilterOptionItem {
    return 'label' in obj && 'value' in obj;
}
