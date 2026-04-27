<template>
    <Preview>
        <FluxPane>
            <FluxPaneBody>
                <FluxGrid
                    :gap="21"
                    :columns="12">
                    <FluxGridColumn
                        class="column-example"
                        :xs="3"/>

                    <FluxGridColumn
                        class="column-example"
                        :xs="6"/>

                    <FluxGridColumn
                        class="column-example"
                        :xs="3"/>
                </FluxGrid>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxGrid, FluxGridColumn, FluxPane, FluxPaneBody } from '@flux-ui/components';
</script>
