<template>
    <div
        ref="el"
        :class="$style.flowNode"
        :style="{transform: `translate(${x}px, ${y}px)`}">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { computed, onBeforeUnmount, onMounted, shallowRef, useTemplateRef, watch } from 'vue';
    import { useFluxFlowInjection } from '~flux/flow/composable';
    import type { FluxFlowSize } from '~flux/flow/data';
    import $style from '~flux/flow/css/component/FlowNode.module.scss';

    const props = defineProps<{
        readonly id: string;
        readonly x: number;
        readonly y: number;
    }>();

    const el = useTemplateRef<HTMLElement>('el');
    const size = shallowRef<FluxFlowSize>({width: 0, height: 0});

    let observer: ResizeObserver | null = null;

    const controller = useFluxFlowInjection();

    const position = computed(() => ({x: props.x, y: props.y}));

    watch(() => props.id, (next, previous) => {
        controller.unregisterNode(previous);
        controller.registerNode({id: next, position, size, element: el});
    });

    onMounted(() => {
        controller.registerNode({id: props.id, position, size, element: el});
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
    });

    function measure(): void {
        const node = el.value;

        if (node) {
            size.value = {width: node.offsetWidth, height: node.offsetHeight};
        }
    }
</script>
