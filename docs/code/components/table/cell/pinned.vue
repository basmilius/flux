<template>
    <FluxPane>
        <FluxTable>
            <FluxTableRow
                v-for="row in 3"
                :key="row">
                <FluxTableCell
                    no-wrap
                    pinned>
                    Row {{ row }}
                </FluxTableCell>

                <FluxTableCell
                    v-for="cell in 6"
                    :key="cell"
                    no-wrap>
                    Some wide content {{ cell }}&times;{{ row }}
                </FluxTableCell>

                <FluxTableCell
                    no-wrap
                    pinned="end">
                    End {{ row }}
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
