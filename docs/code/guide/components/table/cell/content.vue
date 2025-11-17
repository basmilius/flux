<template>
    <FluxPane>
        <FluxTable>
            <FluxTableRow>
                <FluxTableCell
                    v-for="cell in 6">
                    <template #content>
                        <div class="custom-cell">
                            1&times;{{ cell }}
                        </div>
                    </template>
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

<style
    scoped
    lang="scss">
    .custom-cell {
        display: flex;
        padding: 12px 10px;
        place-content: center;
        font-weight: bolder;

        &:hover {
            color: white;
            background: var(--primary-9);
        }
    }
</style>
