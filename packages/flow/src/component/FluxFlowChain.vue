<template>
    <slot/>

    <FluxFlowConnection
        v-for="pair of autoConnections"
        :key="`${pair.from} ${pair.to}`"
        :from="pair.from"
        :to="pair.to"/>
</template>

<script
    lang="ts"
    setup>
    import { computed, Fragment, provide, shallowReactive, useSlots, type VNode } from 'vue';
    import { type FluxFlowAlign, FluxFlowChainInjectionKey, type FluxFlowChainLink, type FluxFlowDirection, type FluxFlowPosition } from '~flux/flow/data';
    import FluxFlowConnection from './FluxFlowConnection.vue';

    const {
        x = 0,
        y = 0,
        gap = 60,
        labelGap,
        direction = 'vertical',
        align = 'center',
        autoConnect = true
    } = defineProps<{
        readonly x?: number;
        readonly y?: number;
        readonly gap?: number;
        readonly labelGap?: number;
        readonly direction?: FluxFlowDirection;
        readonly align?: FluxFlowAlign;
        readonly autoConnect?: boolean;
    }>();

    defineSlots<{
        default(): any;
    }>();

    /**
     * The room a segment gets when its connector carries a label: a 28px badge
     * plus 6px of cut air, the 9px each end keeps from a node and a visible
     * stretch of line. A horizontal chain leaves more, since a badge there is as
     * wide as its text.
     */
    const LABEL_GAP: Record<FluxFlowDirection, number> = {
        vertical: 105,
        horizontal: 210
    };

    const slots = useSlots();

    const links = shallowReactive<FluxFlowChainLink[]>([]);

    const positions = computed(() => {
        const placed = new Map<string, FluxFlowPosition>();
        const sizes = links.map(link => link.size.value);
        const isVertical = direction === 'vertical';
        const extents = sizes.map(size => (isVertical ? size.width : size.height));
        const widest = Math.max(0, ...extents);

        let main = 0;

        links.forEach((link, index) => {
            const size = sizes[index];
            const offset = crossOffset(widest, extents[index]);

            placed.set(link.id.value, isVertical
                ? {x: x + offset, y: y + main}
                : {x: x + main, y: y + offset});

            main += (isVertical ? size.height : size.width) + gapAfter(index);
        });

        return placed;
    });

    /**
     * The pairs the chain wires up itself: every two neighbouring links, minus
     * the ones a connector of your own already covers.
     */
    const autoConnections = computed(() => {
        if (!autoConnect) {
            return [];
        }

        const claimed = claimedPairs.value;

        return links
            .slice(1)
            .map((link, index) => ({from: links[index].id.value, to: link.id.value}))
            .filter(pair => !claimed.has(`${pair.from} ${pair.to}`));
    });

    /**
     * The `from` / `to` pairs written inside the chain, against whether that
     * connector carries a badge: one of your own replaces the automatic one
     * instead of doubling it, and a labelled one also widens its segment.
     */
    const claimedPairs = computed(() => {
        const claimed = new Map<string, boolean>();

        for (const vnode of flatten(slots.default?.() ?? [])) {
            const {from, to, label, icon} = vnode.props ?? {};

            if (vnode.type === FluxFlowConnection && typeof from === 'string' && typeof to === 'string') {
                claimed.set(`${from} ${to}`, !!label || !!icon);
            }
        }

        return claimed;
    });

    provide(FluxFlowChainInjectionKey, {
        positionOf: (id: string) => positions.value.get(id) ?? null,
        registerLink: link => void links.push(link),
        unregisterLink: link => {
            const index = links.indexOf(link);

            if (index !== -1) {
                links.splice(index, 1);
            }
        }
    });

    /**
     * The space after the link at `index`, widened once its connector carries a
     * badge: the standard gap leaves no room for one.
     */
    function gapAfter(index: number): number {
        const next = links[index + 1];

        if (!next || !claimedPairs.value.get(`${links[index].id.value} ${next.id.value}`)) {
            return gap;
        }

        return Math.max(labelGap ?? LABEL_GAP[direction], gap);
    }

    /**
     * Where a link of `extent` sits across the run. Centring keeps the
     * connectors straight when a 300px card and a pill share a chain.
     */
    function crossOffset(widest: number, extent: number): number {
        switch (align) {
            case 'start':
                return 0;
            case 'center':
                return (widest - extent) / 2;
            case 'end':
                return widest - extent;
        }
    }

    function flatten(vnodes: readonly VNode[]): VNode[] {
        return vnodes.flatMap(vnode => (vnode.type === Fragment && Array.isArray(vnode.children)
            ? flatten(vnode.children as VNode[])
            : [vnode]));
    }
</script>
