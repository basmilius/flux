import type { IconDefinition, IconName, IconPathData } from '@fortawesome/fontawesome-common-types';

export type IconNames = IconName | 'flux-empty';

export type {
    IconDefinition,
    IconPathData
};

type Dictionary<T> = { [key: string]: T }

export interface FluxBaseAlertSpec {
    readonly id: number;
    readonly icon?: IconNames;
    readonly message: string;
    readonly title: string;
}

export interface FluxAlertSpec extends FluxBaseAlertSpec {
    onClose(): void;
}

export interface FluxConfirmSpec extends FluxBaseAlertSpec {
    onCancel(): void;

    onConfirm(): void;
}

export interface FluxSnackbarSpec {
    readonly id: number;
    readonly actions?: Record<string, string>;
    readonly color?: 'primary' | 'danger' | 'info' | 'success' | 'warning';
    readonly icon?: IconNames;
    readonly isCloseable?: boolean;
    readonly isLoading?: boolean;
    readonly isRendered?: boolean;
    readonly message?: string;
    readonly subMessage?: string;
    readonly title?: string;

    onAction?(actionKey: string): void;

    onClose?(): void;
}

export interface FluxTooltipSpec {
    readonly id: number;
    readonly axis: 'horizontal' | 'vertical';
    readonly content?: string;
    readonly contentSlot?: Function;
    readonly origin?: HTMLElement;
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

export interface FluxRoutingLocationObject {
    name?: string;
    path?: string;
    hash?: string;
    query?: Dictionary<string | (string | null)[] | null | undefined>;
    params?: Dictionary<string>;
    append?: boolean;
    replace?: boolean;
}

export type FluxRoutingLocation = FluxRoutingLocationObject | string;

export function isFluxFormSelectGroup(item: unknown): item is FluxFormSelectGroup {
    return item !== null && typeof item === 'object' && !('id' in item);
}

export function isFluxFormSelectOption(item: unknown): item is FluxFormSelectOption {
    return item !== null && typeof item === 'object' && 'id' in item;
}
