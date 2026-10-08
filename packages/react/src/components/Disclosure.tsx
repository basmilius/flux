import {useFluxTranslate} from '../i18n';
import {clsx} from 'clsx';
import {
    createContext,
    forwardRef,
    useContext,
    useId,
    useImperativeHandle,
    useLayoutEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import type {HTMLAttributes, ReactNode} from 'react';
import type {FluxColor, FluxIconName, FluxStyle} from '../types';
import {FluxPressable} from './Actions';
import {FluxPane, FluxPaneBody} from './Display';
import {FluxLayerPane} from './DisplayExtended';
import {FluxIcon} from './Icon';
import {FluxAutoHeightTransition, FluxFadeTransition} from './Transitions';
import expandableStyles from '../../../components/src/css/component/Expandable.module.scss';
import readMoreStyles from '../../../components/src/css/component/ReadMore.module.scss';

export interface FluxExpandableHandle {
    contentId: string;
    headerId: string;
    isOpen: boolean;
    close(): void;
    open(): void;
    toggle(): void;
}

export interface ExpandableGroupValue {
    register(id: string, item: {open(): void; close(): void}): () => void;
    closeOthers(id: string): void;
}
export const ExpandableGroupContext = createContext<ExpandableGroupValue | undefined>(undefined);

export function FluxExpandableGroup({
    children,
    className,
    defaultOpenId,
    isControlled,
    ...props
}: HTMLAttributes<HTMLDivElement> & {defaultOpenId?: string; isControlled?: boolean}) {
    const items = useRef(new Map<string, {open(): void; close(): void}>());
    const options = useRef({defaultOpenId, isControlled});
    options.current = {defaultOpenId, isControlled};
    const context = useMemo<ExpandableGroupValue>(
        () => ({
            register(id, item) {
                items.current.set(id, item);
                if (
                    options.current.defaultOpenId === id ||
                    (!options.current.isControlled &&
                        !options.current.defaultOpenId &&
                        items.current.size === 1)
                )
                    item.open();
                return () => {
                    items.current.delete(id);
                };
            },
            closeOthers(id) {
                items.current.forEach((item, key) => {
                    if (key !== id) item.close();
                });
            }
        }),
        []
    );
    return (
        <ExpandableGroupContext.Provider value={context}>
            <div {...props} className={clsx(expandableStyles.expandableGroup, className)}>
                {children}
            </div>
        </ExpandableGroupContext.Provider>
    );
}

type ExpandableOptions = {
    defaultOpened?: boolean;
    expandableId?: string;
    isOpened?: boolean;
    onToggle?: (open: boolean) => void;
};
function useExpandable({
    defaultOpened,
    expandableId,
    isOpened,
    onToggle
}: ExpandableOptions): FluxExpandableHandle {
    const generated = useId();
    const id = expandableId ?? generated;
    const group = useContext(ExpandableGroupContext);
    const [isOpen, setOpen] = useState(isOpened ?? defaultOpened ?? false);
    const current = useRef({isOpen, onToggle});
    current.current = {isOpen, onToggle};
    const actions = useMemo(() => {
        const change = (next: boolean) => {
            if (current.current.isOpen === next) return;
            if (next) group?.closeOthers(id);
            current.current.isOpen = next;
            setOpen(next);
            current.current.onToggle?.(next);
        };
        return {
            close: () => change(false),
            open: () => change(true),
            toggle: () => change(!current.current.isOpen)
        };
    }, [group, id]);
    useLayoutEffect(() => {
        if (isOpened !== undefined) isOpened ? actions.open() : actions.close();
    }, [isOpened, actions]);
    useLayoutEffect(() => group?.register(id, actions), [group, id, actions]);
    return {...actions, isOpen, contentId: `${id}-content`, headerId: `${id}-header`};
}

type ExpandableContent<State> = ReactNode | ((state: State) => ReactNode);
function renderContent<State>(content: ExpandableContent<State>, state: State): ReactNode {
    return typeof content === 'function' ? content(state) : content;
}

export interface FluxExpandableProps
    extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onToggle'>, ExpandableOptions {
    body?: ExpandableContent<FluxExpandableHandle & {label?: ReactNode}>;
    children?: ExpandableContent<FluxExpandableHandle & {label?: ReactNode}>;
    header?: (state: FluxExpandableHandle & {label?: ReactNode}) => ReactNode;
    icon?: FluxIconName;
    label?: ReactNode;
}

