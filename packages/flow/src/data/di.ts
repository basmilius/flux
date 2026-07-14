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

export type FluxFlowSide = 'top' | 'right' | 'bottom' | 'left';

export type FluxFlowConnectionType = 'bezier' | 'smoothstep' | 'straight';

export type FluxFlowNodeRecord = {
    readonly id: string;
    readonly position: Readonly<Ref<FluxFlowPosition>>;
    readonly size: Readonly<Ref<FluxFlowSize>>;
    readonly element: Readonly<Ref<HTMLElement | null>>;
};

export type FluxFlowMarkers = 'both' | 'from' | 'to' | 'none';

export type FluxFlowEdgeSpec = {
    readonly path: string;
    readonly labelX: number;
    readonly labelY: number;
    readonly fromX: number;
    readonly fromY: number;
    readonly toX: number;
    readonly toY: number;
    readonly styleVars: Record<string, string>;
    readonly dashed: boolean;
    readonly dotted: boolean;
    readonly showFrom: boolean;
    readonly showTo: boolean;
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

export type FluxFlowController = {
    readonly viewport: Ref<FluxFlowViewport>;
    readonly isStatic: Readonly<Ref<boolean>>;
    readonly nodes: ShallowReactive<Map<string, FluxFlowNodeRecord>>;
    readonly edges: ShallowReactive<Map<number, FluxFlowEdgeRecord>>;
    readonly clipElement: Readonly<Ref<HTMLElement | null>>;
    registerNode(record: FluxFlowNodeRecord): void;
    unregisterNode(id: string): void;
    getNode(id: string): FluxFlowNodeRecord | undefined;
    registerEdge(record: FluxFlowEdgeRecord): void;
    unregisterEdge(id: number): void;
    setClipElement(element: HTMLElement | null): void;
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

export const FluxFlowInjectionKey: InjectionKey<FluxFlowController> = Symbol('flux.flow');
