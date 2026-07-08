<template>
    <FluxFormRadioGroup v-model="value">
        <FluxFormRadio
            value="standard"
            label="Standard shipping"/>

        <FluxFormRadio
            value="express"
            label="Express shipping"/>

        <FluxFormRadio
            value="overnight"
            label="Overnight shipping"
            sub-label="Currently unavailable in your region."
            disabled/>
    </FluxFormRadioGroup>
</template>

<script
    setup
    lang="ts">
    import { FluxFormRadio, FluxFormRadioGroup } from '@flux-ui/components';
    import { ref } from 'vue';

    const value = ref('standard');
</script>
