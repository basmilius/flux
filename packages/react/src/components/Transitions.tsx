import {clsx} from 'clsx';
import {
    Children,
    cloneElement,
    Fragment,
    isValidElement,
    useId,
    useLayoutEffect,
    useRef,
    useState
} from 'react';
import type {CSSProperties, ElementType, HTMLAttributes, ReactElement, ReactNode} from 'react';
import transitionStyles from '../../../components/src/css/component/Transition.module.scss';
import overlayStyles from '../../../components/src/css/component/Overlay.module.scss';
import sheetStyles from '../../../components/src/css/component/Sheet.module.scss';
import flyoutStyles from '../../../components/src/css/component/Flyout.module.scss';
import snackbarStyles from '../../../components/src/css/component/Snackbar.module.scss';
import {flattenElements} from './children';

export interface TransitionProps extends HTMLAttributes<HTMLElement> {
    appear?: boolean;
    children?: ReactNode;
    isBack?: boolean;
    mode?: 'in-out' | 'out-in';
    show?: boolean;
    onAfterEnter?: () => void;
    onAfterLeave?: () => void;
}

type TransitionElement = ReactElement<HTMLAttributes<HTMLElement>>;
type Entry = {element: TransitionElement; entering: boolean; leaving: boolean};
type MotionProps = Omit<TransitionProps, 'mode'> & {
    mode?: TransitionProps['mode'] | 'concurrent';
    axis?: 'height' | 'width';
    name: string;
    styles?: Record<string, string>;
};

const elements = (children: ReactNode) => flattenElements<HTMLAttributes<HTMLElement>>(children);

function same(a: TransitionElement | undefined, b: TransitionElement | undefined): boolean {
    return a?.key === b?.key && a?.type === b?.type;
}

export function Motion({
    appear = false,
    axis,
    children,
    isBack,
    mode = 'out-in',
    name,
    onAfterEnter,
    onAfterLeave,
    show = true,
    styles = transitionStyles,
    ...props
}: MotionProps) {
    const next = show ? elements(children)[0] : undefined;
    const latest = useRef(next);
    latest.current = next;
    const [entries, setEntries] = useState<Entry[]>(() =>
        next ? [{element: next, entering: appear, leaving: false}] : []
    );
    const active = entries.find((entry) => !entry.leaving);
    // Leaving content must retain its last rendered position, props and children.
    const lastActive = useRef(next);
    if (next && same(active?.element, next)) lastActive.current = next;
    const retainedElement = (element: TransitionElement) => same(element, lastActive.current) ? lastActive.current! : element;

    useLayoutEffect(() => {
        if (same(active?.element, next)) return;
        setEntries((current) => {
            const retained = current.map((entry) => ({...entry, element: retainedElement(entry.element), entering: false, leaving: true}));
            const returning = retained.find((entry) => same(entry.element, next));
            if (returning && next) return [{element: next, entering: true, leaving: false}];
            if (next && (!retained.length || mode !== 'out-in'))
                retained.push({element: next, entering: true, leaving: false});
            return retained;
        });
    }, [next?.key, next?.type, active?.element.key, active?.element.type, mode]);

    const entered = (element: TransitionElement) => {
        setEntries((current) =>
            current.map((entry) => (same(entry.element, element) ? {...entry, entering: false} : entry))
        );
        onAfterEnter?.();
    };
    const exited = (element: TransitionElement) => {
        setEntries((current) => {
            const remaining = current.filter((entry) => !same(entry.element, element));
            if (!remaining.length && latest.current)
                remaining.push({element: latest.current, entering: true, leaving: false});
            return remaining;
        });
        onAfterLeave?.();
    };
    return entries.map((entry) => (
        <MotionItem
            key={entry.element.key ?? 'transition'}
            {...props}
            axis={axis}
            element={same(entry.element, next) ? next! : retainedElement(entry.element)}
            entering={entry.entering}
            leaving={entry.leaving && !(mode === 'in-out' && entries.some((item) => item.entering))}
            name={`${name}${isBack ? 'Back' : ''}`}
            styles={styles}
            onEntered={() => entered(entry.element)}
            onExited={() => exited(entry.element)}
        />
    ));
}

