import type { IconName } from './common';

export type FluxFormSelectGroup = {
    readonly icon?: IconName;
    readonly label: string;
};

export type FluxFormSelectOption = {
    readonly badge?: string;
    readonly command?: string;
    readonly commandIcon?: IconName;
    readonly icon?: IconName;
    readonly label: string;
    readonly selectable?: boolean;
    readonly value: string | number | null;
};

export type FluxFormSelectEntry =
    | FluxFormSelectGroup
    | FluxFormSelectOption;
