import {clsx} from 'clsx';
import {annotate, annotationGroup} from 'rough-notation';
import {createContext, forwardRef, useContext, useEffect, useImperativeHandle, useMemo, useRef, useState, type HTMLAttributes} from 'react';
import styles from '../../../visuals/src/css/component/Highlighter.module.scss';

export type FluxVisualHighlighterVariant = 'underline' | 'box' | 'circle' | 'highlight' | 'strike-through' | 'crossed-off' | 'bracket';
interface HighlighterDefaults {
    animationDuration?: number;
    color?: string;
    iterations?: number;
    multiline?: boolean;
    padding?: number;
    strokeWidth?: number;
    variant?: FluxVisualHighlighterVariant;
}
type Annotation = ReturnType<typeof annotate>;
type Entry = {element: HTMLElement; getAnnotation(): Annotation | null};
interface Group {
    add(entry: Entry): void;
    remove(entry: Entry): void;
    notify(): void;
    dispose(): void;
}
const HighlighterContext = createContext<{defaults: HighlighterDefaults; group: Group} | null>(null);
export interface FluxVisualHighlighterHandle {
    hide(): void;
    replay(): void;
    show(): void;
}
const reducedMotion = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

export const FluxVisualHighlighter = forwardRef<FluxVisualHighlighterHandle, HTMLAttributes<HTMLSpanElement> & HighlighterDefaults & {onHidden?: () => void; onShown?: () => void; whenInView?: boolean}>(function FluxVisualHighlighter({animationDuration, children, className, color, iterations, multiline, onHidden, onShown, padding, strokeWidth, variant, whenInView = false, ...props}, ref) {
    const inherited = useContext(HighlighterContext);
    const group = inherited?.group;
    const defaults = inherited?.defaults;
    const target = useRef<HTMLSpanElement>(null);
    const annotation = useRef<Annotation | null>(null);
    const shownTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const callbacks = useRef({onHidden, onShown});
    callbacks.current = {onHidden, onShown};
    const options = {
        type: variant ?? defaults?.variant ?? 'highlight',
        color: color ?? defaults?.color ?? 'var(--warning-border)',
        strokeWidth: strokeWidth ?? defaults?.strokeWidth ?? 1.5,
        animationDuration: animationDuration ?? defaults?.animationDuration ?? 500,
        iterations: iterations ?? defaults?.iterations ?? 2,
        padding: padding ?? defaults?.padding ?? 2,
        multiline: multiline ?? defaults?.multiline ?? true
    };
    const controls = useRef<FluxVisualHighlighterHandle>({hide() {}, replay() {}, show() {}});
    useImperativeHandle(ref, () => ({hide: () => controls.current.hide(), replay: () => controls.current.replay(), show: () => controls.current.show()}), []);
    useEffect(() => {
        const element = target.current;
        if (!element) return;
        let revealed = false;
        let inView = !whenInView || Boolean(group);
        let resize: ResizeObserver | undefined;
        let intersection: IntersectionObserver | undefined;
        let settleTimer: ReturnType<typeof setTimeout> | undefined;
        function stopSettle() {clearTimeout(settleTimer); resize?.disconnect(); resize = undefined;}
        function emitShown() {
            clearTimeout(shownTimer.current);
            if (reducedMotion()) callbacks.current.onShown?.();
            else shownTimer.current = setTimeout(() => callbacks.current.onShown?.(), options.animationDuration);
        }
        function show() {if (!annotation.current) return; revealed = true; stopSettle(); annotation.current.show(); emitShown();}
        function reveal() {if (!revealed && inView) show();}
        annotation.current = annotate(element, {...options, animate: !reducedMotion()});
        controls.current = {
            show,
            hide() {if (!annotation.current) return; clearTimeout(shownTimer.current); annotation.current.hide(); callbacks.current.onHidden?.();},
            replay() {if (!annotation.current) return; annotation.current.hide(); annotation.current.show(); emitShown();}
        };
        const entry: Entry = {element, getAnnotation: () => annotation.current};
        if (group) group.add(entry);
        else {
            if (whenInView && typeof IntersectionObserver !== 'undefined') {
                intersection = new IntersectionObserver(entries => {if (entries.some(entry => entry.isIntersecting)) {inView = true; reveal();}});
                intersection.observe(element);
            } else inView = true;
            if (typeof ResizeObserver === 'undefined') reveal();
            else {
                resize = new ResizeObserver(() => {clearTimeout(settleTimer); settleTimer = setTimeout(reveal, 80);});
                resize.observe(element);
                resize.observe(document.body);
            }
        }
        return () => {
            group?.remove(entry);
            clearTimeout(shownTimer.current);
            stopSettle();
            intersection?.disconnect();
            annotation.current?.remove();
            annotation.current = null;
        };
    }, [group, options.type, options.color, options.strokeWidth, options.animationDuration, options.iterations, options.padding, options.multiline, whenInView]);
    return <span {...props} ref={target} className={clsx(styles.highlighter, className)}>{children}</span>;
});

export function FluxVisualHighlighterGroup({animationDuration, children, className, color, iterations, multiline, padding, strokeWidth, variant, whenInView = false, ...props}: HTMLAttributes<HTMLSpanElement> & HighlighterDefaults & {whenInView?: boolean}) {
    const [group] = useState(() => createGroup(whenInView));
    const context = useMemo(() => ({group, defaults: {animationDuration, color, iterations, multiline, padding, strokeWidth, variant}}), [group, animationDuration, color, iterations, multiline, padding, strokeWidth, variant]);
    useEffect(() => () => group.dispose(), [group]);
    return <HighlighterContext.Provider value={context}><span {...props} className={clsx(styles.highlighterGroup, className)}>{children}</span></HighlighterContext.Provider>;
}
function createGroup(whenInView: boolean): Group {
    const entries = new Set<Entry>();
    let group: ReturnType<typeof annotationGroup> | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let resize: ResizeObserver | undefined;
    let intersection: IntersectionObserver | undefined;
    let inView = !whenInView;
    function draw() {
        if (!inView) return;
        const annotations = [...entries].sort((a, b) => a.element.compareDocumentPosition(b.element) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1).map(entry => entry.getAnnotation()).filter((annotation): annotation is Annotation => annotation !== null);
        if (!annotations.length) return;
        group?.hide();
        group = annotationGroup(annotations);
        group.show();
        resize?.disconnect();
        resize = undefined;
    }
    function schedule() {clearTimeout(timer); timer = setTimeout(draw, 80);}
    return {
        add(entry) {
            entries.add(entry);
            if (whenInView && !inView && !intersection && typeof IntersectionObserver !== 'undefined') {
                intersection = new IntersectionObserver(observed => {
                    if (observed.some(item => item.isIntersecting)) {inView = true; intersection?.disconnect(); intersection = undefined; schedule();}
                });
                intersection.observe(entry.element);
            }
            if (!resize && typeof ResizeObserver !== 'undefined') {resize = new ResizeObserver(schedule); resize.observe(document.body);}
            schedule();
        },
        remove(entry) {entries.delete(entry); schedule();},
        notify: schedule,
        dispose() {clearTimeout(timer); resize?.disconnect(); resize = undefined; intersection?.disconnect(); intersection = undefined; group?.hide(); group = undefined;}
    };
}
