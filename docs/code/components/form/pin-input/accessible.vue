<template>
    <FluxFormField label="Verification code">
        <FluxFormPinInput
            v-model="code"
            aria-label="One-time code"
            :max-length="6"/>
    </FluxFormField>
</template>

<script
    setup
    lang="ts">
    import { FluxFormField, FluxFormPinInput } from '@flux-ui/components';
    import { ref } from 'vue';

    const code = ref('');
</script>
