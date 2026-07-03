<template>
    <FluxFormRadioGroup v-model="value">
        <FluxFormRadio value="standard">
            <strong>Standard shipping</strong>&nbsp;&mdash; 3 to 5 business days
        </FluxFormRadio>

        <FluxFormRadio value="express">
            <strong>Express shipping</strong>&nbsp;&mdash; next business day
        </FluxFormRadio>
    </FluxFormRadioGroup>
</template>

<script
    setup
    lang="ts">
    import { FluxFormRadio, FluxFormRadioGroup } from '@flux-ui/components';
    import { ref } from 'vue';

    const value = ref('standard');
</script>
