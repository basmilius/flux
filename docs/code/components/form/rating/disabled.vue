<template>
    <FluxFormRating
        v-model="rating"
        disabled/>
</template>

<script
    setup
    lang="ts">
    import { FluxFormRating } from '@flux-ui/components';
    import { ref } from 'vue';

    const rating = ref<number | null>(4);
</script>
