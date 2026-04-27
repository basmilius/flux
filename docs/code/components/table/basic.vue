<template>
    <FluxTable>
        <template #header>
            <FluxTableHeader
                v-for="header in 3">
                Header {{ header }}
            </FluxTableHeader>
        </template>

        <FluxTableRow
            v-for="row in 3"
            :key="row">
            <FluxTableCell
                v-for="cell in 3"
                :key="cell">
                Cell {{ cell }}&times;{{ row }}
            </FluxTableCell>
        </FluxTableRow>
    </FluxTable>
</template>

<script
    setup
    lang="ts">
    import { FluxTable, FluxTableCell, FluxTableHeader, FluxTableRow } from '@flux-ui/components';
</script>
