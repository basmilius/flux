<template>
    <Preview>
        <FluxPane style="max-width: 540px">
            <FluxPaneBody>
                <FluxFormColumn>
                    <FluxFormSection title="Appearance">
                        <FluxFormColumn>
                            <FluxFormField label="Accent color">
                                <FluxColorSelect is-custom-allowed/>
                            </FluxFormField>

                            <FluxFormField label="Brand color">
                                <FluxColorPicker
                                    :model-value="[31, 75, 109]"
                                    type="rgb"/>
                            </FluxFormField>

                            <FluxFormField label="Category">
                                <FluxFormTreeViewSelect
                                    v-model="category"
                                    :level-colors="['primary', 'info', 'success']"
                                    :options="categories"
                                    placeholder="Select a category..."/>
                            </FluxFormField>

                            <FluxFormField label="Assignee">
                                <FluxFormSelectAsync
                                    v-model="assignee"
                                    :fetch-options="fetchOptions"
                                    :fetch-relevant="fetchRelevant"
                                    :fetch-search="fetchSearch"
                                    placeholder="Search people..."/>
                            </FluxFormField>
                        </FluxFormColumn>
                    </FluxFormSection>

                    <FluxFormSection title="Schedule">
                        <FluxFormColumn>
                            <FluxFormField label="Birthdate">
                                <FluxFormDateInput v-model="birthdate"/>
                            </FluxFormField>

                            <FluxFormField label="Active period">
                                <FluxFormDateRangeInput v-model="period"/>
                            </FluxFormField>

                            <FluxFormField label="Next meeting">
                                <FluxFormDateTimeInput v-model="meeting"/>
                            </FluxFormField>

                            <FluxFormField label="Time zone">
                                <FluxFormTimeZonePicker
                                    v-model="timezone"
                                    placeholder="Select your timezone..."/>
                            </FluxFormField>
                        </FluxFormColumn>
                    </FluxFormSection>
                </FluxFormColumn>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import type { FluxFormSelectEntry } from '@flux-ui/types';
    import { FluxColorPicker, FluxColorSelect, FluxFormColumn, FluxFormDateInput, FluxFormDateRangeInput, FluxFormDateTimeInput, FluxFormField, FluxFormSection, FluxFormSelectAsync, FluxFormTimeZonePicker, FluxFormTreeViewSelect, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { DateTime } from 'luxon';
    import { ref } from 'vue';

    const category = ref<number | null>(null);
    const assignee = ref(null);
    const timezone = ref(null);
    const birthdate = ref(DateTime.fromSQL('1996-03-13'));
    const period = ref<[DateTime, DateTime] | null>([DateTime.now().startOf('month'), DateTime.now().endOf('month')]);
    const meeting = ref(DateTime.now().plus({day: 1}));

    const categories = [
        {
            id: 1,
            label: 'Electronics',
            children: [
                {id: 2, label: 'Computers', children: [{id: 3, label: 'Laptops'}, {id: 4, label: 'Desktops'}]},
                {id: 5, label: 'Phones'}
            ]
        },
        {id: 6, label: 'Clothing'}
    ];

    const people: FluxFormSelectEntry[] = [
        {label: 'Bas Milius', value: 'bas'},
        {label: 'Jane Doe', value: 'jane'},
        {label: 'John Doe', value: 'john'}
    ];

    async function fetchOptions(values: string[]): Promise<FluxFormSelectEntry[]> {
        return people.filter(person => values.includes(person.value as string));
    }

    async function fetchRelevant(): Promise<FluxFormSelectEntry[]> {
        await new Promise(resolve => setTimeout(resolve, 200));

        return people;
    }

    async function fetchSearch(searchQuery: string): Promise<FluxFormSelectEntry[]> {
        return people.filter(person => person.label.toLowerCase().includes(searchQuery.toLowerCase()));
    }
</script>
