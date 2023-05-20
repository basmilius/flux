<template>
    <main data-flux-root>
        <div :inert="inertMain">
            <slot/>
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

        <FluxSnackbarProvider/>
        <FluxTooltipProvider/>
    </main>
</template>

<script
    lang="ts"
    setup>
    import { useBreakpointsProvider } from '@/composables';
    import { storeToRefs, useFluxStore } from '@/data';
    import FluxAlert from './FluxAlert.vue';
    import FluxConfirm from './FluxConfirm.vue';
    import FluxOverlay from './FluxOverlay.vue';
    import FluxSnackbarProvider from './FluxSnackbarProvider.vue';
    import FluxTooltipProvider from './FluxTooltipProvider.vue';

    useBreakpointsProvider();

    const fluxStore = useFluxStore();
    const {alerts, confirms, inertMain} = storeToRefs(fluxStore);
</script>