export const FluxExpandable = forwardRef<FluxExpandableHandle, FluxExpandableProps>(function FluxExpandable(
    {
        body,
        children,
        className,
        defaultOpened,
        expandableId,
        header,
        icon,
        isOpened,
        label,
        onToggle,
        ...props
    },
    ref
) {
    const state = {...useExpandable({defaultOpened, expandableId, isOpened, onToggle}), label};
    useImperativeHandle(ref, () => state);
    return (
        <div
            {...props}
            className={clsx(
                state.isOpen ? expandableStyles.expandableOpened : expandableStyles.expandable,
                className
            )}
        >
            {header ? (
                header(state)
            ) : (
                <button
                    className={expandableStyles.expandableHeader}
                    id={state.headerId}
                    type="button"
                    aria-controls={state.contentId}
                    aria-expanded={state.isOpen}
                    onClick={state.toggle}
                >
                    <FluxFadeTransition>{icon && <FluxIcon key={icon} name={icon} />}</FluxFadeTransition>
                    <span>{label}</span>
                    <FluxFadeTransition>
                        <FluxIcon
                            key={state.isOpen ? 'minus' : 'plus'}
                            name={state.isOpen ? 'minus' : 'plus'}
                            size={16}
                        />
                    </FluxFadeTransition>
                </button>
            )}
            <FluxAutoHeightTransition show={state.isOpen}>
                <div
                    className={expandableStyles.expandableBody}
                    id={state.contentId}
                    role="region"
                    aria-labelledby={state.headerId}
                >
                    {body !== undefined ? (
                        renderContent(body, state)
                    ) : (
                        <div className={expandableStyles.expandableContent}>
                            {renderContent(children, state)}
                        </div>
                    )}
                </div>
            </FluxAutoHeightTransition>
        </div>
    );
});

export interface FluxExpandablePaneProps extends Omit<FluxExpandableProps, 'body' | 'children' | 'header'> {
    before?: ReactNode;
    body?: ExpandableContent<FluxExpandableHandle & {subtitle?: string; title?: string}>;
    children?: ExpandableContent<FluxExpandableHandle & {subtitle?: string; title?: string}>;
    color?: FluxColor;
    header?: (state: FluxExpandableHandle & {subtitle?: string; title?: string}) => ReactNode;
    subtitle?: string;
    title?: string;
}

export const FluxExpandablePane = forwardRef<FluxExpandableHandle, FluxExpandablePaneProps>(
    function FluxExpandablePane(
        {
            before,
            body,
            children,
            className,
            color = 'gray',
            defaultOpened,
            expandableId,
            header,
            icon,
            isOpened,
            onToggle,
            subtitle,
            title,
            ...props
        },
        ref
    ) {
        const state = {...useExpandable({defaultOpened, expandableId, isOpened, onToggle}), subtitle, title};
        useImperativeHandle(ref, () => state);
        return (
            <FluxLayerPane
                {...props}
                className={clsx(
                    state.isOpen ? expandableStyles.expandablePaneOpened : expandableStyles.expandablePane,
                    className
                )}
                color={color}
            >
                {header ? (
                    header(state)
                ) : (
                    <FluxPressable
                        className={expandableStyles.expandablePaneHeader}
                        id={state.headerId}
                        componentType="button"
                        aria-controls={state.contentId}
                        aria-expanded={state.isOpen}
                        onClick={state.toggle}
                    >
                        {before}
                        {icon && (
                            <FluxIcon
                                className={expandableStyles.expandablePaneHeaderIcon}
                                size={18}
                                name={icon}
                            />
                        )}
                        {(title || subtitle) && (
                            <div className={expandableStyles.expandablePaneHeaderCaption}>
                                {title && <strong>{title}</strong>}
                                {subtitle && <span>{subtitle}</span>}
                            </div>
                        )}
                        <FluxIcon
                            className={expandableStyles.expandablePaneHeaderChevron}
                            size={18}
                            name="angle-right"
                        />
                    </FluxPressable>
                )}
                <FluxAutoHeightTransition show={state.isOpen}>
                    <FluxPane
                        className={expandableStyles.expandablePaneBody}
                        id={state.contentId}
                        role="region"
                        aria-labelledby={state.headerId}
                    >
                        {body !== undefined ? (
                            renderContent(body, state)
                        ) : (
                            <FluxPaneBody>{renderContent(children, state)}</FluxPaneBody>
                        )}
                    </FluxPane>
                </FluxAutoHeightTransition>
            </FluxLayerPane>
        );
    }
);

