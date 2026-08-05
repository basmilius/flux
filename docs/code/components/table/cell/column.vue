<template>
    <FluxPane>
        <FluxTable>
            <FluxTableRow>
                <FluxTableCell
                    content-direction="column"
                    v-for="cell in 6"
                    :key="cell">
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
