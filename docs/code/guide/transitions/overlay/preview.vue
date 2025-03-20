<template>
    <Preview :class="$style.overlayPreview">
        <FluxOverlayTransition>
            <div
                v-if="visible"
                :class="$style.overlay">
                <FluxPane/>
            </div>
        </FluxOverlayTransition>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxOverlayTransition, FluxPane } from '@basmilius/flux';
    import { useInterval } from '@basmilius/flux-internals';
    import { ref } from 'vue';

    const visible = ref(true);

    useInterval(1500, () => {
        visible.value = !visible.value;
    });
</script>

<style
    lang="scss"
    module>
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
</style>
