import {useFluxTranslate} from '../i18n';
import {FluxSnackbarTransitionGroup} from './Transitions';
import {setOverlayShadeOpacity, useOverlayHost} from './overlayHost';
import { clsx } from 'clsx';
import { useEffect, useLayoutEffect, useState, useSyncExternalStore } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import type { FluxConfirmObject, FluxPromptObject } from '@flux-ui/types/notify';
import type { FluxColor, FluxDirection, FluxIconName } from '../types';
import {FluxSpacer} from './Layout';
import {useRef} from 'react';
import { FluxAction } from './Composition';
import { FluxDestructiveButton, FluxPrimaryButton, FluxSecondaryButton } from './Actions';
import { FluxIcon } from './Icon';
import { FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader } from './Display';
import { FluxProgressBar, FluxSpinner } from './Feedback';
import { FluxFormField, FluxFormInput } from './Forms';
import { FluxFlyout, FluxOverlay } from './Overlays';
import snackbarStyles from '../../../components/src/css/component/Snackbar.module.scss';
import popStyles from '../../../components/src/css/component/PopConfirm.module.scss';

export interface FluxSnackbarSpec extends Omit<HTMLAttributes<HTMLDivElement>, 'color' | 'id'> {
    actions?: Record<string, string>;
    color?: FluxColor;
    duration?: number;
    icon?: FluxIconName;
    isCloseable?: boolean;
    isRendered?: boolean;
    isLoading?: boolean;
    message?: string;
    progressIndeterminate?: boolean;
    progressMax?: number;
    progressMin?: number;
    progressStatus?: string;
    progressValue?: number;
    subMessage?: string;
    title?: string;
    onAction?: (key: string) => void;
    onClose?: () => void;
}
interface SnackbarRecord extends FluxSnackbarSpec {
    id: number;
}
let snackbarId = 0;
let snackbars: SnackbarRecord[] = [];
export interface FluxAlertObject {
    id: number;
    icon?: FluxIconName;
    message: string;
    title: string;
    onClose(): void;
}
export type { FluxConfirmObject, FluxPromptObject } from '@flux-ui/types/notify';
export interface FluxTooltipObject {
    id: number;
    content?: string;
    contentSlot?: () => ReactNode;
    direction: FluxDirection;
    origin?: HTMLElement;
}
export type FluxSnackbarObject = SnackbarRecord;
let nextNotificationId = 0;
let alerts: FluxAlertObject[] = [],
    confirms: FluxConfirmObject[] = [],
    prompts: FluxPromptObject[] = [],
    tooltips: FluxTooltipObject[] = [];
