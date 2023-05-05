<template>
    <main data-flux-root>
        <div :inert="inertMain">
            <slot/>
        </div>

        <FluxOverlay>
            <FluxAlert
                v-for="alert of alerts"
                :key="alert.id"
                :alert="alert"/>
        </FluxOverlay>

        <FluxOverlay>
            <FluxConfirm
                v-for="confirm of confirms"
                :key="confirm.id"
                :confirm="confirm"/>
        </FluxOverlay>

        <FluxSnackbarProvider/>
        <FluxTooltipProvider/>
    </main>
</template>

<script
    lang="ts"
    setup>
    import { storeToRefs } from 'pinia';
    import { useBreakpointsProvider } from '../composables';
    import { useFluxStore } from '../data';
    import FluxAlert from './FluxAlert.vue';
    import FluxConfirm from './FluxConfirm.vue';
    import FluxOverlay from './FluxOverlay.vue';
    import FluxSnackbarProvider from './FluxSnackbarProvider.vue';
    import FluxTooltipProvider from './FluxTooltipProvider.vue';

    useBreakpointsProvider();

    const fluxStore = useFluxStore();
    const {alerts, confirms, inertMain} = storeToRefs(fluxStore);
</script>
