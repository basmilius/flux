<template>
    <div :class="$style.overlayProvider">
        <div
            :class="$style.overlayShade"
            :style="shadeStyle"/>
    </div>

    <FluxOverlay size="medium">
        <FluxAlert
            v-for="alert of alerts"
            :key="alert.id"
            :alert="alert"/>
    </FluxOverlay>

    <FluxOverlay size="medium">
        <FluxConfirm
            v-for="confirm of confirms"
            :key="confirm.id"
            :confirm="confirm"/>
    </FluxOverlay>

    <FluxOverlay size="medium">
        <FluxPrompt
            v-for="prompt of prompts"
            :key="prompt.id"
            :prompt="prompt"/>
    </FluxOverlay>
</template>

<script
    lang="ts"
    setup>
    import { computed, unref } from 'vue';
    import { useFluxStore } from '~flux/components/data';
    import FluxAlert from './FluxAlert.vue';
    import FluxConfirm from './FluxConfirm.vue';
    import FluxOverlay from './FluxOverlay.vue';
    import FluxPrompt from './FluxPrompt.vue';
    import $style from '~flux/components/css/component/Overlay.module.scss';

    const {alerts, confirms, prompts, shadeOpacity} = useFluxStore();

    // A dialog only lowers the shade while a gesture drives it, and that value is
    // already animated frame by frame; transitioning it again would trail the finger.
    const shadeStyle = computed(() => ({
        '--overlay-shade-opacity': unref(shadeOpacity),
        transition: unref(shadeOpacity) < 1 ? 'none' : undefined
    }));
</script>
