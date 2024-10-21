<template>
    <FluxFormDateInput v-model="date"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormDateInput } from '@basmilius/flux';
    import { DateTime } from 'luxon';
    import { ref } from 'vue';

    const date = ref(DateTime.now());
</script>
