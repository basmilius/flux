import { createContext } from 'react';
import type { Context, MutableRefObject } from 'react';
import type { FluxColor, FluxIconName } from '../types';

export type FluxFlowPosition = { readonly x: number; readonly y: number };
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

export const LABELLED_GAP: Record<FluxFlowDirection, number> = { vertical: 105, horizontal: 210 };
export const FALLBACK_INSET = 30;
export const SELF_LOOP_REACH = 45;

export function boundsOfNodes(nodes: Iterable<FluxFlowNodeRecord>): FluxFlowBounds | null {
    let minX = Infinity,
        minY = Infinity,
        maxX = -Infinity,
        maxY = -Infinity;
    for (const node of nodes) {
        minX = Math.min(minX, node.position.x);
        minY = Math.min(minY, node.position.y);
        maxX = Math.max(maxX, node.position.x + node.size.width);
        maxY = Math.max(maxY, node.position.y + node.size.height);
    }
    return Number.isFinite(minX) ? { minX, minY, maxX, maxY } : null;
}

export function alignOffset(extent: number, align: FluxFlowAlign, inset: number): number {
    const value = Math.min(inset, extent / 2);
    return align === 'start' ? value : align === 'end' ? extent - value : extent / 2;
}
export function isVerticalSide(side: FluxFlowSide): boolean {
    return side === 'top' || side === 'bottom';
}
export function anchorPoint(position: FluxFlowPosition, size: FluxFlowSize, side: FluxFlowSide, align: FluxFlowAlign = 'center', anchor: FluxFlowPosition | null = null): FluxFlowPosition {
    return isVerticalSide(side) ? { x: position.x + alignOffset(size.width, align, anchor?.x ?? FALLBACK_INSET), y: side === 'top' ? position.y : position.y + size.height } : { x: side === 'left' ? position.x : position.x + size.width, y: position.y + alignOffset(size.height, align, anchor?.y ?? FALLBACK_INSET) };
}
export function selfLoopPoints(position: FluxFlowPosition, size: FluxFlowSize, fromSide: FluxFlowSide, toSide: FluxFlowSide): readonly [FluxFlowPosition, FluxFlowPosition] {
    if (fromSide !== toSide) return [anchorPoint(position, size, fromSide), anchorPoint(position, size, toSide)];
    if (isVerticalSide(fromSide)) {
        const y = fromSide === 'top' ? position.y : position.y + size.height;
        return [
            { x: position.x + (size.width * 3) / 4, y },
            { x: position.x + size.width / 4, y }
        ];
    }
    const x = fromSide === 'left' ? position.x : position.x + size.width;
    return [
        { x, y: position.y + (size.height * 3) / 4 },
        { x, y: position.y + size.height / 4 }
    ];
}
export function nearestSide(size: FluxFlowSize, offset: FluxFlowPosition): FluxFlowSide {
    return (
        [
            ['left', offset.x],
            ['right', size.width - offset.x],
            ['top', offset.y],
            ['bottom', size.height - offset.y]
        ] as const
    ).reduce((nearest, item) => (item[1] < nearest[1] ? item : nearest))[0];
}
export function portSide(port: FluxFlowPortRecord, size: FluxFlowSize): FluxFlowSide {
    return port.side ?? nearestSide(size, port.offset);
}
export function portPoint(position: FluxFlowPosition, size: FluxFlowSize, side: FluxFlowSide, offset: FluxFlowPosition): FluxFlowPosition {
    const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
    return isVerticalSide(side) ? { x: position.x + clamp(offset.x, 0, size.width), y: side === 'top' ? position.y : position.y + size.height } : { x: side === 'left' ? position.x : position.x + size.width, y: position.y + clamp(offset.y, 0, size.height) };
}
export function autoSides(sourcePosition: FluxFlowPosition, sourceSize: FluxFlowSize, targetPosition: FluxFlowPosition, targetSize: FluxFlowSize, axis?: FluxFlowDirection): readonly [FluxFlowSide, FluxFlowSide] {
    const dx = targetPosition.x + targetSize.width / 2 - (sourcePosition.x + sourceSize.width / 2),
        dy = targetPosition.y + targetSize.height / 2 - (sourcePosition.y + sourceSize.height / 2),
        vertical = axis ? axis === 'vertical' : Math.abs(dy) >= Math.abs(dx);
    return vertical ? (dy >= 0 ? ['bottom', 'top'] : ['top', 'bottom']) : dx >= 0 ? ['right', 'left'] : ['left', 'right'];
}

