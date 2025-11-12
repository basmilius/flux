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
                </template>

                <FluxTableRow>
                    <FluxTableCell
                        v-for="cell in 3">
                        Cell 1&times;{{ cell }}
                    </FluxTableCell>
                </FluxTableRow>
            </FluxTable>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxTable, FluxTableCell, FluxTableHeader, FluxTableRow } from '@flux-ui/components';
</script>
