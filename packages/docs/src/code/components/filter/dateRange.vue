<template>
    <flux-stack>
        <flux-pane style="width: 330px">
            <flux-filter v-model="filterState">
                <flux-filter-date-range
                    icon="calendar"
                    label="Range"
                    name="selected"/>
            </flux-filter>
        </flux-pane>

        <pre>{{ filterState }}</pre>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxFilter, FluxFilterDateRange, FluxPane, FluxStack } from '@fancee/flux';
    import { DateTime } from 'luxon';
    import { ref } from 'vue';

    const filterState = ref({
        selected: [
            DateTime.now(),
            DateTime.now().plus({day: 1})
        ]
    });
</script>