function MotionItem({
    axis,
    element,
    entering,
    leaving,
    name,
    onEntered,
    onExited,
    styles,
    ...props
}: HTMLAttributes<HTMLElement> & {
    axis?: 'height' | 'width';
    element: TransitionElement;
    entering: boolean;
    leaving: boolean;
    name: string;
    onEntered(): void;
    onExited(): void;
    styles: Record<string, string>;
}) {
    const id = useId();
    const callbacks = useRef({onEntered, onExited});
    callbacks.current = {onEntered, onExited};
    const interruptedSize = useRef<number | undefined>(undefined);
    const appliedClasses = useRef<string[]>([]);
    const phase = leaving ? 'Leave' : 'Enter';
    const initialClasses = entering || leaving ? [
        axis ? `v-${phase.toLowerCase()}-active` : styles[`${name}${phase}Active`],
        axis ? `v-${phase.toLowerCase()}-from` : styles[`${name}${phase}From`]
    ] : [];

    useLayoutEffect(() => {
        if (!entering && !leaving) {
            interruptedSize.current = undefined;
            return;
        }
        // A DOM attribute also works with React 18 components that forward attributes but not refs.
        const node = document.querySelector<HTMLElement>(`[data-flux-transition="${id}"]`);
        const finish = () => (leaving ? callbacks.current.onExited() : callbacks.current.onEntered());
        if (!node || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
            finish();
            return;
        }
        const phase = leaving ? 'Leave' : 'Enter';
        const activeClass = axis ? 'v-' + phase.toLowerCase() + '-active' : styles[`${name}${phase}Active`];
        const fromClass = axis ? 'v-' + phase.toLowerCase() + '-from' : styles[`${name}${phase}From`];
        const toClass = axis ? 'v-' + phase.toLowerCase() + '-to' : styles[`${name}${phase}To`];
        const classes = [activeClass, fromClass, toClass]
            .filter(Boolean)
            .flatMap((value) => value.split(/\s+/));
        let timer: ReturnType<typeof setTimeout> | undefined;
        let firstFrame = 0;
        let secondFrame = 0;
        let endTime = Infinity;
        let completed = false;
        const complete = () => {
            if (completed) return;
            completed = true;
            clearTimeout(timer);
            finish();
        };
        const ended = (event: Event) => {
            if (event.target === node && (event.type === 'animationend' || performance.now() >= endTime - 17)) complete();
        };
        node.addEventListener('animationend', ended);
        node.addEventListener('transitionend', ended);
        const original = {dimension: axis ? node.style[axis] : '', overflow: node.style.overflow};
        let target = 0;
        if (axis) {
            const current = interruptedSize.current ?? node.getBoundingClientRect()[axis];
            node.style[axis] = 'auto';
            target = node.getBoundingClientRect()[axis];
            node.style[axis] = `${leaving ? current : (interruptedSize.current ?? 0)}px`;
            node.style.overflow = 'hidden';
        }
        interruptedSize.current = undefined;
        appliedClasses.current = [activeClass, fromClass].filter(Boolean).flatMap(value => value.split(/\s+/));
        if (activeClass) node.classList.add(...activeClass.split(/\s+/));
        if (fromClass) node.classList.add(...fromClass.split(/\s+/));
        void node.offsetHeight;
        firstFrame = requestAnimationFrame(() => {
            secondFrame = requestAnimationFrame(() => {
                appliedClasses.current = [activeClass, toClass].filter(Boolean).flatMap(value => value.split(/\s+/));
                if (fromClass) node.classList.remove(...fromClass.split(/\s+/));
                if (toClass) node.classList.add(...toClass.split(/\s+/));
                if (axis) node.style[axis] = `${leaving ? 0 : target}px`;
                const duration = Math.max(
                    0,
                    ...[node, ...Array.from(node.children)].map((element) => {
                        const computed = getComputedStyle(element);
                        const durations = computed.transitionDuration.split(',').map(milliseconds);
                        const delays = computed.transitionDelay.split(',').map(milliseconds);
                        return Math.max(
                            0,
                            ...durations.map((value, index) => value + delays[index % delays.length]),
                            ...computed.animationDuration.split(',').map((duration, index) => milliseconds(duration) + milliseconds(computed.animationDelay.split(',')[index % computed.animationDelay.split(',').length]))
                        );
                    })
                );
                endTime = performance.now() + duration;
                timer = setTimeout(complete, duration + (duration ? 1 : 0));
            });
        });
        return () => {
            interruptedSize.current = axis ? node.getBoundingClientRect()[axis] : undefined;
            cancelAnimationFrame(firstFrame);
            cancelAnimationFrame(secondFrame);
            clearTimeout(timer);
            completed = true;
            node.removeEventListener('animationend', ended);
            node.removeEventListener('transitionend', ended);
            node.classList.remove(...classes);
            appliedClasses.current = [];
            if (axis) node.style[axis] = original.dimension;
            node.style.overflow = original.overflow;
        };
    }, [axis, entering, leaving, name, styles, id]);

    return cloneElement(element, {
        ...props,
        ...element.props,
        className: clsx(element.props.className, props.className, appliedClasses.current.length ? appliedClasses.current : initialClasses),
        style: {...props.style, ...element.props.style},
        ...{'data-flux-transition': id}
    });
}

function milliseconds(value: string): number {
    return parseFloat(value) * (value.trim().endsWith('ms') ? 1 : 1000) || 0;
}

