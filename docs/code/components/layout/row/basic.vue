<template>
    <FluxPane>
        <FluxPaneBody>
            <FluxRow
                :gap="10">
                <div class="column-example"></div>
                <div class="column-example"></div>
                <div class="column-example"></div>
                <div class="column-example"></div>
            </FluxRow>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxPaneBody, FluxRow } from '@flux-ui/components';
</script>
