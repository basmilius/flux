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

export interface FluxPromptSpec extends FluxBaseAlertSpec {
    readonly fieldLabel: string;
    readonly fieldPlaceholder?: string;
    readonly fieldType?: 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'month' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'week';

    onCancel(): void;

    onConfirm(text: string): void;
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
    readonly progressIndeterminate?: boolean;
    readonly progressMax?: number;
    readonly progressMin?: number;
    readonly progressStatus?: string;
    readonly progressValue?: number;
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
    readonly command?: string;
    readonly commandIcon?: IconNames | null;
    readonly icon?: IconNames | null;
    readonly id: string | number | null;
    readonly label: string;
    readonly selectable?: boolean;
}

export interface FluxFormSelectGroup {
    readonly icon: IconNames | null;
    readonly label: string;
}

export interface FluxFocalPoint {
    readonly x: number;
    readonly y: number;
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

export interface FluxPercentageBarItemSpec {
    readonly color?: string;
    readonly icon?: IconNames;
    readonly label: string;
    readonly value: number;
}

export type FluxFormSelectEntry = FluxFormSelectGroup | FluxFormSelectOption;
export type FluxRoutingLocation = FluxRoutingLocationObject | string;
