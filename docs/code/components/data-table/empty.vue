<template>
    <FluxPane>
        <FluxDataTable
            :items="items"
            :limits="[]"
            :page="1"
            :per-page="5"
            :total="0">
            <template #header>
                <FluxTableHeader>Name</FluxTableHeader>
                <FluxTableHeader>Email</FluxTableHeader>
            </template>

            <template #name="{item}">
                <FluxTableCell>{{ item.name }}</FluxTableCell>
            </template>

            <template #email="{item}">
                <FluxTableCell>{{ item.email }}</FluxTableCell>
            </template>

            <template #empty>
                <FluxFlex
                    align="center"
                    direction="vertical"
                    :gap="9"
                    justify="center"
                    style="padding: 45px 15px">
                    <FluxIcon
                        name="users"
                        :size="24"/>
                    <span>No customers found.</span>
                </FluxFlex>
            </template>
        </FluxDataTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxDataTable, FluxFlex, FluxIcon, FluxPane, FluxTableCell, FluxTableHeader } from '@flux-ui/components';

    type Customer = {
        readonly id: number;
        readonly name: string;
        readonly email: string;
    };

    const items: Customer[] = [];
</script>
