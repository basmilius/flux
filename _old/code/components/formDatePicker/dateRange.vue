<template>
    <FluxFormDateRangeInput v-model="range"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormDateRangeInput } from '@basmilius/flux';
    import { DateTime } from 'luxon';
    import { ref } from 'vue';

    const range = ref([
        DateTime.now(),
        DateTime.now().plus({day: 60})
    ]);
</script>
