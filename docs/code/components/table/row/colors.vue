<template>
    <FluxPane>
        <FluxTable>
            <FluxTableRow
                v-for="color of colors"
                :key="color"
                :color="color">
                <FluxTableCell>{{ color }}</FluxTableCell>
                <FluxTableCell>A row marked as {{ color }}.</FluxTableCell>
            </FluxTableRow>
        </FluxTable>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import type { FluxColor } from '@flux-ui/types';
    import { FluxPane, FluxTable, FluxTableCell, FluxTableRow } from '@flux-ui/components';

    const colors: FluxColor[] = ['gray', 'primary', 'danger', 'info', 'success', 'warning'];
</script>
