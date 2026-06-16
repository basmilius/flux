<template>
    <FluxFormRating
        v-model="rating"
        clearable/>
</template>

<script
    setup
    lang="ts">
    import { FluxFormRating } from '@flux-ui/components';
    import { ref } from 'vue';

    const rating = ref<number | null>(null);
</script>
