<template>
    <FluxPane>
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

            <template #caption>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet animi asperiores, commodi cupiditate doloremque eligendi exercitationem facilis, illum ipsa ipsam modi nesciunt nobis, odit quidem sit temporibus ullam. Et, nam.
            </template>
        </FluxTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxTable, FluxTableCell, FluxTableHeader, FluxTableRow } from '@flux-ui/components';
</script>
