<template>
    <Preview>
        <FluxFormRadioGroup v-model="plan">
            <FluxFormRadio
                value="free"
                label="Free"/>

            <FluxFormRadio
                value="pro"
                label="Pro"/>

            <FluxFormRadio
                value="enterprise"
                label="Enterprise"
                disabled/>
        </FluxFormRadioGroup>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxFormRadio, FluxFormRadioGroup } from '@flux-ui/components';
    import { ref } from 'vue';

    const plan = ref('pro');
</script>
