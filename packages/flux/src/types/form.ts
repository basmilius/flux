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
    readonly id: string | number | null;
    readonly label: string;
    readonly selectable?: boolean;
};

export type FluxFormSelectEntry =
    | FluxFormSelectGroup
    | FluxFormSelectOption;
