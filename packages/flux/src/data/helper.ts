import type { FluxFormSelectGroup, FluxFormSelectOption } from '@flux-ui/types';

export function isFluxFormSelectGroup(item: unknown): item is FluxFormSelectGroup {
    return item !== null && typeof item === 'object' && !('value' in item);
}

export function isFluxFormSelectOption(item: unknown): item is FluxFormSelectOption {
    return item !== null && typeof item === 'object' && 'value' in item;
}
