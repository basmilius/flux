<template>
    <FluxFlex
        align="center"
        direction="vertical"
        :gap="18">
        <FluxFormField label="Pin code">
            <FluxFormPinInput
                :is-private="isPrivate"/>
        </FluxFormField>

        <FluxFormField label="Private?">
            <FluxToggle
                v-model="isPrivate"/>
        </FluxFormField>
    </FluxFlex>
</template>

<script
    setup
    lang="ts">
    import { FluxFlex, FluxFormField, FluxFormPinInput, FluxToggle } from '@flux-ui/components';
    import { ref } from 'vue';

    const isPrivate = ref(false);
</script>
