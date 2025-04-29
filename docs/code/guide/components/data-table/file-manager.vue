<template>
    <FluxPane>
        <FluxDataTable
            :data-set="dataSet"
            :limits="[]"
            :page="1"
            :per-page="20"
            :total="dataSet.length"
            is-hoverable>
            <template #header>
                <FluxTableHeader>Name</FluxTableHeader>
                <FluxTableHeader>Owner</FluxTableHeader>
                <FluxTableHeader is-shrinking/>
            </template>

            <template #name="{row: {name, type}}">
                <FluxTableCell>
                    <FluxStack
                        direction="horizontal"
                        :gap="21">
                        <FluxBoxedIcon name="image"/>

                        <FluxStack
                            direction="vertical"
                            :gap="0">
                            <strong>{{ name }}</strong>
                            <small>{{ type }}</small>
                        </FluxStack>
                    </FluxStack>
                </FluxTableCell>
            </template>

            <template #owner="{row: {owner}}">
                <FluxTableCell>{{ owner }}</FluxTableCell>
            </template>

            <template #actions="{}">
                <FluxTableCell>
                    <FluxTableActions>
                        <FluxAction icon="arrow-down-to-line"/>
                        <FluxAction icon="ellipsis-h"/>
                    </FluxTableActions>
                </FluxTableCell>
            </template>
        </FluxDataTable>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxAction, FluxBoxedIcon, FluxDataTable, FluxPane, FluxStack, FluxTableActions, FluxTableCell, FluxTableHeader } from '@flux-ui/components';
    import { faker } from '@faker-js/faker';
    import { computed } from 'vue';

    const dataSet = computed(() => Array(5)
        .fill(null)
        .map((_, index) => ({
            id: index,
            name: faker.system.commonFileName('png'),
            owner: faker.person.fullName(),
            type: 'image/png'
        })));
</script>
