import {useFluxTranslate} from '../i18n';
import {FluxFadeTransition} from './Transitions';
import {clsx} from 'clsx';
import {createContext, useContext, useLayoutEffect, useMemo, useState} from 'react';
import type {ButtonHTMLAttributes, HTMLAttributes, ReactNode} from 'react';
import type {FluxIconName, FluxPressableType, FluxStyle, FluxTo} from '../types';
import {FluxButton, FluxButtonGroup, FluxDestructiveButton, FluxPressable, FluxSecondaryButton} from './Actions';
import {FluxFlex, FluxSpacer} from './Layout';
import {FluxFlyout, FluxTooltip, type FluxFlyoutProps} from './Overlays';
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
    isSubmit?: boolean;
    isLoading?: boolean;
    label?: ReactNode;
    type?: FluxPressableType;
}

export function FluxAction({className, icon, isActive, isDestructive, isLoading, label, type = 'button', ...props}: FluxActionProps) {
    return <FluxButton {...props} className={clsx(isDestructive && actionStyles.isDestructive, className)} cssClass={actionStyles.action} cssClassActive={actionStyles.isActive} cssClassIcon={actionStyles.actionIcon} cssClassLabel={actionStyles.actionLabel} iconLeading={icon} isActive={isActive} isLoading={isLoading} label={label} type={type} aria-description={isDestructive ? 'Destructive action' : undefined} />;
}

export function FluxActionStack(props: HTMLAttributes<HTMLDivElement>) {
    return <div {...props} className={props.className} role={props.role ?? 'toolbar'} style={{...props.style, display: 'flex', gap: 1}} />;
}

export function FluxActionBar({actionsAfterSearch, actionsBeforeSearch, actionsEnd, actionsStart, className, filter, filterOpener, isResettable, onReset, primary, search, ...props}: HTMLAttributes<HTMLDivElement> & {actionsAfterSearch?: ReactNode; actionsBeforeSearch?: ReactNode; actionsEnd?: ReactNode; actionsStart?: ReactNode; filter?: FluxFlyoutProps['children']; filterOpener?: FluxFlyoutProps['opener']; isResettable?: boolean; onReset?: () => void; primary?: ReactNode; search?: ReactNode}) {
    const translate = useFluxTranslate();

    const before = primary || actionsStart;
    const after = actionsBeforeSearch || search || actionsAfterSearch || filter || actionsEnd;
    return <FluxFlex {...props} className={clsx(actionStyles.actionBar, className)} gap={9}>
        {primary}{actionsStart}{before && after && <FluxSpacer />}{actionsBeforeSearch}{search}{actionsAfterSearch}
        {filter && <FluxFlyout opener={filterOpener ?? (({open}) => <FluxButtonGroup><FluxSecondaryButton iconLeading="filter" label={translate('flux.filter')} onClick={open} />{isResettable && <FluxTooltip content="Reset filters"><FluxDestructiveButton iconLeading="xmark" onClick={onReset} /></FluxTooltip>}</FluxButtonGroup>)}>{filter}</FluxFlyout>}
        {actionsEnd}
    </FluxFlex>;
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
    const content = <>{isSelectable ? <FluxFadeTransition><FluxIcon key={isSelected ? 'circle-check' : iconLeading ?? 'plus'} name={isSelected ? 'circle-check' : iconLeading ?? 'plus'} size={15} /></FluxFadeTransition> : iconLeading && <FluxIcon name={iconLeading} size={15} />}<span>{label}</span>{iconTrailing && <FluxIcon name={iconTrailing} size={15} />}</>;
    return isSelectable ? <button {...props as ButtonHTMLAttributes<HTMLButtonElement>} className={clsx(chipStyles.chip, chipStyles.isSelectable, isSelected && chipStyles.isSelected, className)} type="button" aria-pressed={Boolean(isSelected)}>{content}</button> : <div {...props as HTMLAttributes<HTMLDivElement>} className={clsx(chipStyles.chip, className)}>{content}</div>;
}

export const ItemControlContext = createContext<{isControl: boolean; register(id: string): void} | null>(null);
export function useItemControl(id: string) {
    const control = useContext(ItemControlContext);
    useLayoutEffect(() => {control?.register(id);}, [control, id]);
    return Boolean(control?.isControl);
}
export function FluxItem({className, htmlFor, isControl = false, ...props}: HTMLAttributes<HTMLDivElement> & {htmlFor?: string; isControl?: boolean}) {
    const [controlId, setControlId] = useState<string>();
    const context = useMemo(() => ({isControl, register: setControlId}), [isControl]);
    const classes = clsx(itemStyles.item, isControl && itemStyles.isControl, className);
    return <ItemControlContext.Provider value={context}>{isControl ? <label {...props as HTMLAttributes<HTMLLabelElement>} className={classes} htmlFor={htmlFor ?? controlId} /> : <div {...props} className={classes} />}</ItemControlContext.Provider>;
}

export function FluxItemActions({children, className, isCenter, ...props}: Omit<HTMLAttributes<HTMLDivElement>, 'onReset'> & {isCenter?: boolean}) {
    return <FluxActionBar {...props} className={clsx(itemStyles.itemActions, isCenter && itemStyles.isCenter, className)} primary={children}/>;
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
    const translate = useFluxTranslate();

    return <button {...props} className={clsx(removeStyles.remove, isHidden && removeStyles.isHidden, className)} type="button" aria-label={props['aria-label'] ?? translate('flux.delete')} aria-hidden={isHidden || undefined} tabIndex={isHidden ? -1 : props.tabIndex}>{icon && <FluxIcon name={icon} size={16} />}</button>;
}

function pascal(value: string): string { return value.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(''); }
