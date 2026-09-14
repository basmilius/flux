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
import commandStyles from '../../../components/src/css/component/CommandPalette.module.scss';
import contextStyles from '../../../components/src/css/component/ContextMenu.module.scss';
import focalStyles from '../../../components/src/css/component/FocalPoint.module.scss';
import hoverStyles from '../../../components/src/css/component/HoverCard.module.scss';
import inlineStyles from '../../../components/src/css/component/InlineEdit.module.scss';
import buttonStyles from '../../../components/src/css/component/Button.module.scss';
import speedStyles from '../../../components/src/css/component/SpeedDial.module.scss';
import splitStyles from '../../../components/src/css/component/SplitView.module.scss';
import swipeStyles from '../../../components/src/css/component/SwipeActions.module.scss';
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
        Promise.all(sources.map(async (source) => [source.key, source.fetchSearch ? await source.fetchSearch(query) : source.items.filter((item) => `${item.label} ${item.subLabel ?? ''}`.toLowerCase().includes(query.toLowerCase()))] as const))
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

export function FluxContextMenu({ children, className, disabled, isPersistent, label, menu, onClose, onOpen, ...props }: HTMLAttributes<HTMLDivElement> & { disabled?: boolean; isPersistent?: boolean; label?: string; menu: (state: { close(): void }) => ReactNode; onClose?: () => void; onOpen?: (event: React.MouseEvent) => void }) {
    const scopedDisabled = useFluxDisabled(disabled),
        [point, setPoint] = useState<{ x: number; y: number } | null>(null),
        popup = useRef<HTMLDivElement>(null);
    const close = () => {
        if (point) {
            setPoint(null);
            onClose?.();
        }
    };
    useEffect(() => {
        if (!point) return;
        const pointer = (event: globalThis.PointerEvent) => {
                if (!popup.current?.contains(event.target as Node)) close();
            },
            key = (event: globalThis.KeyboardEvent) => event.key === 'Escape' && close();
        window.addEventListener('pointerdown', pointer, true);
        window.addEventListener('keydown', key);
        window.addEventListener('scroll', close, true);
        return () => {
            window.removeEventListener('pointerdown', pointer, true);
            window.removeEventListener('keydown', key);
            window.removeEventListener('scroll', close, true);
        };
    }, [point]);
    return (
        <div
            {...props}
            className={clsx(contextStyles.contextMenu, className)}
            onContextMenu={(event) => {
                props.onContextMenu?.(event);
                if (scopedDisabled || event.defaultPrevented) return;
                event.preventDefault();
                setPoint({ x: event.clientX, y: event.clientY });
                onOpen?.(event);
            }}
        >
            {children}
            {point &&
                typeof document !== 'undefined' &&
                createPortal(
                    <div ref={popup} className={contextStyles.contextMenuPopup} role="menu" aria-label={label} style={{ position: 'fixed', left: point.x, top: point.y, zIndex: 12000 }} onClick={() => !isPersistent && close()}>
                        {menu({ close })}
                    </div>,
                    document.body,
                )}
        </div>
    );
}

export function FluxHoverCard({ children, closeDelay = 150, direction = 'vertical', disabled, label, margin = 9, onClose, onOpen, openDelay = 500, opener }: { children: (state: { close(): void }) => ReactNode; closeDelay?: number; direction?: FluxDirection; disabled?: boolean; label?: string; margin?: number; onClose?: () => void; onOpen?: () => void; openDelay?: number; opener: (state: { close(): void; isOpen: boolean; open(): void }) => ReactNode }) {
    const [open, setOpen] = useState(false),
        anchor = useRef<HTMLSpanElement>(null),
        timer = useRef<ReturnType<typeof setTimeout> | null>(null),
        [position, setPosition] = useState({ x: 0, y: 0 });
    const clear = () => {
            if (timer.current) clearTimeout(timer.current);
            timer.current = null;
        },
        show = () => {
            clear();
            if (disabled) return;
            setOpen(true);
            onOpen?.();
            requestAnimationFrame(() => {
                const box = anchor.current?.getBoundingClientRect();
                if (box) setPosition({ x: direction === 'horizontal' ? box.right + margin : box.left, y: direction === 'vertical' ? box.bottom + margin : box.top });
            });
        },
        hide = () => {
            clear();
            setOpen(false);
            onClose?.();
        },
        delayedShow = () => {
            clear();
            timer.current = setTimeout(show, openDelay);
        },
        delayedHide = () => {
            clear();
            timer.current = setTimeout(hide, closeDelay);
        };
    useEffect(() => () => clear(), []);
    return (
        <span ref={anchor} className={hoverStyles.hoverCard} onFocus={show} onBlur={delayedHide} onPointerEnter={(event) => event.pointerType !== 'touch' && delayedShow()} onPointerLeave={(event) => event.pointerType !== 'touch' && delayedHide()}>
            {opener({ close: hide, isOpen: open, open: show })}
            {open &&
                typeof document !== 'undefined' &&
                createPortal(
                    <div className={hoverStyles.hoverCardPopup} role={label ? 'group' : undefined} aria-label={label} style={{ position: 'fixed', left: position.x, top: position.y, zIndex: 12000 }} onPointerEnter={clear} onPointerLeave={delayedHide}>
                        {children({ close: hide })}
                    </div>,
                    document.body,
                )}
        </span>
    );
}

