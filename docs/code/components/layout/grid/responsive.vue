<template>
    <FluxPane>
        <FluxPaneBody>
            <FluxGrid :columns="12">
                <FluxGridColumn
                    class="column-example"
                    :xs="12"
                    :sm="6"
                    :lg="3"/>

                <FluxGridColumn
                    class="column-example"
                    :xs="12"
                    :sm="6"
                    :lg="3"/>

                <FluxGridColumn
                    class="column-example"
                    :xs="12"
                    :sm="6"
                    :lg="3"/>

                <FluxGridColumn
                    class="column-example"
                    :xs="12"
                    :sm="6"
                    :lg="3"/>
            </FluxGrid>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxGrid, FluxGridColumn, FluxPane, FluxPaneBody } from '@flux-ui/components';
</script>
