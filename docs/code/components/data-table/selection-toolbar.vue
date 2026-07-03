<template>
    <FluxPane>
        <FluxDataTable
            v-model:selected="selected"
            :items="filteredPeople"
            :limits="[]"
            :page="1"
            :per-page="6"
            selection-mode="multiple"
            :total="filteredPeople.length"
            unique-key="id"
            is-hoverable>
            <template #filter>
                <FluxTableBar>
                    <FluxFilterBar
                        v-model="filterState"
                        v-model:search="search"
                        is-searchable
                        search-placeholder="Search people...">
                        <FluxFilterOption
                            label="Role"
                            name="role"
                            :options="roleOptions"/>
                    </FluxFilterBar>
                </FluxTableBar>
            </template>

            <template #selection="{count, clear}">
                <FluxFlexItem :grow="1">
                    <FluxFlex
                        align="center"
                        :gap="9">
                        <span aria-live="polite">{{ count }} selected</span>

                        <FluxSpacer/>

                        <FluxSecondaryButton
                            icon-leading="trash"
                            label="Delete"
                            @click="deleteSelected"/>

                        <FluxSecondaryButton
                            label="Clear"
                            @click="clear()"/>
                    </FluxFlex>
                </FluxFlexItem>
            </template>

            <template #header>
                <FluxTableHeader>Person</FluxTableHeader>
                <FluxTableHeader is-shrinking>Role</FluxTableHeader>
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
    import { FluxDataTable, FluxFilterBar, FluxFilterOption, FluxFlex, FluxFlexItem, FluxPane, FluxSecondaryButton, FluxSpacer, FluxTableBar, FluxTableCell, FluxTableHeader } from '@flux-ui/components';
    import type { FluxFilterOptionItem, FluxFilterState } from '@flux-ui/types';
    import { computed, ref } from 'vue';

    const roleOptions: FluxFilterOptionItem[] = [
        {label: 'Lead', value: 'Lead'},
        {label: 'Engineer', value: 'Engineer'},
        {label: 'Manager', value: 'Manager'}
    ];

    const search = ref('');
    const selected = ref<number[]>([2, 4]);

    const filterState = ref<FluxFilterState>({
        role: null
    });

    const people = ref([
        {id: 1, name: 'Ada Lovelace', email: 'ada@example.com', role: 'Lead'},
        {id: 2, name: 'Alan Turing', email: 'alan@example.com', role: 'Engineer'},
        {id: 3, name: 'Grace Hopper', email: 'grace@example.com', role: 'Engineer'},
        {id: 4, name: 'Katherine Johnson', email: 'katherine@example.com', role: 'Manager'},
        {id: 5, name: 'Margaret Hamilton', email: 'margaret@example.com', role: 'Engineer'},
        {id: 6, name: 'Radia Perlman', email: 'radia@example.com', role: 'Engineer'}
    ]);

    const filteredPeople = computed(() => people.value.filter(person => {
        if (search.value && !person.name.toLowerCase().includes(search.value.toLowerCase())) {
            return false;
        }

        if (filterState.value.role && person.role !== filterState.value.role) {
            return false;
        }

        return true;
    }));

    function deleteSelected(): void {
        people.value = people.value.filter(person => !selected.value.includes(person.id));
        selected.value = [];
    }
</script>
