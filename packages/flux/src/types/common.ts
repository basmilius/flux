import type { IconName } from '@fortawesome/fontawesome-common-types';

export type FluxIconName = IconName | 'flux-empty';

export type FluxColorVariant =
    | 'gray'
    | 'primary'
    | 'danger'
    | 'info'
    | 'success'
    | 'warning';

export type FluxDirection =
    | 'horizontal'
    | 'vertical';

export type FluxInputMask =
    | 'bic'
    | 'iban'
    | 'vat';

export type FluxInputType =
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'month'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';

export type FluxPressableType =
    | 'button'
    | 'link'
    | 'route'
    | 'none';

export type FluxSize =
    | 'small'
    | 'medium'
    | 'large';

export type FluxTo = {
    name?: string;
    path?: string;
    hash?: string;
    query?: Record<string, string | (string | null)[] | null | undefined>;
    params?: Record<string, string>;
    append?: boolean;
    replace?: boolean;
};

export type FluxButtonSize = FluxSize | 'xl';

export type FluxButtonEmits = {
    click: [MouseEvent];
    mouseenter: [MouseEvent];
    mouseleave: [MouseEvent];
};

export type FluxButtonProps = {
    readonly type?: FluxPressableType;
    readonly disabled?: boolean;
    readonly iconAfter?: FluxIconName | null;
    readonly iconBefore?: FluxIconName | null;
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
    iconAfter(): any;
    iconBefore(): any;
    label(): any;
}
