import { createContext } from 'react';
import type { Context, MutableRefObject } from 'react';
import type { FluxFlowPath, FluxFlowPosition } from '@flux-ui/types/flow';
import type { FluxColor, FluxIconName } from '../types';

export type { FluxFlowPath, FluxFlowPosition } from '@flux-ui/types/flow';
export type FluxFlowSize = { readonly width: number; readonly height: number };
export type FluxFlowViewport = { readonly x: number; readonly y: number; readonly zoom: number };
export type FluxFlowBounds = { readonly minX: number; readonly minY: number; readonly maxX: number; readonly maxY: number };
export type FluxFlowSide = 'top' | 'right' | 'bottom' | 'left';
export type FluxFlowPanelPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export type FluxFlowAlign = 'start' | 'center' | 'end';
export type FluxFlowConnectionType = 'bezier' | 'smoothstep' | 'step' | 'straight';
export type FluxFlowLabelPlacement = 'center' | 'first-leg' | 'last-leg';
export type FluxFlowMarker = 'arrow' | 'bar' | 'chevron' | 'diamond' | 'dot' | 'square' | 'none';
export type FluxFlowMarkerFill = 'outline' | 'solid' | 'stroke';
export type FluxFlowDirection = 'horizontal' | 'vertical';
export type FluxFlowEdgeLayer = 'over' | 'under';

export interface FluxFlowPortRegistration {
    readonly id: string;
    readonly element: MutableRefObject<HTMLElement | null>;
    readonly side?: FluxFlowSide;
}
export interface FluxFlowPortRecord {
    readonly id: string;
    readonly offset: FluxFlowPosition;
    readonly side?: FluxFlowSide;
}
export interface FluxFlowNodeRecord {
    readonly id: string;
    readonly position: FluxFlowPosition;
    readonly size: FluxFlowSize;
    readonly element: HTMLElement | null;
    readonly anchor: FluxFlowPosition | null;
    readonly ports: ReadonlyMap<string, FluxFlowPortRecord>;
}
export interface FluxFlowNodeContext {
    registerPort(port: FluxFlowPortRegistration): void;
    unregisterPort(id: string): void;
}
export interface FluxFlowEdgeSpec {
    readonly path: string;
    readonly labelX: number;
    readonly labelY: number;
    readonly fromX: number;
    readonly fromY: number;
    readonly toX: number;
    readonly toY: number;
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
    readonly isColored: boolean;
    readonly label?: string;
    readonly icon?: FluxIconName;
}
export interface FluxFlowEdgeRecord {
    readonly id: string | number;
    readonly spec: FluxFlowEdgeSpec | null;
}
export interface FluxFlowBoxRecord {
    readonly id: string | number;
    readonly bounds: FluxFlowBounds | null;
}
export interface FluxFlowPlacementLink {
    readonly id: string;
    readonly size: FluxFlowSize;
    readonly anchor: FluxFlowPosition | null;
}
export interface FluxFlowPlacementContext {
    positionOf(id: string): FluxFlowPosition | null;
    registerLink?(link: FluxFlowPlacementLink): void;
    unregisterLink?(link: FluxFlowPlacementLink): void;
}

export interface FluxFlowController {
    readonly viewport: FluxFlowViewport;
    readonly axis?: FluxFlowDirection;
    readonly isStatic: boolean;
    readonly minZoom: number;
    readonly maxZoom: number;
    readonly isTracking: boolean;
    readonly nodes: ReadonlyMap<string, FluxFlowNodeRecord>;
    readonly edges: ReadonlyMap<string | number, FluxFlowEdgeRecord>;
    readonly boxes: ReadonlyMap<string | number, FluxFlowBoxRecord>;
    readonly bounds: FluxFlowBounds | null;
    readonly nodeBounds: FluxFlowBounds | null;
    readonly clipElement: HTMLElement | null;
    readonly backdropElement: HTMLElement | null;
    readonly foregroundElement: HTMLElement | null;
    readonly overlayElement: HTMLElement | null;
    registerNode(record: FluxFlowNodeRecord): void;
    unregisterNode(id: string): void;
    getNode(id: string): FluxFlowNodeRecord | undefined;
    registerEdge(record: FluxFlowEdgeRecord): void;
    unregisterEdge(id: string | number): void;
    registerBox(record: FluxFlowBoxRecord): void;
    unregisterBox(id: string | number): void;
    setTracking(value: boolean): void;
    screenToFlow(clientX: number, clientY: number): FluxFlowPosition;
    flowToScreen(x: number, y: number): FluxFlowPosition;
    panBy(dx: number, dy: number): void;
    panBounded(dx: number, dy: number): FluxFlowPosition;
    zoomAt(clientX: number, clientY: number, factor: number): void;
    zoomIn(): void;
    zoomOut(): void;
    zoomTo(zoom: number): void;
    resetZoom(): void;
    fitView(padding?: number): void;
    centerView(zoom: number): void;
    setViewport(viewport: FluxFlowViewport): void;
}

export const FluxFlowEdgeLayerInjectionKey: Context<FluxFlowEdgeLayer> = createContext<FluxFlowEdgeLayer>('under');
export const english = {
    'flux.flow.exitFullscreen': 'Exit fullscreen',
    'flux.flow.fitView': 'Fit view',
    'flux.flow.fullscreen': 'Fullscreen',
    'flux.flow.zoom': 'Zoom',
    'flux.flow.zoomIn': 'Zoom in',
    'flux.flow.zoomOut': 'Zoom out'
} as const;
export type FluxFlowTranslation = keyof typeof english;
export type FluxFlowTranslate = (key: FluxFlowTranslation, params?: Record<string, string | number>) => string;

export * from './flow/index';
export {default as useFlowLayout} from './flow/useFlowLayout';
export type {FluxFlowLayoutNode, FluxFlowLayoutEdge, FluxFlowLayoutConnection, FluxFlowLayoutOptions, FluxFlowLayoutResult} from './flow/useFlowLayout';
export {default as useFlowTrunkLayout} from './flow/useFlowTrunkLayout';
export type {FluxFlowTrunkLayoutOptions} from './flow/useFlowTrunkLayout';

export function flowColor(value?: FluxColor | string, fallback = 'var(--gray-solid)'): string {
    return value ? (['gray', 'primary', 'danger', 'info', 'success', 'warning'].includes(value) ? `var(--${value}-solid)` : value) : fallback;
}
