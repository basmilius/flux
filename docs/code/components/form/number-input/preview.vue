<template>
    <Preview>
        <FluxFormNumberInput
            v-model="value"
            style="width: 180px"
            :min="0"
            :max="100"
            placeholder="0"/>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxFormNumberInput } from '@flux-ui/components';
    import { ref } from 'vue';

    const value = ref<number | null>(10);
</script>
