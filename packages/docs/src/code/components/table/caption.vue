<template>
    <FluxPane>
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

            <template #caption>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet animi asperiores, commodi cupiditate doloremque eligendi exercitationem facilis, illum ipsa ipsam modi nesciunt nobis, odit quidem sit temporibus ullam. Et, nam.</p>
            </template>
        </FluxTable>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxTable, FluxTableCell, FluxTableHeader, FluxTableRow } from '@fancee/flux';
</script>
