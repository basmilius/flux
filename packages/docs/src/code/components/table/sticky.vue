<template>
    <FluxPane is-contained>
        <FluxTable style="max-height: 330px">
            <template #header>
                <FluxTableRow>
                    <FluxTableHeader
                        v-for="header in 3"
                        :key="header"
                        is-sticky>
                        Header {{ header }}
                    </FluxTableHeader>
                </FluxTableRow>
            </template>

            <template #rows>
                <FluxTableRow
                    v-for="row in 30"
                    :key="row">
                    <FluxTableCell
                        v-for="cell in 3"
                        :key="cell">
                        Cell {{ cell }}&times;{{ row }}
                    </FluxTableCell>
                </FluxTableRow>
            </template>
        </FluxTable>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxTable, FluxTableCell, FluxTableHeader, FluxTableRow } from '@basmilius/flux';
</script>
