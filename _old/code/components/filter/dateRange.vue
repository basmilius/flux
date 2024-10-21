<template>
    <FluxStack>
        <FluxPane style="width: 330px">
            <FluxFilter v-model="filterState">
                <FluxFilterDateRange
                    icon="calendar"
                    label="Range"
                    name="selected"/>
            </FluxFilter>
        </FluxPane>

        <pre>{{ filterState }}</pre>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxFilter, FluxFilterDateRange, FluxPane, FluxStack } from '@basmilius/flux';
    import { DateTime } from 'luxon';
    import { ref } from 'vue';

    const filterState = ref({
        selected: [
            DateTime.now(),
            DateTime.now().plus({day: 1})
        ],

        get resettable() {
            return [];
        },

        reset(): void {
        }
    });
</script>
