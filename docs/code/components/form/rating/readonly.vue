<template>
    <FluxFormRating
        v-model="rating"
        allow-half
        is-readonly/>
</template>

<script
    setup
    lang="ts">
    import { FluxFormRating } from '@flux-ui/components';
    import { ref } from 'vue';

    const rating = ref<number | null>(4.5);
</script>
