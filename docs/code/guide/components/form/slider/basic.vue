<template>
    <FluxFormSlider v-model="value"/>
</template>

<script
    setup
    lang="ts">
    import { FluxFormSlider } from '@flux-ui/components';
    import { ref } from 'vue';

    const value = ref(25);
</script>
