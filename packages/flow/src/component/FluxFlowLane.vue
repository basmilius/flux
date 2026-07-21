<template>
    <Teleport
        v-if="backdrop && band"
        :to="backdrop">
        <div
            :class="$style.flowLane"
            :data-color="color"
            :data-orientation="isRow ? 'row' : 'column'"
            :style="style">
            <span
                v-if="title"
                :class="$style.flowLaneTitle">{{ title }}</span>
        </div>
    </Teleport>
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor } from '@flux-ui/types';
    import { computed } from 'vue';
    import { useFluxFlowInjection } from '~flux/flow/composable';
    import { useFlowBox } from '~flux/flow/composable/private';
    import $style from '~flux/flow/css/component/FlowLane.module.scss';

    const {
        color,
        height,
        padding = 21,
        title,
        width,
        x = 0,
        y = 0
    } = defineProps<{
        readonly color?: FluxColor;
        readonly height?: number;
        readonly padding?: number;
        readonly title?: string;
        readonly width?: number;
        readonly x?: number;
        readonly y?: number;
    }>();

    // The strip the title rides in, at the head of the lane.
    const GUTTER = 30;

    const controller = useFluxFlowInjection();

    const backdrop = controller.backdropElement;

    // `y` and `height` describe a row, `x` and `width` a column. The pair you
    // give is the lane's own axis; the other one spans the whole flow.
    const isRow = computed(() => height !== undefined);

    const band = computed(() => {
        const nodes = controller.nodeBounds.value;

        if (!nodes) {
            return null;
        }

        if (isRow.value) {
            const start = nodes.minX - padding - GUTTER;

            return {
                x: start,
                y,
                width: nodes.maxX + padding - start,
                height: height ?? 0
            };
        }

        const start = nodes.minY - padding - GUTTER;

        return {
            x,
            y: start,
            width: width ?? 0,
            height: nodes.maxY + padding - start
        };
    });

    const {style} = useFlowBox(() => band.value);
</script>
