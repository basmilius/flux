<template>
    <FluxFormRating
        v-model="rating"
        icon="heart"/>
</template>

<script
    setup
    lang="ts">
    import { FluxFormRating } from '@flux-ui/components';
    import { ref } from 'vue';

    const rating = ref<number | null>(3);
</script>
