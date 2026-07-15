<template>
    <FluxPane style="max-width: 390px">
        <FluxPaneBody style="display: flex; flex-direction: column; gap: 9px">
            <FluxFormFader
                icon-leading="gauge-high"
                label="Frequency"
                v-model="frequency"
                :formatter="percentage"/>

            <FluxFormFader
                icon-leading="bolt"
                icon-trailing="sliders-simple"
                label="Resonance"
                v-model="resonance"
                :min="0"
                :max="10"/>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxFormFader, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { ref } from 'vue';

    const frequency = ref(60);
    const resonance = ref(4);

    function percentage(value: number): string {
        return `${value}%`;
    }
</script>
