<template>
    <FluxPane>
        <FluxTable
            is-sticky
            style="max-height: 330px">
            <template #header>
                <FluxTableBar>
                    <FluxFlex
                        align="center"
                        :gap="9">
                        <FluxIcon name="circle-info"/>
                        <span>The bar and headers stick together while scrolling.</span>
                    </FluxFlex>
                </FluxTableBar>

                <FluxTableRow>
                    <FluxTableHeader
                        v-for="header in 3"
                        :key="header">
                        Header {{ header }}
                    </FluxTableHeader>
                </FluxTableRow>
            </template>

            <FluxTableRow
                v-for="row in 30"
                :key="row">
                <FluxTableCell
                    v-for="cell in 3"
                    :key="cell">
                    Cell {{ cell }}&times;{{ row }}
                </FluxTableCell>
            </FluxTableRow>
        </FluxTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxFlex, FluxIcon, FluxPane, FluxTable, FluxTableBar, FluxTableCell, FluxTableHeader, FluxTableRow } from '@flux-ui/components';
</script>
