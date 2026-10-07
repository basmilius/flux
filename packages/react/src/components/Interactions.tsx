import {useFluxTranslate} from '../i18n';
import { clsx } from 'clsx';
import { Children, cloneElement, forwardRef, isValidElement, useEffect, useId, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { ButtonHTMLAttributes, CSSProperties, ElementType, HTMLAttributes, KeyboardEvent, PointerEvent, ReactElement, ReactNode } from 'react';
import type { FluxColor, FluxDirection, FluxFocalPointObject, FluxIconName, FluxStyle } from '../types';
import { FluxButton, FluxPrimaryButton, FluxSecondaryButton } from './Actions';
import { FluxPane, FluxPaneBody, FluxPaneFooter } from './Display';
import { useFluxDisabled } from './DisplayExtended';
import { FluxSpinner } from './Feedback';
import { FluxFormInput, FluxFormTextArea } from './Forms';
import { FluxIcon } from './Icon';
import { FluxSpacer } from './Layout';
import { FluxFlyout } from './Overlays';
import {positionPopup, type PopupPosition} from './anchor';
import {MenuContext, useMenuPrediction} from './Menus';
import {FluxFadeTransition} from './Transitions';
import commandStyles from '../../../components/src/css/component/CommandPalette.module.scss';
import contextStyles from '../../../components/src/css/component/ContextMenu.module.scss';
import focalStyles from '../../../components/src/css/component/FocalPoint.module.scss';
import hoverStyles from '../../../components/src/css/component/HoverCard.module.scss';
import inlineStyles from '../../../components/src/css/component/InlineEdit.module.scss';
import buttonStyles from '../../../components/src/css/component/Button.module.scss';
import speedStyles from '../../../components/src/css/component/SpeedDial.module.scss';
import tourStyles from '../../../components/src/css/component/Tour.module.scss';

export interface FluxCommandSubAction {
    icon?: FluxIconName;
    label: string;
    onActivate(): void;
}
export interface FluxCommandSourceItem {
    command?: string;
    icon?: FluxIconName;
    id: string | number;
    label: string;
    onActivate(): void;
    subActions?: FluxCommandSubAction[];
    subLabel?: string;
}
export interface FluxCommandSource {
    fetchSearch?: (query: string) => Promise<FluxCommandSourceItem[]>;
    icon?: FluxIconName;
    items: FluxCommandSourceItem[];
    key: string;
    label: string;
    tab?: boolean;
}
export interface FluxCommandPaletteHandle {
    close(): void;
    open(): void;
}

export function FluxCommandPaletteGroup({ className, icon, label, ...props }: HTMLAttributes<HTMLDivElement> & { icon?: FluxIconName; label: string }) {
    return (
        <div {...props} className={clsx(commandStyles.commandPaletteGroup, className)} role="presentation">
            {icon && <FluxIcon className={commandStyles.commandPaletteGroupIcon} name={icon} />}
            <span>{label}</span>
        </div>
    );
}
export function FluxCommandPaletteItem({ className, command, hasSubActions, icon, id: _sourceId, isHighlighted, label, onActivate, onHighlight, optionId, subLabel, ...props }: Omit<HTMLAttributes<HTMLDivElement>, 'id'> & { command?: string; hasSubActions?: boolean; icon?: FluxIconName; id?: string | number; isHighlighted?: boolean; label: string; onActivate?: () => void; onHighlight?: () => void; optionId?: string; subLabel?: string }) {
    return (
        <div {...props} id={optionId} className={clsx(isHighlighted ? commandStyles.commandPaletteItemHighlighted : commandStyles.commandPaletteItem, className)} role="option" aria-selected={Boolean(isHighlighted)} onClick={onActivate} onMouseDown={(event) => event.preventDefault()} onMouseEnter={onHighlight}>
            {icon && (
                <div className={commandStyles.commandPaletteItemIcon}>
                    <FluxIcon name={icon} />
                </div>
            )}
            <div className={commandStyles.commandPaletteItemContent}>
                <div className={commandStyles.commandPaletteItemLabel}>{label}</div>
                {subLabel && <div className={commandStyles.commandPaletteItemSubLabel}>{subLabel}</div>}
            </div>
            {command && <kbd>{command}</kbd>}
            {hasSubActions && <FluxIcon className={commandStyles.commandPaletteItemSubActionIndicator} name="angle-right" />}
        </div>
    );
}

export const FluxCommandPalette = forwardRef<FluxCommandPaletteHandle, { defaultOpen?: boolean; hasKeyboardShortcut?: boolean; onOpenChange?: (open: boolean) => void; onSelect?: (item: FluxCommandSourceItem) => void; open?: boolean; placeholder?: string; sources: FluxCommandSource[] }>(function FluxCommandPalette({ defaultOpen, hasKeyboardShortcut, onOpenChange, onSelect, open: openProp, placeholder = 'Search', sources }, ref) {
    const controlled = openProp !== undefined,
        [inner, setInner] = useState(Boolean(defaultOpen)),
        open = controlled ? openProp : inner,
        [query, setQuery] = useState(''),
        [tab, setTab] = useState<string | null>(null),
        [highlighted, setHighlighted] = useState(0),
        [subTarget, setSubTarget] = useState<FluxCommandSourceItem | null>(null),
        [remote, setRemote] = useState<Record<string, FluxCommandSourceItem[]>>({}),
        [loading, setLoading] = useState(false),
        input = useRef<HTMLInputElement>(null),
        dialog = useRef<HTMLDivElement>(null),
        listId = useId();
    const change = (next: boolean) => {
        if (!controlled) setInner(next);
        onOpenChange?.(next);
        if (!next) {
            setQuery('');
            setTab(null);
            setSubTarget(null);
            setHighlighted(0);
        }
    };
    useImperativeHandle(ref, () => ({ close: () => change(false), open: () => change(true) }));
    useEffect(() => {
        if (!hasKeyboardShortcut) return;
        const key = (event: globalThis.KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
                event.preventDefault();
                change(!open);
            }
        };
        window.addEventListener('keydown', key);
        return () => window.removeEventListener('keydown', key);
    }, [hasKeyboardShortcut, open]);
    useEffect(() => {
        if (open) requestAnimationFrame(() => input.current?.focus());
    }, [open]);
    useEffect(() => {
        if (!query) return setRemote({});
        let active = true;
        setLoading(true);
        Promise.all(sources.map(async (source) => {
            try {
                return [source.key, source.fetchSearch ? await source.fetchSearch(query) : source.items.filter((item) => `${item.label} ${item.subLabel ?? ''}`.toLowerCase().includes(query.toLowerCase()))] as const;
            } catch {
                return [source.key, []] as const;
            }
        }))
            .then((entries) => {
                if (active) setRemote(Object.fromEntries(entries));
            })
            .finally(() => active && setLoading(false));
        return () => {
            active = false;
        };
    }, [query, sources]);
    const groups = sources
            .filter((source) => tab === null || source.key === tab)
            .map((source) => ({ source, items: (query ? remote[source.key] : source.items) ?? [] }))
            .filter((group) => group.items.length),
        items: FluxCommandSourceItem[] = subTarget?.subActions?.map((action, index) => ({ id: String(index), label: action.label, icon: action.icon, onActivate: action.onActivate })) ?? groups.flatMap((group) => group.items),
        activate = (item: FluxCommandSourceItem) => {
            if (item.subActions?.length) {
                setSubTarget(item);
                setHighlighted(0);
            } else {
                item.onActivate();
                onSelect?.(item);
                change(false);
            }
        };
    if (!open || typeof document === 'undefined') return null;
    return createPortal(
        <>
            <div className={commandStyles.commandPaletteBackdrop} onClick={() => change(false)} />
            <div
                ref={dialog}
                className={commandStyles.commandPaletteDialog}
                role="dialog"
                aria-modal="true"
                aria-label="Search"
                tabIndex={-1}
                onKeyDown={(event) => {
                    if (event.key === 'Escape') {
                        if (subTarget) setSubTarget(null);
                        else change(false);
                    } else if (event.key === 'ArrowDown') {
                        event.preventDefault();
                        setHighlighted((index) => (index + 1) % Math.max(1, items.length));
                    } else if (event.key === 'ArrowUp') {
                        event.preventDefault();
                        setHighlighted((index) => (index - 1 + Math.max(1, items.length)) % Math.max(1, items.length));
                    } else if (event.key === 'Enter' && items[highlighted]) {
                        event.preventDefault();
                        activate(items[highlighted]);
                    }
                }}
            >
                <div className={commandStyles.commandPalette}>
                    <div className={commandStyles.commandPaletteSearch}>
                        <FluxIcon className={commandStyles.commandPaletteSearchIcon} name="magnifying-glass" />
                        {subTarget && (
                            <>
                                <button className={commandStyles.commandPaletteBreadcrumb} tabIndex={-1} onClick={() => setSubTarget(null)}>
                                    {subTarget.label}
                                </button>
                                <span>/</span>
                            </>
                        )}
                        <input
                            ref={input}
                            className={commandStyles.commandPaletteSearchInput}
                            placeholder={placeholder}
                            value={query}
                            role="combobox"
                            aria-controls={listId}
                            aria-expanded={items.length > 0}
                            aria-activedescendant={items[highlighted] ? `${listId}-${highlighted}` : undefined}
                            onChange={(event) => {
                                setQuery(event.currentTarget.value);
                                setHighlighted(0);
                            }}
                        />
                    </div>
                    {!subTarget && sources.some((source) => source.tab) && (
                        <div className={commandStyles.commandPaletteTabs}>
                            <button className={tab === null ? commandStyles.commandPaletteTabActive : commandStyles.commandPaletteTab} onClick={() => setTab(null)}>
                                All
                            </button>
                            {sources
                                .filter((source) => source.tab)
                                .map((source) => (
                                    <button key={source.key} className={tab === source.key ? commandStyles.commandPaletteTabActive : commandStyles.commandPaletteTab} onClick={() => setTab(source.key)}>
                                        {source.icon && <FluxIcon className={commandStyles.commandPaletteTabIcon} name={source.icon} />} {source.label}
                                    </button>
                                ))}
                        </div>
                    )}
                    <div id={listId} className={commandStyles.commandPaletteResults} role="listbox">
                        {subTarget
                            ? items.map((item, index) => <FluxCommandPaletteItem key={item.id} {...item} optionId={`${listId}-${index}`} isHighlighted={highlighted === index} onActivate={() => activate(item)} onHighlight={() => setHighlighted(index)} />)
                            : groups.flatMap((group) => [
                                  group.source.label && <FluxCommandPaletteGroup key={`${group.source.key}-group`} label={group.source.label} />,
                                  ...group.items.map((item) => {
                                      const index = items.indexOf(item);
                                      return <FluxCommandPaletteItem key={item.id} {...item} optionId={`${listId}-${index}`} hasSubActions={Boolean(item.subActions?.length)} isHighlighted={highlighted === index} onActivate={() => activate(item)} onHighlight={() => setHighlighted(index)} />;
                                  }),
                              ])}
                        {loading && (
                            <div className={commandStyles.commandPaletteLoading}>
                                <FluxSpinner size={22} />
                            </div>
                        )}
                        {!loading && !items.length && <div className={commandStyles.commandPaletteEmpty}>No items</div>}
                    </div>
                </div>
            </div>
        </>,
        document.body,
    );
});