const snackbarListeners = new Set<() => void>();
const timers = new Map<number, ReturnType<typeof setTimeout>>();
const snackbarResolvers = new Map<number, () => void>();
function notify() {
    storeVersion++;
    snackbarListeners.forEach((listener) => listener());
}
export function showSnackbar(spec: FluxSnackbarSpec): Promise<void> {
    return new Promise((resolve) => {
        const id = addSnackbar({
            ...spec,
            onClose() {
                spec.onClose?.();
                removeSnackbar(id);
            }
        });
        snackbarResolvers.set(id, resolve);
        if (spec.duration !== 0) timers.set(id, setTimeout(() => removeSnackbar(id), spec.duration ?? 6000));
    });
}
export function removeSnackbar(id: number): void {
    clearTimeout(timers.get(id));
    timers.delete(id);
    snackbars = snackbars.filter((item) => item.id !== id);
    notify();
    const resolve = snackbarResolvers.get(id);
    snackbarResolvers.delete(id);
    resolve?.();
}
export function updateSnackbar(id: number, spec: Partial<FluxSnackbarSpec>): void {
    snackbars = snackbars.map((item) => (item.id === id ? { ...item, ...spec } : item));
    notify();
}
export function addAlert(spec: Omit<FluxAlertObject, 'id'>): number {
    const id = ++nextNotificationId;
    alerts = [...alerts, { ...spec, id }];
    notify();
    return id;
}
export function addConfirm(spec: Omit<FluxConfirmObject, 'id'>): number {
    const id = ++nextNotificationId;
    confirms = [...confirms, { ...spec, id }];
    notify();
    return id;
}
export function addPrompt(spec: Omit<FluxPromptObject, 'id'>): number {
    const id = ++nextNotificationId;
    prompts = [...prompts, { ...spec, id }];
    notify();
    return id;
}
export function addSnackbar(spec: Omit<FluxSnackbarObject, 'id'>): number {
    const item = { ...spec, id: ++snackbarId };
    snackbars = [...snackbars, item];
    notify();
    return item.id;
}
export function addTooltip(spec: Omit<FluxTooltipObject, 'id'>): number {
    const id = ++nextNotificationId;
    tooltips = [...tooltips, { ...spec, id }];
    notify();
    return id;
}
export function removeAlert(id: number): void {
    alerts = alerts.filter((item) => item.id !== id);
    notify();
}
export function removeConfirm(id: number): void {
    confirms = confirms.filter((item) => item.id !== id);
    notify();
}
export function removePrompt(id: number): void {
    prompts = prompts.filter((item) => item.id !== id);
    notify();
}
export function removeTooltip(id: number): void {
    tooltips = tooltips.filter((item) => item.id !== id);
    notify();
}
export function updateTooltip(id: number, spec: Partial<Omit<FluxTooltipObject, 'id'>>): void {
    tooltips = tooltips.map((item) => (item.id === id ? { ...item, ...spec } : item));
    notify();
}
export function pauseSnackbar(id: number): void {
    const timer = timers.get(id);
    if (timer) {
        clearTimeout(timer);
        timers.delete(id);
    }
}
export function resumeSnackbar(id: number, duration = 5000): void {
    if (timers.has(id) || !snackbars.some((item) => item.id === id)) return;
    timers.set(
        id,
        setTimeout(() => removeSnackbar(id), duration)
    );
}
export function showAlert(spec: Omit<FluxAlertObject, 'id' | 'onClose'>): Promise<void> {
    return new Promise((resolve) => {
        const id = addAlert({
            ...spec,
            onClose() {
                removeAlert(id);
                resolve();
            }
        });
    });
}
export function showConfirm(spec: Omit<FluxConfirmObject, 'id' | 'onCancel' | 'onConfirm'>): Promise<boolean> {
    return new Promise((resolve) => {
        const id = addConfirm({
            ...spec,
            onCancel() {
                removeConfirm(id);
                resolve(false);
            },
            onConfirm() {
                removeConfirm(id);
                resolve(true);
            }
        });
    });
}
export function showPrompt(spec: Omit<FluxPromptObject, 'id' | 'onCancel' | 'onConfirm'>): Promise<string | false> {
    return new Promise((resolve) => {
        const id = addPrompt({
            ...spec,
            onCancel() {
                removePrompt(id);
                resolve(false);
            },
            onConfirm(value) {
                removePrompt(id);
                resolve(value);
            }
        });
    });
}

