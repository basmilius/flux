<template>
    <FluxPane style="width: 330px">
        <FluxDatePicker v-model="date"/>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxDatePicker, FluxPane } from '@flux-ui/components';
    import { DateTime } from 'luxon';
    import { ref } from 'vue';

    const date = ref(DateTime.now());
</script>
