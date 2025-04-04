import type { FontAwesome } from './font-awesome';
import type { MaterialSymbol } from './material-symbols';

export type FluxIconName = FontAwesome | MaterialSymbol | 'flux-empty';

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
    params?: Record<string, string | number>;
    state?: Record<string, string | number | boolean>;
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

type AutoCompleteGroupIdentifier =
    | 'billing'
    | 'shipping';

type AutoCompleteRecipientType =
    | 'home'
    | 'work'
    | 'mobile'
    | 'fax'
    | 'page';

type AutoCompleteContactToken =
    | 'tel'
    | 'tel-country-code'
    | 'tel-national'
    | 'tel-area-code'
    | 'tel-local'
    | 'tel-extension'
    | 'email'
    | 'impp';

type AutoCompleteToken =
    | 'name'
    | 'honorific-prefix'
    | 'given-name'
    | 'additional-name'
    | 'family-name'
    | 'honorific-suffix'
    | 'nickname'
    | 'username'
    | 'new-password'
    | 'current-password'
    | 'one-time-code'
    | 'organization-title'
    | 'organization'
    | 'street-address'
    | 'address-line1'
    | 'address-line2'
    | 'address-line3'
    | 'address-level4'
    | 'address-level3'
    | 'address-level2'
    | 'address-level1'
    | 'country'
    | 'country-name'
    | 'postal-code'
    | 'cc-name'
    | 'cc-given-name'
    | 'cc-additional-name'
    | 'cc-family-name'
    | 'cc-number'
    | 'cc-exp'
    | 'cc-exp-month'
    | 'cc-exp-year'
    | 'cc-csc'
    | 'cc-type'
    | 'transaction-currency'
    | 'transaction-amount'
    | 'language'
    | 'bday'
    | 'bday-day'
    | 'bday-month'
    | 'bday-year'
    | 'sex'
    | 'url'
    | 'photo'
    | 'webauthn';

export type FluxAutoCompleteType =
    | AutoCompleteToken
    | AutoCompleteContactToken
    | AutoCompleteRecipientType
    | AutoCompleteGroupIdentifier
    | `${AutoCompleteGroupIdentifier} ${AutoCompleteToken}`
    | `${AutoCompleteGroupIdentifier} ${AutoCompleteContactToken}`
    | (string & {});
