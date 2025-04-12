<template>
    <FluxPane style="width: 330px">
        <FluxDatePicker
            v-model="dates"
            range-mode="range"/>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxDatePicker, FluxPane } from '@flux-ui/components';
    import { DateTime } from 'luxon';
    import { ref } from 'vue';

    const dates = ref([
        DateTime.now().minus({days: 1}),
        DateTime.now().plus({days: 1})
    ]);
</script>
