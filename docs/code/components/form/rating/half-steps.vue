<template>
    <FluxFormRating
        v-model="rating"
        allow-half/>
</template>

<script
    setup
    lang="ts">
    import { FluxFormRating } from '@flux-ui/components';
    import { ref } from 'vue';

    const rating = ref<number | null>(3.5);
</script>
