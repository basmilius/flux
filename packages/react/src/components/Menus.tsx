import {useFluxTranslate} from '../i18n';
import {clsx} from 'clsx';
import {Children, cloneElement, createContext, isValidElement, useContext, useEffect, useId, useLayoutEffect, useRef, useState, useSyncExternalStore} from 'react';
import {createPortal} from 'react-dom';
import type {CSSProperties, ButtonHTMLAttributes, HTMLAttributes, KeyboardEvent, ReactElement, ReactNode} from 'react';
import type {FluxIconName, FluxPressableType, FluxTo} from '../types';
import {FluxButton, FluxPressable} from './Actions';
import {FluxSpinner} from './Feedback';
import {useFluxDisabled} from './DisplayExtended';
import {FluxIcon} from './Icon';
import {useFluxFlyout} from './Overlays';
import {FluxAutoHeightTransition} from './Transitions';
import {routeMatches, useFluxRouting} from '../routing';
import {flattenElements} from './children';
import {positionPopup} from './anchor';
import {createMenuPrediction, type MenuEntry, type MenuPrediction} from './menuPrediction';
import menuStyles from '../../../components/src/css/component/Menu.module.scss';
import flyoutStyles from '../../../components/src/css/component/MenuFlyout.module.scss';
import formStyles from '../../../components/src/css/component/Form.module.scss';

export const MenuPersistentContext = createContext(false);
export const MenuContext = createContext<{close?: () => void; ownerId?: string; ancestors?: string; debugCone?: boolean; prediction?: MenuPrediction; persistent: boolean}>({persistent: false});
export function useMenuPrediction(close?: () => void) {
    const callback = useRef(close);
    callback.current = close;
    const [prediction] = useState(() => createMenuPrediction(() => callback.current?.()));
    return prediction;
}
export function FluxMenu({children, className, debugCone = false, isLarge, isPersistent, onKeyDown, role = 'menu', ...props}: HTMLAttributes<HTMLElement> & {debugCone?: boolean; isLarge?: boolean; isPersistent?: boolean}) {
    const parent = useContext(MenuContext);
    const inheritedPersistent = useContext(MenuPersistentContext);
    const flyout = useFluxFlyout();
    const ownPrediction = useMenuPrediction(parent.close ?? flyout?.close);
    const prediction = parent.prediction ?? ownPrediction;
    const nav = useRef<HTMLElement>(null);
    const coneActive = useSyncExternalStore(prediction.subscribe, () => Boolean(nav.current && prediction.getConeTrigger() && nav.current.contains(prediction.getConeTrigger())), () => false);
    return <MenuContext.Provider value={{ancestors: parent.ancestors, debugCone: parent.prediction ? parent.debugCone : debugCone, ownerId: parent.ownerId, prediction, close: prediction.closeAll, persistent: Boolean(isPersistent || parent.persistent || inheritedPersistent)}}><MenuPersistentContext.Provider value={Boolean(isPersistent || parent.persistent || inheritedPersistent)}><nav {...props} ref={nav} className={clsx(isLarge ? menuStyles.menuLarge : menuStyles.menuNormal, coneActive && menuStyles.menuConeActive, className)} role={role} aria-orientation="vertical" onKeyDown={event => {onKeyDown?.(event); if (!event.defaultPrevented) menuKeys(event);}}>{children}</nav></MenuPersistentContext.Provider></MenuContext.Provider>;
}

export interface FluxMenuItemProps extends Omit<React.ComponentProps<typeof FluxPressable>, 'children' | 'componentType'> {after?: ReactNode; before?: ReactNode; command?: string; commandIcon?: FluxIconName; commandLoading?: boolean; iconLeading?: FluxIconName; iconTrailing?: FluxIconName; imageAlt?: string; imageSrc?: string; isActive?: boolean; isDestructive?: boolean; isHighlighted?: boolean; isIndented?: boolean; isLoading?: boolean; isPersistent?: boolean; isSelectable?: boolean; isSelected?: boolean; label?: ReactNode; type?: FluxPressableType;}
export function FluxMenuItem({after, before, className, command, commandIcon, commandLoading, iconLeading, iconTrailing, imageAlt, imageSrc, isActive, isDestructive, isHighlighted, isIndented, isLoading, isPersistent, isSelectable, isSelected, label, onClick, role, type = 'button', ...props}: FluxMenuItemProps) {
    const menu = useContext(MenuContext);
    const leading = isSelectable && (!iconLeading || isSelected)
        ? <FluxIcon className={menuStyles.menuItemSelectableIcon} name={isSelected ? 'circle-check' : undefined} />
        : imageSrc ? <img className={menuStyles.menuItemImage} src={imageSrc} alt={imageAlt ?? ''} />
        : before ?? iconLeading;

    return <FluxButton
        {...props}
        cssClass={menuStyles.menuItem}
        cssClassIcon={menuStyles.menuItemIcon}
        cssClassLabel={menuStyles.menuItemLabel}
        className={clsx(isActive && menuStyles.menuItemActive, isDestructive && menuStyles.menuItemDestructive, isHighlighted && menuStyles.menuItemHighlighted, isIndented && menuStyles.menuItemIndented, isSelectable && isSelected && menuStyles.menuItemSelected, className)}
        isFilled
        isLoading={isLoading}
        iconLeading={leading}
        iconTrailing={iconTrailing}
        label={label}
        type={type}
        role={role ?? (isSelectable ? 'menuitemradio' : 'menuitem')}
        aria-checked={isSelectable ? isSelected : undefined}
        onClick={event => {
            onClick?.(event);
            if (!event.defaultPrevented && !isPersistent && !menu.persistent) menu.close?.();
        }}
        after={<>
            {commandLoading ? <FluxSpinner className={menuStyles.menuItemCommandIcon} size={16} /> : <>
                {command && <kbd className={menuStyles.menuItemCommand}>{command}</kbd>}
                {commandIcon && <FluxIcon className={menuStyles.menuItemCommandIcon} name={commandIcon} size={16} />}
            </>}
            {after}
        </>}
    />;
}