export interface FluxDialogRegistration {
    id: number;
    getPosition(): number;
    isCurrent(): boolean;
    setShadeOpacity(opacity: number): void;
    unregister(): void;
}
let dialogs: number[] = [];
const shadeOpacities = new Map<number, number>();
let overflowBeforeDialogs: string | undefined;
export function registerDialog(): FluxDialogRegistration {
    const id = ++nextNotificationId;
    if (dialogs.length === 0 && typeof document !== 'undefined') {
        overflowBeforeDialogs = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
    }
    dialogs = [...dialogs, id];
    setOverlayShadeOpacity(1);
    notify();
    let registered = true;
    return {
        id,
        getPosition: () => dialogs.indexOf(id),
        isCurrent: () => dialogs.at(-1) === id,
        setShadeOpacity(opacity) {
            shadeOpacities.set(id, opacity);
            if (dialogs.at(-1) === id) setOverlayShadeOpacity(opacity);
            notify();
        },
        unregister() {
            if (!registered) return;
            registered = false;
            dialogs = dialogs.filter((value) => value !== id);
            shadeOpacities.delete(id);
            setOverlayShadeOpacity(shadeOpacities.get(dialogs.at(-1)!) ?? 1);
            if (dialogs.length === 0 && typeof document !== 'undefined') {
                document.body.style.overflow = overflowBeforeDialogs ?? '';
                overflowBeforeDialogs = undefined;
            }
            notify();
        }
    };
}
export interface FluxState {
    readonly dialogs: readonly number[];
    readonly alerts: readonly FluxAlertObject[];
    readonly confirms: readonly FluxConfirmObject[];
    readonly prompts: readonly FluxPromptObject[];
    readonly snackbars: readonly FluxSnackbarObject[];
    readonly tooltips: readonly FluxTooltipObject[];
}
export type FluxStore = FluxState & { readonly dialogCount: number; readonly inertMain: boolean; readonly shadeOpacity: number; readonly tooltip: FluxTooltipObject | null; addAlert: typeof addAlert; addConfirm: typeof addConfirm; addPrompt: typeof addPrompt; addSnackbar: typeof addSnackbar; addTooltip: typeof addTooltip; pauseSnackbar: typeof pauseSnackbar; registerDialog: typeof registerDialog; removeAlert: typeof removeAlert; removeConfirm: typeof removeConfirm; removePrompt: typeof removePrompt; removeSnackbar: typeof removeSnackbar; removeTooltip: typeof removeTooltip; resumeSnackbar: typeof resumeSnackbar; showAlert: typeof showAlert; showConfirm: typeof showConfirm; showPrompt: typeof showPrompt; showSnackbar: typeof showSnackbar; showSnackbarSync(spec: FluxSnackbarSpec): void; updateSnackbar: typeof updateSnackbar; updateTooltip: typeof updateTooltip };
let storeVersion = 0;
function storeSnapshot(): FluxStore {
    return {
        dialogs,
        alerts,
        confirms,
        prompts,
        snackbars,
        tooltips,
        dialogCount: dialogs.length,
        inertMain: dialogs.length > 0,
        shadeOpacity: shadeOpacities.get(dialogs.at(-1)!) ?? 1,
        tooltip: tooltips.at(-1) ?? null,
        addAlert,
        addConfirm,
        addPrompt,
        addSnackbar,
        addTooltip,
        pauseSnackbar,
        registerDialog,
        removeAlert,
        removeConfirm,
        removePrompt,
        removeSnackbar,
        removeTooltip,
        resumeSnackbar,
        showAlert,
        showConfirm,
        showPrompt,
        showSnackbar,
        showSnackbarSync(spec) {
            void showSnackbar(spec);
        },
        updateSnackbar,
        updateTooltip
    };
}
export function useFluxStore(): FluxStore {
    useSyncExternalStore(
        (listener) => {
            snackbarListeners.add(listener);
            return () => {
                snackbarListeners.delete(listener);
            };
        },
        () => storeVersion,
        () => storeVersion
    );
    return storeSnapshot();
}

export function FluxSnackbar({ actions, className, color = 'gray', icon, isCloseable, isLoading, isRendered = true, message, onAction, onClose, progressIndeterminate, progressMax, progressMin, progressStatus, progressValue, subMessage, title, ...props }: FluxSnackbarSpec) {
    const translate = useFluxTranslate();
    if (!isRendered) return null;
    return (
        <div {...props} className={clsx(snackbarStyles[`snackbar${capital(color)}`], className)} role={color === 'danger' ? 'alert' : 'status'} aria-live={color === 'danger' ? 'assertive' : 'polite'}>
            <div className={snackbarStyles.snackbarContent}>
                {isLoading ? <FluxSpinner size={18} /> : icon && <FluxIcon size={18} name={icon} />}
                <div className={snackbarStyles.snackbarBody}>
                    {title && <div className={snackbarStyles.snackbarTitle}>{title}</div>}
                    {message && <div className={snackbarStyles.snackbarMessage}>{message}</div>}
                    {(progressIndeterminate || progressValue != null) && <FluxProgressBar isIndeterminate={progressIndeterminate} max={progressMax} min={progressMin} status={progressStatus} value={progressValue} />}
                    {subMessage && <div className={snackbarStyles.snackbarSubMessage}>{subMessage}</div>}
                </div>
            </div>
            {actions && (
                <div className={snackbarStyles.snackbarActions}>
                    {Object.entries(actions).map(([key, label]) => (
                        <button key={key} className={snackbarStyles.snackbarAction} type="button" onClick={() => onAction?.(key)}>
                            {label}
                        </button>
                    ))}
                </div>
            )}
            {isCloseable && <FluxAction icon="xmark" aria-label={translate('flux.close')} onClick={onClose} />}
        </div>
    );
}

