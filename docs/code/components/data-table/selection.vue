<template>
    <FluxPane>
        <FluxPaneHeader
            title="Members"
            :subtitle="selected.length === 0 ? 'No rows selected' : `${selected.length} row${selected.length === 1 ? '' : 's'} selected`"/>

        <FluxDataTable
            v-model:selected="selected"
            :items="dataSet"
            :limits="[]"
            :page="1"
            :per-page="5"
            selection-mode="multiple"
            :total="dataSet.length"
            unique-key="id"
            is-hoverable>
            <template #header>
                <FluxTableHeader>
                    Person
                </FluxTableHeader>

                <FluxTableHeader is-shrinking>
                    Status
                </FluxTableHeader>
            </template>

            <template #name="{item: {name, email}}">
                <FluxTableCell content-direction="column">
                    <strong>{{ name }}</strong>
                    <small>{{ email }}</small>
                </FluxTableCell>
            </template>

            <template #isActive="{item: {isActive}}">
                <FluxTableCell>
                    <FluxBadgeStack>
                        <FluxBadge
                            v-if="isActive"
                            color="success"
                            icon="circle-check"
                            label="Active"/>

                        <FluxBadge
                            v-else
                            color="danger"
                            icon="circle-xmark"
                            label="Inactive"/>
                    </FluxBadgeStack>
                </FluxTableCell>
            </template>
        </FluxDataTable>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadge, FluxBadgeStack, FluxDataTable, FluxPane, FluxPaneHeader, FluxTableCell, FluxTableHeader } from '@flux-ui/components';
    import { faker } from '@faker-js/faker';
    import { computed, ref } from 'vue';

    const selected = ref<number[]>([]);

    const dataSet = computed(() => Array(5)
        .fill(null)
        .map((_, index) => ({
            id: index,
            name: faker.person.fullName(),
            email: faker.internet.email(),
            isActive: faker.datatype.boolean()
        })));
</script>
