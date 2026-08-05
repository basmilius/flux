<template>
    <FluxPane>
        <FluxTable>
            <template #header>
                <FluxTableRow>
                    <FluxTableHeader
                        is-resizable
                        :min-width="120"
                        :width="widths.name"
                        @resize="widths.name = $event ?? undefined">
                        Name
                    </FluxTableHeader>

                    <FluxTableHeader
                        is-resizable
                        :min-width="90"
                        :max-width="240"
                        :width="widths.role"
                        @resize="widths.role = $event ?? undefined">
                        Role
                    </FluxTableHeader>

                    <FluxTableHeader>
                        Email
                    </FluxTableHeader>
                </FluxTableRow>
            </template>

            <FluxTableRow
                v-for="person of people"
                :key="person.email">
                <FluxTableCell>{{ person.name }}</FluxTableCell>
                <FluxTableCell>{{ person.role }}</FluxTableCell>
                <FluxTableCell>{{ person.email }}</FluxTableCell>
            </FluxTableRow>
        </FluxTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxTable, FluxTableCell, FluxTableHeader, FluxTableRow } from '@flux-ui/components';
    import { reactive } from 'vue';

    const people = [
        {name: 'Amelia Fox', role: 'Designer', email: 'amelia@example.com'},
        {name: 'Bram de Vries', role: 'Engineer', email: 'bram@example.com'},
        {name: 'Chiara Rossi', role: 'Product manager', email: 'chiara@example.com'}
    ];

    const widths = reactive<{
        name?: number;
        role?: number;
    }>({});
</script>
