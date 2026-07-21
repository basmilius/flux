import type { FluxIconName } from '@flux-ui/types';
import type { InjectionKey, Ref, ShallowReactive } from 'vue';

export type FluxFlowPosition = {
    readonly x: number;
    readonly y: number;
};

export type FluxFlowSize = {
    readonly width: number;
    readonly height: number;
};

export type FluxFlowViewport = {
    readonly x: number;
    readonly y: number;
    readonly zoom: number;
};

export type FluxFlowBounds = {
    readonly minX: number;
    readonly minY: number;
    readonly maxX: number;
    readonly maxY: number;
};

export type FluxFlowSide = 'top' | 'right' | 'bottom' | 'left';

/**
 * Where along a side a connector attaches. `start` and `end` are meant in
 * reading direction: left and right on a horizontal side, top and bottom on a
 * vertical one.
 */
export type FluxFlowAlign = 'start' | 'center' | 'end';

export type FluxFlowConnectionType = 'bezier' | 'smoothstep' | 'straight';

/**
 * Where the label of a bent connector rides. `center` puts it halfway along the
 * run, `first-leg` and `last-leg` put it on the middle of the leg leaving the
 * source or entering the target, which is how two branches out of the same node
 * keep their labels apart instead of stacking them on the leg they share.
 */
export type FluxFlowLabelPlacement = 'center' | 'first-leg' | 'last-leg';

/**
 * A `FluxFlowPort` signing itself up with the node that contains it. The node
 * measures the element and republishes it as a `FluxFlowPortRecord`.
 */
export type FluxFlowPortRegistration = {
    readonly id: string;
    readonly element: Readonly<Ref<HTMLElement | null>>;
    readonly side?: FluxFlowSide;
};

/**
 * A named point on a node. `offset` is the centre of the port relative to the
 * node's top-left, in the node's own layout pixels; it fixes where along a side
 * a connector lands. `side` names the edge it lands on, or is left out to take
 * the edge the port sits closest to.
 */
export type FluxFlowPortRecord = {
    readonly id: string;
    readonly offset: FluxFlowPosition;
    readonly side?: FluxFlowSide;
};

export type FluxFlowNodeRecord = {
    readonly id: string;
    readonly position: Readonly<Ref<FluxFlowPosition>>;
    readonly size: Readonly<Ref<FluxFlowSize>>;
    readonly element: Readonly<Ref<HTMLElement | null>>;
    /**
     * The centre of the node's `[data-flow-anchor]` element, relative to its own
     * top-left, or `null` when it has none. A `start` connector lands on it, so
     * a card and a pill each anchor on their own icon rather than on a shared
     * guess at where an icon sits.
     */
    readonly anchor: Readonly<Ref<FluxFlowPosition | null>>;
    /**
     * The measured `FluxFlowPort` elements inside the node, keyed by their id.
     */
    readonly ports: Readonly<Ref<ReadonlyMap<string, FluxFlowPortRecord>>>;
};

export type FluxFlowNodeContext = {
    registerPort(port: FluxFlowPortRegistration): void;
    unregisterPort(id: string): void;
};

export type FluxFlowMarker = 'arrow' | 'bar' | 'chevron' | 'diamond' | 'dot' | 'square' | 'none';

/**
 * How a marker is painted. `outline` shapes read as ports: a hole in the
 * surface with a colored rim. `solid` shapes are filled arrow heads. `stroke`
 * shapes are open lines that continue the connector.
 */
export type FluxFlowMarkerFill = 'outline' | 'solid' | 'stroke';

export type FluxFlowEdgeSpec = {
    readonly path: string;
    readonly labelX: number;
    readonly labelY: number;
    readonly fromX: number;
    readonly fromY: number;
    readonly toX: number;
    readonly toY: number;
    /**
     * The points the connector is routed through, in world coordinates. The
     * canvas sizes itself on these too, so a connector that swings wide of
     * every node is not clipped away.
     */
    readonly waypoints: readonly FluxFlowPosition[];
    readonly styleVars: Record<string, string>;
    readonly animated: boolean;
    readonly dashed: boolean;
    readonly dotted: boolean;
    readonly fromMarkerPath: string;
    readonly fromMarkerFill: FluxFlowMarkerFill;
    readonly toMarkerPath: string;
    readonly toMarkerFill: FluxFlowMarkerFill;
    readonly fromActive: boolean;
    readonly toActive: boolean;
    readonly hasProgress: boolean;
    readonly label?: string;
    readonly icon?: FluxIconName;
};

