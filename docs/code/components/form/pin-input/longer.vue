<template>
    <FluxFormField label="Pin code">
        <FluxFormPinInput
            :max-length="10"/>
    </FluxFormField>
</template>

<script
    setup
    lang="ts">
    import { FluxFormField, FluxFormPinInput } from '@flux-ui/components';
</script>
