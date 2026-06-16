<template>
    <div
        ref="root"
        style="display: flex; flex-flow: column; gap: 18px; align-items: flex-start">
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
            :root="root">
            <FluxTourItem
                target="#tour-create"
                title="Create">
                Start by creating a new item here.
            </FluxTourItem>

            <FluxTourItem
                target="#tour-search"
                title="Search">
                Quickly find anything in your workspace.
            </FluxTourItem>

            <FluxTourItem
                target="#tour-settings"
                title="Settings">
                Tweak your preferences anytime.
            </FluxTourItem>
        </FluxTour>
    </div>
</template>

<script
    setup
    lang="ts">
    import { FluxPrimaryButton, FluxSecondaryButton, FluxTour, FluxTourItem } from '@flux-ui/components';
    import { ref } from 'vue';

    const root = ref<HTMLElement>();

    const active = ref(false);
    const step = ref(0);

    function start(): void {
        step.value = 0;
        active.value = true;
    }
</script>
