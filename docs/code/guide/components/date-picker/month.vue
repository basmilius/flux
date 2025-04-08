<template>
    <FluxPane style="width: 330px">
        <FluxDatePicker
            v-model="dates"
            range-mode="month"/>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxDatePicker, FluxPane } from '@flux-ui/flux';
    import { DateTime } from 'luxon';
    import { ref } from 'vue';

    const dates = ref([
        DateTime.now().startOf('month'),
        DateTime.now().endOf('month')
    ]);
</script>
