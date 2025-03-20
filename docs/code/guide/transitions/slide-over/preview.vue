<template>
    <Preview :class="$style.slideOverPreview">
        <FluxSlideOverTransition>
            <div
                v-if="visible"
                :class="[$style.overlay, $style.slideOver]">
                <FluxPane/>
            </div>
        </FluxSlideOverTransition>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxSlideOverTransition } from '@basmilius/flux';
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
    .slideOverPreview {
        overflow: clip;

        :local(.overlay) {
            position: absolute;
            height: unset;
            width: unset;
            border-radius: var(--radius);
        }

        :local(.slideOver) :local(.pane) {
            height: 100%;
            width: 50%;
        }
    }
</style>