export function FluxInlineEdit({ actions, children, defaultValue = '', disabled, error, isReadonly, multiline, onCancel, onEdit, onSave, onValueChange, placeholder, saveOnBlur = true, value }: { actions?: (state: { cancel(): void; save(): void }) => ReactNode; children?: (state: { edit(): void; value: string }) => ReactNode; defaultValue?: string; disabled?: boolean; error?: string | null; isReadonly?: boolean; multiline?: boolean; onCancel?: () => void; onEdit?: () => void; onSave?: (value: string) => void; onValueChange?: (value: string) => void; placeholder?: string; saveOnBlur?: boolean; value?: string }) {
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
                                <FluxSecondaryButton iconLeading="xmark" aria-label="Cancel" onClick={cancel} />
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
            {opener?.({ cssClass: speedStyles.speedDialOpener, isOpen: open, toggle }) ?? <FluxPrimaryButton className={speedStyles.speedDialOpener} size="large" aria-label={label} aria-haspopup="menu" aria-expanded={open} aria-controls={id} iconLeading={open ? iconOpen : icon} onClick={toggle} />}
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
    return (
        <FluxFlyout
            direction={flyoutDirection}
            isAutoWidth={flyoutIsAutoWidth}
            margin={flyoutMargin}
            width={flyoutWidth}
            opener={(state) => (
                <div className={buttonStyles.buttonGroup}>
                    {button(state)}
                    <FluxSecondaryButton disabled={disabled} iconLeading={buttonIcon} aria-label="More actions" aria-haspopup="menu" aria-expanded={state.isOpen} onClick={state.open} />
                </div>
            )}
        >
            {flyout}
        </FluxFlyout>
    );
}

