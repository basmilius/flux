<template>
    <FluxFormDateTimeInput v-model="dateWithTime"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormDateTimeInput } from '@basmilius/flux';
    import { DateTime } from 'luxon';
    import { ref } from 'vue';

    const dateWithTime = ref(DateTime.now());
</script>
