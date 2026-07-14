<template>
    <!-- FluxFlowConnection registers itself and is drawn in the shared edge layer of the surrounding FluxFlow. -->
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import { computed, getCurrentInstance, onBeforeUnmount } from 'vue';
    import { useFluxFlowInjection } from '~flux/flow/composable';
    import type { FluxFlowConnectionType, FluxFlowEdgeSpec, FluxFlowMarkers, FluxFlowSide } from '~flux/flow/data';
    import { anchorPoint, autoSides, getBezierPath, getSmoothStepPath, getStraightPath } from '~flux/flow/util';

    const props = defineProps<{
        readonly from: string;
        readonly to: string;
        readonly fromSide?: FluxFlowSide;
        readonly toSide?: FluxFlowSide;
        readonly type?: FluxFlowConnectionType;
        readonly color?: FluxColor | string;
        readonly label?: string;
        readonly icon?: FluxIconName;
        readonly dashed?: boolean;
        readonly dotted?: boolean;
        readonly markers?: FluxFlowMarkers;
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

    const controller = useFluxFlowInjection();
    const uid = getCurrentInstance()!.uid;

    const resolveColor = (value: string | undefined, fallback: string): string =>
        value ? (Object.hasOwn(FLUX_COLORS, value) ? `var(--${value}-500)` : value) : fallback;

    const hasProgress = computed(() => props.progressValue !== undefined && props.progressValue !== null);

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

        const fromPoint = anchorPoint(sourcePosition, sourceSize, sourceSide);
        const toPoint = anchorPoint(targetPosition, targetSize, targetSide);

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
            toY: toPoint.y
        };
    });

    const spec = computed<FluxFlowEdgeSpec | null>(() => {
        const value = geometry.value;

        if (!value) {
            return null;
        }

        const markers = props.markers ?? 'both';
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
                '--connection-marker': resolveColor(props.color, 'var(--gray-300)'),
                '--connection-progress-color': resolveColor(props.progressColor, 'var(--primary-500)'),
                '--connection-progress': String(Math.min(Math.max(props.progressValue ?? 0, 0), 1))
            },
            dashed: !!props.dashed,
            dotted: !!props.dotted,
            showFrom: markers === 'both' || markers === 'from',
            showTo: markers === 'both' || markers === 'to',
            fromActive: hasProgress.value && progress > 0,
            toActive: hasProgress.value && progress >= 1,
            hasProgress: hasProgress.value,
            label: props.label,
            icon: props.icon
        };
    });

    controller.registerEdge({id: uid, spec});

    onBeforeUnmount(() => controller.unregisterEdge(uid));
</script>
