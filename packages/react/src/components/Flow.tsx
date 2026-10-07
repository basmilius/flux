import {createTranslate} from '../i18n';
import {FluxFlyout} from './Overlays';
import {FluxMenu, FluxMenuGroup, FluxMenuItem} from './Menus';
import {FluxSeparator} from './Layout';
import {english as flowEnglish} from './FlowUtilities';
import {useFlowLabels} from './flow/labels';
import {useFlowGestures} from './flow/gestures';
import { clsx } from 'clsx';
import { Children, createContext, forwardRef, Fragment, isValidElement, useCallback, useContext, useEffect, useId, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import type { CSSProperties, HTMLAttributes, KeyboardEvent, PointerEvent, ReactElement, ReactNode, WheelEvent } from 'react';
import { createPortal } from 'react-dom';
import type { FluxColor, FluxIconName, FluxStyle } from '../types';
import { FluxButtonGroup, FluxButtonStack, FluxSecondaryButton } from './Actions';
import { FluxBoxedIcon } from './DisplayExtended';
import { FluxBadge, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader } from './Display';
import { FluxSpinner } from './Feedback';
import { FluxIcon } from './Icon';
import { LABELLED_GAP, FluxFlowEdgeLayerInjectionKey, anchorPoint, autoSides, boundsOfNodes, collectObstacles, flowColor, getBezierPath, getSelfLoopPath, getSmoothStepPath, getStepPath, getStraightPath, markerPath, offsetPoint, portPoint, portSide, routeAvoid, selfLoopPoints, useFlowLayout, useFlowTrunkLayout } from './FlowUtilities';
import type { FluxFlowAlign, FluxFlowBounds, FluxFlowConnectionType, FluxFlowController, FluxFlowDirection, FluxFlowEdgeRecord, FluxFlowEdgeSpec, FluxFlowLabelPlacement, FluxFlowMarker, FluxFlowMarkerFill, FluxFlowNodeContext, FluxFlowNodeRecord, FluxFlowPanelPosition, FluxFlowPlacementContext, FluxFlowPlacementLink, FluxFlowPortRegistration, FluxFlowPortRecord, FluxFlowPosition, FluxFlowSide, FluxFlowViewport } from './FlowUtilities';
import flowStyles from '../../../flow/src/css/component/Flow.module.scss';
import cardStyles from '../../../flow/src/css/component/FlowCard.module.scss';
import connectionStyles from '../../../flow/src/css/component/FlowConnection.module.scss';
import controlsStyles from '../../../flow/src/css/component/FlowControls.module.scss';
import gateStyles from '../../../flow/src/css/component/FlowGate.module.scss';
import groupStyles from '../../../flow/src/css/component/FlowGroup.module.scss';
import iconStyles from '../../../flow/src/css/component/FlowIcon.module.scss';
import junctionStyles from '../../../flow/src/css/component/FlowJunction.module.scss';
import laneStyles from '../../../flow/src/css/component/FlowLane.module.scss';
import minimapStyles from '../../../flow/src/css/component/FlowMinimap.module.scss';
import nodeStyles from '../../../flow/src/css/component/FlowNode.module.scss';
import noteStyles from '../../../flow/src/css/component/FlowNote.module.scss';
import panelStyles from '../../../flow/src/css/component/FlowPanel.module.scss';
import pillStyles from '../../../flow/src/css/component/FlowPill.module.scss';
import portStyles from '../../../flow/src/css/component/FlowPort.module.scss';
import stepStyles from '../../../flow/src/css/component/FlowStep.module.scss';
import terminalStyles from '../../../flow/src/css/component/FlowTerminal.module.scss';

interface InternalController extends FluxFlowController {
    subscribe(listener: () => void): () => void;
    getVersion(): number;
    setClipElement(element: HTMLElement | null): void;
    setBackdropElement(element: HTMLElement | null): void;
    setForegroundElement(element: HTMLElement | null): void;
    setOverlayElement(element: HTMLElement | null): void;
    updateOptions(options: ControllerOptions): void;
}
interface ControllerOptions {
    axis?: FluxFlowDirection;
    interactive: boolean;
    minZoom: number;
    maxZoom: number;
    zoomStep: number;
    padding: number;
    onViewportChange?: (viewport: FluxFlowViewport) => void;
}

function createFlowController(initial: ControllerOptions): InternalController {
    let options = initial,
        viewport: FluxFlowViewport = { x: 0, y: 0, zoom: 1 },
        tracking = false,
        clip: HTMLElement | null = null,
        backdrop: HTMLElement | null = null,
        foreground: HTMLElement | null = null,
        overlay: HTMLElement | null = null,
        version = 0;
    const nodes = new Map<string, FluxFlowNodeRecord>(),
        edges = new Map<string | number, FluxFlowEdgeRecord>(),
        boxes = new Map<string | number, { id: string | number; bounds: FluxFlowBounds | null }>(),
        listeners = new Set<() => void>(),
        emit = () => {
            version++;
            listeners.forEach((listener) => listener());
        },
        clampZoom = (zoom: number) => Math.min(options.maxZoom, Math.max(options.minZoom, zoom));
    const allBounds = (): FluxFlowBounds | null => {
        const nodeBounds = boundsOfNodes(nodes.values()),
            values = [...boxes.values()].flatMap((box) => (box.bounds ? [box.bounds] : []));
        edges.forEach((edge) => edge.spec?.waypoints.forEach((point) => values.push({ minX: point.x, minY: point.y, maxX: point.x, maxY: point.y })));
        if (nodeBounds) values.push(nodeBounds);
        return values.length ? { minX: Math.min(...values.map((value) => value.minX)), minY: Math.min(...values.map((value) => value.minY)), maxX: Math.max(...values.map((value) => value.maxX)), maxY: Math.max(...values.map((value) => value.maxY)) } : null;
    };
    const controller: InternalController = {
        get viewport() {
            return viewport;
        },
        get axis() {
            return options.axis;
        },
        get isStatic() {
            return !options.interactive;
        },
        get minZoom() {
            return options.minZoom;
        },
        get maxZoom() {
            return options.maxZoom;
        },
        get isTracking() {
            return tracking;
        },
        get nodes() {
            return nodes;
        },
        get edges() {
            return edges;
        },
        get boxes() {
            return boxes;
        },
        get bounds() {
            return allBounds();
        },
        get nodeBounds() {
            return boundsOfNodes(nodes.values());
        },
        get clipElement() {
            return clip;
        },
        get backdropElement() {
            return backdrop;
        },
        get foregroundElement() {
            return foreground;
        },
        get overlayElement() {
            return overlay;
        },
        subscribe(listener) {
            listeners.add(listener);
            return () => listeners.delete(listener);
        },
        getVersion() {
            return version;
        },
        updateOptions(next) {
            options = next;
        },
        registerNode(record) {
            nodes.set(record.id, record);
            emit();
        },
        unregisterNode(id) {
            if (nodes.delete(id)) emit();
        },
        getNode(id) {
            return nodes.get(id);
        },
        registerEdge(record) {
            edges.set(record.id, record);
            emit();
        },
        unregisterEdge(id) {
            if (edges.delete(id)) emit();
        },
        registerBox(record) {
            boxes.set(record.id, record);
            emit();
        },
        unregisterBox(id) {
            if (boxes.delete(id)) emit();
        },
        setClipElement(element) {
            clip = element;
            emit();
        },
        setBackdropElement(element) {
            backdrop = element;
            emit();
        },
        setForegroundElement(element) {
            foreground = element;
            emit();
        },
        setOverlayElement(element) {
            overlay = element;
            emit();
        },
        setTracking(value) {
            if (tracking === value) return;
            tracking = value;
            emit();
        },
        screenToFlow(clientX, clientY) {
            const rect = clip?.getBoundingClientRect();
            return { x: (clientX - (rect?.left ?? 0) - viewport.x) / viewport.zoom, y: (clientY - (rect?.top ?? 0) - viewport.y) / viewport.zoom };
        },
        flowToScreen(x, y) {
            const rect = clip?.getBoundingClientRect();
            return { x: (rect?.left ?? 0) + viewport.x + x * viewport.zoom, y: (rect?.top ?? 0) + viewport.y + y * viewport.zoom };
        },
        panBy(dx, dy) {
            controller.setViewport({ ...viewport, x: viewport.x + dx, y: viewport.y + dy });
        },
        panBounded(dx, dy) {
            const rect = clip?.getBoundingClientRect();
            const box = controller.bounds;
            if (!rect || !box) return {x: 0, y: 0};
            const axis = (value: number, delta: number, min: number, max: number, extent: number) => {
                const start = -min * viewport.zoom, end = extent - max * viewport.zoom;
                return Math.min(Math.max(start, end) + 300, Math.max(Math.min(start, end) - 300, value + delta));
            };
            const x = axis(viewport.x, dx, box.minX, box.maxX, rect.width);
            const y = axis(viewport.y, dy, box.minY, box.maxY, rect.height);
            const delta = {x: x - viewport.x, y: y - viewport.y};
            if (delta.x || delta.y) controller.setViewport({...viewport, x, y});
            return delta;
        },
        zoomAt(clientX, clientY, factor) {
            const next = clampZoom(viewport.zoom * factor),
                point = controller.screenToFlow(clientX, clientY),
                rect = clip?.getBoundingClientRect();
            controller.setViewport({ x: clientX - (rect?.left ?? 0) - point.x * next, y: clientY - (rect?.top ?? 0) - point.y * next, zoom: next });
        },
        zoomIn() {
            controller.zoomTo(viewport.zoom * (1 + options.zoomStep));
        },
        zoomOut() {
            controller.zoomTo(viewport.zoom / (1 + options.zoomStep));
        },
        zoomTo(zoom) {
            const rect = clip?.getBoundingClientRect(),
                cx = (rect?.left ?? 0) + (rect?.width ?? 0) / 2,
                cy = (rect?.top ?? 0) + (rect?.height ?? 0) / 2;
            controller.zoomAt(cx, cy, clampZoom(zoom) / viewport.zoom);
        },
        resetZoom() {
            controller.fitView();
        },
        fitView(padding = options.padding) {
            const bounds = controller.bounds,
                rect = clip?.getBoundingClientRect();
            if (!bounds || !rect) {controller.setViewport({x: 0, y: 0, zoom: 1}); return;}
            const zoom = clampZoom(Math.min(Math.max(rect.width - padding * 2, 1) / Math.max(bounds.maxX - bounds.minX, 1), Math.max(rect.height - padding * 2, 1) / Math.max(bounds.maxY - bounds.minY, 1), 1));
            controller.setViewport({ x: (rect.width - (bounds.maxX - bounds.minX) * zoom) / 2 - bounds.minX * zoom, y: (rect.height - (bounds.maxY - bounds.minY) * zoom) / 2 - bounds.minY * zoom, zoom });
        },
        centerView(zoom) {
            const bounds = controller.bounds,
                rect = clip?.getBoundingClientRect(),
                next = clampZoom(zoom);
            if (!bounds || !rect) return;
            controller.setViewport({ x: rect.width / 2 - ((bounds.minX + bounds.maxX) / 2) * next, y: rect.height / 2 - ((bounds.minY + bounds.maxY) / 2) * next, zoom: next });
        },
        setViewport(next) {
            viewport = { ...next, zoom: clampZoom(next.zoom) };
            options.onViewportChange?.(viewport);
            emit();
        }
    };
    return controller;
}

const FlowContext = createContext<InternalController | null>(null),
    NodeContext = createContext<FluxFlowNodeContext | null>(null),
    PlacementContext = createContext<FluxFlowPlacementContext | null>(null);

export function useFlowInjection(): FluxFlowController {
    const controller = useContext(FlowContext);
    if (!controller) throw new Error('Flow components must be used within a <FluxFlow>.');
    useSyncExternalStore(controller.subscribe, controller.getVersion, controller.getVersion);
    return controller;
}
function useInternalFlow(): InternalController {
    const controller = useContext(FlowContext);
    if (!controller) throw new Error('Flow components must be used within a <FluxFlow>.');
    useSyncExternalStore(controller.subscribe, controller.getVersion, controller.getVersion);
    return controller;
}

export interface FluxFlowHandle {
    readonly controller: FluxFlowController;
    fitView(padding?: number): void;
    centerView(zoom: number): void;
    zoomIn(): void;
    zoomOut(): void;
    zoomTo(zoom: number): void;
    resetZoom(): void;
}
export interface FluxFlowProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    align?: 'start' | 'center';
    axis?: FluxFlowDirection;
    background?: 'dots' | 'grid' | 'none';
    interactive?: boolean;
    start?: string;
    padding?: number;
    minZoom?: number;
    maxZoom?: number;
    zoomStep?: number;
    gridSize?: number;
    viewport?: FluxFlowViewport;
    defaultViewport?: FluxFlowViewport;
    onViewportChange?: (viewport: FluxFlowViewport) => void;
}
export const FluxFlow = forwardRef<FluxFlowHandle, FluxFlowProps>(function FluxFlow({ align = 'center', axis, background = 'none', children, className, defaultViewport, gridSize = 24, interactive = false, maxZoom = 2, minZoom = 0.4, onViewportChange, padding = 0, start, style, viewport, zoomStep = 0.2, ...props }, ref) {
    const [controller] = useState(() => createFlowController({ axis, interactive, minZoom, maxZoom, zoomStep, padding, onViewportChange })),
        clip = useRef<HTMLDivElement>(null),
        backdrop = useRef<HTMLDivElement>(null),
        foreground = useRef<HTMLDivElement>(null),
        overlay = useRef<HTMLDivElement>(null),
        version = useSyncExternalStore(controller.subscribe, controller.getVersion, controller.getVersion),
        dragging = useRef<{ x: number; y: number } | null>(null),
        edgeLayer = useContext(FluxFlowEdgeLayerInjectionKey);
    controller.updateOptions({ axis, interactive, minZoom, maxZoom, zoomStep, padding, onViewportChange });
    useLayoutEffect(() => {
        controller.setClipElement(clip.current);
        controller.setBackdropElement(backdrop.current);
        controller.setForegroundElement(foreground.current);
        controller.setOverlayElement(overlay.current);
        controller.setViewport(viewport ?? defaultViewport ?? controller.viewport);
        return () => {
            controller.setClipElement(null);
            controller.setBackdropElement(null);
            controller.setForegroundElement(null);
            controller.setOverlayElement(null);
        };
    }, []);
    useEffect(() => {
        if (viewport && (viewport.x !== controller.viewport.x || viewport.y !== controller.viewport.y || viewport.zoom !== controller.viewport.zoom)) controller.setViewport(viewport);
    }, [viewport?.x, viewport?.y, viewport?.zoom]);
    const [isReady, setReady] = useState(false);
    const isPanning = useFlowGestures(clip, controller, interactive, zoomStep);
    useEffect(() => {
        if (!interactive) return;
        let frame = 0;
        if (viewport || defaultViewport) frame = requestAnimationFrame(() => setReady(true));
        else frame = requestAnimationFrame(() => {frame = requestAnimationFrame(() => {
            const node = start ? controller.getNode(start) : undefined;
            const rect = clip.current?.getBoundingClientRect();
            const bounds = controller.bounds;
            if (node && rect) controller.setViewport({x: rect.width / 2 - node.position.x - node.size.width / 2, y: rect.height / 2 - node.position.y - node.size.height / 2, zoom: 1});
            else if (bounds) {
                const spare = rect ? rect.width - (bounds.maxX - bounds.minX) : 0;
                controller.setViewport({x: (align === 'center' ? Math.max(spare / 2, padding) : padding) - bounds.minX, y: padding - bounds.minY, zoom: 1});
            }
            frame = requestAnimationFrame(() => setReady(true));
        });});
        return () => cancelAnimationFrame(frame);
    }, [interactive, start]);
    const handle = useMemo<FluxFlowHandle>(() => ({ controller, fitView: controller.fitView, centerView: controller.centerView, zoomIn: controller.zoomIn, zoomOut: controller.zoomOut, zoomTo: controller.zoomTo, resetZoom: controller.resetZoom }), [controller]);
    useLayoutEffect(() => {
        if (typeof ref === 'function') ref(handle);
        else if (ref) ref.current = handle;
        return () => {
            if (typeof ref === 'function') ref(null);
            else if (ref) ref.current = null;
        };
    }, [handle, ref]);
    const [hoveredEdge, setHoveredEdge] = useState<string | number | null>(null);
    const labelsRef = useRef<HTMLDivElement>(null);
    const maskId = useId();
    const bounds = controller.bounds,
        worldStyle: CSSProperties = interactive ? { transform: `translate(${controller.viewport.x}px, ${controller.viewport.y}px) scale(${controller.viewport.zoom})`, transition: isReady && !controller.isTracking ? 'transform 210ms var(--swift-out)' : 'none' } : bounds ? { position: 'relative', width: Math.ceil(bounds.maxX - bounds.minX + padding * 2), height: Math.ceil(bounds.maxY - bounds.minY + padding * 2), transform: `translate(${padding - bounds.minX}px, ${padding - bounds.minY}px)` } : { position: 'relative' },
        edges = [...controller.edges.values()].filter((edge): edge is FluxFlowEdgeRecord & { spec: FluxFlowEdgeSpec } => Boolean(edge.spec)).sort((a, b) => (a.id === hoveredEdge ? 2 : Number(a.spec.isColored)) - (b.id === hoveredEdge ? 2 : Number(b.spec.isColored)));
    const labelBoxes = useFlowLabels(labelsRef, edges);
    const keyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (!interactive || event.target !== event.currentTarget) return;
        const amount = event.shiftKey ? 135 : 45;
        if (event.key === '+' || event.key === '=') controller.zoomIn();
        else if (event.key === '-') controller.zoomOut();
        else if (event.key === '0') controller.fitView();
        else if (event.key === 'ArrowLeft') controller.panBounded(amount, 0);
        else if (event.key === 'ArrowRight') controller.panBounded(-amount, 0);
        else if (event.key === 'ArrowUp') controller.panBounded(0, amount);
        else if (event.key === 'ArrowDown') controller.panBounded(0, -amount);
        else return;
        event.preventDefault();
    };
    void version;
    return (
        <FlowContext.Provider value={controller}>
            <div {...props} ref={clip} className={clsx(flowStyles.flow, interactive && flowStyles.isInteractive, isPanning && flowStyles.isPanning, className)} style={{ ...style, height: interactive ? '100%' : style?.height }} tabIndex={interactive ? (props.tabIndex ?? 0) : props.tabIndex} onKeyDown={keyDown}>
                {background !== 'none' && <div className={clsx(flowStyles.flowBackground, background === 'dots' ? flowStyles.flowBackgroundDots : flowStyles.flowBackgroundGrid)} style={{ backgroundSize: `${gridSize}px ${gridSize}px`, backgroundPosition: interactive ? `${controller.viewport.x}px ${controller.viewport.y}px` : '0 0' }} />}
                <div className={flowStyles.flowScroll} style={interactive ? { height: '100%', overflow: 'hidden' } : { display: 'flex', justifyContent: 'safe center', overflowX: 'auto', overflowY: 'hidden' }}>
                    <div className={flowStyles.flowWorld} style={worldStyle}>
                        <svg className={flowStyles.flowEdgesHit} aria-hidden="true">{edges.map(edge => <path key={edge.id} className={connectionStyles.flowConnectionHit} d={edge.spec.path} onPointerEnter={() => setHoveredEdge(edge.id)} onPointerLeave={() => setHoveredEdge(null)}/>)}</svg>
                        <div ref={backdrop} className={flowStyles.flowBackdrop} />
                        {children}
                        <svg className={clsx(flowStyles.flowEdges, edgeLayer === 'under' && flowStyles.isUnder)} aria-hidden="true">
                            <defs>{labelBoxes.length > 0 && <mask id={maskId} maskUnits="userSpaceOnUse" x={-99999} y={-99999} width={199998} height={199998}>
                                <rect x={-99999} y={-99999} width={199998} height={199998} fill="#fff"/>
                                {labelBoxes.map(box => <rect key={box.id} x={box.x} y={box.y} width={box.width} height={box.height} rx={box.height / 2} fill="#000"/>)}
                            </mask>}</defs>
                            {edges.map((edge) => (
                                <g key={edge.id} className={clsx(connectionStyles.flowConnectionGroup, !edge.spec.isColored && connectionStyles.isNeutral, edge.id === hoveredEdge && connectionStyles.isHovered)} style={edge.spec.styleVars as CSSProperties} mask={labelBoxes.length ? `url(#${maskId})` : undefined}>
                                    <path className={clsx(connectionStyles.flowConnectionLine, edge.spec.animated && connectionStyles.isAnimated, edge.spec.dashed && connectionStyles.isDashed, edge.spec.dotted && connectionStyles.isDotted)} d={edge.spec.path} />
                                    {edge.spec.hasProgress && <path className={connectionStyles.flowConnectionProgress} d={edge.spec.path} pathLength={1} />}
                                    {edge.spec.fromMarkerPath && <path className={clsx(connectionStyles[`flowConnectionMarker${capitalize(edge.spec.fromMarkerFill)}`], edge.spec.fromActive && connectionStyles.isActive)} d={edge.spec.fromMarkerPath} />}
                                    {edge.spec.toMarkerPath && <path className={clsx(connectionStyles[`flowConnectionMarker${capitalize(edge.spec.toMarkerFill)}`], edge.spec.toActive && connectionStyles.isActive)} d={edge.spec.toMarkerPath} />}
                                </g>
                            ))}
                        </svg>
                        <div ref={foreground} className={flowStyles.flowForeground} />
                        <div ref={labelsRef} className={flowStyles.flowEdgeLabels}>
                            {edges
                                .filter((edge) => edge.spec.label || edge.spec.icon)
                                .map((edge) => (
                                    <FluxBadge data-flow-edge={edge.id} key={edge.id} className={clsx(connectionStyles.flowConnectionBadge, !edge.spec.label && connectionStyles.isBare)} style={{ ...edge.spec.styleVars, left: edge.spec.labelX, top: edge.spec.labelY } as FluxStyle} icon={edge.spec.icon} label={edge.spec.label ?? ''} />
                                ))}
                        </div>
                    </div>
                </div>
                <div ref={overlay} className={flowStyles.flowOverlay} />
            </div>
        </FlowContext.Provider>
    );
});