export function FluxMenuGroup({isHorizontal, ...props}: HTMLAttributes<HTMLDivElement> & {isHorizontal?: boolean}) { return <div {...props} className={clsx(isHorizontal ? menuStyles.menuGroupHorizontal : menuStyles.menuGroupVertical, props.className)} role="group" />; }
export function FluxMenuPane(props: HTMLAttributes<HTMLDivElement>) { return <div {...props} className={clsx(menuStyles.menuPane, props.className)} data-flux-menu-pane="" role="group" />; }
export function FluxMenuTitle({title, ...props}: HTMLAttributes<HTMLDivElement> & {title: ReactNode}) { return <div {...props} className={clsx(menuStyles.menuTitle, props.className)} role="presentation">{title}</div>; }
export function FluxMenuSubHeader({iconLeading, iconTrailing, label, ...props}: HTMLAttributes<HTMLDivElement> & {iconLeading?: FluxIconName; iconTrailing?: FluxIconName; label: ReactNode}) { return <div {...props} className={clsx(menuStyles.menuSubHeader, props.className)} role="presentation">{iconLeading && <FluxIcon className={menuStyles.menuSubHeaderIcon} name={iconLeading} />}<span className={menuStyles.menuSubHeaderLabel}>{label}</span>{iconTrailing && <FluxIcon className={menuStyles.menuSubHeaderIcon} name={iconTrailing} />}</div>; }
export function FluxMenuControl({children, disabled, iconLeading, isFill, label, ...props}: HTMLAttributes<HTMLDivElement> & {disabled?: boolean; iconLeading?: FluxIconName; isFill?: boolean; label?: ReactNode}) { const id = useId(); return <div {...props} className={clsx(menuStyles.menuControl, disabled && menuStyles.menuControlDisabled, isFill && menuStyles.menuControlFill, props.className)} role="group" aria-labelledby={label ? id : undefined}>{iconLeading && <FluxIcon className={menuStyles.menuControlIcon} name={iconLeading} />}{label && <span id={id} className={menuStyles.menuControlLabel}>{label}</span>}<div className={menuStyles.menuControlContent}>{children}</div></div>; }

export function FluxMenuCheckbox({checked, onCheckedChange, ...props}: Omit<FluxMenuItemProps, 'isSelectable' | 'isSelected'> & {checked: boolean; onCheckedChange(checked: boolean): void}) { return <FluxMenuItem {...props} isPersistent isSelectable isSelected={checked} role="menuitemcheckbox" onClick={event => {props.onClick?.(event); if (!event.defaultPrevented) onCheckedChange(!checked);}} />; }
export function FluxMenuToggle({checked, onCheckedChange, ...props}: Omit<FluxMenuItemProps, 'after'> & {checked: boolean; onCheckedChange(checked: boolean): void}) { return <FluxMenuItem {...props} isPersistent role="menuitemcheckbox" aria-checked={checked} after={<span className={clsx(formStyles.formToggle, checked && formStyles.isChecked)} aria-hidden="true"><span className={formStyles.formToggleInput} /></span>} onClick={event => {props.onClick?.(event); if (!event.defaultPrevented) onCheckedChange(!checked);}} />; }