export interface FluxSplitViewPaneProps extends HTMLAttributes<HTMLDivElement> {
    defaultSize?: number | string;
    isResizable?: boolean;
    maxSize?: number;
    minSize?: number;
}
export function FluxSplitViewPane({ className, defaultSize: _default, isResizable: _resize, maxSize: _max, minSize: _min, ...props }: FluxSplitViewPaneProps) {
    return <div {...props} className={clsx(splitStyles.splitViewPane, className)} />;
}
export function FluxSplitView({ as: Component = 'div', children, className, direction = 'horizontal', rememberKey, ...props }: HTMLAttributes<HTMLElement> & { as?: ElementType; direction?: FluxDirection; rememberKey?: string }) {
    const panes = Children.toArray(children).filter(isValidElement) as ReactElement<FluxSplitViewPaneProps>[],
        initial = () => {
            if (rememberKey) {
                try {
                    const stored = localStorage.getItem(`flux-split-${rememberKey}`);
                    if (stored) return JSON.parse(stored) as number[];
                } catch {}
            }
            const auto = 100 / Math.max(1, panes.length);
            return panes.map((pane) => (typeof pane.props.defaultSize === 'number' ? pane.props.defaultSize : auto));
        },
        [sizes, setSizes] = useState(initial),
        [dragging, setDragging] = useState(false),
        root = useRef<HTMLElement>(null);
    const update = (index: number, delta: number, base?: number[]) => {
        setSizes((current) => {
            const next = [...(base ?? current)],
                total = next[index] + next[index + 1],
                left = Math.max(panes[index].props.minSize ?? 5, Math.min(panes[index].props.maxSize ?? 95, next[index] + delta)),
                right = total - left;
            if (right < (panes[index + 1].props.minSize ?? 5)) return current;
            next[index] = left;
            next[index + 1] = right;
            if (rememberKey) localStorage.setItem(`flux-split-${rememberKey}`, JSON.stringify(next));
            return next;
        });
    };
    return (
        <Component {...props} ref={root} className={clsx(direction === 'horizontal' ? splitStyles.splitViewHorizontal : splitStyles.splitViewVertical, dragging && splitStyles.splitViewDragging, className)} style={direction === 'horizontal' ? { gridTemplateColumns: panes.flatMap((_, i) => (i < panes.length - 1 ? [`${sizes[i]}fr`, 'auto'] : [`${sizes[i]}fr`])).join(' ') } : { gridTemplateRows: panes.flatMap((_, i) => (i < panes.length - 1 ? [`${sizes[i]}fr`, 'auto'] : [`${sizes[i]}fr`])).join(' ') }}>
            {panes.flatMap((pane, index) => [
                cloneElement(pane, { key: pane.key ?? `pane-${index}` }),
                index < panes.length - 1 && (
                    <button
                        key={`handle-${index}`}
                        className={direction === 'horizontal' ? splitStyles.splitViewHandle : splitStyles.splitViewHandleVertical}
                        type="button"
                        role="separator"
                        aria-label={`Resize ${direction === 'horizontal' ? 'columns' : 'rows'} ${index + 1} and ${index + 2}`}
                        aria-orientation={direction === 'horizontal' ? 'vertical' : 'horizontal'}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={Math.round((sizes[index] / (sizes[index] + sizes[index + 1])) * 100)}
                        tabIndex={pane.props.isResizable === false || panes[index + 1].props.isResizable === false ? -1 : 0}
                        onKeyDown={(event) => {
                            const delta = (event.shiftKey ? 10 : 2) * (event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 1);
                            if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
                                event.preventDefault();
                                update(index, delta);
                            }
                        }}
                        onPointerDown={(event) => {
                            const start = direction === 'horizontal' ? event.clientX : event.clientY;
                            const startSizes = [...sizes];
                            setDragging(true);
                            const move = (moveEvent: globalThis.PointerEvent) => {
                                    const size = direction === 'horizontal' ? (root.current?.clientWidth ?? 1) : (root.current?.clientHeight ?? 1);
                                    update(index, (((direction === 'horizontal' ? moveEvent.clientX : moveEvent.clientY) - start) / size) * 100, startSizes);
                                },
                                up = () => {
                                    setDragging(false);
                                    window.removeEventListener('pointermove', move);
                                    window.removeEventListener('pointerup', up);
                                };
                            window.addEventListener('pointermove', move);
                            window.addEventListener('pointerup', up);
                        }}
                    />
                ),
            ])}
        </Component>
    );
}

export type FluxSwipeActionsSide = 'start' | 'end';
export function FluxSwipeAction({ className, color = 'gray', icon, isPrimary, label, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { color?: FluxColor; icon: FluxIconName; isPrimary?: boolean; label?: string }) {
    const disabled = useFluxDisabled(props.disabled);
    return (
        <button {...props} className={clsx(swipeStyles[`swipeAction${color.charAt(0).toUpperCase() + color.slice(1)}`], !label && swipeStyles.isIconOnly, isPrimary && swipeStyles.isPrimary, className)} data-flux-swipe-action="" data-flux-swipe-primary={isPrimary ? '' : undefined} type="button" disabled={disabled}>
            <FluxIcon name={icon} size={18} />
            {label && <span className={swipeStyles.swipeActionLabel}>{label}</span>}
        </button>
    );
}
export function FluxSwipeActions({ children, className, defaultOpen = null, disabled, end, onOpenChange, open: openProp, start, threshold = 0.5, ...props }: HTMLAttributes<HTMLDivElement> & { defaultOpen?: FluxSwipeActionsSide | null; disabled?: boolean; end?: ReactNode; onOpenChange?: (side: FluxSwipeActionsSide | null) => void; open?: FluxSwipeActionsSide | null; start?: ReactNode; threshold?: number }) {
    const controlled = openProp !== undefined,
        [inner, setInner] = useState<FluxSwipeActionsSide | null>(defaultOpen),
        open = controlled ? openProp : inner,
        [drag, setDrag] = useState<number | null>(null),
        origin = useRef(0),
        startOffset = useRef(0),
        scopedDisabled = useFluxDisabled(disabled),
        change = (side: FluxSwipeActionsSide | null) => {
            if (!controlled) setInner(side);
            onOpenChange?.(side);
        },
        offset = drag ?? (open === 'start' ? 96 : open === 'end' ? -96 : 0);
    return (
        <div {...props} className={clsx(swipeStyles.swipeActions, className)} style={{ '--swipe-offset': `${offset}px`, '--swipe-open-start': offset > 0 ? 1 : 0, '--swipe-open-end': offset < 0 ? 1 : 0 } as FluxStyle}>
            <div
                className={swipeStyles.swipeActionsRow}
                tabIndex={-1}
                style={{ transform: `translateX(${offset}px)` }}
                onPointerDown={(event) => {
                    if (scopedDisabled) return;
                    origin.current = event.clientX;
                    startOffset.current = offset;
                    setDrag(offset);
                    event.currentTarget.setPointerCapture?.(event.pointerId);
                }}
                onPointerMove={(event) => {
                    if (drag !== null) setDrag(startOffset.current + event.clientX - origin.current);
                }}
                onPointerUp={() => {
                    if (drag === null) return;
                    change(Math.abs(drag) > 96 * threshold ? (drag > 0 ? 'start' : 'end') : null);
                    setDrag(null);
                }}
            >
                {children}
            </div>
            {start && (
                <div className={clsx(swipeStyles.swipeActionsGroup, swipeStyles.isStart)} role="group" aria-label="Leading actions" onFocus={() => change('start')} onClick={() => change(null)}>
                    {start}
                </div>
            )}
            {end && (
                <div className={clsx(swipeStyles.swipeActionsGroup, swipeStyles.isEnd)} role="group" aria-label="Trailing actions" onFocus={() => change('end')} onClick={() => change(null)}>
                    {end}
                </div>
            )}
        </div>
    );
}

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
                        {step > 0 && <FluxSecondaryButton aria-label="Previous" iconLeading="angle-left" size="small" onClick={prev} />}
                        <FluxPrimaryButton aria-label={step < items.length - 1 ? 'Next' : 'Done'} iconLeading={step < items.length - 1 ? 'angle-right' : 'check'} size="small" onClick={next} />
                    </div>
                </FluxPane>
            </div>
        </div>,
        document.body,
    );
}