export interface FluxFlowNodeProps extends HTMLAttributes<HTMLDivElement> {
    id: string;
    x?: number;
    y?: number;
}
export const FluxFlowNode = forwardRef<HTMLDivElement, FluxFlowNodeProps>(function FluxFlowNode({ children, className, id, style, x, y, ...props }, forwardedRef) {
    const controller = useInternalFlow(),
        placement = useContext(PlacementContext),
        element = useRef<HTMLDivElement>(null),
        registrations = useRef(new Map<string, FluxFlowPortRegistration>()),
        [measurement, setMeasurement] = useState<{ size: { width: number; height: number }; anchor: FluxFlowPosition | null; ports: ReadonlyMap<string, FluxFlowPortRecord> }>({ size: { width: 0, height: 0 }, anchor: null, ports: new Map() }),
        position = x === undefined && y === undefined ? (placement?.positionOf(id) ?? { x: 0, y: 0 }) : { x: x ?? 0, y: y ?? 0 };
    const measure = () => {
        const node = element.current;
        if (!node) return;
        const rect = node.getBoundingClientRect(),
            zoom = node.offsetWidth ? rect.width / node.offsetWidth : 1,
            pointOf = (target: Element) => {
                const targetRect = target.getBoundingClientRect();
                return { x: (targetRect.left + targetRect.width / 2 - rect.left) / (zoom || 1), y: (targetRect.top + targetRect.height / 2 - rect.top) / (zoom || 1) };
            },
            anchorElement = node.querySelector('[data-flow-anchor]'),
            ports = new Map<string, FluxFlowPortRecord>();
        registrations.current.forEach((registration) => {
            if (registration.element.current) ports.set(registration.id, { id: registration.id, side: registration.side, offset: pointOf(registration.element.current) });
        });
        setMeasurement({ size: { width: node.offsetWidth || 300, height: node.offsetHeight || 90 }, anchor: anchorElement ? pointOf(anchorElement) : null, ports });
    };
    useLayoutEffect(() => {
        const node = element.current;
        if (!node) return;
        measure();
        const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
        observer?.observe(node);
        return () => observer?.disconnect();
    }, [children]);
    useLayoutEffect(() => {
        controller.registerNode({ id, position, size: measurement.size, element: element.current, anchor: measurement.anchor, ports: measurement.ports });
        return () => controller.unregisterNode(id);
    }, [controller, id, position.x, position.y, measurement]);
    useLayoutEffect(() => {
        const link: FluxFlowPlacementLink = {id, size: measurement.size, anchor: measurement.anchor};
        if (x === undefined && y === undefined) placement?.registerLink?.(link);
        else placement?.unregisterLink?.(link);
    }, [id, measurement, placement?.registerLink, placement?.unregisterLink, x, y]);
    useLayoutEffect(() => () => placement?.unregisterLink?.({id, size: measurement.size, anchor: measurement.anchor}), [id, placement?.unregisterLink]);
    const nodeContext = useMemo<FluxFlowNodeContext>(
        () => ({
            registerPort(registration) {
                registrations.current.set(registration.id, registration);
                measure();
            },
            unregisterPort(portId) {
                registrations.current.delete(portId);
                measure();
            },
        }),
        [],
    );
    return (
        <NodeContext.Provider value={nodeContext}>
            <div
                {...props}
                ref={(value) => {
                    element.current = value;
                    if (typeof forwardedRef === 'function') forwardedRef(value);
                    else if (forwardedRef) forwardedRef.current = value;
                }}
                className={clsx(nodeStyles.flowNode, className)}
                style={{ ...style, transform: `translate(${position.x}px, ${position.y}px)` }}
            >
                {children}
            </div>
        </NodeContext.Provider>
    );
});