export function FluxSnackbarProvider() {
    const [, render] = useState(0);
    useEffect(() => {
        const listener = () => render((value) => value + 1);
        snackbarListeners.add(listener);
        return () => {
            snackbarListeners.delete(listener);
        };
    }, []);
    return (
        <FluxSnackbarTransitionGroup className={snackbarStyles.snackbars}>
            {[...snackbars].reverse().map((item) => (
                <FluxSnackbar
                    key={item.id}
                    {...item}
                    onAction={(key) => {
                        item.onAction?.(key);
                        removeSnackbar(item.id);
                    }}
                    onClose={() => {
                        item.onClose?.();
                        removeSnackbar(item.id);
                    }}
                />
            ))}
        </FluxSnackbarTransitionGroup>
    );
}

function useLeavingDialogs<T extends {id: number}>(items: T[]) {
    const [retained, setRetained] = useState(items);
    useLayoutEffect(() => {
        // A new dialog replaces content that is still leaving, as in the Vue provider.
        if (items.length) setRetained(items);
    }, [items]);
    return retained.map(item => ({
        item,
        open: items.some(active => active.id === item.id),
        onAfterClose: () => setRetained(current => current.filter(record => record.id !== item.id))
    }));
}

export function FluxDialogProvider() {
    useOverlayHost();
    const renderedAlerts = useLeavingDialogs(alerts);
    const renderedConfirms = useLeavingDialogs(confirms);
    const renderedPrompts = useLeavingDialogs(prompts);
    const [, render] = useState(0);
    useEffect(() => {
        const listener = () => render((value) => value + 1);
        snackbarListeners.add(listener);
        return () => {
            snackbarListeners.delete(listener);
        };
    }, []);
    return (
        <>
            {renderedAlerts.map(({item, open, onAfterClose}) => (
                <FluxAlert key={item.id} open={open} onAfterClose={onAfterClose} icon={item.icon} message={item.message} title={item.title} onClose={item.onClose} />
            ))}
            {renderedConfirms.map(({item, open, onAfterClose}) => (
                <FluxConfirm key={item.id} open={open} onAfterClose={onAfterClose} icon={item.icon} message={item.message} title={item.title} onCancel={item.onCancel} onConfirm={item.onConfirm} />
            ))}
            {renderedPrompts.map(({item, open, onAfterClose}) => (
                <FluxPrompt key={item.id} open={open} onAfterClose={onAfterClose} icon={item.icon} message={item.message} title={item.title} fieldLabel={item.fieldLabel} fieldPlaceholder={item.fieldPlaceholder} onCancel={item.onCancel} onConfirm={item.onConfirm} />
            ))}
        </>
    );
}

export function FluxPopConfirm({cancelLabel, children, confirmLabel, direction, icon, isDestructive, label, margin, message, onCancel, onConfirm, opener, title, width}: {cancelLabel?: string; children?: ReactNode | ((state: {close(): void}) => ReactNode); confirmLabel?: string; direction?: FluxDirection; icon?: FluxIconName; isDestructive?: boolean; label?: string; margin?: number; message?: string; onCancel?: () => void; onConfirm: () => void; opener: React.ComponentProps<typeof FluxFlyout>['opener']; title?: string; width?: number | string}) {
    const translate = useFluxTranslate();
    const decided = useRef(false);
    return <FluxFlyout direction={direction} label={label ?? title ?? message ?? confirmLabel ?? translate('flux.ok')} margin={margin} width={width} opener={opener} onClose={() => {if (!decided.current) onCancel?.(); decided.current = false;}}>
        {({close}) => <>
            <FluxPaneBody className={popStyles.popConfirmBody}>
                {children ? typeof children === 'function' ? children({close}) : children : <div className={popStyles.popConfirmContent}>
                    {icon && <FluxIcon className={popStyles.popConfirmIcon} color={isDestructive ? 'danger' : 'primary'} name={icon} size={20} />}
                    <div className={popStyles.popConfirmCaption}>{title && <strong>{title}</strong>}{message && <span>{message}</span>}</div>
                </div>}
            </FluxPaneBody>
            <FluxPaneFooter><FluxSpacer />
                <FluxSecondaryButton autoFocus={isDestructive} label={cancelLabel ?? translate('flux.cancel')} onClick={() => {decided.current = true; onCancel?.(); close();}} />
                {isDestructive ? <FluxDestructiveButton label={confirmLabel ?? translate('flux.ok')} onClick={() => {decided.current = true; onConfirm(); close();}} /> : <FluxPrimaryButton autoFocus iconLeading="circle-check" label={confirmLabel ?? translate('flux.ok')} onClick={() => {decided.current = true; onConfirm(); close();}} />}
            </FluxPaneFooter>
        </>}
    </FluxFlyout>;
}

