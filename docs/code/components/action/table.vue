<template>
    <FluxPane>
        <FluxTable>
            <template #header>
                <FluxTableHeader>
                    Name
                </FluxTableHeader>
                <FluxTableHeader is-shrinking>
                    Actions
                </FluxTableHeader>
            </template>

            <FluxTableRow
                v-for="user in users"
                :key="user.name">
                <FluxTableCell>
                    {{ user.name }}
                </FluxTableCell>

                <FluxTableCell>
                    <FluxTableActions>
                        <FluxAction
                            icon="pen"
                            aria-label="Edit"/>

                        <FluxAction
                            is-destructive
                            icon="trash"
                            aria-label="Delete"/>
                    </FluxTableActions>
                </FluxTableCell>
            </FluxTableRow>
        </FluxTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxAction, FluxPane, FluxTable, FluxTableActions, FluxTableCell, FluxTableHeader, FluxTableRow } from '@flux-ui/components';

    const users = [
        {name: 'Ada Lovelace'},
        {name: 'Alan Turing'},
        {name: 'Grace Hopper'}
    ];
</script>
