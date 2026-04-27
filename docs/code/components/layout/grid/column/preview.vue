<template>
    <Preview>
        <FluxPane>
            <FluxPaneBody>
                <FluxGridColumn
                    class="column-example"
                    :xs="6"/>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxGridColumn, FluxPane, FluxPaneBody } from '@flux-ui/components';
</script>
