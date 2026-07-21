<template>
    <Teleport
        v-if="backdrop && box"
        :to="backdrop">
        <div
            :class="$style.flowGroup"
            :data-color="color"
            :style="frameStyle">
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
    import { computed, type CSSProperties, getCurrentInstance, onBeforeUnmount } from 'vue';
    import { useFluxFlowInjection } from '~flux/flow/composable';
    import type { FluxFlowBounds } from '~flux/flow/data';
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

    const uid = getCurrentInstance()!.uid;
    const controller = useFluxFlowInjection();

    const backdrop = controller.backdropElement;

    // An unknown id is skipped rather than reported: a group is decoration, and
    // a frame around the nodes that do exist is the useful outcome.
    const box = computed(() => {
        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;

        for (const id of nodes) {
            const node = controller.getNode(id);

            if (!node) {
                continue;
            }

            const {x, y} = node.position.value;
            const {width, height} = node.size.value;
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x + width);
            maxY = Math.max(maxY, y + height);
        }

        if (!Number.isFinite(minX)) {
            return null;
        }

        // The title rides inside the frame, so the frame reaches a band further
        // up than the padding alone and the nodes stay clear of the label.
        const band = title ? TITLE_BAND : 0;

        return {
            x: minX - padding,
            y: minY - padding - band,
            width: maxX - minX + padding * 2,
            height: maxY - minY + padding * 2 + band
        };
    });

    const bounds = computed<FluxFlowBounds | null>(() => {
        const value = box.value;

        if (!value) {
            return null;
        }

        return {
            minX: value.x,
            minY: value.y,
            maxX: value.x + value.width,
            maxY: value.y + value.height
        };
    });

    // Set in by the group's own padding, so the label and the cards inside the
    // frame share a left edge.
    const titleStyle = computed<CSSProperties>(() => ({
        top: `${padding}px`,
        left: `${padding}px`
    }));

    const frameStyle = computed<CSSProperties>(() => ({
        transform: `translate(${box.value?.x ?? 0}px, ${box.value?.y ?? 0}px)`,
        width: `${box.value?.width ?? 0}px`,
        height: `${box.value?.height ?? 0}px`
    }));

    controller.registerBox({id: uid, bounds});

    onBeforeUnmount(() => controller.unregisterBox(uid));
</script>
