<template>
    <Preview>
        <FluxFormRating v-model="rating"/>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxFormRating } from '@flux-ui/components';
    import { ref } from 'vue';

    const rating = ref<number | null>(3);
</script>
