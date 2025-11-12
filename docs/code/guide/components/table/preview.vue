<template>
    <Preview>
        <FluxPane>
            <FluxTable>
                <template #header>
                    <FluxTableHeader
                        v-for="header in 3"
                        :is-sortable="header === 2">
                        Header {{ header }}
                    </FluxTableHeader>
                    <FluxTableHeader is-shrinking/>
                </template>

                <FluxTableRow
                    v-for="row in 3"
                    :key="row">
                    <FluxTableCell
                        v-for="cell in 3"
                        :key="cell">
                        Cell {{ cell }}&times;{{ row }}
                    </FluxTableCell>

                    <FluxTableCell>
                        <FluxTableActions>
                            <FluxAction
                                icon="pen"/>
                            <FluxAction
                                icon="ellipsis-h"/>
                        </FluxTableActions>
                    </FluxTableCell>
                </FluxTableRow>
            </FluxTable>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxAction, FluxPane, FluxTable, FluxTableActions, FluxTableCell, FluxTableHeader, FluxTableRow } from '@flux-ui/components';
</script>