export type FluxFlowPath = { readonly path: string; readonly labelX: number; readonly labelY: number; readonly fromDirection: readonly [number, number]; readonly toDirection: readonly [number, number] };
export function sideNormal(side: FluxFlowSide): readonly [number, number] {
    return side === 'top' ? [0, -1] : side === 'bottom' ? [0, 1] : side === 'left' ? [-1, 0] : [1, 0];
}
export function offsetPoint(point: FluxFlowPosition, side: FluxFlowSide, offset: number): FluxFlowPosition {
    const [x, y] = sideNormal(side);
    return { x: point.x + x * offset, y: point.y + y * offset };
}
export function markerPath(marker: FluxFlowMarker, point: FluxFlowPosition, direction: readonly [number, number]): string {
    const [nx, ny] = direction,
        [px, py] = [ny, nx],
        along = (distance: number) => ({ x: point.x + nx * distance, y: point.y + ny * distance }),
        across = (from: FluxFlowPosition, distance: number) => ({ x: from.x + px * distance, y: from.y + py * distance });
    if (marker === 'none') return '';
    if (marker === 'chevron') {
        const back = along(6);
        return `M ${across(back, 6).x} ${across(back, 6).y} L ${point.x} ${point.y} L ${across(back, -6).x} ${across(back, -6).y}`;
    }
    if (marker === 'arrow') {
        const back = along(10);
        return `M ${point.x} ${point.y} L ${across(back, 5).x} ${across(back, 5).y} L ${across(back, -5).x} ${across(back, -5).y} Z`;
    }
    if (marker === 'bar') return `M ${across(point, 6).x} ${across(point, 6).y} L ${across(point, -6).x} ${across(point, -6).y}`;
    if (marker === 'diamond') {
        const near = along(6),
            far = along(-6);
        return `M ${near.x} ${near.y} L ${across(point, 6).x} ${across(point, 6).y} L ${far.x} ${far.y} L ${across(point, -6).x} ${across(point, -6).y} Z`;
    }
    if (marker === 'square') {
        const near = along(5),
            far = along(-5);
        return `M ${across(near, 5).x} ${across(near, 5).y} L ${across(near, -5).x} ${across(near, -5).y} L ${across(far, -5).x} ${across(far, -5).y} L ${across(far, 5).x} ${across(far, 5).y} Z`;
    }
    const near = along(5),
        far = along(-5);
    return `M ${near.x} ${near.y} A 5 5 0 1 0 ${far.x} ${far.y} A 5 5 0 1 0 ${near.x} ${near.y} Z`;
}

