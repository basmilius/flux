<template>
    <flux-stack>
        <flux-pane style="width: 330px">
            <flux-filter v-model="filterState">
                <flux-filter-date
                    icon="calendar"
                    label="Date"
                    name="selected"/>
            </flux-filter>
        </flux-pane>

        <pre>{{ filterState }}</pre>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxFilter, FluxFilterDate, FluxPane, FluxStack } from '@fancee/flux';
    import { DateTime } from 'luxon';
    import { ref } from 'vue';

    const filterState = ref({
        selected: DateTime.now(),

        get resettable() {
            return [];
        },

        reset(): void {
        }
    });
</script>