export function FluxReadMore({
    children,
    className,
    defaultExpanded = false,
    isExpanded,
    labelLess,
    labelMore,
    lines = 3,
    onExpandedChange,
    toggle: renderToggle,
    ...props
}: HTMLAttributes<HTMLDivElement> & {
    defaultExpanded?: boolean;
    isExpanded?: boolean;
    labelLess?: string;
    labelMore?: string;
    lines?: number;
    onExpandedChange?: (expanded: boolean) => void;
    toggle?: (state: {contentId: string; isExpanded: boolean; toggle(): void}) => ReactNode;
}) {
    const translate = useFluxTranslate();
    labelLess ??= translate('flux.readLess');
    labelMore ??= translate('flux.readMore');

    const id = useId();
    const ref = useRef<HTMLDivElement>(null);
    const animation = useRef<Animation | null>(null);
    const [local, setLocal] = useState(defaultExpanded);
    const expanded = isExpanded ?? local;
    const previous = useRef(expanded);
    const [overflowing, setOverflowing] = useState(false);
    const [animating, setAnimating] = useState(false);
    const clamped = !expanded && !animating;
    const toggle = () => {
        setLocal(!expanded);
        onExpandedChange?.(!expanded);
    };
    useLayoutEffect(() => {
        const node = ref.current;
        if (!node) return;
        const measure = () => {
            if (expanded || animation.current) return;
            const collapsed = node.clientHeight;
            node.style.setProperty('-webkit-line-clamp', 'unset');
            const full = node.scrollHeight;
            node.style.removeProperty('-webkit-line-clamp');
            setOverflowing(full - collapsed > 1);
        };
        measure();
        const resize = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(measure);
        resize?.observe(node);
        const mutation = new MutationObserver(measure);
        mutation.observe(node, {characterData: true, childList: true, subtree: true});
        return () => {
            resize?.disconnect();
            mutation.disconnect();
        };
    }, [children, expanded, lines, animating]);
    useLayoutEffect(() => {
        const node = ref.current;
        if (!node || previous.current === expanded) return;
        const wasExpanded = previous.current;
        previous.current = expanded;
        node.classList.toggle(readMoreStyles.isClamped, !wasExpanded);
        const from = node.getBoundingClientRect().height;
        animation.current?.cancel();
        node.classList.add(readMoreStyles.isClamped);
        const collapsed = node.getBoundingClientRect().height;
        node.classList.remove(readMoreStyles.isClamped);
        const full = node.getBoundingClientRect().height;
        const to = expanded ? full : collapsed;
        if (!node.animate || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
            node.classList.toggle(readMoreStyles.isClamped, !expanded);
            setAnimating(false);
            return;
        }
        setAnimating(true);
        node.style.height = `${to}px`;
        node.style.overflow = 'hidden';
        const current = node.animate(
            {height: [`${from}px`, `${to}px`]},
            {duration: 300, easing: 'cubic-bezier(.55, 0, .1, 1)'}
        );
        animation.current = current;
        current.finished
            .then(() => {
                if (animation.current !== current) return;
                animation.current = null;
                node.style.removeProperty('height');
                node.style.removeProperty('overflow');
                setAnimating(false);
            })
            .catch(() => undefined);
    }, [expanded]);
    useLayoutEffect(
        () => () => {
            animation.current?.cancel();
        },
        []
    );
    const hasToggle = overflowing || expanded;
    return (
        <div {...props} className={clsx(readMoreStyles.readMore, className)}>
            <div
                ref={ref}
                id={id}
                className={clsx(
                    readMoreStyles.readMoreContent,
                    clamped && readMoreStyles.isClamped,
                    hasToggle && !expanded && readMoreStyles.isFaded
                )}
                style={{'--lines': lines} as FluxStyle}
            >
                {children}
            </div>
            {hasToggle &&
                (renderToggle ? (
                    renderToggle({contentId: id, isExpanded: expanded, toggle})
                ) : (
                    <button
                        className={readMoreStyles.readMoreToggle}
                        type="button"
                        aria-controls={id}
                        aria-expanded={expanded}
                        onClick={toggle}
                    >
                        {expanded ? labelLess : labelMore}
                    </button>
                ))}
        </div>
    );
}
