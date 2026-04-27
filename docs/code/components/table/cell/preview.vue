<template>
    <Preview>
        <FluxPane>
            <FluxTable>
                <FluxTableRow>
                    <FluxTableCell
                        v-for="cell in 6">
                        1&times;{{ cell }}
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
