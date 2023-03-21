import type { IconDefinition, IconName, IconPathData } from '@fortawesome/fontawesome-common-types';

export type IconNames = IconName | 'flux-empty';

export type {
    IconDefinition,
    IconPathData
};

type Dictionary<T> = { [key: string]: T }

export interface FluxAlertSpec {
    readonly id: number;
    readonly icon?: IconNames;
    readonly message: string;
    readonly title: string;

    onClose(): void;
}

export interface FluxConfirmSpec extends FluxAlertSpec {
    onCancel(): void;

    onConfirm(): void;
}

export interface FluxFormSelectOption {
    readonly badge?: string;
    readonly icon?: IconNames | null;
    readonly id: string | number;
    readonly label: string;
    readonly selectable?: boolean;
}

export interface FluxFormSelectGroup {
    readonly icon: IconNames | null;
    readonly label: string;
}

export interface FluxRoutingLocation {
    name?: string;
    path?: string;
    hash?: string;
    query?: Dictionary<string | (string | null)[] | null | undefined>;
    params?: Dictionary<string>;
    append?: boolean;
    replace?: boolean;
}

export function isFluxFormSelectGroup(item: object): item is FluxFormSelectGroup {
    return item && !('id' in item);
}

export function isFluxFormSelectOption(item: object): item is FluxFormSelectOption {
    return item && 'id' in item;
}
