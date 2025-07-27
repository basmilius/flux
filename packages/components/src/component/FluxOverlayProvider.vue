<template>
    <div :class="$style.overlayProvider">
        <div :class="$style.overlayShade"/>
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
    import { useFluxStore } from '$flux/data';
    import FluxAlert from './FluxAlert.vue';
    import FluxConfirm from './FluxConfirm.vue';
    import FluxOverlay from './FluxOverlay.vue';
    import FluxPrompt from './FluxPrompt.vue';
    import $style from '$flux/css/component/Overlay.module.scss';

    const {alerts, confirms, prompts} = useFluxStore();
</script>
