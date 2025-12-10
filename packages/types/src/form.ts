import type { FluxIconName } from './common';

export type FluxFormSelectGroup = {
    readonly icon?: FluxIconName;
    readonly label: string;
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
