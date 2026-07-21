<template>
    <span
        ref="el"
        :class="$style.flowPort"/>
</template>

<script
    lang="ts"
    setup>
    import { computed, inject, onBeforeUnmount, onMounted, useTemplateRef, watch } from 'vue';
    import { FluxFlowNodeInjectionKey, type FluxFlowPortRegistration, type FluxFlowSide } from '~flux/flow/data';
    import $style from '~flux/flow/css/component/FlowPort.module.scss';

    const props = defineProps<{
        readonly id: string;
        readonly side?: FluxFlowSide;
    }>();

    const node = inject(FluxFlowNodeInjectionKey);

    if (!node) {
        throw new Error('<FluxFlowPort> must be used within a <FluxFlowNode>.');
    }

    const el = useTemplateRef<HTMLElement>('el');

    const registration = computed<FluxFlowPortRegistration>(() => ({id: props.id, side: props.side, element: el}));

    watch(registration, (next, previous) => {
        node.unregisterPort(previous.id);
        node.registerPort(next);
    });

    onMounted(() => node.registerPort(registration.value));
    onBeforeUnmount(() => node.unregisterPort(props.id));
</script>
