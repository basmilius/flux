<template>
    <Teleport
        v-if="backdrop && box"
        :to="backdrop">
        <div
            :class="$style.flowGroup"
            :data-color="color"
            :style="style"/>
    </Teleport>

    <!-- The title rides in the foreground layer, above the connectors, so a line
         drawn through the group never paints over it. -->
    <Teleport
        v-if="foreground && box && title"
        :to="foreground">
        <span
            :class="$style.flowGroupTitle"
            :data-color="color"
            :style="titleStyle">{{ title }}</span>
    </Teleport>
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor } from '@flux-ui/types';
    import { computed, type CSSProperties } from 'vue';
    import { useFluxFlowInjection } from '~flux/flow/composable';
    import { useFlowBox } from '~flux/flow/composable/private';
    import { boundsOfNodes } from '~flux/flow/util';
    import $style from '~flux/flow/css/component/FlowGroup.module.scss';

    const {
        color,
        nodes,
        padding = 21,
        title
    } = defineProps<{
        readonly color?: FluxColor;
        readonly nodes: readonly string[];
        readonly padding?: number;
        readonly title?: string;
    }>();

    // The strip the title rides in, at the top of the frame: its own 30px and
    // 30px of air before the first node, so the connector stays visible below the
    // label. The frame already reserves the padding the title is set in by, so
    // that is not counted twice.
    const TITLE_BAND = 60;

    const controller = useFluxFlowInjection();

    const backdrop = controller.backdropElement;
    const foreground = controller.foregroundElement;

    // An unknown id is skipped rather than reported: a group is decoration, and
    // a frame around the nodes that do exist is the useful outcome.
    const box = computed(() => {
        const bounds = boundsOfNodes(nodes
            .map(id => controller.getNode(id))
            .filter(node => node !== undefined));

        if (!bounds) {
            return null;
        }

        // The title rides inside the frame, so the frame reaches a band further
        // up than the padding alone and the nodes stay clear of the label.
        const band = title ? TITLE_BAND : 0;

        return {
            x: bounds.minX - padding,
            y: bounds.minY - padding - band,
            width: bounds.maxX - bounds.minX + padding * 2,
            height: bounds.maxY - bounds.minY + padding * 2 + band
        };
    });

    const {style} = useFlowBox(() => box.value);

    // Placed in world coordinates, set in by the group's own padding so the label
    // lines up with the cards standing inside the frame.
    const titleStyle = computed<CSSProperties>(() => ({
        transform: `translate(${(box.value?.x ?? 0) + padding}px, ${(box.value?.y ?? 0) + padding}px)`
    }));
</script>
