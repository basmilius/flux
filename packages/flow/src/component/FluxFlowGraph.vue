<template>
    <slot/>
</template>

<script
    lang="ts"
    setup>
    import { computed, provide, shallowReactive, useSlots } from 'vue';
    import { useFlowLayout, useFlowTrunkLayout } from '~flux/flow/composable';
    import { type FluxFlowDirection, FluxFlowPlacementInjectionKey, type FluxFlowPlacementLink } from '~flux/flow/data';
    import { flattenFragments, LABELLED_GAP } from '~flux/flow/util';
    import FluxFlowConnection from './FluxFlowConnection.vue';

    const {
        x = 0,
        y = 0,
        direction = 'vertical',
        indent,
        layerGap,
        nodeGap = 45,
        trunk
    } = defineProps<{
        readonly x?: number;
        readonly y?: number;
        readonly direction?: FluxFlowDirection;
        /**
         * The ids that form the trunk, in the order they run down it. Naming
         * them lays the graph out as a trunk with branches instead of in layers.
         */
        readonly trunk?: readonly string[];
        /** Trunk only: the x a branch adds per level it hangs off the trunk. */
        readonly indent?: number;
        readonly layerGap?: number;
        readonly nodeGap?: number;
    }>();

    defineSlots<{
        default(): any;
    }>();

    // The gap between two layers, or between a branch and the next trunk node,
    // wired with bare connectors. One carrying a badge needs more room, which is
    // what LABELLED_GAP is for.
    const LAYER_GAP = 60;

    // Trunk only: the x a branch adds per level when nothing on it is labelled.
    const INDENT = 180;

    const slots = useSlots();

    const links = shallowReactive<FluxFlowPlacementLink[]>([]);

    /**
     * The graph the layout runs on, read off the connectors written inside. They
     * are the wiring already, so the shape of the flow never has to be spelled
     * out twice. A connector that carries a badge is noted too: the standard gap
     * between two layers leaves no room for one.
     */
    const wiring = computed(() => {
        const edges: { from: string; to: string }[] = [];

        let labelled = false;

        for (const vnode of flattenFragments(slots.default?.() ?? [])) {
            const {from, to, label, icon} = vnode.props ?? {};

            if (vnode.type === FluxFlowConnection && typeof from === 'string' && typeof to === 'string') {
                edges.push({from, to});
                labelled ||= !!label || !!icon;
            }
        }

        return {edges, labelled};
    });

    /**
     * The layout, run over the sizes the nodes measured for themselves rather
     * than over the guess either layout falls back on without a DOM.
     */
    const positions = computed(() => {
        const measured = links.map(link => ({
            id: link.id.value,
            width: link.size.value.width,
            height: link.size.value.height,
            anchor: link.anchor.value
        }));
        const {edges, labelled} = wiring.value;

        if (trunk) {
            // A branch runs sideways, so a badge on one needs room across rather
            // than down: the indent is what has to give, not the gap.
            return useFlowTrunkLayout(measured, edges, trunk, {
                x,
                y,
                indent: indent ?? (labelled ? LABELLED_GAP.horizontal : INDENT),
                nodeGap,
                trunkGap: layerGap ?? LAYER_GAP
            }).positions;
        }

        return useFlowLayout(measured, edges, {
            x,
            y,
            direction,
            layerGap: layerGap ?? (labelled ? LABELLED_GAP[direction] : LAYER_GAP),
            nodeGap
        }).positions;
    });

    provide(FluxFlowPlacementInjectionKey, {
        positionOf: (id: string) => positions.value[id] ?? null,
        registerLink: link => void links.push(link),
        unregisterLink: link => {
            const index = links.indexOf(link);

            if (index !== -1) {
                links.splice(index, 1);
            }
        }
    });
</script>
