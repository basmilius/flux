<template>
    <FluxPane>
        <FluxTable>
            <FluxTableRow>
                <FluxTableCell
                    content-direction="column"
                    v-for="_ in 6">
                    <div>Top</div>
                    <div>Bottom</div>
                </FluxTableCell>
            </FluxTableRow>
        </FluxTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxTable, FluxTableCell, FluxTableRow } from '@flux-ui/components';
</script>
