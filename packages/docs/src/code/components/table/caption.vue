<template>
    <flux-pane>
        <flux-table>
            <template #header>
                <flux-table-row>
                    <flux-table-header
                        v-for="header in 3"
                        :key="header">
                        Header {{ header }}
                    </flux-table-header>
                </flux-table-row>
            </template>

            <template #rows>
                <flux-table-row
                    v-for="row in 3"
                    :key="row">
                    <flux-table-cell
                        v-for="cell in 3"
                        :key="cell">
                        Cell {{ cell }}&times;{{ row }}
                    </flux-table-cell>
                </flux-table-row>
            </template>

            <template #caption>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet animi asperiores, commodi cupiditate doloremque eligendi exercitationem facilis, illum ipsa ipsam modi nesciunt nobis, odit quidem sit temporibus ullam. Et, nam.</p>
            </template>
        </flux-table>
    </flux-pane>
</template>

<script
    lang="ts"
    setup>
    import {
        FluxPane,
        FluxTable,
        FluxTableCell,
        FluxTableHeader,
        FluxTableRow
    } from '@fancee/flux';
</script>
