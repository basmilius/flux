<template>
    <Preview>
        <FluxDateScrubber
            v-model="index"
            :dates="dates"
            style="max-width: 543px; margin-inline: auto"/>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxDateScrubber } from '@flux-ui/components';
    import { ref } from 'vue';
    import { createCheckIns } from './checkIns';

    const dates = createCheckIns();
    const index = ref(dates.length - 1);
</script>
