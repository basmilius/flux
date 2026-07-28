<template>
    <Preview :class="$style.bottomSheetPreview">
        <div :class="$style.overlayShade"/>

        <FluxBottomSheetTransition>
            <div
                v-if="visible"
                :class="[$style.overlay, $style.bottomSheet, $style.isCurrent]">
                <div :class="$style.bottomSheetSurface">
                    <FluxPane/>
                </div>
            </div>
        </FluxBottomSheetTransition>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { useInterval } from '@basmilius/common';
    import { FluxBottomSheetTransition, FluxPane } from '@flux-ui/components';
    import { ref } from 'vue';

    const visible = ref(true);

    useInterval(1500, () => {
        visible.value = !visible.value;
    });
</script>

<style
    lang="scss"
    module>
    .bottomSheetPreview {
        overflow: clip;
    }

    .bottomSheetPreview :local(.bottomSheet) {
        position: absolute;
        height: unset;
        width: unset;
        inset: 0;
        border-radius: var(--radius);
    }

    .bottomSheetPreview :local(.bottomSheetSurface) {
        height: 60%;

        :local(.pane) {
            height: 100%;
        }
    }

    .isCurrent,
    .bottomSheetTransitionLeaveActive {
        pointer-events: auto;
    }

    .overlayShade {
        position: absolute;
        height: unset;
        width: unset;
        inset: 0;

        &:not(:has(+ .overlay:not(.bottomSheetTransitionLeaveActive))) {
            opacity: 0;
        }
    }
</style>
