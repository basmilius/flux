<template>
    <FluxPane>
        <FluxDataTable
            :items="customers"
            :limits="[]"
            :page="1"
            :per-page="customers.length"
            :total="customers.length"
            is-hoverable>
            <template #header>
                <FluxTableHeader :min-width="220">Customer</FluxTableHeader>
                <FluxTableHeader :min-width="160">Company</FluxTableHeader>
                <FluxTableHeader is-shrinking>Plan</FluxTableHeader>
                <FluxTableHeader is-shrinking>Since</FluxTableHeader>
            </template>

            <template #name="{item}">
                <FluxTableCell
                    content-direction="column"
                    :content-gap="3">
                    <strong>{{ item.name }}</strong>
                    <small>{{ item.email }}</small>
                </FluxTableCell>
            </template>

            <template #company="{item}">
                <FluxTableCell>{{ item.company }}</FluxTableCell>
            </template>

            <template #plan="{item}">
                <FluxTableCell>
                    <FluxBadge
                        :color="item.plan === 'Enterprise' ? 'primary' : 'gray'"
                        :label="item.plan"/>
                </FluxTableCell>
            </template>

            <template #since="{item}">
                <FluxTableCell no-wrap>{{ item.since }}</FluxTableCell>
            </template>
        </FluxDataTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxBadge, FluxDataTable, FluxPane, FluxTableCell, FluxTableHeader } from '@flux-ui/components';

    type Customer = {
        readonly id: number;
        readonly name: string;
        readonly email: string;
        readonly company: string;
        readonly plan: 'Starter' | 'Growth' | 'Enterprise';
        readonly since: string;
    };

    const customers: Customer[] = [
        {id: 1, name: 'Mila Vega', email: 'mila@lumen.co', company: 'Lumen Co.', plan: 'Enterprise', since: '2021'},
        {id: 2, name: 'Sven Halloran', email: 'sven@nordicworks.io', company: 'Nordic Works', plan: 'Growth', since: '2022'},
        {id: 3, name: 'Priya Nandal', email: 'priya@clayworks.com', company: 'Clayworks', plan: 'Enterprise', since: '2020'},
        {id: 4, name: 'Theo Marsh', email: 'theo@harbor.studio', company: 'Harbor Studio', plan: 'Starter', since: '2024'}
    ];
</script>
