<template>
    <Preview :class="$style.slideOverPreview">
        <div :class="$style.overlayShade"/>

        <FluxSlideOverTransition>
            <div
                v-if="visible"
                :class="[$style.overlay, $style.slideOver, $style.isCurrent]">
                <FluxPane/>
            </div>
        </FluxSlideOverTransition>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxOverlayTransition, FluxPane, FluxSlideOverTransition } from '@flux-ui/components';
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
    .slideOverPreview {
        overflow: clip;
    }

    .slideOverPreview :local(.slideOver) {
        position: absolute;
        height: unset;
        width: unset;
        border-radius: var(--radius);

        :local(.pane) {
            height: 100%;
            width: 50%;
        }
    }

    .isCurrent,
    .slideOverTransitionLeaveActive {
        pointer-events: auto;
    }

    .overlayShade {
        position: absolute;
        height: unset;
        width: unset;
        inset: 0;

        &:not(:has(+ .overlay:not(.slideOverTransitionLeaveActive))) {
            opacity: 0;
        }
    }
</style>
