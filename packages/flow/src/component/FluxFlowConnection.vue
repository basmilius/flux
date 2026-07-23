<template>
    <!-- FluxFlowConnection registers itself and is drawn in the shared edge layer of the surrounding FluxFlow. -->
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import { computed, getCurrentInstance, onBeforeUnmount } from 'vue';
    import { useFluxFlowInjection } from '~flux/flow/composable';
    import type { FluxFlowAlign, FluxFlowConnectionType, FluxFlowEdgeSpec, FluxFlowLabelPlacement, FluxFlowMarker, FluxFlowMarkerFill, FluxFlowNodeRecord, FluxFlowPortRecord, FluxFlowPosition, FluxFlowSide } from '~flux/flow/data';
    import { anchorPoint, autoSides, clamp, collectObstacles, getBezierPath, getSelfLoopPath, getSmoothStepPath, getStepPath, getStraightPath, markerPath, offsetPoint, portPoint, portSide, routeAvoid, selfLoopPoints } from '~flux/flow/util';

    const props = defineProps<{
        readonly from: string;
        readonly to: string;
        readonly fromSide?: FluxFlowSide;
        readonly toSide?: FluxFlowSide;
        readonly fromAlign?: FluxFlowAlign;
        readonly toAlign?: FluxFlowAlign;
        readonly fromPort?: string;
        readonly toPort?: string;
        readonly waypoints?: readonly FluxFlowPosition[];
        readonly type?: FluxFlowConnectionType;
        readonly color?: FluxColor | string;
        readonly label?: string;
        readonly labelPlacement?: FluxFlowLabelPlacement;
        readonly icon?: FluxIconName;
        readonly animated?: boolean;
        readonly dashed?: boolean;
        readonly dotted?: boolean;
        readonly markerStart?: FluxFlowMarker;
        readonly markerEnd?: FluxFlowMarker;
        readonly progressColor?: FluxColor | string;
        readonly progressValue?: number;
    }>();

    // Keyed by FluxColor rather than a loose array, so adding a color to FluxColor
    // is a compile error here until its badge tint is chosen. Gray sits a shade
    // deeper, matching the default connector line.
    const BADGE_SHADES: Record<FluxColor, number> = {
        gray: 200,
        primary: 100,
        danger: 100,
        info: 100,
        success: 100,
        warning: 100
    };

    // Breathing room between a node and the connector touching it.
    const NODE_GAP = 9;

    // Keyed by FluxFlowMarker rather than a loose lookup, so a new marker is a
    // compile error here until it declares how it is painted.
    const MARKER_FILLS: Record<FluxFlowMarker, FluxFlowMarkerFill> = {
        arrow: 'solid',
        bar: 'stroke',
        chevron: 'stroke',
        diamond: 'outline',
        dot: 'outline',
        square: 'outline',
        none: 'stroke'
    };

    const uid = getCurrentInstance()!.uid;
    const controller = useFluxFlowInjection();

    const hasProgress = computed(() => props.progressValue !== undefined && props.progressValue !== null);
    const markerStart = computed<FluxFlowMarker>(() => props.markerStart ?? 'dot');
    const markerEnd = computed<FluxFlowMarker>(() => props.markerEnd ?? 'chevron');

    const geometry = computed(() => {
        const source = controller.getNode(props.from);
        const target = controller.getNode(props.to);

        if (!source || !target) {
            return null;
        }

        if (source === target) {
            return selfLoop(source);
        }

        const sourcePosition = source.position.value;
        const sourceSize = source.size.value;
        const targetPosition = target.position.value;
        const targetSize = target.size.value;

        const sourcePort = portOf(source, props.fromPort);
        const targetPort = portOf(target, props.toPort);

        const [autoSource, autoTarget] = autoSides(sourcePosition, sourceSize, targetPosition, targetSize, controller.axis.value);
        const sourceSide = props.fromSide ?? (sourcePort ? portSide(sourcePort, sourceSize) : autoSource);
        const targetSide = props.toSide ?? (targetPort ? portSide(targetPort, targetSize) : autoTarget);

        // The endpoints sit a gap away from the node, so a line never touches the
        // card it points at.
        const fromPoint = offsetPoint(endpoint(source, sourcePort, sourceSide, props.fromAlign), sourceSide, NODE_GAP);
        const toPoint = offsetPoint(endpoint(target, targetPort, targetSide, props.toAlign), targetSide, NODE_GAP);

        const type = props.type ?? 'smoothstep';
        const waypoints = props.waypoints ?? [];
        const placement = props.labelPlacement ?? 'center';

        // The orthogonal types route around the cards they would otherwise cross,
        // unless the author already drew the waypoints by hand.
        const routed = waypoints.length === 0 && (type === 'smoothstep' || type === 'step');
        const radius = type === 'step' ? 0 : 15;
        const obstacles = routed ? collectObstacles(controller.nodes.values(), props.from, props.to) : [];

        const path = routed
            ? routeAvoid(fromPoint, sourceSide, toPoint, targetSide, obstacles, placement, 15, radius)
            : type === 'straight'
                ? getStraightPath(fromPoint, toPoint, waypoints, placement)
                : type === 'bezier'
                    ? getBezierPath(fromPoint, sourceSide, toPoint, targetSide, waypoints, placement)
                    : type === 'step'
                        ? getStepPath(fromPoint, sourceSide, toPoint, targetSide, waypoints, placement)
                        : getSmoothStepPath(fromPoint, sourceSide, toPoint, targetSide, waypoints, placement);

        return {
            path: path.path,
            labelX: path.labelX,
            labelY: path.labelY,
            fromX: fromPoint.x,
            fromY: fromPoint.y,
            toX: toPoint.x,
            toY: toPoint.y,
            waypoints,
            fromMarkerPath: markerPath(markerStart.value, fromPoint, path.fromDirection),
            toMarkerPath: markerPath(markerEnd.value, toPoint, path.toDirection)
        };
    });

    const spec = computed<FluxFlowEdgeSpec | null>(() => {
        const value = geometry.value;

        if (!value) {
            return null;
        }

        const progress = props.progressValue ?? 0;

        return {
            ...value,
            styleVars: {
                '--connection-color': resolveColor(props.color, 'var(--flow-line)'),
                '--connection-marker': resolveColor(props.color, 'var(--flow-line)'),
                '--connection-progress-color': resolveColor(props.progressColor, 'var(--primary-500)'),
                '--connection-progress': String(clamp(progress, 0, 1)),
                '--connection-badge-background': resolveBadgeBackground(props.color),
                '--connection-badge-foreground': resolveBadgeForeground(props.color)
            },
            animated: !!props.animated,
            dashed: !!props.dashed,
            dotted: !!props.dotted,
            fromMarkerFill: MARKER_FILLS[markerStart.value],
            toMarkerFill: MARKER_FILLS[markerEnd.value],
            fromActive: hasProgress.value && progress > 0,
            toActive: hasProgress.value && progress >= 1,
            hasProgress: hasProgress.value,
            isColored: !!props.color,
            label: props.label,
            icon: props.icon
        };
    });

    controller.registerEdge({id: uid, spec});

    onBeforeUnmount(() => controller.unregisterEdge(uid));

    /**
     * A connector onto its own node is not a route between two cards: it leaves
     * a side and comes back into that same side. It loops on the side a
     * connector running against the flow would take, so a retry and a step back
     * read alike.
     */
    function selfLoop(node: FluxFlowNodeRecord) {
        const position = node.position.value;
        const size = node.size.value;

        // Naming one side loops on that side; naming both routes around the node
        // from one to the other.
        const fallback: FluxFlowSide = controller.axis.value === 'horizontal' ? 'bottom' : 'right';
        const fromSide = props.fromSide ?? props.toSide ?? fallback;
        const toSide = props.toSide ?? props.fromSide ?? fallback;

        const [from, to] = selfLoopPoints(position, size, fromSide, toSide);

        const fromPoint = offsetPoint(from, fromSide, NODE_GAP);
        const toPoint = offsetPoint(to, toSide, NODE_GAP);

        const path = getSelfLoopPath(fromPoint, fromSide, toPoint, toSide, {
            minX: position.x - NODE_GAP,
            minY: position.y - NODE_GAP,
            maxX: position.x + size.width + NODE_GAP,
            maxY: position.y + size.height + NODE_GAP
        });

        return {
            path: path.path,
            labelX: path.labelX,
            labelY: path.labelY,
            fromX: fromPoint.x,
            fromY: fromPoint.y,
            toX: toPoint.x,
            toY: toPoint.y,
            // The loop reaches past the node it belongs to, so every point of the
            // route stretches the world rather than being clipped off the edge.
            waypoints: path.points,
            fromMarkerPath: markerPath(markerStart.value, fromPoint, path.fromDirection),
            toMarkerPath: markerPath(markerEnd.value, toPoint, path.toDirection)
        };
    }

    // An unknown port id falls back to the node's own anchor, so a typo drops a
    // connector back onto the card rather than off the canvas.
    function portOf(node: FluxFlowNodeRecord, id: string | undefined): FluxFlowPortRecord | undefined {
        return id === undefined ? undefined : node.ports.value.get(id);
    }

    // A port fixes where along the side the connector lands, which is what
    // `align` does for a node without one.
    function endpoint(node: FluxFlowNodeRecord, port: FluxFlowPortRecord | undefined, side: FluxFlowSide, align: FluxFlowAlign | undefined): FluxFlowPosition {
        const position = node.position.value;
        const size = node.size.value;

        return port
            ? portPoint(position, size, side, port.offset)
            : anchorPoint(position, size, side, align, node.anchor.value);
    }

    function resolveColor(value: string | undefined, fallback: string): string {
        return value ? (isFluxColor(value) ? `var(--${value}-500)` : value) : fallback;
    }

    // The badge sits in the hole its own connector leaves, so it wears a light
    // tint of the line's color rather than the line color itself. A plain badge
    // keeps the lighter gray the line had before it was darkened, so the pill
    // does not deepen along with the connector.
    function resolveBadgeBackground(value: string | undefined): string {
        if (!value) {
            return 'var(--gray-200)';
        }

        return isFluxColor(value)
            ? `var(--${value}-${BADGE_SHADES[value]})`
            : `color-mix(in oklab, ${value} 18%, var(--surface))`;
    }

    function resolveBadgeForeground(value: string | undefined): string {
        if (!value) {
            return 'var(--foreground-prominent)';
        }

        return isFluxColor(value) ? `var(--${value}-900)` : value;
    }

    function isFluxColor(value: string): value is FluxColor {
        return Object.hasOwn(BADGE_SHADES, value);
    }
</script>
