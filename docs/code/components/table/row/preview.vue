<template>
    <Preview>
        <FluxPane>
            <FluxTable>
                <FluxTableRow
                    v-for="row in 2"
                    :key="row">
                    <FluxTableCell
                        v-for="cell in 6"
                        :key="cell">
                        {{ row }}&times;{{ cell }}
                    </FluxTableCell>
                </FluxTableRow>
            </FluxTable>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxTable, FluxTableCell, FluxTableRow } from '@flux-ui/components';
</script>
