<template>
    <Preview>
        <FluxPane style="max-width: 390px">
            <FluxPaneBody style="display: flex; flex-direction: column; gap: 9px">
                <FluxFormFader
                    label="Frequency"
                    v-model="frequency"
                    :formatter="percentage"/>

                <FluxFormFader
                    label="Resonance"
                    v-model="resonance"
                    :min="0"
                    :max="10"/>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxFormFader, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { ref } from 'vue';

    const frequency = ref(25);
    const resonance = ref(4);

    function percentage(value: number): string {
        return `${value}%`;
    }
</script>