export interface FluxFlowConnectionProps {
    from: string;
    to: string;
    fromSide?: FluxFlowSide;
    toSide?: FluxFlowSide;
    fromAlign?: FluxFlowAlign;
    toAlign?: FluxFlowAlign;
    fromPort?: string;
    toPort?: string;
    waypoints?: readonly FluxFlowPosition[];
    type?: FluxFlowConnectionType;
    color?: FluxColor | string;
    label?: string;
    labelPlacement?: FluxFlowLabelPlacement;
    icon?: FluxIconName;
    animated?: boolean;
    dashed?: boolean;
    dotted?: boolean;
    markerStart?: FluxFlowMarker;
    markerEnd?: FluxFlowMarker;
    progressColor?: FluxColor | string;
    progressValue?: number;
}
export function FluxFlowConnection(props: FluxFlowConnectionProps) {
    const controller = useInternalFlow(),
        id = useId(),
        registered = useRef('');
    useLayoutEffect(() => () => controller.unregisterEdge(id), [controller, id]);
    useLayoutEffect(() => {
        const source = controller.getNode(props.from),
            target = controller.getNode(props.to);
        if (!source || !target) {
            if (registered.current) {
                controller.unregisterEdge(id);
                registered.current = '';
            }
            return;
        }
        const sourcePort = props.fromPort ? source.ports.get(props.fromPort) : undefined,
            targetPort = props.toPort ? target.ports.get(props.toPort) : undefined,
            [autoFrom, autoTo] = autoSides(source.position, source.size, target.position, target.size, controller.axis),
            fromSide = source.id === target.id ? props.fromSide ?? props.toSide ?? (controller.axis === 'horizontal' ? 'bottom' : 'right') : props.fromSide ?? (sourcePort ? portSide(sourcePort, source.size) : autoFrom),
            toSide = source.id === target.id ? props.toSide ?? props.fromSide ?? (controller.axis === 'horizontal' ? 'bottom' : 'right') : props.toSide ?? (targetPort ? portSide(targetPort, target.size) : autoTo);
        let from = sourcePort ? portPoint(source.position, source.size, fromSide, sourcePort.offset) : anchorPoint(source.position, source.size, fromSide, props.fromAlign, source.anchor),
            to = targetPort ? portPoint(target.position, target.size, toSide, targetPort.offset) : anchorPoint(target.position, target.size, toSide, props.toAlign, target.anchor),
            path,
            waypoints = [...(props.waypoints ?? [])];
        from = offsetPoint(from, fromSide, 9);
        to = offsetPoint(to, toSide, 9);
        if (source.id === target.id) {
            [from, to] = selfLoopPoints(source.position, source.size, fromSide, toSide);
            from = offsetPoint(from, fromSide, 9);
            to = offsetPoint(to, toSide, 9);
            const loop = getSelfLoopPath(from, fromSide, to, toSide, { minX: source.position.x - 9, minY: source.position.y - 9, maxX: source.position.x + source.size.width + 9, maxY: source.position.y + source.size.height + 9 });
            path = loop;
            waypoints = [...loop.points];
        } else if (props.type === 'straight') path = getStraightPath(from, to, waypoints, props.labelPlacement);
        else if (props.type === 'bezier') path = getBezierPath(from, fromSide, to, toSide, waypoints, props.labelPlacement);
        else if (!props.waypoints?.length) path = routeAvoid(from, fromSide, to, toSide, collectObstacles(controller.nodes.values(), props.from, props.to), props.labelPlacement, 15, props.type === 'step' ? 0 : 15);
        else path = props.type === 'step' ? getStepPath(from, fromSide, to, toSide, waypoints, props.labelPlacement) : getSmoothStepPath(from, fromSide, to, toSide, waypoints, props.labelPlacement);
        const fill = (marker: FluxFlowMarker): FluxFlowMarkerFill => (marker === 'arrow' ? 'solid' : marker === 'bar' || marker === 'chevron' || marker === 'none' ? 'stroke' : 'outline'),
            startMarker = props.markerStart ?? 'dot',
            endMarker = props.markerEnd ?? 'chevron',
            color = flowColor(props.color, 'var(--flow-line)'),
            themedColor = props.color && ['gray', 'primary', 'danger', 'info', 'success', 'warning'].includes(props.color),
            progress = Math.min(1, Math.max(0, props.progressValue ?? 0)),
            spec: FluxFlowEdgeSpec = { path: path.path, labelX: path.labelX, labelY: path.labelY, fromX: from.x, fromY: from.y, toX: to.x, toY: to.y, waypoints, styleVars: { '--connection-color': color, '--connection-marker': color, '--connection-progress-color': flowColor(props.progressColor, 'var(--primary-solid)'), '--connection-progress': String(progress), '--connection-badge-background': !props.color ? 'var(--gray-soft-hover)' : themedColor ? `var(--${props.color}-soft-hover)` : `color-mix(in oklab, ${props.color} 18%, var(--surface))`, '--connection-badge-foreground': !props.color ? 'var(--foreground-prominent)' : themedColor ? `var(--${props.color}-text)` : props.color }, animated: Boolean(props.animated), dashed: Boolean(props.dashed), dotted: Boolean(props.dotted), fromMarkerPath: markerPath(startMarker, from, path.fromDirection), fromMarkerFill: fill(startMarker), toMarkerPath: markerPath(endMarker, to, path.toDirection), toMarkerFill: fill(endMarker), fromActive: progress > 0, toActive: progress >= 1, hasProgress: props.progressValue !== undefined, isColored: Boolean(props.color), label: props.label, icon: props.icon };
        const signature = JSON.stringify(spec);
        if (signature !== registered.current) {
            registered.current = signature;
            controller.registerEdge({ id, spec });
        }
    }, [controller, id, controller.getVersion(), props.from, props.to, props.fromSide, props.toSide, props.fromAlign, props.toAlign, props.fromPort, props.toPort, props.waypoints, props.type, props.color, props.label, props.labelPlacement, props.icon, props.animated, props.dashed, props.dotted, props.markerStart, props.markerEnd, props.progressColor, props.progressValue]);
    return null;
}

