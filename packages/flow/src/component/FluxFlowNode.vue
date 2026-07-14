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
    import { computed, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue';
    import { useFluxFlowInjection } from '~flux/flow/composable';
    import type { FluxFlowSize } from '~flux/flow/data';
    import $style from '~flux/flow/css/component/FlowNode.module.scss';

    const props = defineProps<{
        readonly id: string;
        readonly x: number;
        readonly y: number;
    }>();

    const controller = useFluxFlowInjection();

    const el = ref<HTMLElement | null>(null);
    const size = shallowRef<FluxFlowSize>({width: 0, height: 0});
    const position = computed(() => ({x: props.x, y: props.y}));

    let observer: ResizeObserver | null = null;

    function measure(): void {
        const node = el.value;

        if (node) {
            size.value = {width: node.offsetWidth, height: node.offsetHeight};
        }
    }

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

    watch(() => props.id, (next, previous) => {
        controller.unregisterNode(previous);
        controller.registerNode({id: next, position, size, element: el});
    });
</script>
