<template>
    <FluxStack direction="vertical" :style="{ alignItems: 'center' }">

        <FluxFormField label="Pin code">
            <FluxFormPinInput
                :is-private="isPrivate"/>
        </FluxFormField>

        <FluxFormField label="Private?">
            <FluxToggle
                v-model="isPrivate"/>
        </FluxFormField>
    </FluxStack>
</template>

<script
    setup
    lang="ts">
    import { FluxFormField, FluxFormPinInput, FluxStack, FluxToggle } from '@flux-ui/components';
    import { ref } from 'vue';

    const isPrivate = ref(false);
</script>
