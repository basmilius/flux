import {clsx} from 'clsx';
import {type AnchorHTMLAttributes, type ButtonHTMLAttributes, forwardRef, type HTMLAttributes, type KeyboardEvent, type MouseEvent, type MouseEventHandler, type ReactNode} from 'react';
import type {FluxButtonProps, FluxPressableProps} from '@flux-ui/types/react';
import type {FluxIconName} from '../types';
import {resolveTo} from '../types';
import {FluxIcon} from './Icon';
import {FluxSpinner} from './Feedback';
import buttonStyles from '~flux/components/css/component/Button.module.scss';
import baseButtonStyles from '~flux/components/css/component/base/Button.module.scss';

export type {FluxButtonProps, FluxPressableProps} from '@flux-ui/types/react';

function isDangerousUrl(href: string | undefined): boolean {
    return href !== undefined && /^\s*(javascript|data|vbscript):/i.test(href);
}

export const FluxPressable = forwardRef<HTMLElement, FluxPressableProps>(function FluxPressable(
    {buttonType = 'button', children, componentType = 'none', disabled, href, onClick, onKeyDown, rel, role, tabIndex, target, to, ...props},
    ref
) {
    const resolvedHref = componentType === 'route' ? resolveTo(to) : href;
    const blocked = isDangerousUrl(resolvedHref);
    const resolvedRel = rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined);

    const handleClick: MouseEventHandler<HTMLElement> = event => {
        if (disabled || blocked) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        onClick?.(event);
    };

    if (componentType === 'link' || componentType === 'route') {
        return <a
            {...props as AnchorHTMLAttributes<HTMLAnchorElement>}
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={blocked ? undefined : resolvedHref}
            rel={resolvedRel}
            role={role}
            target={target}
            tabIndex={disabled || blocked ? -1 : tabIndex}
            aria-disabled={disabled || blocked || undefined}
            onClick={handleClick as MouseEventHandler<HTMLAnchorElement>}
        >{children}</a>;
    }

    if (componentType === 'button') {
        return <button
            {...props as ButtonHTMLAttributes<HTMLButtonElement>}
            ref={ref as React.Ref<HTMLButtonElement>}
            type={buttonType}
            role={role}
            disabled={disabled}
            tabIndex={tabIndex}
            onClick={handleClick as MouseEventHandler<HTMLButtonElement>}
        >{children}</button>;
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(event);
        if (event.defaultPrevented || disabled || (event.key !== 'Enter' && event.key !== ' ')) return;
        event.preventDefault();
        event.currentTarget.click();
    };
    const interactive = role === undefined || role === 'button' || Boolean(onClick);

    return <div
        {...props as HTMLAttributes<HTMLDivElement>}
        ref={ref as React.Ref<HTMLDivElement>}
        role={role ?? 'button'}
        tabIndex={disabled ? -1 : interactive ? tabIndex ?? 0 : tabIndex}
        aria-disabled={disabled || undefined}
        onClick={handleClick as MouseEventHandler<HTMLDivElement>}
        onKeyDown={interactive ? handleKeyDown : onKeyDown as React.KeyboardEventHandler<HTMLDivElement>}
    >{children}</div>;
});

type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'primaryLink' | 'secondaryLink';

const buttonVariantClasses: Record<ButtonVariant, {button: string; icon: string; label: string}> = {
    primary: {button: buttonStyles.primaryButton, icon: buttonStyles.primaryButtonIcon, label: buttonStyles.primaryButtonLabel},
    secondary: {button: buttonStyles.secondaryButton, icon: buttonStyles.secondaryButtonIcon, label: buttonStyles.secondaryButtonLabel},
    destructive: {button: buttonStyles.destructiveButton, icon: buttonStyles.destructiveButtonIcon, label: buttonStyles.destructiveButtonLabel},
    primaryLink: {button: buttonStyles.primaryLinkButton, icon: buttonStyles.primaryLinkButtonIcon, label: buttonStyles.primaryLinkButtonLabel},
    secondaryLink: {button: buttonStyles.secondaryLinkButton, icon: buttonStyles.secondaryLinkButtonIcon, label: buttonStyles.secondaryLinkButtonLabel}
};

export function FluxButton({variant = 'secondary', ...props}: FluxButtonProps & {variant?: ButtonVariant}) {
    const classes = buttonVariantClasses[variant];
    const {
        after, before, children, className, disabled, iconLeading, iconTrailing, isActive, isFilled,
        isLoading, isSubmit, label, onClick, size = 'medium', type = 'button', ...pressableProps
    } = props;

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        if (disabled || isLoading) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        onClick?.(event);
    };

    return (
        <FluxPressable
            {...pressableProps}
            className={clsx(classes.button, isActive && buttonStyles.isActive, isFilled && baseButtonStyles.isFilled, baseButtonStyles[`is${capitalize(size)}`], className)}
            componentType={type}
            buttonType={isSubmit ? 'submit' : 'button'}
            disabled={disabled}
            aria-busy={isLoading || undefined}
            aria-pressed={isActive && type === 'button' ? true : undefined}
            aria-current={isActive && (type === 'link' || type === 'route') ? 'page' : undefined}
            onClick={handleClick}
        >
            {before}
            {renderIcon(iconLeading, classes.icon, Boolean(isLoading && (!iconTrailing || iconLeading)))}
            {label !== undefined && label !== null && <span className={classes.label}>{label}</span>}
            {children}
            {renderIcon(iconTrailing, classes.icon, Boolean(isLoading && iconTrailing && !iconLeading))}
            {after}
        </FluxPressable>
    );
}

export function FluxPrimaryButton(props: FluxButtonProps) {
    return <FluxButton {...props} variant="primary" />;
}

export function FluxSecondaryButton(props: FluxButtonProps) {
    return <FluxButton {...props} variant="secondary" />;
}

export function FluxDestructiveButton(props: FluxButtonProps) {
    return <FluxButton {...props} variant="destructive" />;
}

export function FluxPrimaryLinkButton(props: FluxButtonProps) {
    return <FluxButton {...props} type={props.type ?? 'link'} variant="primaryLink" />;
}

export function FluxSecondaryLinkButton(props: FluxButtonProps) {
    return <FluxButton {...props} type={props.type ?? 'link'} variant="secondaryLink" />;
}

export function FluxButtonGroup({children, className, ...props}: HTMLAttributes<HTMLDivElement>) {
    return <div {...props} className={clsx(buttonStyles.buttonGroup, className)} role={props.role ?? 'group'}>{children}</div>;
}

export function FluxButtonStack({children, className, direction = 'horizontal', gap = 9, isFilled, style, ...props}: HTMLAttributes<HTMLDivElement> & {direction?: 'horizontal' | 'vertical'; gap?: number; isFilled?: boolean}) {
    return <div
        {...props}
        className={className}
        style={{...style, display: 'flex', width: isFilled ? '100%' : undefined, flexDirection: direction === 'horizontal' ? 'row' : 'column', flexWrap: 'wrap', gap}}
    >{children}</div>;
}

function renderIcon(icon: FluxIconName | ReactNode | undefined, className: string, loading: boolean) {
    if (loading) return <FluxSpinner size={20} />;
    if (typeof icon === 'string') return <FluxIcon className={className} name={icon} />;
    return icon;
}

function capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
}