export function FluxAlert({ icon, message, onAfterClose, onClose, open, title }: { icon?: FluxIconName; message?: string; onClose(): void; onAfterClose?: () => void; open: boolean; title: string }) {
    const translate = useFluxTranslate();
    return (
        <FluxOverlay size="medium" open={open} onAfterClose={onAfterClose} label={title}>
            <DialogLayout icon={icon} message={message} title={title} footer={<FluxPrimaryButton label={translate('flux.ok')} onClick={onClose} />} />
        </FluxOverlay>
    );
}
export function FluxConfirm({ icon, message, onCancel, onAfterClose, onConfirm, open, title }: { icon?: FluxIconName; message?: string; onCancel(): void; onConfirm(): void; onAfterClose?: () => void; open: boolean; title: string }) {
    const translate = useFluxTranslate();
    return (
        <FluxOverlay size="medium" open={open} onAfterClose={onAfterClose} isCloseable label={title} onClose={onCancel}>
            <DialogLayout
                icon={icon}
                message={message}
                title={title}
                footer={
                    <>
                        <FluxSecondaryButton label={translate('flux.cancel')} onClick={onCancel} />
                        <FluxPrimaryButton iconLeading="circle-check" label={translate('flux.ok')} onClick={onConfirm} />
                    </>
                }
            />
        </FluxOverlay>
    );
}
export function FluxPrompt({ fieldLabel, fieldPlaceholder, icon, message, onCancel, onAfterClose, onConfirm, open, title }: { fieldLabel: string; fieldPlaceholder?: string; icon?: FluxIconName; message?: string; onCancel(): void; onConfirm(value: string): void; onAfterClose?: () => void; open: boolean; title: string }) {
    const translate = useFluxTranslate();
    const [value, setValue] = useState('');
    return (
        <FluxOverlay size="medium" open={open} onAfterClose={onAfterClose} isCloseable label={title} onClose={onCancel}>
            <DialogLayout
                icon={icon}
                message={message}
                title={title}
                footer={
                    <>
                        <FluxSecondaryButton label={translate('flux.cancel')} onClick={onCancel} />
                        <FluxPrimaryButton disabled={!value.trim()} label={translate('flux.ok')} onClick={() => onConfirm(value)} />
                    </>
                }
            >
                <FluxFormField label={fieldLabel}>
                    <FluxFormInput
                        autoFocus
                        placeholder={fieldPlaceholder}
                        value={value}
                        onValueChange={(next) => setValue(String(next ?? ''))}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter' && value.trim()) onConfirm(value);
                        }}
                    />
                </FluxFormField>
            </DialogLayout>
        </FluxOverlay>
    );
}
function DialogLayout({ children, footer, icon, message, title }: { children?: ReactNode; footer: ReactNode; icon?: FluxIconName; message?: string; title: string }) {
    return (
        <FluxPane>
            <FluxPaneHeader icon={icon} title={title} />
            {message && <FluxPaneBody>{message}</FluxPaneBody>}
            {children && <FluxPaneBody>{children}</FluxPaneBody>}
            <FluxPaneFooter>{footer}</FluxPaneFooter>
        </FluxPane>
    );
}
function capital(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}
