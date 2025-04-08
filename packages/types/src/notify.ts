import type { FluxColor, FluxDirection, FluxIconName, FluxInputType } from './common';

type BaseAlertObject = {
    readonly id: number;
    readonly icon?: FluxIconName;
    readonly message: string;
    readonly title: string;
}

export type FluxAlertObject = BaseAlertObject & {
    onClose(): void;
};

export type FluxConfirmObject = BaseAlertObject & {
    onCancel(): void;
    onConfirm(): void;
};

export type FluxPromptObject = BaseAlertObject & {
    onCancel(): void;
    onConfirm(text: string): void;

    readonly fieldLabel: string;
    readonly fieldPlaceholder?: string;
    readonly fieldType?: FluxInputType;
};

export type FluxSnackbarObject = {
    readonly id: number;
    readonly actions?: Record<string, string>;
    readonly color?: FluxColor;
    readonly icon?: FluxIconName;
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
    readonly content?: string;
    readonly contentSlot?: Function;
    readonly direction: FluxDirection;
    readonly origin?: HTMLElement;
};
