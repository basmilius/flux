<template>
    <FluxTable>
        <template #header>
            <FluxTableRow>
                <FluxTableHeader
                    v-for="header in 3"
                    :key="header">
                    Header {{ header }}
                </FluxTableHeader>
            </FluxTableRow>
        </template>

        <template #rows>
            <FluxTableRow
                v-for="row in 3"
                :key="row">
                <FluxTableCell
                    v-for="cell in 3"
                    :key="cell">
                    Cell {{ cell }}&times;{{ row }}
                </FluxTableCell>
            </FluxTableRow>
        </template>
    </FluxTable>
</template>

<script
    lang="ts"
    setup>
    import { FluxTable, FluxTableCell, FluxTableHeader, FluxTableRow } from '@basmilius/flux';
</script>