export function FluxContextMenu({children, className, debugCone, disabled, isPersistent, label, menu, onClose, onOpen, position = 'bottom-left', ...props}: HTMLAttributes<HTMLDivElement> & {debugCone?: boolean; disabled?: boolean; isPersistent?: boolean; label?: string; menu: (state: {close(): void}) => ReactNode; onClose?: () => void; onOpen?: (event: React.MouseEvent | MouseEvent) => void; position?: 'top' | 'top-left' | 'top-right' | 'left' | 'left-top' | 'left-bottom' | 'right' | 'right-top' | 'right-bottom' | 'bottom' | 'bottom-left' | 'bottom-right'}) {
    const scopedDisabled = useFluxDisabled(disabled);
    const [point, setPoint] = useState<{x: number; y: number} | null>(null);
    const [layout, setLayout] = useState({x: 0, y: 0});
    const popup = useRef<HTMLDivElement>(null);
    const previousFocus = useRef<HTMLElement | null>(null);
    const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const press = useRef({x: 0, y: 0});
    const pressCleanup = useRef<(() => void) | undefined>(undefined);
    const lastPointerType = useRef('');
    const ownerId = useId();
    const prediction = useMenuPrediction(close);
    function cancelPress() {clearTimeout(timer.current); timer.current = undefined; pressCleanup.current?.(); pressCleanup.current = undefined;}
    function close() {
        if (!point) return;
        prediction.dismiss();
        setPoint(null);
        previousFocus.current?.focus({preventScroll: true});
        onClose?.();
    }
    function open(event: React.MouseEvent | MouseEvent) {
        if (scopedDisabled) return;
        previousFocus.current = document.activeElement as HTMLElement;
        setPoint({x: event.clientX, y: event.clientY});
        onOpen?.(event);
    }
    function inside(target: EventTarget | null) {
        return target instanceof Element && (popup.current?.contains(target) || target.closest(`[data-flux-menu-owner="${ownerId}"]`));
    }
    useEffect(() => () => cancelPress(), []);
    useLayoutEffect(() => {
        if (!point) return;
        const frame = requestAnimationFrame(() => {
            const box = popup.current?.getBoundingClientRect();
            if (!box) return;
            setLayout(positionPopup({...point, width: 0, height: 0}, box, position));
            popup.current?.querySelector<HTMLElement>('[role^="menuitem"]:not([disabled]),button:not([disabled]),input:not([disabled])')?.focus({preventScroll: true});
        });
        return () => cancelAnimationFrame(frame);
    }, [point, position]);
    useEffect(() => {
        if (!point) return;
        const outside = (event: Event) => {if (!inside(event.target)) close();};
        const key = (event: globalThis.KeyboardEvent) => {
            if (event.key === 'Escape') {event.preventDefault(); close();}
            if (event.key === 'Tab' && !prediction.keyboardOwner) {
                const items = Array.from(popup.current?.querySelectorAll<HTMLElement>('button:not([disabled]),a[href],input:not([disabled]),[tabindex="0"]') ?? []);
                if (!items.length) return;
                const index = items.indexOf(document.activeElement as HTMLElement);
                items[(index + (event.shiftKey ? -1 : 1) + items.length) % items.length]?.focus();
                event.preventDefault();
            }
        };
        window.addEventListener('pointerdown', outside, true);
        window.addEventListener('keydown', key);
        window.addEventListener('scroll', outside, true);
        return () => {
            window.removeEventListener('pointerdown', outside, true);
            window.removeEventListener('keydown', key);
            window.removeEventListener('scroll', outside, true);
        };
    }, [point]);
    return <div {...props} className={clsx(contextStyles.contextMenu, className)} onContextMenu={event => {
        props.onContextMenu?.(event);
        if (scopedDisabled || event.defaultPrevented) return;
        event.preventDefault();
        if (lastPointerType.current === 'touch') return;
        cancelPress();
        open(event);
    }} onPointerDown={event => {
        props.onPointerDown?.(event);
        lastPointerType.current = event.pointerType;
        if (scopedDisabled || event.pointerType !== 'touch') return;
        press.current = {x: event.clientX, y: event.clientY};
        cancelPress();
        const move = (next: globalThis.PointerEvent) => {if (Math.abs(next.clientX - press.current.x) > 10 || Math.abs(next.clientY - press.current.y) > 10) cancelPress();};
        document.addEventListener('pointermove', move, {capture: true, passive: true});
        document.addEventListener('pointerup', cancelPress, {capture: true, passive: true});
        document.addEventListener('pointercancel', cancelPress, {capture: true, passive: true});
        pressCleanup.current = () => {document.removeEventListener('pointermove', move, true); document.removeEventListener('pointerup', cancelPress, true); document.removeEventListener('pointercancel', cancelPress, true);};
        timer.current = setTimeout(() => {cancelPress(); open(new MouseEvent('contextmenu', {clientX: press.current.x, clientY: press.current.y}));}, 500);
    }} onPointerMove={event => {
        props.onPointerMove?.(event);
        if (Math.abs(event.clientX - press.current.x) > 10 || Math.abs(event.clientY - press.current.y) > 10) cancelPress();
    }} onPointerUp={event => {props.onPointerUp?.(event); cancelPress();}} onPointerCancel={event => {props.onPointerCancel?.(event); cancelPress();}}>
        {children}
        {typeof document !== 'undefined' && createPortal(<MenuContext.Provider value={{ownerId, debugCone, prediction, close: prediction.closeAll, persistent: Boolean(isPersistent)}}><FluxFadeTransition show={Boolean(point)}>
            <div ref={popup} className={contextStyles.contextMenuPopup} role="menu" aria-label={label} data-flux-menu-owner={ownerId} style={{'--x': `${layout.x}px`, '--y': `${layout.y}px`} as CSSProperties}>{menu({close})}</div>
        </FluxFadeTransition></MenuContext.Provider>, document.body)}
    </div>;
}

