import {clsx} from 'clsx';
import {
    Component,
    createRef,
    cloneElement,
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
    return <TransitionGroup {...props} name="snackbars" styles={snackbarStyles} />;
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

type GroupProps = Omit<TransitionProps, 'onAfterEnter' | 'onAfterLeave'> & {
    delay?: number;
    max?: number;
    tag?: ElementType;
    name?: string;
    styles?: Record<string, string>;
};
type GroupEntry = Entry & {index: number};
type GroupState = {children: ReactNode; entries: GroupEntry[]};
type GroupPosition = {node: HTMLElement; rect: DOMRect};

// React's snapshot lifecycle reads the old layout before any child DOM mutations.
class TransitionGroup extends Component<GroupProps, GroupState, GroupPosition[] | null> {
    state: GroupState = {
        children: this.props.children,
        entries: elements(this.props.children).map((element, index) => ({element, index, entering: !!this.props.appear, leaving: false}))
    };
    private root = createRef<HTMLElement>();
    private moves = new Map<HTMLElement, () => void>();

    static getDerivedStateFromProps(props: GroupProps, state: GroupState): GroupState | null {
        if (props.children === state.children) return null;
        let index = 0;
        const next = elements(props.children).map(element => {
            const previous = state.entries.find(entry => same(entry.element, element));
            return {element, index: previous && !previous.leaving ? previous.index : index++, entering: !previous || previous.leaving, leaving: false};
        });
        const entries: GroupEntry[] = [];
        const pending = new Map<GroupEntry, GroupEntry[]>();
        let leaving: GroupEntry[] = [];
        for (const previous of state.entries) {
            const retained = next.find(entry => same(entry.element, previous.element));
            if (retained) {
                pending.set(retained, leaving);
                leaving = [];
            } else leaving.push({...previous, entering: false, leaving: true});
        }
        for (const entry of next) entries.push(...(pending.get(entry) ?? []), entry);
        entries.push(...leaving);
        return {children: props.children, entries};
    }

    getSnapshotBeforeUpdate(props: GroupProps, state: GroupState): GroupPosition[] | null {
        if (props.children === this.props.children) return null;
        const nodes = Array.from(this.root.current?.children ?? []) as HTMLElement[];
        return state.entries.filter(entry => !entry.leaving || this.state.entries.some(current => current.leaving && same(current.element, entry.element))).flatMap(entry => {
            const node = nodes.find(node => node.dataset.fluxGroupKey === String(entry.element.key));
            return node ? [{node, rect: node.getBoundingClientRect()}] : [];
        });
    }

    componentDidUpdate(_props: GroupProps, _state: GroupState, positions: GroupPosition[] | null) {
        if (!positions) return;
        const reset = new Set(positions.map(({node}) => node));
        for (const node of this.moves.keys()) {
            if (this.state.entries.some(entry => !entry.leaving && String(entry.element.key) === node.dataset.fluxGroupKey)) reset.add(node);
        }
        // DOM moves can cancel CSS transitions. Cancel the retained nodes too before measuring their destinations.
        for (const node of reset) {
            this.moves.get(node)?.();
            for (const animation of node.getAnimations?.() ?? []) {
                if ('transitionProperty' in animation && animation.transitionProperty === 'transform') animation.cancel();
            }
        }
        if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
        const {name = 'staggerTransition', styles = transitionStyles} = this.props;
        const moveClass = styles[`${name}Move`];
        const targets = positions.filter(({node}) => node.isConnected).map(position => ({...position, target: position.node.getBoundingClientRect()}));
        const moved = targets.filter(({node, rect, target}) => {
            const x = rect.left - target.left, y = rect.top - target.top;
            if (Math.abs(x) < .01 && Math.abs(y) < .01) return false;
            const scaleX = node.offsetWidth ? target.width / node.offsetWidth : 1;
            const scaleY = node.offsetHeight ? target.height / node.offsetHeight : 1;
            node.style.transform = `translate(${x / (scaleX || 1)}px, ${y / (scaleY || 1)}px)`;
            node.style.transitionDuration = '0s';
            return true;
        });
        if (!moved.length) return;
        void this.root.current?.offsetHeight;
        for (const {node} of moved) {
            node.classList.add(moveClass);
            node.style.transform = '';
            node.style.transitionDuration = '';
            const cancel = () => {
                node.classList.remove(moveClass);
                node.removeEventListener('transitionend', ended);
                clearTimeout(timer);
                this.moves.delete(node);
            };
            const ended = (event: TransitionEvent) => {
                if (event.target === node && event.propertyName === 'transform') cancel();
            };
            const computed = getComputedStyle(node);
            const duration = Math.max(...computed.transitionDuration.split(',').map(milliseconds));
            const timer = setTimeout(cancel, duration + 50);
            this.moves.set(node, cancel);
            node.addEventListener('transitionend', ended);
        }
    }

    componentWillUnmount() {
        this.moves.forEach(cancel => cancel());
    }

    render() {
        const {appear, children, className, delay = 30, max = 300, style, tag: Tag = 'div', name = 'staggerTransition', styles = transitionStyles, ...props} = this.props;
        const moving = new Set(Array.from(this.moves.keys(), node => node.dataset.fluxGroupKey));
        return (
            <Tag {...props} ref={this.root} className={clsx(styles[name], className)} style={{'--stagger-delay': `${delay}ms`, '--stagger-max': `${max}ms`, ...style}}>
                {this.state.entries.map(entry => (
                    <MotionItem
                        key={entry.element.key}
                        element={entry.element}
                        entering={entry.entering}
                        leaving={entry.leaving}
                        name={name}
                        styles={styles}
                        className={moving.has(String(entry.element.key)) ? styles[`${name}Move`] : undefined}
                        style={{'--index': entry.index} as CSSProperties}
                        data-flux-group-key={String(entry.element.key)}
                        onEntered={() => this.setState(state => ({entries: state.entries.map(item => item === entry ? {...item, entering: false} : item)}))}
                        onExited={() => this.setState(state => ({entries: state.entries.filter(item => !same(item.element, entry.element) || !item.leaving)}))}
                    />
                ))}
            </Tag>
        );
    }
}