function pointAtHalfLength(points: readonly FluxFlowPosition[]): FluxFlowPosition {
    const lengths = points.slice(1).map((point, index) => Math.hypot(point.x - points[index].x, point.y - points[index].y)),
        half = lengths.reduce((sum, length) => sum + length, 0) / 2;
    let travelled = 0;
    for (let index = 0; index < lengths.length; index++) {
        if (travelled + lengths[index] >= half) {
            const ratio = lengths[index] === 0 ? 0 : (half - travelled) / lengths[index];
            return { x: points[index].x + (points[index + 1].x - points[index].x) * ratio, y: points[index].y + (points[index + 1].y - points[index].y) * ratio };
        }
        travelled += lengths[index];
    }
    return points.at(-1) ?? { x: 0, y: 0 };
}
export function labelPoint(points: readonly FluxFlowPosition[], placement: FluxFlowLabelPlacement, stub: number): FluxFlowPosition {
    if (placement === 'center') return pointAtHalfLength(points);
    const straight = points.every((point) => Math.abs(point.x - points[0].x) < 0.5) || points.every((point) => Math.abs(point.y - points[0].y) < 0.5);
    if (straight) return pointAtHalfLength(points);
    const legs = points.slice(1).map((_, index) => index + 1);
    if (placement === 'last-leg') legs.reverse();
    for (const index of legs) {
        const from = points[index - 1],
            to = points[index];
        if (Math.hypot(to.x - from.x, to.y - from.y) > stub) return { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 };
    }
    return pointAtHalfLength(points);
}
export function unitVector(from: FluxFlowPosition, to: FluxFlowPosition): readonly [number, number] {
    const length = Math.hypot(to.x - from.x, to.y - from.y);
    return length === 0 ? [0, 0] : [(to.x - from.x) / length, (to.y - from.y) / length];
}
function dedupe(points: readonly FluxFlowPosition[]): FluxFlowPosition[] {
    return points.filter((point, index) => index === 0 || Math.abs(point.x - points[index - 1].x) > 0.01 || Math.abs(point.y - points[index - 1].y) > 0.01);
}
export function roundedPath(rawPoints: readonly FluxFlowPosition[], radius: number): string {
    const points = dedupe(rawPoints);
    if (points.length < 2) return '';
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let index = 1; index < points.length - 1; index++) {
        const previous = points[index - 1],
            current = points[index],
            next = points[index + 1],
            incoming = Math.hypot(current.x - previous.x, current.y - previous.y),
            outgoing = Math.hypot(next.x - current.x, next.y - current.y),
            corner = Math.min(radius, incoming / 2, outgoing / 2),
            start = { x: current.x - ((current.x - previous.x) * corner) / (incoming || 1), y: current.y - ((current.y - previous.y) * corner) / (incoming || 1) },
            end = { x: current.x + ((next.x - current.x) * corner) / (outgoing || 1), y: current.y + ((next.y - current.y) * corner) / (outgoing || 1) };
        path += ` L ${start.x} ${start.y} Q ${current.x} ${current.y} ${end.x} ${end.y}`;
    }
    const last = points.at(-1)!;
    return `${path} L ${last.x} ${last.y}`;
}
export function getStraightPath(source: FluxFlowPosition, target: FluxFlowPosition, waypoints: readonly FluxFlowPosition[] = [], placement: FluxFlowLabelPlacement = 'center'): FluxFlowPath {
    const points = [source, ...waypoints, target],
        label = labelPoint(points, placement, 0);
    return { path: points.map((point, index) => `${index ? 'L' : 'M'} ${point.x} ${point.y}`).join(' '), labelX: label.x, labelY: label.y, fromDirection: unitVector(source, points[1]), toDirection: unitVector(target, points.at(-2)!) };
}
export function getBezierPath(source: FluxFlowPosition, sourceSide: FluxFlowSide, target: FluxFlowPosition, targetSide: FluxFlowSide, waypoints: readonly FluxFlowPosition[] = [], placement: FluxFlowLabelPlacement = 'center', curvature = 0.25): FluxFlowPath {
    if (waypoints.length) {
        const points = [source, ...waypoints, target],
            label = labelPoint(points, placement, 0);
        return { ...getStraightPath(source, target, waypoints, placement), path: roundedPath(points, 30), labelX: label.x, labelY: label.y };
    }
    const [snx, sny] = sideNormal(sourceSide),
        [tnx, tny] = sideNormal(targetSide),
        offset = Math.max(Math.hypot(target.x - source.x, target.y - source.y) * curvature, 30),
        c1 = { x: source.x + snx * offset, y: source.y + sny * offset },
        c2 = { x: target.x + tnx * offset, y: target.y + tny * offset };
    return { path: `M ${source.x} ${source.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${target.x} ${target.y}`, labelX: 0.125 * source.x + 0.375 * c1.x + 0.375 * c2.x + 0.125 * target.x, labelY: 0.125 * source.y + 0.375 * c1.y + 0.375 * c2.y + 0.125 * target.y, fromDirection: sideNormal(sourceSide), toDirection: sideNormal(targetSide) };
}
export function getSmoothStepPath(source: FluxFlowPosition, sourceSide: FluxFlowSide, target: FluxFlowPosition, targetSide: FluxFlowSide, waypoints: readonly FluxFlowPosition[] = [], placement: FluxFlowLabelPlacement = 'center', radius = 15, offset = 15): FluxFlowPath {
    const sourceStub = offsetPoint(source, sourceSide, offset),
        targetStub = offsetPoint(target, targetSide, offset),
        points: FluxFlowPosition[] = [source, sourceStub];
    if (waypoints.length) points.push(...waypoints);
    else if (isVerticalSide(sourceSide) && isVerticalSide(targetSide)) {
        const y = (sourceStub.y + targetStub.y) / 2;
        points.push({ x: sourceStub.x, y }, { x: targetStub.x, y });
    } else if (!isVerticalSide(sourceSide) && !isVerticalSide(targetSide)) {
        const x = (sourceStub.x + targetStub.x) / 2;
        points.push({ x, y: sourceStub.y }, { x, y: targetStub.y });
    } else points.push(isVerticalSide(sourceSide) ? { x: sourceStub.x, y: targetStub.y } : { x: targetStub.x, y: sourceStub.y });
    points.push(targetStub, target);
    const label = labelPoint(points, placement, offset);
    return { path: roundedPath(points, radius), labelX: label.x, labelY: label.y, fromDirection: sideNormal(sourceSide), toDirection: sideNormal(targetSide) };
}
export function getStepPath(source: FluxFlowPosition, sourceSide: FluxFlowSide, target: FluxFlowPosition, targetSide: FluxFlowSide, waypoints: readonly FluxFlowPosition[] = [], placement: FluxFlowLabelPlacement = 'center', offset = 15): FluxFlowPath {
    return getSmoothStepPath(source, sourceSide, target, targetSide, waypoints, placement, 0, offset);
}
export function getSelfLoopPath(source: FluxFlowPosition, sourceSide: FluxFlowSide, target: FluxFlowPosition, targetSide: FluxFlowSide, bounds: FluxFlowBounds, reach = SELF_LOOP_REACH, radius = 15): FluxFlowPath & { readonly points: readonly FluxFlowPosition[] } {
    const outSource = offsetPoint(source, sourceSide, reach),
        outTarget = offsetPoint(target, targetSide, reach);
    let bridge: FluxFlowPosition[] = [];
    if (sourceSide !== targetSide) {
        if (isVerticalSide(sourceSide) === isVerticalSide(targetSide))
            bridge = isVerticalSide(sourceSide)
                ? [
                      { x: bounds.minX - reach, y: outSource.y },
                      { x: bounds.minX - reach, y: outTarget.y },
                  ]
                : [
                      { x: outSource.x, y: bounds.minY - reach },
                      { x: outTarget.x, y: bounds.minY - reach },
                  ];
        else bridge = [isVerticalSide(sourceSide) ? { x: outTarget.x, y: outSource.y } : { x: outSource.x, y: outTarget.y }];
    }
    const points = [source, outSource, ...bridge, outTarget, target],
        label = pointAtHalfLength(points);
    return { path: roundedPath(points, radius), labelX: label.x, labelY: label.y, fromDirection: sideNormal(sourceSide), toDirection: sideNormal(targetSide), points };
}

