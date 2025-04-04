<template>
    <Preview>
        <FluxPane>
            <FluxDataTable
                :data-set="dataSet"
                :total="dataSet.length"
                is-hoverable>
                <template #header>
                    <FluxTableHeader>
                        Person
                    </FluxTableHeader>

                    <FluxTableHeader is-shrinking>
                        Status
                    </FluxTableHeader>

                    <FluxTableHeader is-shrinking/>
                </template>

                <template #name="{row: {name, email}}">
                    <FluxTableCell content-direction="column">
                        <strong>{{ name }}</strong>
                        <small>{{ email }}</small>
                    </FluxTableCell>
                </template>

                <template #isActive="{row: {isActive}}">
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

                <template #actions="{}">
                    <FluxTableCell>
                        <FluxTableActions>
                            <FluxAction icon="pen"/>
                            <FluxAction icon="ellipsis-h"/>
                        </FluxTableActions>
                    </FluxTableCell>
                </template>
            </FluxDataTable>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxAction, FluxBadge, FluxBadgeStack, FluxDataTable, FluxPane, FluxTableActions, FluxTableCell, FluxTableHeader } from '@basmilius/flux';
    import { faker } from '@faker-js/faker';
    import { computed } from 'vue';

    const dataSet = computed(() => Array(5)
        .fill(null)
        .map((_, index) => ({
            id: index,
            name: faker.person.fullName(),
            email: faker.internet.email(),
            isActive: faker.datatype.boolean()
        })));
</script>
