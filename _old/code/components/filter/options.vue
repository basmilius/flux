<template>
    <FluxStack>
        <FluxPane style="width: 330px">
            <FluxFilter v-model="filterState">
                <FluxFilterOptions
                    icon="clone"
                    label="Options"
                    name="selected"
                    :options="[
                        {title: 'Primary'},
                        {label: 'First option', value: 'first'},
                        {label: 'Second option', value: 'second'},
                        {label: 'Third option', value: 'third'},
                        {title: 'Secondary'},
                        {label: 'Fourth option', value: 'fourth'},
                        {label: 'Fifth option', value: 'fifth'},
                        {label: 'Sixth option', value: 'sixth'}
                    ]"/>
            </FluxFilter>
        </FluxPane>

        <pre>{{ filterState }}</pre>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxFilter, FluxFilterOptions, FluxPane, FluxStack } from '@basmilius/flux';
    import { ref } from 'vue';

    const filterState = ref({
        selected: ['first'],

        get resettable() {
            return [];
        },

        reset(): void {
        }
    });
</script>
