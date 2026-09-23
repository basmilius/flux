import {clsx} from 'clsx';
import type {ButtonHTMLAttributes, HTMLAttributes, ReactNode} from 'react';
import type {FluxIconName, FluxPressableType, FluxStyle, FluxTo} from '../types';
import {FluxPressable} from './Actions';
import {FluxIcon} from './Icon';
import {FluxSpinner} from './Feedback';
import actionStyles from '../../../components/src/css/component/Action.module.scss';
import chipStyles from '../../../components/src/css/component/Chip.module.scss';
import itemStyles from '../../../components/src/css/component/Item.module.scss';
import toolbarStyles from '../../../components/src/css/component/Toolbar.module.scss';
import linkStyles from '../../../components/src/css/component/Link.module.scss';
import removeStyles from '../../../components/src/css/component/Remove.module.scss';

export interface FluxActionProps extends Omit<React.ComponentProps<typeof FluxPressable>, 'componentType'> {
    icon?: FluxIconName;
    isActive?: boolean;
    isDestructive?: boolean;
    isLoading?: boolean;
    label?: ReactNode;
    type?: FluxPressableType;
}

export function FluxAction({className, icon, isActive, isDestructive, isLoading, label, type = 'button', ...props}: FluxActionProps) {
    return <FluxPressable {...props} className={clsx(actionStyles.action, isActive && actionStyles.isActive, isDestructive && actionStyles.isDestructive, className)} componentType={type} aria-description={isDestructive ? 'Destructive action' : undefined}>{isLoading ? <FluxSpinner className={actionStyles.actionIcon} size={18} /> : icon && <FluxIcon className={actionStyles.actionIcon} name={icon} />} {label && <span className={actionStyles.actionLabel}>{label}</span>}</FluxPressable>;
}

export function FluxActionStack(props: HTMLAttributes<HTMLDivElement>) {
    return <div {...props} className={props.className} role={props.role ?? 'toolbar'} style={{...props.style, display: 'flex', gap: 1}} />;
}

export function FluxActionBar({actionsAfterSearch, actionsBeforeSearch, actionsEnd, actionsStart, className, primary, search, ...props}: HTMLAttributes<HTMLDivElement> & {actionsAfterSearch?: ReactNode; actionsBeforeSearch?: ReactNode; actionsEnd?: ReactNode; actionsStart?: ReactNode; primary?: ReactNode; search?: ReactNode}) {
    const before = primary || actionsStart;
    const after = actionsBeforeSearch || search || actionsAfterSearch || actionsEnd;
    return <div {...props} className={clsx(actionStyles.actionBar, className)}>{primary}{actionsStart}{before && after && <span style={{flexGrow: 1}} />}{actionsBeforeSearch}{search}{actionsAfterSearch}{actionsEnd}</div>;
}

interface FluxChipCommonProps {
    className?: string;
    iconLeading?: FluxIconName;
    iconTrailing?: FluxIconName;
    label: ReactNode;
}
export type FluxChipProps = FluxChipCommonProps & (
    | ({isSelectable: true; isSelected?: boolean} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof FluxChipCommonProps>)
    | ({isSelectable?: false; isSelected?: never} & Omit<HTMLAttributes<HTMLDivElement>, keyof FluxChipCommonProps>)
);

export function FluxChip({className, iconLeading, iconTrailing, isSelectable, isSelected, label, ...props}: FluxChipProps) {
    const content = <>{isSelectable ? <FluxIcon name={isSelected ? 'check' : iconLeading ?? 'plus'} size={16} /> : iconLeading && <FluxIcon name={iconLeading} size={16} />}<span>{label}</span>{iconTrailing && <FluxIcon name={iconTrailing} size={16} />}</>;
    return isSelectable ? <button {...props as ButtonHTMLAttributes<HTMLButtonElement>} className={clsx(chipStyles.chip, chipStyles.isSelectable, isSelected && chipStyles.isSelected, className)} type="button" aria-pressed={Boolean(isSelected)}>{content}</button> : <div {...props as HTMLAttributes<HTMLDivElement>} className={clsx(chipStyles.chip, className)}>{content}</div>;
}

export function FluxItem({className, htmlFor, isControl, ...props}: HTMLAttributes<HTMLDivElement> & {htmlFor?: string; isControl?: boolean}) {
    const classes = clsx(itemStyles.item, isControl && itemStyles.isControl, className);
    if (isControl) return <label {...props as HTMLAttributes<HTMLLabelElement>} className={classes} htmlFor={htmlFor} />;
    return <div {...props} className={classes} />;
}

export function FluxItemActions({className, isCenter, ...props}: HTMLAttributes<HTMLDivElement> & {isCenter?: boolean}) {
    return <div {...props} className={clsx(itemStyles.itemActions, isCenter && itemStyles.isCenter, className)} />;
}

export function FluxItemContent({className, isCenter, ...props}: HTMLAttributes<HTMLDivElement> & {isCenter?: boolean}) {
    return <div {...props} className={clsx(itemStyles.itemContent, isCenter && itemStyles.isCenter, className)} />;
}

export function FluxItemMedia({className, isCenter, size, style, ...props}: HTMLAttributes<HTMLDivElement> & {isCenter?: boolean; size?: number}) {
    return <div {...props} className={clsx(itemStyles.itemMedia, isCenter && itemStyles.isCenter, className)} style={{...style, '--size': size ? `${size}px` : undefined} as FluxStyle} />;
}

export function FluxItemStack(props: HTMLAttributes<HTMLDivElement>) {
    return <div {...props} className={clsx(itemStyles.itemStack, props.className)} />;
}

export function FluxToolbar({className, floatingMode, ...props}: HTMLAttributes<HTMLDivElement> & {floatingMode?: 'free' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'}) {
    return <div {...props} className={clsx(floatingMode ? toolbarStyles.toolbarFloating : toolbarStyles.toolbarFlat, floatingMode && toolbarStyles[`is${pascal(floatingMode)}`], className)} role={props.role ?? 'toolbar'} />;
}

export function FluxToolbarGroup(props: HTMLAttributes<HTMLDivElement>) {
    return <div {...props} role={props.role ?? 'group'} style={{...props.style, display: 'flex', gap: 3}} />;
}

export interface FluxLinkProps extends Omit<React.ComponentProps<typeof FluxPressable>, 'children' | 'componentType'> {
    children?: ReactNode;
    iconLeading?: FluxIconName;
    iconTrailing?: FluxIconName;
    isPrimary?: boolean;
    label?: ReactNode;
    type?: FluxPressableType;
}

export function FluxLink({children, className, iconLeading, iconTrailing, isPrimary, label, type = 'button', ...props}: FluxLinkProps) {
    return <FluxPressable {...props} className={clsx(linkStyles.link, isPrimary && linkStyles.isPrimary, className)} componentType={type}>{iconLeading && <FluxIcon className={linkStyles.linkIcon} name={iconLeading} />}{children ?? label}{iconTrailing && <FluxIcon className={linkStyles.linkIcon} name={iconTrailing} />}</FluxPressable>;
}

export function FluxRemove({className, icon = 'xmark', isHidden, ...props}: ButtonHTMLAttributes<HTMLButtonElement> & {icon?: FluxIconName; isHidden?: boolean}) {
    return <button {...props} className={clsx(removeStyles.remove, isHidden && removeStyles.isHidden, className)} type="button" aria-label={props['aria-label'] ?? 'Delete'} aria-hidden={isHidden || undefined} tabIndex={isHidden ? -1 : props.tabIndex}>{icon && <FluxIcon name={icon} size={16} />}</button>;
}

function pascal(value: string): string { return value.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(''); }