export function FluxHoverCard({children, closeDelay = 150, direction = 'vertical', disabled, label, margin = 9, onClose, onOpen, openDelay = 500, opener, position}: {children: (state: {close(): void}) => ReactNode; closeDelay?: number; direction?: FluxDirection; disabled?: boolean; label?: string; margin?: number; onClose?: () => void; onOpen?: () => void; openDelay?: number; opener: (state: {close(): void; isOpen: boolean; open(): void}) => ReactNode; position?: PopupPosition}) {
    const [open, setOpen] = useState(false);
    const [popup, setPopup] = useState<HTMLDivElement | null>(null);
    const anchor = useRef<HTMLSpanElement>(null);
    const openerElement = useRef<HTMLElement | null>(null);
    const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const inside = useRef(false);
    const isOpen = useRef(false);
    const id = useId();
    const scopedDisabled = useFluxDisabled(disabled);
    const [layout, setLayout] = useState({x: 0, y: 0});
    const callbacks = useRef({onClose, onOpen}); callbacks.current = {onClose, onOpen};
    function clear() {clearTimeout(timer.current); timer.current = undefined;}
    function show() {clear(); if (scopedDisabled || isOpen.current) return; isOpen.current = true; setOpen(true); callbacks.current.onOpen?.();}
    function hide() {clear(); if (!isOpen.current) return; isOpen.current = false; setOpen(false); callbacks.current.onClose?.();}
    function focused() {return Boolean(anchor.current?.contains(document.activeElement) || popup?.contains(document.activeElement));}
    function enter(event: PointerEvent) {if (event.pointerType === 'touch') return; inside.current = true; clear(); if (!isOpen.current && !scopedDisabled) timer.current = setTimeout(show, openDelay);}
    function leave(event: PointerEvent) {if (event.pointerType === 'touch') return; inside.current = false; clear(); if (isOpen.current && !focused()) timer.current = setTimeout(hide, closeDelay);}
    useEffect(() => () => clear(), []);
    useEffect(() => {if (scopedDisabled) hide();}, [scopedDisabled]);
    useLayoutEffect(() => {
        if (!open || !popup) return;
        popup.showPopover?.();
        const update = () => {
            const box = anchor.current?.getBoundingClientRect();
            if (box) setLayout(positionPopup(box, popup.getBoundingClientRect(), position, margin, undefined, direction));
        };
        update();
        const observer = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(update);
        observer?.observe(popup);
        window.addEventListener('resize', update); window.addEventListener('scroll', update, true);
        return () => {observer?.disconnect(); window.removeEventListener('resize', update); window.removeEventListener('scroll', update, true);};
    }, [popup, open, direction, margin, position]);
    useEffect(() => {
        if (!open) return;
        const described = openerElement.current ?? anchor.current?.querySelector<HTMLElement>('a[href],button,[tabindex]') ?? anchor.current;
        const previous = described?.getAttribute('aria-describedby');
        described?.setAttribute('aria-describedby', id);
        const key = (event: globalThis.KeyboardEvent) => {if (event.key === 'Escape') {if (popup?.contains(document.activeElement)) described?.focus(); hide();}};
        window.addEventListener('keydown', key);
        return () => {window.removeEventListener('keydown', key); if (previous) described?.setAttribute('aria-describedby', previous); else described?.removeAttribute('aria-describedby');};
    }, [open, popup, id]);
    return <span ref={anchor} className={hoverStyles.hoverCard} onFocus={event => {if (popup?.contains(event.target)) return; openerElement.current = event.target; if (event.target.matches(':focus-visible')) show();}} onBlur={event => {if (!inside.current && !anchor.current?.contains(event.relatedTarget) && !popup?.contains(event.relatedTarget)) hide();}} onPointerEnter={enter} onPointerLeave={leave}>
        {opener({close: hide, isOpen: open, open: show})}
        {typeof document !== 'undefined' && createPortal(<FluxFadeTransition show={open}><div ref={setPopup} id={id} popover="manual" className={hoverStyles.hoverCardPopup} role={label ? 'group' : undefined} aria-label={label} style={{'--x': `${layout.x}px`, '--y': `${layout.y}px`} as CSSProperties} onPointerEnter={enter} onPointerLeave={leave}>{children({close: hide})}</div></FluxFadeTransition>, document.body)}
    </span>;
}

