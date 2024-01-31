<template>
    <FluxStack>
        <FluxPane style="width: 330px">
            <FluxFilter v-model="filterState">
                <FluxFilterOption
                    icon="clone"
                    label="Option"
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
    import { FluxFilter, FluxFilterOption, FluxPane, FluxStack } from '@fancee/flux';
    import { ref } from 'vue';

    const filterState = ref({
        selected: 'first',

        get resettable() {
            return [];
        },

        reset(): void {
        }
    });
</script>
