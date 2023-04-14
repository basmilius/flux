<template>
    <flux-form-date-range-input v-model="range"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormDateRangeInput } from '@fancee/flux';
    import { DateTime } from 'luxon';
    import { ref } from 'vue';

    const range = ref([
        DateTime.now(),
        DateTime.now().plus({day: 60})
    ]);
</script>
