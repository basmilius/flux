<template>
    <FluxPane style="max-width: 390px">
        <FluxPaneBody style="display: flex; gap: 21px">
            <FluxFormFader
                direction="vertical"
                icon-leading="sun"
                icon-trailing="moon"
                label="Light"
                v-model="light"/>

            <FluxFormFader
                direction="vertical"
                icon-leading="gauge-high"
                icon-trailing="sliders-simple"
                label="Gain"
                v-model="gain"
                :formatter="percentage"/>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxFormFader, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { ref } from 'vue';

    const light = ref(70);
    const gain = ref(45);

    function percentage(value: number): string {
        return `${value}%`;
    }
</script>
