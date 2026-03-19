import type { FluxIconName, FluxPressableType, FluxSize, FluxTo } from './common';

export type FluxButtonSize = FluxSize | 'xl';

export type FluxButtonEmits = {
    click: [MouseEvent];
    mouseenter: [MouseEvent];
    mouseleave: [MouseEvent];
};

export type FluxButtonProps = {
    readonly type?: FluxPressableType;
    readonly disabled?: boolean;
    readonly iconLeading?: FluxIconName | null;
    readonly iconTrailing?: FluxIconName | null;
    readonly isFilled?: boolean;
    readonly isLoading?: boolean;
    readonly isSubmit?: boolean;
    readonly label?: string;
    readonly size?: FluxButtonSize;
    readonly tabindex?: string | number;
    readonly href?: string;
    readonly rel?: string;
    readonly target?: string;
    readonly to?: FluxTo;
};

export type FluxButtonSlots = {
    default(): any;
    after(): any;
    before(): any;
    iconLeading(): any;
    iconTrailing(): any;
    label(): any;
}

export type FluxFocalPointObject = {
    readonly x: number;
    readonly y: number;
};

export type FluxLegendObject = {
    readonly color: string;
    readonly label: string;
}

export type FluxPercentageBarItemObject = FluxLegendObject & {
    readonly icon: FluxIconName;
    readonly value: number;
};

export type FluxSegmentedControlItemObject = {
    readonly icon?: FluxIconName;
    readonly label?: string;
};

export type FluxTreeViewOption = {
    readonly id: string | number;
    readonly label: string;
    readonly icon?: FluxIconName;
    readonly children?: FluxTreeViewOption[];
};

export type FluxCommandSubAction = {
    readonly label: string;
    readonly icon?: FluxIconName;
    readonly onActivate: () => void;
};

export type FluxCommandSourceItem = {
    readonly id: string | number;
    readonly label: string;
    readonly subLabel?: string;
    readonly icon?: FluxIconName;
    readonly command?: string;
    readonly subActions?: FluxCommandSubAction[];
    readonly onActivate: () => void;
};

export type FluxCommandSource = {
    readonly key: string;
    readonly label: string;
    readonly icon?: FluxIconName;
    readonly tab?: boolean;
    readonly global?: boolean;
    readonly items: FluxCommandSourceItem[];
    readonly fetchSearch?: (query: string) => Promise<FluxCommandSourceItem[]>;
};
