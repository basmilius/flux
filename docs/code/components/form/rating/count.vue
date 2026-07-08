<template>
    <FluxFormRating
        v-model="rating"
        :count="10"/>
</template>

<script
    setup
    lang="ts">
    import { FluxFormRating } from '@flux-ui/components';
    import { ref } from 'vue';

    const rating = ref<number | null>(7);
</script>