export type FluxFlowEdgeRecord = {
    readonly id: number;
    readonly spec: Readonly<Ref<FluxFlowEdgeSpec | null>>;
};

/**
 * A rectangle drawn behind the nodes, such as a `FluxFlowGroup` frame or a
 * `FluxFlowLane` band. It only contributes to the world it is drawn in: the
 * canvas sizes itself on it, but nothing anchors to it.
 */
export type FluxFlowBoxRecord = {
    readonly id: number;
    readonly bounds: Readonly<Ref<FluxFlowBounds | null>>;
};

export type FluxFlowController = {
    readonly viewport: Ref<FluxFlowViewport>;
    readonly isStatic: Readonly<Ref<boolean>>;
    readonly nodes: ShallowReactive<Map<string, FluxFlowNodeRecord>>;
    readonly edges: ShallowReactive<Map<number, FluxFlowEdgeRecord>>;
    readonly boxes: ShallowReactive<Map<number, FluxFlowBoxRecord>>;
    readonly bounds: Readonly<Ref<FluxFlowBounds | null>>;
    /**
     * The box around the nodes alone. A backdrop that spans the flow, such as a
     * lane, measures itself against this rather than against `bounds`, which
     * counts the backdrops themselves.
     */
    readonly nodeBounds: Readonly<Ref<FluxFlowBounds | null>>;
    readonly clipElement: Readonly<Ref<HTMLElement | null>>;
    /**
     * The layer behind the nodes. A `FluxFlowGroup` and a `FluxFlowLane`
     * teleport their rectangle into it, so a backdrop written between the nodes
     * still renders underneath every one of them.
     */
    readonly backdropElement: Readonly<Ref<HTMLElement | null>>;
    registerNode(record: FluxFlowNodeRecord): void;
    unregisterNode(id: string): void;
    getNode(id: string): FluxFlowNodeRecord | undefined;
    registerEdge(record: FluxFlowEdgeRecord): void;
    unregisterEdge(id: number): void;
    registerBox(record: FluxFlowBoxRecord): void;
    unregisterBox(id: number): void;
    setClipElement(element: HTMLElement | null): void;
    setBackdropElement(element: HTMLElement | null): void;
    screenToFlow(clientX: number, clientY: number): FluxFlowPosition;
    flowToScreen(x: number, y: number): FluxFlowPosition;
    panBy(dx: number, dy: number): void;
    zoomAt(clientX: number, clientY: number, factor: number): void;
    zoomIn(): void;
    zoomOut(): void;
    resetZoom(): void;
    fitView(padding?: number): void;
    centerView(zoom: number): void;
    setViewport(viewport: FluxFlowViewport): void;
};

export type FluxFlowDirection = 'horizontal' | 'vertical';

/**
 * A node inside a `FluxFlowChain`. It publishes its own measured size, the
 * chain hands back the position it lays out for it.
 */
export type FluxFlowChainLink = {
    readonly id: Readonly<Ref<string>>;
    readonly size: Readonly<Ref<FluxFlowSize>>;
};

export type FluxFlowChainContext = {
    /**
     * The position the chain lays out for one of its links, or `null` while the
     * link is unknown to it.
     */
    positionOf(id: string): FluxFlowPosition | null;
    registerLink(link: FluxFlowChainLink): void;
    unregisterLink(link: FluxFlowChainLink): void;
};

export const FluxFlowInjectionKey: InjectionKey<FluxFlowController> = Symbol('flux.flow');
export const FluxFlowNodeInjectionKey: InjectionKey<FluxFlowNodeContext> = Symbol('flux.flow.node');
export const FluxFlowChainInjectionKey: InjectionKey<FluxFlowChainContext> = Symbol('flux.flow.chain');