function flatten(children: ReactNode): ReactElement[] {
    const result: ReactElement[] = [];
    Children.forEach(children, (child) => {
        if (!isValidElement(child)) return;
        result.push(child);
        if (child.type === Fragment) result.push(...flatten((child.props as { children?: ReactNode }).children));
    });
    return result;
}
export function FluxFlowGraph({ children, direction = 'vertical', indent, layerGap, nodeGap = 45, trunk, x = 0, y = 0 }: { children?: ReactNode; direction?: FluxFlowDirection; indent?: number; layerGap?: number; nodeGap?: number; trunk?: readonly string[]; x?: number; y?: number }) {
    const [links, setLinks] = useState<ReadonlyMap<string, FluxFlowPlacementLink>>(() => new Map());
    const registerLink = useCallback((link: FluxFlowPlacementLink) => setLinks(current => {
        const previous = current.get(link.id);
        if (previous?.size.width === link.size.width && previous.size.height === link.size.height && previous.anchor?.x === link.anchor?.x && previous.anchor?.y === link.anchor?.y) return current;
        return new Map(current).set(link.id, link);
    }), []);
    const unregisterLink = useCallback((link: FluxFlowPlacementLink) => setLinks(current => {
        if (!current.has(link.id)) return current;
        const next = new Map(current); next.delete(link.id); return next;
    }), []);
    const items = flatten(children),
        nodes = [...links.values()].map(link => ({id: link.id, ...link.size, anchor: link.anchor})),
        edges = items.filter((item) => item.type === FluxFlowConnection).map((item) => ({ from: String((item.props as FluxFlowConnectionProps).from), to: String((item.props as FluxFlowConnectionProps).to) })),
        labelled = items.some((item) => item.type === FluxFlowConnection && Boolean((item.props as FluxFlowConnectionProps).label || (item.props as FluxFlowConnectionProps).icon)),
        positions = trunk ? useFlowTrunkLayout(nodes, edges, trunk, { x, y, indent: indent ?? (labelled ? LABELLED_GAP.horizontal : 180), nodeGap, trunkGap: layerGap ?? 60 }).positions : useFlowLayout(nodes, edges, { x, y, direction, layerGap: layerGap ?? (labelled ? LABELLED_GAP[direction] : 60), nodeGap }).positions,
        placement = useMemo(() => ({positionOf: (id: string) => positions[id] ?? null, registerLink, unregisterLink}), [positions, registerLink, unregisterLink]);
    return <PlacementContext.Provider value={placement}>{children}</PlacementContext.Provider>;
}
export function FluxFlowChain({ align = 'center', autoConnect = true, children, direction = 'vertical', gap = 60, labelGap, x = 0, y = 0 }: { align?: FluxFlowAlign; autoConnect?: boolean; children?: ReactNode; direction?: FluxFlowDirection; gap?: number; labelGap?: number; x?: number; y?: number }) {
    const items = flatten(children),
        nodes = items.filter((item) => item.type === FluxFlowNode).map((item) => String((item.props as FluxFlowNodeProps).id)),
        claimed = new Map(
            items
                .filter((item) => item.type === FluxFlowConnection)
                .map((item) => {
                    const props = item.props as FluxFlowConnectionProps;
                    return [`${props.from} ${props.to}`, Boolean(props.label || props.icon)] as const;
                }),
        ),
        [links, setLinks] = useState<ReadonlyMap<string, FluxFlowPlacementLink>>(() => new Map()),
        registerLink = useCallback((link: FluxFlowPlacementLink) => setLinks(current => {
            const previous = current.get(link.id);
            if (previous?.size.width === link.size.width && previous.size.height === link.size.height && previous.anchor?.x === link.anchor?.x && previous.anchor?.y === link.anchor?.y) return current;
            const next = new Map(current); next.set(link.id, link); return next;
        }), []),
        unregisterLink = useCallback((link: FluxFlowPlacementLink) => setLinks(current => {
            if (!current.has(link.id)) return current;
            const next = new Map(current); next.delete(link.id); return next;
        }), []),
        positions = useMemo(() => {
            const sizes = nodes.map(id => links.get(id)?.size ?? {width: 300, height: 90}),
                crossExtent = Math.max(0, ...sizes.map(size => direction === 'vertical' ? size.width : size.height)),
                result: Record<string, FluxFlowPosition> = {};
            let main = direction === 'vertical' ? y : x;
            nodes.forEach((id, index) => {
                const size = sizes[index], extent = direction === 'vertical' ? size.width : size.height,
                    cross = align === 'start' ? 0 : align === 'end' ? crossExtent - extent : (crossExtent - extent) / 2;
                result[id] = direction === 'vertical' ? {x: x + cross, y: main} : {x: main, y: y + cross};
                if (index < nodes.length - 1) {
                    const labelledGap = claimed.get(`${id} ${nodes[index + 1]}`) ? (labelGap ?? LABELLED_GAP[direction]) : gap;
                    main += (direction === 'vertical' ? size.height : size.width) + Math.max(gap, labelledGap);
                }
            });
            return result;
        }, [align, claimed, direction, gap, labelGap, links, nodes, x, y]);
    const placement = useMemo(() => ({ positionOf: (id: string) => positions[id] ?? null, registerLink, unregisterLink }), [positions, registerLink, unregisterLink]),
        automatic = autoConnect ? nodes.slice(1).flatMap((to, index) => (claimed.has(`${nodes[index]} ${to}`) ? [] : [<FluxFlowConnection key={`${nodes[index]} ${to}`} from={nodes[index]} to={to} />])) : [];
    return (
        <PlacementContext.Provider value={placement}>
            {children}
            {automatic}
        </PlacementContext.Provider>
    );
}

