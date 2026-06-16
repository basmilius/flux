<template>
    <div style="display: flex; flex-flow: column; gap: 18px; align-items: flex-start">
        <div style="display: flex; gap: 9px; flex-wrap: wrap">
            <span id="pos-bottom">
                <FluxSecondaryButton label="Bottom"/>
            </span>

            <span id="pos-top">
                <FluxSecondaryButton label="Top"/>
            </span>

            <span id="pos-right">
                <FluxSecondaryButton label="Right"/>
            </span>

            <span id="pos-left">
                <FluxSecondaryButton label="Left"/>
            </span>
        </div>

        <FluxSecondaryButton
            label="Start tour"
            @click="start"/>

        <FluxTour
            v-model:active="active"
            v-model:step="step">
            <FluxTourItem
                target="#pos-bottom"
                title="Bottom"
                position="bottom">
                The popover appears below the target.
            </FluxTourItem>

            <FluxTourItem
                target="#pos-top"
                title="Top"
                position="top">
                The popover appears above the target.
            </FluxTourItem>

            <FluxTourItem
                target="#pos-right"
                title="Right"
                position="right">
                The popover appears to the right of the target.
            </FluxTourItem>

            <FluxTourItem
                target="#pos-left"
                title="Left"
                position="left">
                The popover appears to the left of the target.
            </FluxTourItem>
        </FluxTour>
    </div>
</template>

<script
    setup
    lang="ts">
    import { FluxSecondaryButton, FluxTour, FluxTourItem } from '@flux-ui/components';
    import { ref } from 'vue';

    const active = ref(false);
    const step = ref(0);

    function start(): void {
        step.value = 0;
        active.value = true;
    }
</script>