export function collectObstacles(nodes: Iterable<FluxFlowNodeRecord>, fromId: string, toId: string, margin = 12): FluxFlowBounds[] {
    return Array.from(nodes)
        .filter((node) => node.id !== fromId && node.id !== toId)
        .map((node) => ({ minX: node.position.x - margin, minY: node.position.y - margin, maxX: node.position.x + node.size.width + margin, maxY: node.position.y + node.size.height + margin }));
}
export function routeAvoid(from: FluxFlowPosition, fromSide: FluxFlowSide, to: FluxFlowPosition, toSide: FluxFlowSide, obstacles: readonly FluxFlowBounds[], placement: FluxFlowLabelPlacement = 'center', offset = 15, radius = 15): FluxFlowPath {
    const source = offsetPoint(from, fromSide, offset),
        target = offsetPoint(to, toSide, offset),
        vertical = isVerticalSide(fromSide),
        midpoint = vertical ? (source.y + target.y) / 2 : (source.x + target.x) / 2,
        blocked = obstacles.filter((box) => (vertical ? midpoint >= box.minY && midpoint <= box.maxY : midpoint >= box.minX && midpoint <= box.maxX)),
        rail = blocked.length ? (vertical ? Math.max(...blocked.map((box) => box.maxY)) + 12 : Math.max(...blocked.map((box) => box.maxX)) + 12) : midpoint,
        waypoints = vertical
            ? [
                  { x: source.x, y: rail },
                  { x: target.x, y: rail },
              ]
            : [
                  { x: rail, y: source.y },
                  { x: rail, y: target.y },
              ];
    return getSmoothStepPath(from, fromSide, to, toSide, waypoints, placement, radius, offset);
}

