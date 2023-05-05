<template>
    <main data-flux-root>
        <div :inert="inertMain">
            <slot/>
        </div>

        <flux-overlay>
            <flux-alert
                v-for="alert of alerts"
                :key="alert.id"
                :alert="alert"/>
        </flux-overlay>

        <flux-overlay>
            <flux-confirm
                v-for="confirm of confirms"
                :key="confirm.id"
                :confirm="confirm"/>
        </flux-overlay>

        <flux-snackbar-provider/>
        <flux-tooltip-provider/>
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
