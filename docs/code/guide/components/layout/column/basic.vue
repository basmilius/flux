<template>
    <FluxPane>
        <FluxPaneBody>
            <FluxColumn
                :gap="10">
                <div class="column-example"></div>
                <div class="column-example"></div>
                <div class="column-example"></div>
                <div class="column-example"></div>
            </FluxColumn>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxColumn, FluxPane, FluxPaneBody } from '@flux-ui/components';
</script>
