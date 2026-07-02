<template>
    <FluxPane>
        <FluxTable>
            <template #header>
                <FluxTableHeader :width="150">
                    Fixed 150
                </FluxTableHeader>

                <FluxTableHeader :min-width="210">
                    Min 210
                </FluxTableHeader>

                <FluxTableHeader :max-width="240">
                    Max 240
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
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxTable, FluxTableCell, FluxTableHeader, FluxTableRow } from '@flux-ui/components';
</script>