export function FluxMenuOptions({children, isHorizontal, isPersistent, mode = 'highlight', onValueChange, value}: {children: ReactNode; isHorizontal?: boolean; isPersistent?: boolean; mode?: 'highlight' | 'select'; onValueChange(value: string | number): void; value: string | number}) { return <FluxMenuGroup isHorizontal={isHorizontal}>{Children.map(children, (child, index) => {if (!isValidElement(child)) return child; const item = child as ReactElement<FluxMenuItemProps>, identity = typeof child.key === 'string' || typeof child.key === 'number' ? child.key : index; return cloneElement(item, {isHighlighted: mode === 'highlight' && value === identity, isPersistent: isPersistent ?? true, isSelectable: mode === 'select', isSelected: mode === 'select' && value === identity, onClick: event => {item.props.onClick?.(event); if (!event.defaultPrevented) onValueChange(identity);}});})}</FluxMenuGroup>; }

export function FluxMenuCollapsible({before, children, defaultOpened, disabled, href, iconLeading, isOpened, label, onOpenedChange, onToggle, rel, target, to}: {before?: ReactNode; children: ReactNode; defaultOpened?: boolean; disabled?: boolean; href?: string; iconLeading?: FluxIconName; isOpened?: boolean; label?: ReactNode; onOpenedChange?: (open: boolean) => void; onToggle?: (open: boolean) => void; rel?: string; target?: string; to?: FluxTo}) {
    const [local, setLocal] = useState(Boolean(defaultOpened));
    const open = isOpened ?? local;
    const id = useId();
    const {route} = useFluxRouting();
    useEffect(() => {
        const matches = flattenElements<{href?: string; to?: FluxTo}>(children).some(child => routeMatches(route, child.props.to ?? child.props.href));
        if (matches && !open) {setLocal(true); onOpenedChange?.(true);}
    }, [route, children]);
    const change = () => {
        const next = href || to ? true : !open;
        if (next === open) return;
        setLocal(next);
        onOpenedChange?.(next);
        onToggle?.(next);
    };
    return <div className={open ? menuStyles.menuCollapsibleOpened : menuStyles.menuCollapsible}>
        <FluxMenuItem before={before} disabled={disabled} href={href} rel={rel} target={target} to={to} type={to ? 'route' : href ? 'link' : 'button'} iconLeading={iconLeading} iconTrailing={open ? 'angle-down' : 'angle-right'} isPersistent label={label} aria-expanded={open} aria-controls={id} onClick={change} />
        <FluxAutoHeightTransition show={open}><div id={id} className={menuStyles.menuCollapsibleBody} role="group"><div className={menuStyles.menuCollapsibleContent}>{children}</div></div></FluxAutoHeightTransition>
    </div>;
}

