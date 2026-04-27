<template>
    <Preview>
        <FluxPane>
            <FluxTable>
                <template #header>
                    <FluxTableHeader>
                        Header
                    </FluxTableHeader>
                    <FluxTableHeader is-shrinking>
                        Actions
                    </FluxTableHeader>
                </template>

                <FluxTableRow>
                    <FluxTableCell>
                        Row
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
