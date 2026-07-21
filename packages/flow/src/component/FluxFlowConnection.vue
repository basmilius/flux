<template>
    <!-- FluxFlowConnection registers itself and is drawn in the shared edge layer of the surrounding FluxFlow. -->
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import { computed, getCurrentInstance, onBeforeUnmount } from 'vue';
    import { useFluxFlowInjection } from '~flux/flow/composable';
    import type { FluxFlowConnectionType, FluxFlowEdgeSpec, FluxFlowMarker, FluxFlowMarkerFill, FluxFlowPosition, FluxFlowSide } from '~flux/flow/data';
    import { anchorPoint, autoSides, getBezierPath, getSmoothStepPath, getStraightPath, markerPath, offsetPoint, sideNormal } from '~flux/flow/util';

    const props = defineProps<{
        readonly from: string;
        readonly to: string;
        readonly fromSide?: FluxFlowSide;
        readonly toSide?: FluxFlowSide;
        readonly type?: FluxFlowConnectionType;
        readonly color?: FluxColor | string;
        readonly label?: string;
        readonly icon?: FluxIconName;
        readonly animated?: boolean;
        readonly dashed?: boolean;
        readonly dotted?: boolean;
        readonly markerStart?: FluxFlowMarker;
        readonly markerEnd?: FluxFlowMarker;
        readonly progressColor?: FluxColor | string;
        readonly progressValue?: number;
    }>();

    // A lookup keyed by FluxColor rather than a loose array, so adding a color to
    // FluxColor is a compile error here until the CSS-var mapping handles it.
    const FLUX_COLORS: Record<FluxColor, true> = {
        gray: true,
        primary: true,
        danger: true,
        info: true,
        success: true,
        warning: true
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

        const sourcePosition = source.position.value;
        const sourceSize = source.size.value;
        const targetPosition = target.position.value;
        const targetSize = target.size.value;

        const [autoSource, autoTarget] = autoSides(sourcePosition, sourceSize, targetPosition, targetSize);
        const sourceSide = props.fromSide ?? autoSource;
        const targetSide = props.toSide ?? autoTarget;

        // The endpoints sit a gap away from the node, so a line never touches the
        // card it points at.
        const fromPoint = offsetPoint(anchorPoint(sourcePosition, sourceSize, sourceSide), sourceSide, NODE_GAP);
        const toPoint = offsetPoint(anchorPoint(targetPosition, targetSize, targetSide), targetSide, NODE_GAP);

        const type = props.type ?? 'smoothstep';
        const path = type === 'straight'
            ? getStraightPath(fromPoint, toPoint)
            : type === 'bezier'
                ? getBezierPath(fromPoint, sourceSide, toPoint, targetSide)
                : getSmoothStepPath(fromPoint, sourceSide, toPoint, targetSide);

        return {
            path: path.path,
            labelX: path.labelX,
            labelY: path.labelY,
            fromX: fromPoint.x,
            fromY: fromPoint.y,
            toX: toPoint.x,
            toY: toPoint.y,
            // A straight connector rarely leaves along the side normal, so its
            // markers follow the line itself instead.
            fromMarkerPath: markerPath(markerStart.value, fromPoint, type === 'straight' ? unitVector(fromPoint, toPoint) : sideNormal(sourceSide)),
            toMarkerPath: markerPath(markerEnd.value, toPoint, type === 'straight' ? unitVector(toPoint, fromPoint) : sideNormal(targetSide))
        };
    });

    const spec = computed<FluxFlowEdgeSpec | null>(() => {
        const value = geometry.value;

        if (!value) {
            return null;
        }

        const progress = props.progressValue ?? 0;

        return {
            path: value.path,
            labelX: value.labelX,
            labelY: value.labelY,
            fromX: value.fromX,
            fromY: value.fromY,
            toX: value.toX,
            toY: value.toY,
            styleVars: {
                '--connection-color': resolveColor(props.color, 'var(--flow-line)'),
                '--connection-marker': resolveColor(props.color, 'var(--flow-line)'),
                '--connection-progress-color': resolveColor(props.progressColor, 'var(--primary-500)'),
                '--connection-progress': String(Math.min(Math.max(props.progressValue ?? 0, 0), 1))
            },
            animated: !!props.animated,
            dashed: !!props.dashed,
            dotted: !!props.dotted,
            fromMarkerPath: value.fromMarkerPath,
            fromMarkerFill: MARKER_FILLS[markerStart.value],
            toMarkerPath: value.toMarkerPath,
            toMarkerFill: MARKER_FILLS[markerEnd.value],
            fromActive: hasProgress.value && progress > 0,
            toActive: hasProgress.value && progress >= 1,
            hasProgress: hasProgress.value,
            label: props.label,
            icon: props.icon
        };
    });

    controller.registerEdge({id: uid, spec});

    onBeforeUnmount(() => controller.unregisterEdge(uid));

    function unitVector(from: FluxFlowPosition, to: FluxFlowPosition): readonly [number, number] {
        const length = Math.hypot(to.x - from.x, to.y - from.y);

        return length === 0 ? [0, 0] : [(to.x - from.x) / length, (to.y - from.y) / length];
    }

    function resolveColor(value: string | undefined, fallback: string): string {
        return value ? (Object.hasOwn(FLUX_COLORS, value) ? `var(--${value}-500)` : value) : fallback;
    }
</script>
