<template>
    <div
        ref="el"
        :class="$style.flowNode"
        :style="{transform: `translate(${position.x}px, ${position.y}px)`}">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { computed, inject, onBeforeUnmount, onMounted, provide, shallowRef, toRef, useTemplateRef, watch } from 'vue';
    import { useFluxFlowInjection } from '~flux/flow/composable';
    import { FluxFlowChainInjectionKey, type FluxFlowChainLink, FluxFlowNodeInjectionKey, type FluxFlowPortRecord, type FluxFlowPortRegistration, type FluxFlowPosition, type FluxFlowSize } from '~flux/flow/data';
    import $style from '~flux/flow/css/component/FlowNode.module.scss';

    const props = defineProps<{
        readonly id: string;
        readonly x?: number;
        readonly y?: number;
    }>();

    const el = useTemplateRef<HTMLElement>('el');
    const size = shallowRef<FluxFlowSize>({width: 0, height: 0});
    const anchor = shallowRef<FluxFlowPosition | null>(null);
    const ports = shallowRef<ReadonlyMap<string, FluxFlowPortRecord>>(new Map());

    const registrations = new Map<string, FluxFlowPortRegistration>();

    let observer: ResizeObserver | null = null;

    const controller = useFluxFlowInjection();
    const chain = inject(FluxFlowChainInjectionKey, null);

    // A node that carries its own coordinates keeps them, chain or not, so a
    // single link can be lifted out of the run without leaving the chain.
    const link: FluxFlowChainLink | null = chain && props.x === undefined && props.y === undefined
        ? {id: toRef(() => props.id), size}
        : null;

    const position = computed<FluxFlowPosition>(() => {
        const placed = link ? chain?.positionOf(props.id) : null;

        return placed ?? {x: props.x ?? 0, y: props.y ?? 0};
    });

    if (link) {
        chain?.registerLink(link);
    }

    provide(FluxFlowNodeInjectionKey, {
        registerPort(port: FluxFlowPortRegistration): void {
            registrations.set(port.id, port);
            measure();
        },
        unregisterPort(id: string): void {
            registrations.delete(id);
            measure();
        }
    });

    watch(() => props.id, (next, previous) => {
        controller.unregisterNode(previous);
        controller.registerNode({id: next, position, size, element: el, anchor, ports});
    });

    onMounted(() => {
        controller.registerNode({id: props.id, position, size, element: el, anchor, ports});
        measure();
        observer = new ResizeObserver(measure);

        if (el.value) {
            observer.observe(el.value);
        }
    });

    onBeforeUnmount(() => {
        observer?.disconnect();
        observer = null;
        controller.unregisterNode(props.id);

        if (link) {
            chain?.unregisterLink(link);
        }
    });

    function measure(): void {
        const node = el.value;

        if (!node) {
            return;
        }

        size.value = {width: node.offsetWidth, height: node.offsetHeight};
        anchor.value = measureAnchor(node);
        ports.value = measurePorts(node);
    }

    /**
     * The centre of an element inside the node, in the node's own layout pixels.
     * Rects are divided by the live zoom rather than read through offsetLeft,
     * which would be relative to whichever ancestor happens to be positioned.
     */
    function measureOffset(node: HTMLElement, element: Element): FluxFlowPosition {
        const nodeRect = node.getBoundingClientRect();
        const rect = element.getBoundingClientRect();
        const zoom = nodeRect.width / node.offsetWidth;

        return {
            x: (rect.left + rect.width / 2 - nodeRect.left) / zoom,
            y: (rect.top + rect.height / 2 - nodeRect.top) / zoom
        };
    }

    function measureAnchor(node: HTMLElement): FluxFlowPosition | null {
        const element = node.querySelector('[data-flow-anchor]');

        if (!element || node.offsetWidth === 0) {
            return null;
        }

        return measureOffset(node, element);
    }

    function measurePorts(node: HTMLElement): ReadonlyMap<string, FluxFlowPortRecord> {
        const measured = new Map<string, FluxFlowPortRecord>();

        if (node.offsetWidth === 0) {
            return measured;
        }

        for (const {id, side, element} of registrations.values()) {
            if (element.value) {
                measured.set(id, {id, side, offset: measureOffset(node, element.value)});
            }
        }

        return measured;
    }
</script>
