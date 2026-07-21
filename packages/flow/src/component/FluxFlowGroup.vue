<template>
    <Teleport
        v-if="backdrop && box"
        :to="backdrop">
        <div
            :class="$style.flowGroup"
            :data-color="color"
            :style="style">
            <span
                v-if="title"
                :class="$style.flowGroupTitle"
                :style="titleStyle">{{ title }}</span>
        </div>
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
    // air before the first node. The frame already reserves the padding the
    // title is set in by, so that is not counted twice.
    const TITLE_BAND = 45;

    const controller = useFluxFlowInjection();

    const backdrop = controller.backdropElement;

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

    // Set in by the group's own padding, so the label lines up with the cards.
    const titleStyle = computed<CSSProperties>(() => ({
        top: `${padding}px`,
        left: `${padding}px`
    }));
</script>
