<template>
    <FluxFormField label="Rating">
        <FluxFormRating
            v-model="rating"
            :count="5"
            clearable/>
    </FluxFormField>
</template>

<script
    setup
    lang="ts">
    import { FluxFormField, FluxFormRating } from '@flux-ui/components';
    import { ref } from 'vue';

    const rating = ref<number | null>(3);
</script>
