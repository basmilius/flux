<template>
    <FluxPane>
        <FluxPaneHeader
            title="Members"
            :subtitle="selectedPerson ? `${selectedPerson.name} is selected` : 'No row selected'"/>

        <FluxDataTable
            v-model:selected="selected"
            :items="people"
            :limits="[]"
            :page="1"
            :per-page="5"
            selection-mode="single"
            :total="people.length"
            unique-key="id"
            is-hoverable>
            <template #header>
                <FluxTableHeader>
                    Person
                </FluxTableHeader>

                <FluxTableHeader is-shrinking>
                    Role
                </FluxTableHeader>
            </template>

            <template #name="{item}">
                <FluxTableCell content-direction="column">
                    <strong>{{ item.name }}</strong>
                    <small>{{ item.email }}</small>
                </FluxTableCell>
            </template>

            <template #role="{item}">
                <FluxTableCell>{{ item.role }}</FluxTableCell>
            </template>
        </FluxDataTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxDataTable, FluxPane, FluxPaneHeader, FluxTableCell, FluxTableHeader } from '@flux-ui/components';
    import { computed, ref } from 'vue';

    const selected = ref<number | null>(null);

    const people = [
        {id: 1, name: 'Ada Lovelace', email: 'ada@example.com', role: 'Lead'},
        {id: 2, name: 'Alan Turing', email: 'alan@example.com', role: 'Engineer'},
        {id: 3, name: 'Grace Hopper', email: 'grace@example.com', role: 'Engineer'},
        {id: 4, name: 'Katherine Johnson', email: 'katherine@example.com', role: 'Manager'},
        {id: 5, name: 'Margaret Hamilton', email: 'margaret@example.com', role: 'Engineer'}
    ];

    const selectedPerson = computed(() => people.find(person => person.id === selected.value) ?? null);
</script>