export interface FluxFlowLayoutNode {
    readonly id: string;
    readonly width?: number;
    readonly height?: number;
    readonly anchor?: FluxFlowPosition | null;
}
export interface FluxFlowLayoutEdge {
    readonly from: string;
    readonly to: string;
}
export interface FluxFlowLayoutConnection {
    readonly from: string;
    readonly to: string;
    readonly fromSide: FluxFlowSide;
    readonly toSide: FluxFlowSide;
}
export interface FluxFlowLayoutResult {
    readonly positions: Record<string, FluxFlowPosition>;
    readonly connections: readonly FluxFlowLayoutConnection[];
}
export interface FluxFlowLayoutOptions {
    readonly x?: number;
    readonly y?: number;
    readonly direction?: FluxFlowDirection;
    readonly layerGap?: number;
    readonly nodeGap?: number;
    readonly nodeWidth?: number;
    readonly nodeHeight?: number;
}

export function useFlowLayout(nodes: readonly FluxFlowLayoutNode[], edges: readonly FluxFlowLayoutEdge[], options: FluxFlowLayoutOptions = {}): FluxFlowLayoutResult {
    const { x = 0, y = 0, direction = 'vertical', layerGap = 60, nodeGap = 45, nodeWidth = 300, nodeHeight = 90 } = options,
        vertical = direction === 'vertical',
        order = nodes.map((node) => node.id),
        known = new Set(order),
        links = edges.filter((edge) => edge.from !== edge.to && known.has(edge.from) && known.has(edge.to)),
        sizes = new Map(nodes.map((node) => [node.id, { width: node.width ?? nodeWidth, height: node.height ?? nodeHeight }])),
        outgoing = new Map<string, FluxFlowLayoutEdge[]>(order.map((id) => [id, []])),
        indegree = new Map<string, number>(order.map((id) => [id, 0])),
        layer = new Map<string, number>(order.map((id) => [id, 0])),
        cut = new Set<FluxFlowLayoutEdge>();
    links.forEach((edge) => {
        outgoing.get(edge.from)!.push(edge);
        indegree.set(edge.to, indegree.get(edge.to)! + 1);
    });
    const settled = new Set<string>(),
        queue = order.filter((id) => indegree.get(id) === 0);
    while (settled.size < order.length) {
        if (!queue.length) {
            const next = order.filter((id) => !settled.has(id)).reduce((best, id) => (indegree.get(id)! < indegree.get(best)! ? id : best));
            indegree.set(next, 0);
            queue.push(next);
        }
        const id = queue.shift()!;
        if (settled.has(id)) continue;
        settled.add(id);
        for (const edge of outgoing.get(id)!) {
            if (settled.has(edge.to)) {
                cut.add(edge);
                continue;
            }
            layer.set(edge.to, Math.max(layer.get(edge.to)!, layer.get(id)! + 1));
            indegree.set(edge.to, indegree.get(edge.to)! - 1);
            if (indegree.get(edge.to)! <= 0) queue.push(edge.to);
        }
    }
    const grouped = new Map<number, string[]>();
    order.forEach((id) => grouped.set(layer.get(id)!, [...(grouped.get(layer.get(id)!) ?? []), id]));
    const layers = [...grouped.keys()].sort((a, b) => a - b).map((index) => grouped.get(index)!),
        across = (id: string) => (vertical ? sizes.get(id)!.width : sizes.get(id)!.height),
        along = (id: string) => (vertical ? sizes.get(id)!.height : sizes.get(id)!.width),
        extents = layers.map((items) => items.reduce((total, id, index) => total + across(id) + (index ? nodeGap : 0), 0)),
        widest = Math.max(0, ...extents),
        positions: Record<string, FluxFlowPosition> = {};
    let main = 0;
    layers.forEach((items, layerIndex) => {
        let offset = (widest - extents[layerIndex]) / 2;
        items.forEach((id) => {
            positions[id] = vertical ? { x: x + offset, y: y + main } : { x: x + main, y: y + offset };
            offset += across(id) + nodeGap;
        });
        main += Math.max(0, ...items.map(along)) + layerGap;
    });
    const [fromSide, toSide]: readonly [FluxFlowSide, FluxFlowSide] = vertical ? ['bottom', 'top'] : ['right', 'left'],
        back: FluxFlowSide = vertical ? 'right' : 'bottom';
    return { positions, connections: links.map((edge) => ({ from: edge.from, to: edge.to, fromSide: cut.has(edge) ? back : fromSide, toSide: cut.has(edge) ? back : toSide })) };
}

