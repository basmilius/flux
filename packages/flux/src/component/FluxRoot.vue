<template>
    <main
        :inert="inertMain"
        style="display: contents;">
        <slot/>
    </main>

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

    <FluxSnackbarProvider/>
    <FluxTooltipProvider/>
</template>

<script
    lang="ts"
    setup>
    import { watch } from 'vue';
    import { useBreakpointsProvider } from '@/composable';
    import { useFluxStore } from '@/data';
    import FluxAlert from './FluxAlert.vue';
    import FluxConfirm from './FluxConfirm.vue';
    import FluxPrompt from './FluxPrompt.vue';
    import FluxOverlay from './FluxOverlay.vue';
    import FluxSnackbarProvider from './FluxSnackbarProvider.vue';
    import FluxTooltipProvider from './FluxTooltipProvider.vue';

    useBreakpointsProvider();

    const {alerts, confirms, inertMain, prompts} = useFluxStore();

    watch(inertMain, (inert, _, onCleanup): void => {
        if (!inert) {
            return;
        }

        document.body.classList.add('is-locked');
        onCleanup(() => document.body.classList.remove('is-locked'));
    }, {immediate: true});
</script>
