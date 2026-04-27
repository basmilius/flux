<template>
    <FluxPane>
        <FluxTable>
            <template #header>
                <FluxTableHeader
                    v-for="header in 3">
                    Header {{ header }}
                </FluxTableHeader>
                <FluxTableHeader is-shrinking/>
            </template>

            <FluxTableRow>
                <FluxTableCell
                    v-for="cell in 3">
                    Cell 1&times;{{ cell }}
                </FluxTableCell>

                <FluxTableCell>
                    ...
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
