<template>
    <Preview :class="$style.sheetPreview">
        <div :class="$style.overlayShade"/>

        <FluxSheetTransition>
            <div
                v-if="visible"
                :class="[$style.overlay, $style.sheet, $style.isBottom, $style.isCurrent]">
                <div :class="[$style.sheetSurface, $style.isBottom]">
                    <FluxPane/>
                </div>
            </div>
        </FluxSheetTransition>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { useInterval } from '@basmilius/common';
    import { FluxPane, FluxSheetTransition } from '@flux-ui/components';
    import { ref } from 'vue';

    const visible = ref(true);

    useInterval(1500, () => {
        visible.value = !visible.value;
    });
</script>

<style
    lang="scss"
    module>
    .sheetPreview {
        overflow: clip;
    }

    .sheetPreview :local(.sheet) {
        position: absolute;
        height: unset;
        width: unset;
        inset: 0;
        border-radius: var(--radius);
    }

    .sheetPreview :local(.sheetSurface) {
        height: 60%;

        :local(.pane) {
            height: 100%;
        }
    }

    .isCurrent,
    .sheetTransitionLeaveActive {
        pointer-events: auto;
    }

    .overlayShade {
        position: absolute;
        height: unset;
        width: unset;
        inset: 0;

        &:not(:has(+ .overlay:not(.sheetTransitionLeaveActive))) {
            opacity: 0;
        }
    }
</style>
