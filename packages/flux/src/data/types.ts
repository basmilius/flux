import type { IconDefinition, IconName, IconPathData } from '@fortawesome/fontawesome-common-types';

export type IconNames = IconName | 'flux-empty';

export type {
    IconDefinition,
    IconPathData
};

export type FluxBaseAlertSpec = {
    readonly id: number;
    readonly icon?: IconNames;
    readonly message: string;
    readonly title: string;
};

export type FluxAlertSpec = FluxBaseAlertSpec & {
    onClose(): void;
};

export type FluxConfirmSpec = FluxBaseAlertSpec & {
    onCancel(): void;
    onConfirm(): void;
};

export type FluxPromptSpec = FluxBaseAlertSpec & {
    readonly fieldLabel: string;
    readonly fieldPlaceholder?: string;
    readonly fieldType?: 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'month' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'week';

    onCancel(): void;
    onConfirm(text: string): void;
};

export type FluxSnackbarSpec = {
    readonly id: number;
    readonly actions?: Record<string, string>;
    readonly color?: 'gray' | 'primary' | 'danger' | 'info' | 'success' | 'warning';
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
};

export type FluxTooltipSpec = {
    readonly id: number;
    readonly axis: 'horizontal' | 'vertical';
    readonly content?: string;
    readonly contentSlot?: Function;
    readonly origin?: HTMLElement;
};

export type FluxFormSelectOption = {
    readonly badge?: string;
    readonly command?: string;
    readonly commandIcon?: IconNames | null;
    readonly icon?: IconNames | null;
    readonly id: string | number | null;
    readonly label: string;
    readonly selectable?: boolean;
};

export type FluxFormSelectGroup = {
    readonly icon: IconNames | null;
    readonly label: string;
};

export type FluxFocalPoint = {
    readonly x: number;
    readonly y: number;
};

export type FluxRoutingLocationObject = {
    name?: string;
    path?: string;
    hash?: string;
    query?: Record<string, string | (string | null)[] | null | undefined>;
    params?: Record<string, string>;
    append?: boolean;
    replace?: boolean;
};

export type FluxLegendSpec = {
    readonly color: string;
    readonly label: string;
}

export type FluxPercentageBarItemSpec = FluxLegendSpec & {
    readonly icon: IconNames;
    readonly value: number;
};

export type FluxSegmentedControlItemSpec = {
    readonly icon?: IconNames;
    readonly label?: string;
};

export type FluxFormSelectEntry = FluxFormSelectGroup | FluxFormSelectOption;
export type FluxRoutingLocation = FluxRoutingLocationObject | string;