export interface FluxFlowTrunkLayoutOptions {
    readonly x?: number;
    readonly y?: number;
    readonly indent?: number;
    readonly nodeGap?: number;
    readonly trunkGap?: number;
    readonly nodeWidth?: number;
    readonly nodeHeight?: number;
}
export function useFlowTrunkLayout(nodes: readonly FluxFlowLayoutNode[], edges: readonly FluxFlowLayoutEdge[], trunk: readonly string[], options: FluxFlowTrunkLayoutOptions = {}): FluxFlowLayoutResult {
    const { x = 0, y = 0, indent = 180, nodeGap = 45, trunkGap = 60, nodeWidth = 300, nodeHeight = 90 } = options,
        known = new Set(nodes.map((node) => node.id)),
        sizes = new Map(nodes.map((node) => [node.id, { width: node.width ?? nodeWidth, height: node.height ?? nodeHeight }])),
        spine = trunk.filter((id) => known.has(id)),
        onSpine = new Set(spine),
        links = edges.filter((edge) => edge.from !== edge.to && known.has(edge.from) && known.has(edge.to)),
        outgoing = new Map<string, string[]>(nodes.map((node) => [node.id, []]));
    links.forEach((edge) => outgoing.get(edge.from)!.push(edge.to));
    const positions: Record<string, FluxFlowPosition> = {},
        depths = new Map<string, number>(),
        placed = new Set<string>();
    const walk = (id: string, depth: number, top: number): number => {
        positions[id] = { x: x + indent * depth, y: top };
        depths.set(id, depth);
        placed.add(id);
        let next = top + sizes.get(id)!.height + nodeGap;
        outgoing.get(id)!.forEach((child) => {
            if (!onSpine.has(child) && !placed.has(child)) next = walk(child, depth + 1, next);
        });
        return next;
    };
    let cursor = y,
        previous: { x: number; width: number } | null = null;
    spine.forEach((id) => {
        const size = sizes.get(id)!,
            trunkX = previous ? previous.x + (previous.width - size.width) / 2 : x;
        positions[id] = { x: trunkX, y: cursor };
        depths.set(id, 0);
        placed.add(id);
        previous = { x: trunkX, width: size.width };
        let branch = cursor,
            opening = true;
        outgoing.get(id)!.forEach((child) => {
            if (!onSpine.has(child) && !placed.has(child)) {
                if (opening) {
                    branch = cursor + size.height / 2 - alignOffset(sizes.get(child)!.height, 'start', FALLBACK_INSET);
                    opening = false;
                }
                branch = walk(child, 1, branch);
            }
        });
        cursor = Math.max(cursor + size.height + nodeGap, branch) - nodeGap + trunkGap;
    });
    nodes.forEach((node) => {
        if (!placed.has(node.id)) {
            positions[node.id] = { x, y: cursor };
            depths.set(node.id, 0);
            cursor += sizes.get(node.id)!.height + nodeGap;
        }
    });
    return { positions, connections: links.map((edge) => ({ from: edge.from, to: edge.to, fromSide: onSpine.has(edge.from) && !onSpine.has(edge.to) ? 'right' : 'bottom', toSide: onSpine.has(edge.from) && onSpine.has(edge.to) ? 'top' : (depths.get(edge.to) ?? 0) > (depths.get(edge.from) ?? 0) ? 'left' : 'top' })) };
}

export function flowColor(value?: FluxColor | string, fallback = 'var(--gray-solid)'): string {
    return value ? (String(value).startsWith('#') || String(value).startsWith('rgb') || String(value).startsWith('var(') ? String(value) : `var(--${value}-solid)`) : fallback;
}