const flyoutTransitions = {
    flyoutEnterActive: flyoutStyles.isOpening,
    flyoutLeaveActive: flyoutStyles.isClosing
};

export function FluxFlyoutTransition(props: TransitionProps) {
    return <Motion {...props} name="flyout" styles={flyoutTransitions} />;
}

export function FluxSnackbarTransitionGroup(props: HTMLAttributes<HTMLElement> & {children?: ReactNode}) {
    return <TransitionGroup {...props} name="snackbars" styles={snackbarStyles} moveDuration={420} />;
}

export function FluxAutoHeightTransition(props: TransitionProps) {
    return <Motion {...props} axis="height" name="" />;
}
export function FluxAutoWidthTransition(props: TransitionProps) {
    return <Motion {...props} axis="width" name="" />;
}
export function FluxBreakthroughTransition(props: TransitionProps) {
    return <Motion {...props} name="breakthroughTransition" />;
}
export function FluxFadeTransition(props: TransitionProps) {
    return <Motion {...props} name="fadeTransition" />;
}
export function FluxOverlayTransition(props: TransitionProps) {
    return <Motion {...props} name="overlayTransition" styles={overlayStyles} />;
}
export function FluxRouteTransition(props: TransitionProps) {
    return <Motion {...props} name="routeTransition" />;
}
export function FluxScaleTransition({
    from = 0.95,
    origin = 'center',
    style,
    ...props
}: TransitionProps & {from?: number; origin?: string}) {
    return (
        <Motion
            {...props}
            name="scaleTransition"
            style={{'--scale-from': from, '--scale-origin': origin, ...style} as CSSProperties}
        />
    );
}
export function FluxSheetTransition(props: TransitionProps) {
    return <Motion {...props} name="sheetTransition" styles={sheetStyles} />;
}
export function FluxSlideOverTransition(props: TransitionProps) {
    return <Motion {...props} name="slideOverTransition" styles={overlayStyles} />;
}
export function FluxTooltipTransition(props: TransitionProps) {
    return <Motion {...props} name="tooltipTransition" />;
}
export function FluxVerticalWindowTransition(props: TransitionProps) {
    return <Motion {...props} name="verticalWindowTransition" />;
}
export function FluxWindowTransition(props: TransitionProps) {
    return <Motion {...props} name="windowTransition" />;
}

export function FluxStaggerTransition(props: Omit<TransitionProps, 'onAfterEnter' | 'onAfterLeave'> & {delay?: number; max?: number; tag?: ElementType}) {
    return <TransitionGroup {...props} />;
}

function TransitionGroup({
    appear,
    children,
    className,
    delay = 30,
    max = 300,
    style,
    tag: Tag = 'div',
    name = 'staggerTransition',
    styles = transitionStyles,
    moveDuration = 240,
    ...props
}: Omit<TransitionProps, 'onAfterEnter' | 'onAfterLeave'> & {
    delay?: number;
    max?: number;
    tag?: ElementType;
    name?: string;
    styles?: Record<string, string>;
    moveDuration?: number;
}) {
    const next = elements(children);
    const [retained, setRetained] = useState(next);
    const previous = useRef(new Map<string | null, DOMRect>());
    const ref = useRef<HTMLElement>(null);
    const all = [...next, ...retained.filter((child) => !next.some((item) => same(item, child)))];
    useLayoutEffect(() => {
        const positions = new Map<string | null, DOMRect>();
        Array.from(ref.current?.children ?? []).forEach((node, index) => {
            const element = node as HTMLElement;
            const key = all[index]?.key ?? null;
            const box = element.getBoundingClientRect();
            const old = previous.current.get(key);
            positions.set(key, box);
            if (old && next.some(item => item.key === key) && !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
                const x = old.left - box.left;
                const y = old.top - box.top;
                if (x || y)
                    element.animate?.([{transform: `translate(${x}px, ${y}px)`}, {transform: 'none'}], {
                        duration: moveDuration,
                        easing: 'cubic-bezier(.55, 0, .1, 1)'
                    });
            }
        });
        previous.current = positions;
    });
    useLayoutEffect(() => {
        setRetained(all);
    }, [children]);
    return (
        <Tag
            {...props}
            ref={ref}
            className={clsx(styles[name], className)}
            style={{'--stagger-delay': `${delay}ms`, '--stagger-max': `${max}ms`, ...style}}
        >
            {all.map((child, index) => (
                <Motion
                    key={child.key}
                    appear={appear || !retained.some((item) => same(item, child))}
                    show={next.some((item) => same(item, child))}
                    name={name}
                    styles={styles}
                    style={{'--index': index} as CSSProperties}
                    onAfterLeave={() =>
                        setRetained((current) => current.filter((item) => !same(item, child)))
                    }
                >
                    {child}
                </Motion>
            ))}
        </Tag>
    );
}
