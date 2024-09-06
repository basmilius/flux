import type { IconName as _IconName } from '@fortawesome/fontawesome-common-types';

export type IconName = _IconName | 'flux-empty';

export type Axis =
    | 'horizontal'
    | 'vertical';

export type ColorVariant =
    | 'gray'
    | 'primary'
    | 'danger'
    | 'info'
    | 'success'
    | 'warning';

export type InputMask =
    | 'bic'
    | 'iban'
    | 'vat';

export type InputType =
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

export type Size =
    | 'small'
    | 'medium'
    | 'large';

export type ButtonSize = Size | 'xl';

export type ButtonType =
    | 'button'
    | 'link'
    | 'route';

export type ButtonEmits = {
    click: [MouseEvent];
    mouseenter: [MouseEvent];
    mouseleave: [MouseEvent];
};

export type ButtonProps = {
    readonly type?: ButtonType;
    readonly disabled?: boolean;
    readonly iconAfter?: IconName | null;
    readonly iconBefore?: IconName | null;
    readonly isLoading?: boolean;
    readonly isSubmit?: boolean;
    readonly label?: string;
    readonly size?: ButtonSize;
    readonly tabindex?: string | number;
    readonly href?: string;
    readonly rel?: string;
    readonly target?: string;
    readonly to?: To;
};

export type ButtonSlots = {
    default(): any;
    after(): any;
    before(): any;
    iconAfter(): any;
    iconBefore(): any;
    label(): any;
}

export type To = {
    name?: string;
    path?: string;
    hash?: string;
    query?: Record<string, string | (string | null)[] | null | undefined>;
    params?: Record<string, string>;
    append?: boolean;
    replace?: boolean;
};
