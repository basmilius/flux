<template>
    <Preview :class="$style.overlayPreview">
        <div :class="$style.overlayShade"/>

        <FluxOverlayTransition>
            <div
                v-if="visible"
                :class="[$style.overlay, $style.isCurrent]">
                <FluxPane/>
            </div>
        </FluxOverlayTransition>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxOverlayTransition, FluxPane } from '@flux-ui/components';
    import { useInterval } from '@flux-ui/internals';
    import { ref } from 'vue';

    const visible = ref(true);

    useInterval(1500, () => {
        visible.value = !visible.value;
    });
</script>

<style
    lang="scss"
    module>
    .overlayPreview {
        overflow: hidden;
    }

    .overlayPreview :local(.overlay) {
        position: absolute;
        height: unset;
        width: unset;
        border-radius: var(--radius);

        :local(.pane) {
            height: 150px;
            width: 75%;
        }
    }

    .isCurrent,
    .overlayTransitionLeaveActive {
        pointer-events: auto;
    }

    .overlayShade {
        position: absolute;
        height: unset;
        width: unset;
        inset: 0;

        &:not(:has(+ .overlay:not(.overlayTransitionLeaveActive))) {
            opacity: 0;
        }
    }
</style>
