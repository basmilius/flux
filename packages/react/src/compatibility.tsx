import { Children, cloneElement, createContext, isValidElement, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { Context, HTMLAttributes, ReactElement, ReactNode, RefObject } from "react";
import { DateTime } from "luxon";
import type { FluxFilterOptionHeader, FluxFilterOptionItem, FluxFilterOptionRow, FluxFilterState } from "./components/CalendarFilters";
import type { FluxIconName } from "./types";

export type TranslateParams = Record<string, string | number>;
export type TranslateFunction<K extends string = string> = (key: K | (string & {}), params?: TranslateParams) => string;
export function createTranslate<T extends Record<string, string>>(english: T = {} as T): () => TranslateFunction<keyof T & string> {
    return () => (key, params) => {
        let translation: string = english[key as keyof T] ?? key;
        Object.entries(params ?? {}).forEach(([name, value]) => {
            translation = translation.replaceAll(`{${name}}`, String(value));
        });
        return translation;
    };
}

const BREAKPOINTS = { xs: 0, sm: 640, md: 768, lg: 1024, xl: 1280 } as const;
export type Breakpoint = keyof typeof BREAKPOINTS;
export function useBreakpoints(): { currentBreakpoint: Breakpoint | null } & Record<Breakpoint, boolean> {
    const [width, setWidth] = useState(() => (typeof window === "undefined" ? 0 : window.innerWidth));
    useEffect(() => {
        const update = () => setWidth(window.innerWidth);
        window.addEventListener("resize", update, { passive: true });
        return () => window.removeEventListener("resize", update);
    }, []);
    const states = Object.fromEntries(Object.entries(BREAKPOINTS).map(([name, value]) => [name, width >= value])) as Record<Breakpoint, boolean>,
        currentBreakpoint = (Object.keys(BREAKPOINTS) as Breakpoint[]).filter((name) => states[name]).at(-1) ?? null;
    return { currentBreakpoint, ...states };
}
export function useDisabled(componentDisabled?: boolean): boolean {
    return Boolean(componentDisabled);
}

type InjectionValue = Record<string, any> | boolean | null;
function injection<T extends InjectionValue>(name: string): [Context<T>, () => T] {
    const context = createContext<T>(null as T);
    context.displayName = name;
    return [context, () => useContext(context)];
}
export const [FluxAdaptiveGroupInjectionKey, useAdaptiveGroupInjection] = injection<any>("FluxAdaptiveGroupInjection");
export const [FluxCalendarInjectionKey, useCalendarInjection] = injection<any>("FluxCalendarInjection");
export const [FluxDisabledInjectionKey, useDisabledInjection] = injection<boolean>("FluxDisabledInjection");
export const [FluxExpandableGroupInjectionKey, useExpandableGroupInjection] = injection<any>("FluxExpandableGroupInjection");
export const [FluxFilterInjectionKey, useFilterInjection] = injection<any>("FluxFilterInjection");
export const [FluxFlyoutInjectionKey, useFlyoutInjection] = injection<any>("FluxFlyoutInjection");
export const [FluxFormCheckboxGroupInjectionKey, useFormCheckboxGroupInjection] = injection<any>("FluxFormCheckboxGroupInjection");
export const [FluxFormFieldInjectionKey, useFormFieldInjection] = injection<any>("FluxFormFieldInjection");
export const [FluxFormRadioGroupInjectionKey, useFormRadioGroupInjection] = injection<any>("FluxFormRadioGroupInjection");
export const [FluxKanbanInjectionKey, useKanbanInjection] = injection<any>("FluxKanbanInjection");
export const [FluxSegmentedControlInjectionKey, useSegmentedControlInjection] = injection<any>("FluxSegmentedControlInjection");
export const [FluxTabBarInjectionKey, useTabBarInjection] = injection<any>("FluxTabBarInjection");
export const [FluxTableInjectionKey, useTableInjection] = injection<any>("FluxTableInjection");
export const [FluxTooltipInjectionKey, useTooltipInjection] = injection<any>("FluxTooltipInjection");
export const FluxBreadcrumbCollapsedInjectionKey = createContext(false),
    FluxBreadcrumbSeparatorInjectionKey = createContext<FluxIconName>("angle-right"),
    FluxItemControlInjectionKey = createContext<any>(null),
    FluxKanbanLayoutInjectionKey = createContext<any>(null),
    FluxKanbanSwimlaneInjectionKey = createContext<any>(null),
    FluxMenuFlyoutInjectionKey = createContext<any>(null),
    FluxMenuPersistentInjectionKey = createContext(false),
    FluxTimelineInjectionKey = createContext<any>(null);

export interface FluxAdaptiveGroupChild {
    priority: number;
    setVisible(value: boolean): void;
}
export interface FluxAdaptiveGroupInjection {
    register(id: string, child: FluxAdaptiveGroupChild): void;
    unregister(id: string): void;
}
export interface FluxCalendarInjection {
    [key: string]: unknown;
}
export interface FluxCalendarItemData {
    id: string | number;
    start: DateTime;
    end?: DateTime;
    title?: string;
}
export type FluxCalendarKeyboardDirection = "down" | "left" | "right" | "up";
export interface FluxExpandableGroupInjection {
    openedId?: string;
    open(id: string): void;
    close(id: string): void;
}
export interface FluxFilterInjection {
    value: FluxFilterState;
    setValue(name: string, value: unknown): void;
}
export interface FluxFlyoutInjection {
    close(): void;
    isOpen: boolean;
}
export interface FluxFormCheckboxGroupInjection {
    value: readonly string[];
    toggle(value: string): void;
}
export type FluxFormCheckboxGroupValue = readonly string[];
export interface FluxFormFieldInjection {
    disabled?: boolean;
    error?: string | boolean;
    id?: string;
}
export interface FluxFormRadioGroupInjection {
    value?: string | number;
    select(value: string | number): void;
}
export type FluxFormRadioGroupValue = string | number | null;
export interface FluxSegmentedControlInjection extends FluxFormRadioGroupInjection {}
export type FluxSegmentedControlValue = FluxFormRadioGroupValue;
export interface FluxTabBarInjection extends FluxFormRadioGroupInjection {}
export interface FluxTableInjection {
    [key: string]: unknown;
}
export type FluxTablePinnedEdges = { left?: boolean; right?: boolean };
export interface FluxTooltipInjection {
    close(): void;
    open(): void;
}
export type FluxKanbanDragMode = "column" | "item" | "swimlane";
export interface FluxKanbanColumnDragState {
    columnId: string | number;
    overColumnId?: string | number;
}
export interface FluxKanbanDragState {
    id: string | number;
    mode: FluxKanbanDragMode;
}
export interface FluxKanbanInjection {
    [key: string]: unknown;
}
export type FluxKanbanKeyboardDirection = "down" | "left" | "right" | "up";

export type TransitionProps = { children?: ReactNode; show?: boolean } & HTMLAttributes<HTMLElement>;
function Transition({ children, show = true }: TransitionProps) {
    return show ? <>{children}</> : null;
}
export const FluxAutoHeightTransition = Transition,
    FluxAutoWidthTransition = Transition,
    FluxBreakthroughTransition = Transition,
    FluxFadeTransition = Transition,
    FluxOverlayTransition = Transition,
    FluxRouteTransition = Transition,
    FluxScaleTransition = Transition,
    FluxSheetTransition = Transition,
    FluxSlideOverTransition = Transition,
    FluxStaggerTransition = Transition,
    FluxTooltipTransition = Transition,
    FluxVerticalWindowTransition = Transition,
    FluxWindowTransition = Transition;

export const isSSR = !globalThis.document;
export type TemplateElement = HTMLElement | null;
export type TemplateRef<T extends TemplateElement = HTMLElement | null> = RefObject<T>;
export function flattenVNodeTree(children: ReactNode): ReactElement[] {
    const result: ReactElement[] = [];
    Children.forEach(children, (child) => {
        if (!isValidElement(child)) return;
        result.push(child);
        const nested = (child.props as { children?: ReactNode }).children;
        if (nested) result.push(...flattenVNodeTree(nested));
    });
    return result;
}
export function getComponentName(component: unknown): string | undefined {
    return typeof component === "string" ? component : typeof component === "function" ? ((component as { displayName?: string; name?: string }).displayName ?? component.name) : undefined;
}
export function getComponentProps(element: ReactElement): Record<string, unknown> {
    return element.props as Record<string, unknown>;
}
const FOCUSABLE = 'a[href]:not([disabled]),button:not([disabled]),input:not([type="hidden"]):not([disabled]),select:not([disabled]),textarea:not([disabled]),[contenteditable]:not([contenteditable="false"]),[tabindex]:not([disabled]):not([tabindex="-1"])';
export function getFocusableElements(container: HTMLElement, ignore?: string): HTMLElement[] {
    return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((element) => !ignore || !element.closest(ignore));
}
export function getKeyboardFocusableElements(container: HTMLElement, ignore?: string): HTMLElement[] {
    return getFocusableElements(container, ignore).filter((element) => element.tabIndex >= 0);
}
export function getFocusableElement(element: HTMLElement | null): HTMLElement | null {
    if (!element) return null;
    return element.matches(FOCUSABLE) ? element : element.querySelector<HTMLElement>(FOCUSABLE);
}
export function isActiveElement(element: Element | null): boolean {
    return element === document.activeElement || Boolean(element?.contains(document.activeElement));
}
export function wrapFocus(container: HTMLElement, target: Element, forceFirst = false): void {
    const values = getKeyboardFocusableElements(container),
        before = Boolean(target.compareDocumentPosition(container) & Node.DOCUMENT_POSITION_PRECEDING);
    (forceFirst || before ? values[0] : (values.at(-1) ?? container)).focus();
}
export function getBidirectionalFocusElement(container: HTMLElement, current: HTMLElement, direction: "up" | "down" | "left" | "right", ignore?: string): HTMLElement | null {
    const values = getFocusableElements(container, ignore),
        origin = current.getBoundingClientRect(),
        candidates = values.filter((element) => {
            if (element === current) return false;
            const rect = element.getBoundingClientRect();
            return direction === "up" ? rect.bottom <= origin.top : direction === "down" ? rect.top >= origin.bottom : direction === "left" ? rect.right <= origin.left : rect.left >= origin.right;
        });
    return (
        candidates.sort((a, b) => {
            const ar = a.getBoundingClientRect(),
                br = b.getBoundingClientRect(),
                ax = ar.left + ar.width / 2 - (origin.left + origin.width / 2),
                ay = ar.top + ar.height / 2 - (origin.top + origin.height / 2),
                bx = br.left + br.width / 2 - (origin.left + origin.width / 2),
                by = br.top + br.height / 2 - (origin.top + origin.height / 2);
            return Math.hypot(ax, ay) - Math.hypot(bx, by);
        })[0] ?? null
    );
}
export function warn(message: string): void {
    console.warn(`[Flux UI] ${message}`);
}

export interface FocusTrap {
    activate(): void;
    deactivate(): void;
    pause(): void;
    unpause(): void;
}
export type FocusTrapListener = (trap: FocusTrap | null) => void;
export const FOCUS_TRAP_LOCKS = new Set<FocusTrap>();
export function useFocusTrap(target: RefObject<HTMLElement | null>, active = true): FocusTrap {
    const previous = useRef<HTMLElement | null>(null),
        trap = useMemo<FocusTrap>(
            () => ({
                activate() {
                    previous.current = document.activeElement as HTMLElement;
                    getFocusableElement(target.current)?.focus();
                    FOCUS_TRAP_LOCKS.add(trap);
                },
                deactivate() {
                    FOCUS_TRAP_LOCKS.delete(trap);
                    previous.current?.focus();
                },
                pause() {
                    FOCUS_TRAP_LOCKS.delete(trap);
                },
                unpause() {
                    FOCUS_TRAP_LOCKS.add(trap);
                },
            }),
            [target],
        );
    useEffect(() => {
        if (!active) return;
        trap.activate();
        const key = (event: KeyboardEvent) => {
            if (event.key !== "Tab" || !target.current) return;
            const values = getKeyboardFocusableElements(target.current);
            if (!values.length) return;
            const index = values.indexOf(document.activeElement as HTMLElement),
                next = values[(index + (event.shiftKey ? -1 : 1) + values.length) % values.length];
            event.preventDefault();
            next.focus();
        };
        document.addEventListener("keydown", key);
        return () => {
            document.removeEventListener("keydown", key);
            trap.deactivate();
        };
    }, [active, target, trap]);
    return trap;
}
export function useFocusTrapLock(trap?: FocusTrap | null): boolean {
    return Boolean(trap && FOCUS_TRAP_LOCKS.has(trap));
}
export function useFocusTrapReturn(target?: RefObject<HTMLElement | null>): void {
    const previous = useRef<HTMLElement | null>(null);
    useEffect(() => {
        previous.current = document.activeElement as HTMLElement;
        return () => previous.current?.focus();
    }, [target]);
}
export function useFocusTrapSubscription(listener: FocusTrapListener): void {
    useEffect(() => {
        listener(FOCUS_TRAP_LOCKS.values().next().value ?? null);
    }, [listener]);
}
export function useFocusZone(target: RefObject<HTMLElement | null>, options: { direction?: "horizontal" | "vertical" | "bidirectional" } = {}): void {
    useEffect(() => {
        const root = target.current;
        if (!root) return;
        const key = (event: globalThis.KeyboardEvent) => {
            const direction = event.key === "ArrowUp" ? "up" : event.key === "ArrowDown" ? "down" : event.key === "ArrowLeft" ? "left" : event.key === "ArrowRight" ? "right" : null;
            if (!direction || (options.direction === "horizontal" && (direction === "up" || direction === "down")) || (options.direction === "vertical" && (direction === "left" || direction === "right"))) return;
            const next = getBidirectionalFocusElement(root, document.activeElement as HTMLElement, direction);
            if (next) {
                event.preventDefault();
                next.focus();
            }
        };
        root.addEventListener("keydown", key);
        return () => root.removeEventListener("keydown", key);
    }, [target, options.direction]);
}

export type KeyboardGrabDirection = "down" | "left" | "right" | "up";
export interface UseKeyboardGrabOptions {
    onGrab?(): void;
    onMove?(direction: KeyboardGrabDirection): void;
    onRelease?(): void;
    onCancel?(): void;
}
export interface UseKeyboardGrabReturn {
    grabbed: boolean;
    onKeyDown(event: React.KeyboardEvent): void;
}
export function defaultKeyboardGrabAnnounce(message: string): void {
    const region = document.createElement("div");
    region.setAttribute("aria-live", "polite");
    region.hidden = true;
    region.textContent = message;
    document.body.append(region);
    setTimeout(() => region.remove(), 1000);
}
export const defaultAnnounce = defaultKeyboardGrabAnnounce;
export function useKeyboardGrab(options: UseKeyboardGrabOptions = {}): UseKeyboardGrabReturn {
    const [grabbed, setGrabbed] = useState(false);
    return {
        grabbed,
        onKeyDown(event) {
            if (event.key === " " || event.key === "Enter") {
                event.preventDefault();
                setGrabbed((value) => {
                    value ? options.onRelease?.() : options.onGrab?.();
                    return !value;
                });
            } else if (grabbed && event.key === "Escape") {
                setGrabbed(false);
                options.onCancel?.();
            } else if (grabbed && event.key.startsWith("Arrow")) {
                event.preventDefault();
                options.onMove?.(event.key.slice(5).toLowerCase() as KeyboardGrabDirection);
            }
        },
    };
}
export function useNumberFormat(options?: Intl.NumberFormatOptions): Intl.NumberFormat {
    const [locale, setLocale] = useState("en-US");
    useEffect(() => setLocale(navigator.language), []);
    return useMemo(() => new Intl.NumberFormat(locale, options), [locale, options]);
}
export function useRemembered<T>(key: string, initialValue: T): readonly [T, (value: T | ((previous: T) => T)) => void] {
    const storageKey = `flux/${key}`,
        [value, setValue] = useState<T>(() => {
            if (typeof localStorage === "undefined") return initialValue;
            try {
                const parsed = JSON.parse(localStorage.getItem(storageKey) ?? "null");
                return Array.isArray(parsed) && parsed[0] === "DateTime" ? (DateTime.fromISO(parsed[1]) as T) : (parsed ?? initialValue);
            } catch {
                return initialValue;
            }
        });
    const update = useCallback(
        (next: T | ((previous: T) => T)) =>
            setValue((previous) => {
                const resolved = typeof next === "function" ? (next as (value: T) => T)(previous) : next;
                localStorage.setItem(storageKey, JSON.stringify(DateTime.isDateTime(resolved) ? ["DateTime", resolved.toISO()] : resolved));
                return resolved;
            }),
        [storageKey],
    );
    return [value, update] as const;
}

export function useCalendar(initial = DateTime.now()) {
    const [focus, setFocus] = useState(initial);
    return { focus, setFocus, next: () => setFocus((value) => value.plus({ months: 1 })), previous: () => setFocus((value) => value.minus({ months: 1 })), today: () => setFocus(DateTime.now()) };
}
export function useCalendarMonthSwitcher(initial = DateTime.now()) {
    const calendar = useCalendar(initial);
    return { ...calendar, nextMonth: calendar.next, previousMonth: calendar.previous };
}
export function useCalendarYearSwitcher(initial = DateTime.now()) {
    const [focus, setFocus] = useState(initial);
    return { focus, setFocus, nextYear: () => setFocus((value) => value.plus({ years: 1 })), previousYear: () => setFocus((value) => value.minus({ years: 1 })) };
}
export interface UseCalendarTimeGridReturn {
    dates: readonly DateTime[];
    minutes: number;
}
export type UseCalendarTimeGridDayCount = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export function useCalendarTimeGrid(start = DateTime.now().startOf("day"), dayCount: UseCalendarTimeGridDayCount = 1): UseCalendarTimeGridReturn {
    return { dates: Array.from({ length: dayCount }, (_, index) => start.plus({ days: index })), minutes: 24 * 60 };
}

export const vFocusTrap = (element: HTMLElement | null) => element && getFocusableElement(element)?.focus();
export const vHeightTransition = (element: HTMLElement | null) => {
    if (element) element.style.setProperty("--height", `${element.scrollHeight}px`);
};

export interface FluxFilterDefinitionContext {
    readonly state: FluxFilterState;
}
export type FluxFilterDefinitionFactory<T = unknown> = (context: FluxFilterDefinitionContext) => T;
export function defineFilter<T>(factory: FluxFilterDefinitionFactory<T>): FluxFilterDefinitionFactory<T> {
    return factory;
}
export function isFluxFilterOptionHeader(option: FluxFilterOptionRow): option is FluxFilterOptionHeader {
    return "header" in option || !("value" in option);
}
export function isFluxFilterOptionItem(option: FluxFilterOptionRow): option is FluxFilterOptionItem {
    return "value" in option;
}
export function isFluxFormSelectGroup(item: unknown): item is Record<string, unknown> {
    return item !== null && typeof item === "object" && !("value" in item);
}
export function isFluxFormSelectOption(item: unknown): item is Record<string, unknown> & { value: unknown } {
    return item !== null && typeof item === "object" && "value" in item;
}
export function pickFilterCommon<T extends Record<string, unknown>>(filter: T): Partial<T> {
    const keys = ["label", "name", "icon", "defaultValue", "isDisabled"];
    return Object.fromEntries(Object.entries(filter).filter(([key]) => keys.includes(key))) as Partial<T>;
}
export function generateMultiOptionsLabel(values: readonly unknown[], options: readonly FluxFilterOptionItem[]): string {
    return values.map((value) => options.find((option) => option.value === value)?.label ?? String(value)).join(", ");
}
export function isResettable(value: unknown, initial: unknown): boolean {
    return JSON.stringify(value) !== JSON.stringify(initial);
}
export function subscribeToRootFontSize(listener: (size: number) => void): () => void {
    const update = () => listener(Number.parseFloat(getComputedStyle(document.documentElement).fontSize));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(document.documentElement);
    return () => observer.disconnect();
}

export interface FluxInputMaskHandle {
    destroy(): void;
    readonly value: string;
}
function mask(element: HTMLInputElement, format: (value: string) => string): FluxInputMaskHandle {
    const update = () => {
        element.value = format(element.value.toUpperCase());
    };
    element.addEventListener("input", update);
    update();
    return {
        destroy: () => element.removeEventListener("input", update),
        get value() {
            return element.value;
        },
    };
}
export function bic(element: HTMLInputElement): FluxInputMaskHandle {
    return mask(element, (value) => value.replace(/[^A-Z0-9]/g, "").slice(0, 11));
}
export function iban(element: HTMLInputElement): FluxInputMaskHandle {
    return mask(element, (value) =>
        value
            .replace(/[^A-Z0-9]/g, "")
            .slice(0, 34)
            .replace(/(.{4})/g, "$1 ")
            .trim(),
    );
}
export function vat(element: HTMLInputElement): FluxInputMaskHandle {
    return mask(element, (value) => value.replace(/[^A-Z0-9]/g, "").slice(0, 15));
}
export const inputMask = { bic, iban, vat };
export const TIME_ZONES: readonly string[] = typeof Intl.supportedValuesOf === "function" ? Intl.supportedValuesOf("timeZone") : ["UTC"];
export const TIME_ZONE_GROUP_ORDER = ["flux.timezoneEurope", "flux.timezoneAmerica", "flux.timezoneUs", "flux.timezoneAustralia", "flux.timezoneCanada", "flux.timezoneMexico", "flux.timezoneAfrica", "flux.timezoneAntarctica", "flux.timezoneArctic", "flux.timezoneAsia", "flux.timezoneAtlantic", "flux.timezoneBrazil", "flux.timezoneChile", "flux.timezoneEtc", "flux.timezoneOther", "flux.timezoneIndian", "flux.timezonePacific"] as const;

export interface FluxDialogContext {
    close(): void;
}
export const FluxDialogInjectionKey = createContext<FluxDialogContext | null>(null);
export type FluxDialogRenderer = (context: FluxDialogContext) => ReactNode;
