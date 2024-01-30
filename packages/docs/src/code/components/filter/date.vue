<template>
    <FluxStack>
        <FluxPane style="width: 330px">
            <FluxFilter v-model="filterState">
                <FluxFilterDate
                    icon="calendar"
                    label="Date"
                    name="selected"/>
            </FluxFilter>
        </FluxPane>

        <pre>{{ filterState }}</pre>
    </FluxStack>
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