export function FluxMenuFlyout({children, disabled, icon, isActive, isDestructive, label, position = 'right-top', trigger}: {children: ReactNode; disabled?: boolean; icon?: FluxIconName; isActive?: boolean; isDestructive?: boolean; label?: ReactNode; position?: 'top' | 'top-left' | 'top-right' | 'left' | 'left-top' | 'left-bottom' | 'right' | 'right-top' | 'right-bottom' | 'bottom' | 'bottom-left' | 'bottom-right'; trigger?: ReactNode}) {
    const translate = useFluxTranslate();

    const parent = useContext(MenuContext);
    const flyout = useFluxFlyout();
    const [open, setOpen] = useState(false);
    const [layout, setLayout] = useState({x: 0, y: 0});
    const anchor = useRef<HTMLSpanElement>(null);
    const popup = useRef<HTMLDivElement>(null);
    const id = useId();
    const openedWithKeyboard = useRef(false);
    const scopedDisabled = useFluxDisabled(disabled);
    const disabledRef = useRef(scopedDisabled);
    disabledRef.current = scopedDisabled;
    const localPrediction = useMenuPrediction(parent.close);
    const prediction = parent.prediction ?? localPrediction;
    const [entry] = useState<MenuEntry>(() => ({id, isOpen: false, lastInside: -Infinity, getTrigger: () => anchor.current?.firstElementChild as HTMLElement | null, getPopup: () => popup.current, disabled: () => disabledRef.current, onOpen: setOpen}));
    const close = () => prediction.close(entry);
    function focusFirst() { popup.current?.querySelector<HTMLElement>('[tabindex="0"],button:not([disabled]),a[href],input:not([disabled])')?.focus({preventScroll: true}); }
    function show(keyboard = false) {
        openedWithKeyboard.current = keyboard;
        prediction.open(entry, keyboard);
        if (keyboard && open) requestAnimationFrame(focusFirst);
    }
    const focusTrigger = () => entry.getTrigger()?.focus({preventScroll: true});
    useEffect(() => prediction.register(entry), [prediction, entry]);
    useLayoutEffect(() => {
        if (!open) return;
        const update = () => {
            const a = anchor.current?.firstElementChild?.getBoundingClientRect();
            const box = popup.current?.getBoundingClientRect();
            if (!a || !box) return;
            setLayout(positionPopup({x: a.x, y: a.y - 10, width: a.width, height: a.height}, box, position));
        };
        update();
        if (openedWithKeyboard.current) focusFirst();
        const resize = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(update);
        if (popup.current) resize?.observe(popup.current);
        window.addEventListener('resize', update);
        window.addEventListener('scroll', update, true);
        return () => {resize?.disconnect(); window.removeEventListener('resize', update); window.removeEventListener('scroll', update, true);};
    }, [open, position]);
    useEffect(() => {
        if (!open) return;
        const outside = (event: globalThis.PointerEvent) => {
            const target = event.target as Node;
            if (!popup.current?.contains(target) && !anchor.current?.contains(target) && !prediction.isInsidePopups(target)) close();
        };
        window.addEventListener('pointerdown', outside);
        return () => window.removeEventListener('pointerdown', outside);
    }, [open, prediction]);
    const ancestors = parent.ancestors;
    return <>
        <span ref={anchor} style={{display: 'contents'}}>
            <FluxMenuItem className={open ? flyoutStyles.menuFlyoutTriggerOpen : undefined} disabled={scopedDisabled} iconLeading={icon} iconTrailing="angle-right" isActive={isActive} isDestructive={isDestructive} isPersistent label={trigger ?? label} aria-haspopup="menu" aria-controls={open ? id : undefined} aria-expanded={open} onClick={event => {event.stopPropagation(); if (event.detail === 0) show(true); else if (prediction.pointerType === 'touch' && open) close(); else show();}} onKeyDown={event => {
                if (event.key === 'ArrowRight' || event.key === 'Enter' || event.key === ' ') {event.preventDefault(); event.stopPropagation(); show(true);}
            }} />
        </span>
        {open && typeof document !== 'undefined' && createPortal(<MenuContext.Provider value={{...parent, prediction, ancestors: [ancestors, id].filter(Boolean).join(' '), close: prediction.closeAll}}>
            <div id={id} ref={popup} data-flux-flyout-ancestors={flyout?.ancestors} className={flyoutStyles.menuFlyoutPopup} data-flux-menu-owner={parent.ownerId} data-flux-menu-ancestors={[ancestors, id].filter(Boolean).join(' ')} role="menu" aria-label={translate('flux.submenu')} style={{'--x': `${layout.x}px`, '--y': `${layout.y}px`} as CSSProperties} onKeyDown={event => {
                if (event.key === 'ArrowLeft' || event.key === 'Escape') {event.preventDefault(); event.stopPropagation(); close(); focusTrigger();}
                if (event.key === 'Tab' && prediction.keyboardOwner === id) {const items = Array.from(popup.current?.querySelectorAll<HTMLElement>('button:not([disabled]),a[href],input:not([disabled]),[tabindex="0"]') ?? []); const index = items.indexOf(document.activeElement as HTMLElement); items[(index + (event.shiftKey ? -1 : 1) + items.length) % items.length]?.focus(); event.preventDefault(); event.stopPropagation();}
            }}>{children}</div>
            {parent.debugCone && <MenuConeOverlay prediction={prediction} id={id} />}
        </MenuContext.Provider>, document.body)}
    </>;
}

function MenuConeOverlay({prediction, id}: {prediction: MenuPrediction; id: string}) {
    const cone = useSyncExternalStore(prediction.subscribe, prediction.getCone, () => null);
    if (!cone || cone.id !== id) return null;
    const points = `${cone.ax},${cone.ay} ${cone.bx},${cone.by} ${cone.cx},${cone.cy}${cone.dx !== undefined ? ` ${cone.dx},${cone.dy}` : ''}`;
    return <svg className={clsx(flyoutStyles.menuFlyoutConeDebug, cone.back && flyoutStyles.menuFlyoutConeDebugBack)}><polygon points={points} />{!cone.back && <><line x1={cone.ax} y1={cone.ay} x2={cone.hx} y2={cone.hy} /><circle className={flyoutStyles.menuFlyoutConeDebugApex} cx={cone.ax} cy={cone.ay} r={4} /></>}<circle className={flyoutStyles.menuFlyoutConeDebugHead} cx={cone.hx} cy={cone.hy} r={3} /></svg>;
}

function menuKeys(event: KeyboardEvent<HTMLElement>) { if ((event.target as HTMLElement).closest('[data-flux-menu-pane]')) return; if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return; const items = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('[role^=menuitem]:not([aria-disabled=true]):not([disabled])')); if (!items.length) return; const current = items.indexOf(document.activeElement as HTMLElement); const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : (current + (event.key === 'ArrowUp' ? -1 : 1) + items.length) % items.length; items[next]?.focus(); event.preventDefault(); }
