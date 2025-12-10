<template>
    <Preview>
        <FluxPane>
            <FluxTable>
                <FluxTableRow v-for="row in 2">
                    <FluxTableCell
                        v-for="cell in 6">
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
