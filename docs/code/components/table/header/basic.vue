<template>
    <FluxPane>
        <FluxTable>
            <template #header>
                <FluxTableRow>
                    <FluxTableHeader
                        v-for="header in 3"
                        :key="header"
                        :is-sortable="header === 2">
                        Header {{ header }}
                    </FluxTableHeader>
                </FluxTableRow>
            </template>

            <FluxTableRow>
                <FluxTableCell
                    v-for="cell in 3"
                    :key="cell">
                    Cell 1&times;{{ cell }}
                </FluxTableCell>
            </FluxTableRow>
        </FluxTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxTable, FluxTableCell, FluxTableHeader, FluxTableRow } from '@flux-ui/components';
</script>