export function FluxInlineEdit({ actions, children, defaultValue = '', disabled, error, isReadonly, multiline, onCancel, onEdit, onSave, onValueChange, placeholder, saveOnBlur = true, value }: { actions?: (state: { cancel(): void; save(): void }) => ReactNode; children?: (state: { edit(): void; value: string }) => ReactNode; defaultValue?: string; disabled?: boolean; error?: string | null; isReadonly?: boolean; multiline?: boolean; onCancel?: () => void; onEdit?: () => void; onSave?: (value: string) => void; onValueChange?: (value: string) => void; placeholder?: string; saveOnBlur?: boolean; value?: string }) {
    const translate = useFluxTranslate();

    const controlled = value !== undefined,
        [inner, setInner] = useState(defaultValue),
        current = controlled ? value : inner;
    const [editing, setEditing] = useState(false),
        [draft, setDraft] = useState(current),
        root = useRef<HTMLDivElement>(null),
        field = useRef<HTMLInputElement | HTMLTextAreaElement>(null),
        interactive = !disabled && !isReadonly;
    const edit = () => {
        if (!interactive) return;
        setDraft(current);
        setEditing(true);
        onEdit?.();
        requestAnimationFrame(() => field.current?.focus());
    };
    const close = () => {
        setEditing(false);
        requestAnimationFrame(() => root.current?.querySelector<HTMLElement>('[role=button]')?.focus());
    };
    const save = () => {
        if (!controlled) setInner(draft);
        onValueChange?.(draft);
        onSave?.(draft);
        close();
    };
    const cancel = () => {
        onCancel?.();
        close();
    };
    const key = (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.key === 'Escape') {
            event.preventDefault();
            cancel();
        } else if (event.key === 'Enter' && (!multiline || event.ctrlKey || event.metaKey)) {
            event.preventDefault();
            save();
        }
    };
    return (
        <div ref={root} className={inlineStyles.inlineEdit} tabIndex={-1}>
            {editing ? (
                <>
                    {multiline ? (
                        <FluxFormTextArea
                            ref={field as React.Ref<HTMLTextAreaElement>}
                            className={inlineStyles.inlineEditField}
                            error={error ?? undefined}
                            placeholder={placeholder}
                            value={draft}
                            onValueChange={setDraft}
                            onKeyDown={key}
                            onBlur={() =>
                                saveOnBlur &&
                                requestAnimationFrame(() => {
                                    if (!root.current?.contains(document.activeElement)) save();
                                })
                            }
                        />
                    ) : (
                        <FluxFormInput
                            ref={field as React.Ref<HTMLInputElement>}
                            className={inlineStyles.inlineEditField}
                            error={error ?? undefined}
                            placeholder={placeholder}
                            value={draft}
                            onValueChange={(next) => setDraft(String(next ?? ''))}
                            onKeyDown={key}
                            onBlur={() =>
                                saveOnBlur &&
                                requestAnimationFrame(() => {
                                    if (!root.current?.contains(document.activeElement)) save();
                                })
                            }
                        />
                    )}
                    <div className={inlineStyles.inlineEditActions} onMouseDown={(event) => event.preventDefault()}>
                        {actions?.({ cancel, save }) ?? (
                            <>
                                <FluxSecondaryButton iconLeading="check" aria-label="Save" onClick={save} />
                                <FluxSecondaryButton iconLeading="xmark" aria-label={translate('flux.cancel')} onClick={cancel} />
                            </>
                        )}
                    </div>
                </>
            ) : (
                <div
                    className={clsx(inlineStyles.inlineEditDisplay, interactive && inlineStyles.isInteractive, !current && inlineStyles.isPlaceholder)}
                    role={interactive ? 'button' : undefined}
                    tabIndex={interactive ? 0 : undefined}
                    onClick={edit}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            edit();
                        }
                    }}
                >
                    {children?.({ edit, value: current }) ?? (current || placeholder)}
                </div>
            )}
        </div>
    );
}

