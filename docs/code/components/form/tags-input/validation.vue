<template>
    <FluxFormTagsInput
        v-model="emails"
        :validate="validate"
        placeholder="Add email addresses"/>
</template>

<script
    setup
    lang="ts">
    import { FluxFormTagsInput } from '@flux-ui/components';
    import { ref } from 'vue';

    const emails = ref(['bas@example.com']);

    function validate(value: string): boolean {
        return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
    }
</script>