export interface FluxFlowCardProps extends HTMLAttributes<HTMLDivElement> {
    active?: boolean;
    color?: FluxColor;
    footer?: ReactNode;
    header?: ReactNode;
    icon?: FluxIconName;
    isLoading?: boolean;
    label?: string;
    subtitle?: string;
    title?: string;
    variant?: 'default' | 'trigger' | 'condition' | 'action';
}
const VARIANTS = { default: { color: 'gray', icon: 'circle-dot', label: 'Step' }, trigger: { color: 'info', icon: 'bolt', label: 'Trigger' }, condition: { color: 'warning', icon: 'code-branch', label: 'Condition' }, action: { color: 'primary', icon: 'play', label: 'Action' } } as const;
export function FluxFlowCard({ active, children, className, color, footer, header, icon, isLoading, label, subtitle, title, variant = 'default', ...props }: FluxFlowCardProps) {
    const defaults = VARIANTS[variant];
    return (
        <FluxPane {...props} className={clsx(cardStyles.flowCardSurface, active && cardStyles.isActive, className)}>
            <FluxPaneHeader className={cardStyles.flowCardHeader} title={title ?? label ?? defaults.label} subtitle={subtitle} before={<FluxFlowIcon color={color ?? defaults.color} name={icon ?? defaults.icon} isLoading={isLoading} />} after={header} />
            {children && <FluxPaneBody className={cardStyles.flowCardBody}>{children}</FluxPaneBody>}
            {footer && <FluxPaneFooter className={cardStyles.flowCardFooter}>{footer}</FluxPaneFooter>}
        </FluxPane>
    );
}
type VariantCardProps = Omit<FluxFlowCardProps, 'variant'>;
export function FluxFlowActionCard(props: VariantCardProps) {
    return <FluxFlowCard {...props} variant="action" />;
}
export function FluxFlowConditionCard(props: VariantCardProps) {
    return <FluxFlowCard {...props} variant="condition" />;
}
export function FluxFlowTriggerCard(props: VariantCardProps) {
    return <FluxFlowCard {...props} variant="trigger" />;
}
export function FluxFlowIcon({ color, isLoading, name }: { color?: FluxColor; isLoading?: boolean; name: FluxIconName }) {
    return isLoading ? <FluxSpinner data-flow-anchor className={iconStyles.flowIconSpinner} data-color={color} /> : <FluxBoxedIcon data-flow-anchor rounded color={color} name={name} size={30} />;
}
export function FluxFlowGate({ color, type }: { color?: FluxColor; type: 'and' | 'or' | 'xor' }) {
    return (
        <div data-flow-anchor className={gateStyles.flowGate} data-color={color}>
            <span>{type.toUpperCase()}</span>
        </div>
    );
}
export function FluxFlowJunction({ color }: { color?: FluxColor }) {
    return <div data-flow-anchor className={junctionStyles.flowJunction} data-color={color} />;
}
export function FluxFlowNote({ children, color, title }: { children?: ReactNode; color?: FluxColor; title?: string }) {
    return (
        <div data-flow-anchor className={noteStyles.flowNote} data-color={color}>
            {title && <strong>{title}</strong>}
            {children}
        </div>
    );
}
export function FluxFlowPill({ color, icon, isLoading, label }: { color?: FluxColor; icon: FluxIconName; isLoading?: boolean; label: string }) {
    return (
        <div className={pillStyles.flowPill}>
            <FluxFlowIcon color={color} name={icon} isLoading={isLoading} />
            <span>{label}</span>
        </div>
    );
}
export function FluxFlowStep({ value }: { value: number | string }) {
    return <div className={stepStyles.flowStep}>{value}</div>;
}
export function FluxFlowTerminal({ color, icon, label }: { color?: FluxColor; icon?: FluxIconName; label: string }) {
    return (
        <div data-flow-anchor className={terminalStyles.flowTerminal} data-color={color}>
            {icon && <FluxIcon name={icon} size={15} />}
            <span>{label}</span>
        </div>
    );
}
export const FluxFlowPort = forwardRef<HTMLSpanElement, { id: string; side?: FluxFlowSide }>(function FluxFlowPort({ id, side }, forwardedRef) {
    const node = useContext(NodeContext),
        element = useRef<HTMLSpanElement>(null);
    if (!node) throw new Error('<FluxFlowPort> must be used within a <FluxFlowNode>.');
    useLayoutEffect(() => {
        const registration = { id, side, element: element as React.MutableRefObject<HTMLElement | null> };
        node.registerPort(registration);
        return () => node.unregisterPort(id);
    }, [node, id, side]);
    return (
        <span
            ref={(value) => {
                element.current = value;
                if (typeof forwardedRef === 'function') forwardedRef(value);
                else if (forwardedRef) forwardedRef.current = value;
            }}
            className={portStyles.flowPort}
        />
    );
});

