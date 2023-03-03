<template>
    <main>
        <slot/>

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
    </main>
</template>

<script
    lang="ts"
    setup>
    import { storeToRefs } from 'pinia';
    import { useBreakpointsProvider } from '../composables';
    import { useFluxStore } from '../data';
    import { FluxAlert, FluxConfirm, FluxOverlay } from '.';

    useBreakpointsProvider();

    const fluxStore = useFluxStore();
    const {alerts, confirms} = storeToRefs(fluxStore);
</script>
