<template>
    <div style="display: flex; flex-flow: column; gap: 18px; align-items: flex-start">
        <div style="display: flex; gap: 9px">
            <span id="tour-create">
                <FluxPrimaryButton label="Create"/>
            </span>

            <span id="tour-search">
                <FluxSecondaryButton label="Search"/>
            </span>

            <span id="tour-settings">
                <FluxSecondaryButton label="Settings"/>
            </span>
        </div>

        <FluxSecondaryButton
            label="Start tour"
            @click="start"/>

        <FluxTour
            v-model:active="active"
            v-model:step="step"
            :steps="steps"/>
    </div>
</template>

<script
    setup
    lang="ts">
    import { FluxPrimaryButton, FluxSecondaryButton, FluxTour } from '@flux-ui/components';
    import { ref } from 'vue';

    const active = ref(false);
    const step = ref(0);

    const steps = [
        {target: '#tour-create', title: 'Create', content: 'Start by creating a new item here.'},
        {target: '#tour-search', title: 'Search', content: 'Quickly find anything in your workspace.'},
        {target: '#tour-settings', title: 'Settings', content: 'Tweak your preferences anytime.'}
    ];

    function start(): void {
        step.value = 0;
        active.value = true;
    }
</script>