export function FluxPublishButton({ className, isDone, isLoading, ...props }: React.ComponentProps<typeof FluxButton> & { isDone?: boolean }) {
    return (
        <FluxButton
            {...props}
            className={clsx(buttonStyles.publishButton, !isDone && !isLoading && buttonStyles.isIdle, isDone && buttonStyles.isDone, isLoading && buttonStyles.isLoading, className)}
            isLoading={isLoading}
            iconLeading={
                <span className={buttonStyles.publishButtonAnimation}>
                    <FluxIcon className={buttonStyles.publishButtonCloud} name="cloud" />
                    <FluxIcon className={buttonStyles.publishButtonAnimationCheck} name="check" />
                </span>
            }
        />
    );
}

export type FluxSpeedDialDirection = 'up' | 'down' | 'start' | 'end';
export function FluxSpeedDial({ children, className, defaultOpen, direction = 'up', icon = 'plus', iconOpen = 'xmark', label, onOpenChange, open: openProp, opener, position = 'end' }: { children?: ReactNode; className?: string; defaultOpen?: boolean; direction?: FluxSpeedDialDirection; icon?: FluxIconName; iconOpen?: FluxIconName; label: string; onOpenChange?: (open: boolean) => void; open?: boolean; opener?: (state: { cssClass: string; isOpen: boolean; toggle(): void }) => ReactNode; position?: 'start' | 'end' }) {
    const controlled = openProp !== undefined,
        [inner, setInner] = useState(Boolean(defaultOpen)),
        open = controlled ? openProp : inner,
        root = useRef<HTMLDivElement>(null),
        id = useId();
    const change = (next: boolean) => {
        if (!controlled) setInner(next);
        onOpenChange?.(next);
    };
    useEffect(() => {
        if (!open) return;
        const outside = (event: MouseEvent) => {
            if (!root.current?.contains(event.target as Node)) change(false);
        };
        document.addEventListener('mousedown', outside);
        return () => document.removeEventListener('mousedown', outside);
    }, [open]);
    const toggle = () => change(!open);
    return (
        <div
            ref={root}
            className={clsx(speedStyles.speedDial, position === 'start' ? speedStyles.isCornerStart : speedStyles.isCornerEnd, speedStyles[`is${direction.charAt(0).toUpperCase() + direction.slice(1)}`], open && speedStyles.isOpen, className)}
            onKeyDown={(event) => {
                if (event.key === 'Escape') {
                    event.preventDefault();
                    change(false);
                }
            }}
        >
            {opener?.({ cssClass: speedStyles.speedDialOpener, isOpen: open, toggle }) ?? <FluxPrimaryButton className={speedStyles.speedDialOpener} size="large" aria-label={label} aria-haspopup="menu" aria-expanded={open} aria-controls={id} iconLeading={<FluxFadeTransition><FluxIcon key={open ? iconOpen : icon} className={speedStyles.speedDialOpenerIcon} name={open ? iconOpen : icon} /></FluxFadeTransition>} onClick={toggle} />}
            <div className={speedStyles.speedDialActions} id={id} role="menu" aria-label={label} onClick={() => change(false)}>
                {children}
            </div>
        </div>
    );
}
export function FluxSpeedDialAction({ className, icon, label, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { icon: FluxIconName; label: string }) {
    return (
        <button {...props} className={clsx(speedStyles.speedDialAction, className)} type="button" role="menuitem">
            <span className={speedStyles.speedDialActionLabel}>{label}</span>
            <span className={speedStyles.speedDialActionIcon}>
                <FluxIcon name={icon} size={18} />
            </span>
        </button>
    );
}

export function FluxSplitButton({ button, buttonIcon = 'ellipsis-h', disabled, flyout, flyoutDirection, flyoutIsAutoWidth, flyoutMargin, flyoutWidth }: { button: (state: { close(): void; open(): void; toggle(): void }) => ReactNode; buttonIcon?: FluxIconName; disabled?: boolean; flyout: (state: { close(): void }) => ReactNode; flyoutDirection?: FluxDirection; flyoutIsAutoWidth?: boolean; flyoutMargin?: number; flyoutWidth?: number | string }) {
    const translate = useFluxTranslate();

    return (
        <FluxFlyout
            direction={flyoutDirection}
            isAutoWidth={flyoutIsAutoWidth}
            margin={flyoutMargin}
            width={flyoutWidth}
            opener={(state) => (
                <div className={buttonStyles.buttonGroup}>
                    {button(state)}
                    <FluxSecondaryButton disabled={disabled} iconLeading={buttonIcon} aria-label={translate('flux.moreActions')} aria-haspopup="menu" aria-expanded={state.isOpen} onClick={state.open} />
                </div>
            )}
        >
            {flyout}
        </FluxFlyout>
    );
}

export {FluxSplitView, FluxSplitViewPane, type FluxSplitViewPaneProps} from './SplitView';

export {FluxSwipeAction, FluxSwipeActions, type FluxSwipeActionsSide} from './SwipeActions';

export type FluxTourPosition = 'top' | 'top-left' | 'top-right' | 'left' | 'left-top' | 'left-bottom' | 'right' | 'right-top' | 'right-bottom' | 'bottom' | 'bottom-left' | 'bottom-right';
export interface FluxTourItemProps {
    children?: ReactNode;
    position?: FluxTourPosition;
    target: string | (() => HTMLElement | null);
    title?: string;
}
export function FluxTourItem(_props: FluxTourItemProps) {
    return <span aria-hidden="true" style={{ display: 'none' }} />;
}
export function FluxTour({ active, children, defaultActive = false, defaultStep = 0, maskPadding = 8, onActiveChange, onFinish, onNext, onPrev, onSkip, onStepChange, root, step: stepProp }: { active?: boolean; children?: ReactNode; defaultActive?: boolean; defaultStep?: number; maskPadding?: number; onActiveChange?: (active: boolean) => void; onFinish?: () => void; onNext?: (step: number) => void; onPrev?: (step: number) => void; onSkip?: () => void; onStepChange?: (step: number) => void; root?: string | HTMLElement | (() => HTMLElement | null); step?: number }) {
    const translate = useFluxTranslate();

    const items = Children.toArray(children).filter(isValidElement) as ReactElement<FluxTourItemProps>[],
        activeControlled = active !== undefined,
        stepControlled = stepProp !== undefined,
        [innerActive, setInnerActive] = useState(defaultActive),
        [innerStep, setInnerStep] = useState(defaultStep),
        isActive = activeControlled ? active : innerActive,
        step = stepControlled ? stepProp : innerStep,
        item = items[step],
        [rect, setRect] = useState<DOMRect | null>(null),
        titleId = useId();
    const setActive = (next: boolean) => {
            if (!activeControlled) setInnerActive(next);
            onActiveChange?.(next);
        },
        setStep = (next: number) => {
            if (!stepControlled) setInnerStep(next);
            onStepChange?.(next);
        };
    useLayoutEffect(() => {
        if (!isActive || !item) return setRect(null);
        const scope = typeof root === 'string' ? document.querySelector(root) : typeof root === 'function' ? root() : (root ?? document),
            target = typeof item.props.target === 'function' ? item.props.target() : scope?.querySelector<HTMLElement>(item.props.target);
        target?.scrollIntoView?.({ block: 'center', inline: 'center' });
        setRect(target?.getBoundingClientRect() ?? null);
    }, [isActive, item, root, step]);
    useEffect(() => {
        if (!isActive) return;
        const key = (event: globalThis.KeyboardEvent) => {
            if (event.key === 'Escape') {
                setActive(false);
                onSkip?.();
            }
        };
        window.addEventListener('keydown', key);
        return () => window.removeEventListener('keydown', key);
    }, [isActive]);
    if (!isActive || !item || !rect || typeof document === 'undefined') return null;
    const next = () => {
            if (step < items.length - 1) {
                setStep(step + 1);
                onNext?.(step + 1);
            } else {
                setActive(false);
                onFinish?.();
            }
        },
        prev = () => {
            if (step > 0) {
                setStep(step - 1);
                onPrev?.(step - 1);
            }
        },
        skip = () => {
            setActive(false);
            onSkip?.();
        };
    return createPortal(
        <div className={tourStyles.tour}>
            <div className={tourStyles.tourSpotlight} style={{ '--x': `${rect.x - maskPadding}px`, '--y': `${rect.y - maskPadding}px`, '--w': `${rect.width + maskPadding * 2}px`, '--h': `${rect.height + maskPadding * 2}px` } as FluxStyle} />
            <div className={tourStyles.tourPopover} role="dialog" aria-modal="true" aria-labelledby={item.props.title ? titleId : undefined} style={{ position: 'fixed', left: rect.left, top: rect.bottom + maskPadding, zIndex: 13000 }}>
                <FluxPane className={tourStyles.tourPane}>
                    <div className={tourStyles.tourBodyViewport}>
                        <div className={tourStyles.tourBody}>
                            {item.props.title && (
                                <strong id={titleId} className={tourStyles.tourTitle}>
                                    {item.props.title}
                                </strong>
                            )}
                            <div className={tourStyles.tourContent}>{item.props.children}</div>
                        </div>
                    </div>
                    <div className={tourStyles.tourFooter}>
                        <span className={tourStyles.tourProgress}>
                            {step + 1} / {items.length}
                        </span>
                        <FluxSpacer />
                        <button className={tourStyles.tourSkip} type="button" onClick={skip}>
                            Skip
                        </button>
                        {step > 0 && <FluxSecondaryButton aria-label={translate('flux.previous')} iconLeading="angle-left" size="small" onClick={prev} />}
                        <FluxPrimaryButton aria-label={step < items.length - 1 ? translate('flux.next') : translate('flux.done')} iconLeading={step < items.length - 1 ? 'angle-right' : 'check'} size="small" onClick={next} />
                    </div>
                </FluxPane>
            </div>
        </div>,
        document.body,
    );
}

export function FluxFocalPointEditor({defaultValue = [50, 50], footer, footerBefore, onValueChange, src, value, style, ...props}: Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue'> & {defaultValue?: [number, number]; footer?: ReactNode; footerBefore?: ReactNode; onValueChange?: (value: [number, number]) => void; src: string; value?: [number, number]}) {
    const translate = useFluxTranslate();
    const [inner, setInner] = useState(defaultValue);
    const [dragging, setDragging] = useState<[number, number] | null>(null);
    const current = dragging ?? value ?? inner;
    const [preview, setPreview] = useState(false);
    const [aspectRatio, setAspectRatio] = useState(1);
    const editor = useRef<HTMLDivElement>(null);
    const image = useRef<HTMLImageElement>(null);
    const pointer = useRef<{id: number; value: [number, number]} | null>(null);
    const callbacks = useRef({onValueChange, controlled: value !== undefined});
    callbacks.current = {onValueChange, controlled: value !== undefined};
    const commit = (next: [number, number]) => {
        if (!callbacks.current.controlled) setInner(next);
        callbacks.current.onValueChange?.(next);
    };
    const measure = () => {
        if (image.current?.naturalWidth && image.current.naturalHeight) setAspectRatio(image.current.naturalWidth / image.current.naturalHeight);
    };
    useLayoutEffect(() => {setPreview(false); setAspectRatio(1); measure();}, [src]);
    useEffect(() => {
        const finish = (cancelled: boolean) => {
            const drag = pointer.current;
            if (!drag) return;
            if (editor.current?.hasPointerCapture?.(drag.id)) editor.current.releasePointerCapture(drag.id);
            pointer.current = null;
            setDragging(null);
            if (!cancelled) commit(drag.value);
        };
        const up = () => finish(false);
        const cancel = () => finish(true);
        window.addEventListener('pointerup', up);
        window.addEventListener('pointercancel', cancel);
        return () => {window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', cancel);};
    }, []);
    const move = (event: PointerEvent<HTMLDivElement>) => {
        const rect = image.current?.getBoundingClientRect();
        if (!pointer.current || !rect?.width || !rect.height) return;
        const next: [number, number] = [Math.max(0, Math.min(100, (event.clientX - rect.left) / rect.width * 100)), Math.max(0, Math.min(100, (event.clientY - rect.top) / rect.height * 100))];
        pointer.current.value = next;
        setDragging(next);
    };
    return <FluxPane {...props} style={{...style, '--aspect-ratio': aspectRatio} as FluxStyle}>
        <FluxFadeTransition mode="out-in"><FluxPaneBody key={preview ? 'preview' : 'editor'}>
            {preview ? <div className={focalStyles.focalPointPreview}><div className={focalStyles.focalPointPreviewImage} style={{backgroundImage: `url(${src})`, backgroundPosition: `${current[0]}% ${current[1]}%`}}/></div> : <div
                ref={editor} className={focalStyles.focalPointEditor} role="slider" aria-roledescription="2D slider" aria-label={translate('flux.focalPoint')}
                aria-valuetext={translate('flux.focalPointValue', {x: Math.round(current[0]), y: Math.round(current[1])})} tabIndex={0}
                onPointerDown={event => {pointer.current = {id: event.pointerId, value: current}; event.currentTarget.setPointerCapture?.(event.pointerId); move(event);}} onPointerMove={move}
                onKeyDown={event => {
                    const step = event.shiftKey ? 10 : 1;
                    let [x, y] = value ?? inner;
                    if (event.key === 'ArrowLeft') x -= step;
                    else if (event.key === 'ArrowRight') x += step;
                    else if (event.key === 'ArrowUp') y -= step;
                    else if (event.key === 'ArrowDown') y += step;
                    else if (event.key === 'Home') x = y = 0;
                    else if (event.key === 'End') x = y = 100;
                    else return;
                    event.preventDefault();
                    commit([Math.max(0, Math.min(100, x)), Math.max(0, Math.min(100, y))]);
                }}>
                <img ref={image} className={focalStyles.focalPointEditorImage} src={src} alt="" onLoad={measure}/>
                <div className={focalStyles.focalPointEditorArea} style={{left: `${current[0]}%`, top: `${current[1]}%`}}/>
            </div>}
        </FluxPaneBody></FluxFadeTransition>
        <FluxPaneFooter>{footerBefore}<FluxSecondaryButton label={preview ? translate('flux.previewClose') : translate('flux.preview')} onClick={() => setPreview(value => !value)}/><FluxSpacer/>{footer}</FluxPaneFooter>
    </FluxPane>;
}
