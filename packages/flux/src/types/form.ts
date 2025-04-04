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
    readonly label: string;
    readonly selectable?: boolean;
    readonly value: string | number | null;
};

export type FluxFormSelectEntry =
    | FluxFormSelectGroup
    | FluxFormSelectOption;
