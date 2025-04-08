<template>
    <FluxPane style="width: 330px">
        <FluxDatePicker
            v-model="dates"
            range-mode="week"/>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxDatePicker, FluxPane } from '@flux-ui/flux';
    import { DateTime } from 'luxon';
    import { ref } from 'vue';

    const dates = ref([
        DateTime.now().startOf('week'),
        DateTime.now().endOf('week')
    ]);
</script>