export function FluxFlowPanel({ children, offset = 15, position = 'bottom-right' }: { children?: ReactNode; offset?: number; position?: FluxFlowPanelPosition }) {
    const controller = useInternalFlow(),
        overlay = controller.overlayElement,
        style = { [position.startsWith('top') ? 'top' : 'bottom']: offset, [position.endsWith('left') ? 'left' : 'right']: offset } as CSSProperties;
    return overlay
        ? createPortal(
              <div data-nopan className={panelStyles.flowPanel} style={style}>
                  {children}
              </div>,
              overlay,
          )
        : null;
}
const useFlowTranslate = createTranslate(flowEnglish);
export function FluxFlowControls({exitFullscreenLabel, fitLabel, fullscreenLabel, offset, position, zoomInLabel, zoomLabel, zoomOutLabel}: {exitFullscreenLabel?: string; fitLabel?: string; fullscreenLabel?: string; offset?: number; position?: FluxFlowPanelPosition; zoomInLabel?: string; zoomLabel?: string; zoomOutLabel?: string}) {
    const controller = useInternalFlow();
    const translate = useFlowTranslate();
    const [fullscreen, setFullscreen] = useState(false);
    const [fullscreenAvailable, setFullscreenAvailable] = useState(false);
    useEffect(() => {
        setFullscreenAvailable(document.fullscreenEnabled);
        const update = () => setFullscreen(Boolean(controller.clipElement) && document.fullscreenElement === controller.clipElement);
        document.addEventListener('fullscreenchange', update);
        return () => document.removeEventListener('fullscreenchange', update);
    }, [controller]);
    if (controller.isStatic) return null;
    const percentage = Math.round(controller.viewport.zoom * 100);
    const presets = [2, 1.5, 1, 0.75, 0.5].filter(zoom => zoom >= controller.minZoom && zoom <= controller.maxZoom);
    return <FluxFlowPanel offset={offset} position={position}>
        <FluxButtonStack>
            <FluxFlyout label={zoomLabel ?? translate('flux.flow.zoom')} opener={({isOpen, toggle}) => <FluxButtonGroup>
                <FluxSecondaryButton iconLeading="minus" aria-label={zoomOutLabel ?? translate('flux.flow.zoomOut')} onClick={controller.zoomOut}/>
                <FluxSecondaryButton className={controlsStyles.flowControlsZoom} label={`${percentage}%`} aria-haspopup="menu" aria-expanded={isOpen} onClick={toggle}/>
                <FluxSecondaryButton iconLeading="plus" aria-label={zoomInLabel ?? translate('flux.flow.zoomIn')} onClick={controller.zoomIn}/>
            </FluxButtonGroup>}>
                {() => <FluxMenu>
                    <FluxMenuGroup>{presets.map(preset => <FluxMenuItem key={preset} isSelectable isSelected={Math.round(preset * 100) === percentage} label={`${Math.round(preset * 100)}%`} onClick={() => controller.zoomTo(preset)}/>)}</FluxMenuGroup>
                    <FluxSeparator/>
                    <FluxMenuGroup><FluxMenuItem iconLeading="arrows-to-dot" label={fitLabel ?? translate('flux.flow.fitView')} onClick={() => controller.fitView()}/></FluxMenuGroup>
                </FluxMenu>}
            </FluxFlyout>
            {fullscreenAvailable && <FluxButtonGroup><FluxSecondaryButton iconLeading={fullscreen ? 'compress' : 'expand'} aria-label={fullscreen ? exitFullscreenLabel ?? translate('flux.flow.exitFullscreen') : fullscreenLabel ?? translate('flux.flow.fullscreen')} onClick={() => {
                if (fullscreen) document.exitFullscreen().catch(() => undefined);
                else controller.clipElement?.requestFullscreen().catch(() => undefined);
            }}/></FluxButtonGroup>}
        </FluxButtonStack>
    </FluxFlowPanel>;
}
export function FluxFlowMinimap({ height = 120, offset, padding = 9, position, width = 180 }: { height?: number; offset?: number; padding?: number; position?: FluxFlowPanelPosition; width?: number }) {
    const controller = useInternalFlow();
    if (controller.isStatic) return null;
    const bounds = controller.nodeBounds;
    if (!bounds) return null;
    const scale = Math.min((width - padding * 2) / Math.max(bounds.maxX - bounds.minX, 1), (height - padding * 2) / Math.max(bounds.maxY - bounds.minY, 1)),
        x = (width - (bounds.maxX - bounds.minX) * scale) / 2 - bounds.minX * scale,
        y = (height - (bounds.maxY - bounds.minY) * scale) / 2 - bounds.minY * scale,
        rect = controller.clipElement?.getBoundingClientRect(),
        frame = rect ? { x: (-controller.viewport.x / controller.viewport.zoom) * scale + x, y: (-controller.viewport.y / controller.viewport.zoom) * scale + y, width: (rect.width / controller.viewport.zoom) * scale, height: (rect.height / controller.viewport.zoom) * scale } : null;
    const center = (event: PointerEvent<SVGSVGElement>) => {
        const map = event.currentTarget.getBoundingClientRect(),
            point = { x: (event.clientX - map.left - x) / scale, y: (event.clientY - map.top - y) / scale },
            clip = controller.clipElement?.getBoundingClientRect();
        if (clip) controller.setViewport({ x: clip.width / 2 - point.x * controller.viewport.zoom, y: clip.height / 2 - point.y * controller.viewport.zoom, zoom: controller.viewport.zoom });
    };
    return (
        <FluxFlowPanel offset={offset} position={position}>
            <svg
                className={minimapStyles.flowMinimap}
                width={width}
                height={height}
                onPointerDown={(event) => {
                    event.currentTarget.setPointerCapture?.(event.pointerId);
                    controller.setTracking(true);
                    center(event);
                }}
                onPointerMove={(event) => {
                    if (event.buttons) center(event);
                }}
                onPointerUp={(event) => {
                    event.currentTarget.releasePointerCapture?.(event.pointerId);
                    controller.setTracking(false);
                }}
            >
                {[...controller.nodes.values()].map((node) => (
                    <rect key={node.id} className={minimapStyles.flowMinimapNode} x={node.position.x * scale + x} y={node.position.y * scale + y} width={node.size.width * scale} height={node.size.height * scale} rx={2} />
                ))}
                {frame && <rect className={minimapStyles.flowMinimapFrame} {...frame} rx={2} />}
            </svg>
        </FluxFlowPanel>
    );
}
function useFlowBox(controller: InternalController, box: {x: number; y: number; width: number; height: number} | null) {
    const id = useId();
    useLayoutEffect(() => {
        controller.registerBox({id, bounds: box ? {minX: box.x, minY: box.y, maxX: box.x + box.width, maxY: box.y + box.height} : null});
    }, [controller, id, box?.x, box?.y, box?.width, box?.height]);
    useLayoutEffect(() => () => controller.unregisterBox(id), [controller, id]);
}

