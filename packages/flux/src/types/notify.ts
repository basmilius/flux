import type { Axis, ColorVariant, IconName, InputType } from './common';

type FluxBaseAlertObject = {
    readonly id: number;
    readonly icon?: IconName;
    readonly message: string;
    readonly title: string;
}

export type FluxAlertObject = FluxBaseAlertObject & {
    onClose(): void;
};

export type FluxConfirmObject = FluxBaseAlertObject & {
    onCancel(): void;
    onConfirm(): void;
};

export type FluxPromptObject = FluxBaseAlertObject & {
    onCancel(): void;
    onConfirm(text: string): void;

    readonly fieldLabel: string;
    readonly fieldPlaceholder?: string;
    readonly fieldType?: InputType;
};

export type FluxSnackbarObject = {
    readonly id: number;
    readonly actions?: Record<string, string>;
    readonly color?: ColorVariant;
    readonly icon?: IconName;
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

export type FluxTooltipObject = {
    readonly id: number;
    readonly axis: Axis;
    readonly content?: string;
    readonly contentSlot?: Function;
    readonly origin?: HTMLElement;
};
