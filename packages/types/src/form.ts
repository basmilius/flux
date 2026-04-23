import type { FluxIconName } from './common';

export type FluxFormInputBaseProps = {
    readonly autoFocus?: boolean;
    readonly disabled?: boolean;
    readonly error?: string | null;
    readonly isCondensed?: boolean;
    readonly isLoading?: boolean;
    readonly isReadonly?: boolean;
    readonly isSecondary?: boolean;
    readonly name?: string;
    readonly placeholder?: string;
};

export type FluxFormTreeViewSelectOption = {
    readonly id: string | number;
    readonly label: string;
    readonly icon?: FluxIconName;
    readonly selectable?: boolean;
    readonly children?: FluxFormTreeViewSelectOption[];
};

export type FluxFormTreeViewSelectValue = FluxFormTreeViewSelectValueSingle | FluxFormTreeViewSelectValueSingle[];
export type FluxFormTreeViewSelectValueSingle = string | number;

export type FluxFormSelectGroup = {
    readonly icon?: FluxIconName;
    readonly label: string;
    readonly value?: never;
};

export type FluxFormSelectOption = {
    readonly badge?: string;
    readonly command?: string;
    readonly commandIcon?: FluxIconName;
    readonly icon?: FluxIconName;
    readonly imageAlt?: string;
    readonly imageSrc?: string;
    readonly label: string;
    readonly selectable?: boolean;
    readonly value: string | number | null;
};

export type FluxFormSelectEntry =
    | FluxFormSelectGroup
    | FluxFormSelectOption;

export type FluxFormSelectOptions = [FluxFormSelectEntry | null, FluxFormSelectOption[]];
export type FluxFormSelectValue = FluxFormSelectValueSingle | FluxFormSelectValueSingle[];
export type FluxFormSelectValueSingle = string | number | null;