export function FluxFlowGroup({ color, nodes, padding = 21, title }: { color?: FluxColor; nodes: readonly string[]; padding?: number; title?: string }) {
    const controller = useInternalFlow(),
        bounds = boundsOfNodes(
            nodes.flatMap((id) => {
                const node = controller.getNode(id);
                return node ? [node] : [];
            }),
        );
    const band = title ? 60 : 0,
        box = bounds ? { x: bounds.minX - padding, y: bounds.minY - padding - band, width: bounds.maxX - bounds.minX + padding * 2, height: bounds.maxY - bounds.minY + padding * 2 + band } : null;
    useFlowBox(controller, box);
    if (!box || !controller.backdropElement) return null;
    return (
        <>
            {createPortal(<div className={groupStyles.flowGroup} data-color={color} style={{ transform: `translate(${box.x}px, ${box.y}px)`, width: box.width, height: box.height }} />, controller.backdropElement)}
            {title &&
                controller.foregroundElement &&
                createPortal(
                    <span className={groupStyles.flowGroupTitle} data-color={color} style={{ transform: `translate(${box.x + padding}px, ${box.y + padding}px)` }}>
                        {title}
                    </span>,
                    controller.foregroundElement,
                )}
        </>
    );
}
export function FluxFlowLane({ color, height, padding = 21, title, width, x = 0, y = 0 }: { color?: FluxColor; height?: number; padding?: number; title?: string; width?: number; x?: number; y?: number }) {
    const controller = useInternalFlow(),
        bounds = controller.nodeBounds;
    const row = height !== undefined,
        gutter = 30,
        start = bounds ? (row ? bounds.minX - padding - gutter : bounds.minY - padding - gutter) : 0,
        box = !bounds ? null : row ? { x: start, y, width: bounds.maxX + padding - start, height: height ?? 0 } : { x, y: start, width: width ?? 0, height: bounds.maxY + padding - start };
    useFlowBox(controller, box);
    if (!box || !controller.backdropElement) return null;
    return createPortal(
        <div className={laneStyles.flowLane} data-color={color} data-orientation={row ? 'row' : 'column'} style={{ transform: `translate(${box.x}px, ${box.y}px)`, width: box.width, height: box.height }}>
            {title && <span className={laneStyles.flowLaneTitle}>{title}</span>}
        </div>,
        controller.backdropElement,
    );
}

function capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

export * from './FlowUtilities';
