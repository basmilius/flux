import type {ButtonHTMLAttributes, HTMLAttributes, MouseEventHandler, ReactNode} from 'react';

type FluxPressableType = 'button' | 'link' | 'route' | 'none';
type FluxSize = 'small' | 'medium' | 'large';
type FluxTo = string | {pathname?: string; search?: string; hash?: string};

export interface FluxPressableProps extends Omit<HTMLAttributes<HTMLElement>, 'onClick'> {
    buttonType?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
    componentType?: FluxPressableType;
    disabled?: boolean;
    href?: string;
    onClick?: MouseEventHandler<HTMLElement>;
    rel?: string;
    target?: string;
    to?: FluxTo;
}

export interface FluxButtonProps extends Omit<FluxPressableProps, 'buttonType' | 'children' | 'componentType' | 'type'> {
    after?: ReactNode;
    before?: ReactNode;
    children?: ReactNode;
    iconLeading?: string | ReactNode;
    iconTrailing?: string | ReactNode;
    isActive?: boolean;
    isFilled?: boolean;
    isLoading?: boolean;
    isSubmit?: boolean;
    label?: ReactNode;
    size?: FluxSize | 'xl';
    type?: FluxPressableType;
}
