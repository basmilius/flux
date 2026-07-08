<template>
    <FluxFormRadioGroup v-model="value">
        <FluxFormRadio
            value="yes"
            label="Yes"/>

        <FluxFormRadio
            value="no"
            label="No"/>
    </FluxFormRadioGroup>
</template>

<script
    setup
    lang="ts">
    import { FluxFormRadio, FluxFormRadioGroup } from '@flux-ui/components';
    import { ref } from 'vue';

    const value = ref('yes');
</script>