export function FluxFocalPointEditor({ defaultValue = [50, 50], footer, footerBefore, onValueChange, src, value }: { defaultValue?: [number, number]; footer?: ReactNode; footerBefore?: ReactNode; onValueChange?: (value: [number, number]) => void; src: string; value?: [number, number] }) {
    const controlled = value !== undefined,
        [inner, setInner] = useState(defaultValue),
        current = controlled ? value : inner,
        [preview, setPreview] = useState(false),
        editor = useRef<HTMLDivElement>(null);
    const set = (next: [number, number]) => {
            if (!controlled) setInner(next);
            onValueChange?.(next);
        },
        pointer = (event: PointerEvent<HTMLDivElement>) => {
            const rect = editor.current?.getBoundingClientRect();
            if (!rect?.width || !rect.height) return;
            set([Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100)), Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100))]);
        };
    return (
        <FluxPane style={{ '--aspect-ratio': 1 } as FluxStyle}>
            <FluxPaneBody>
                {preview ? (
                    <div className={focalStyles.focalPointPreview}>
                        <div className={focalStyles.focalPointPreviewImage} style={{ backgroundImage: `url(${src})`, backgroundPosition: `${current[0]}% ${current[1]}%` }} />
                    </div>
                ) : (
                    <div
                        ref={editor}
                        className={focalStyles.focalPointEditor}
                        role="slider"
                        aria-roledescription="2D slider"
                        aria-label="Focal point"
                        aria-valuetext={`${Math.round(current[0])}, ${Math.round(current[1])}`}
                        tabIndex={0}
                        onPointerDown={(event) => {
                            event.currentTarget.setPointerCapture(event.pointerId);
                            pointer(event);
                        }}
                        onPointerMove={(event) => event.currentTarget.hasPointerCapture(event.pointerId) && pointer(event)}
                        onKeyDown={(event) => {
                            const amount = event.shiftKey ? 10 : 1;
                            let [x, y] = current;
                            if (event.key === 'ArrowLeft') x -= amount;
                            else if (event.key === 'ArrowRight') x += amount;
                            else if (event.key === 'ArrowUp') y -= amount;
                            else if (event.key === 'ArrowDown') y += amount;
                            else if (event.key === 'Home') x = y = 0;
                            else if (event.key === 'End') x = y = 100;
                            else return;
                            event.preventDefault();
                            set([Math.max(0, Math.min(100, x)), Math.max(0, Math.min(100, y))]);
                        }}
                    >
                        <img className={focalStyles.focalPointEditorImage} src={src} alt="" />
                        <div className={focalStyles.focalPointEditorArea} style={{ left: `${current[0]}%`, top: `${current[1]}%` }} />
                    </div>
                )}
            </FluxPaneBody>
            <FluxPaneFooter>
                {footerBefore}
                <FluxSecondaryButton label={preview ? 'Close preview' : 'Preview'} onClick={() => setPreview((value) => !value)} />
                <FluxSpacer />
                {footer}
            </FluxPaneFooter>
        </FluxPane>
    );
}
