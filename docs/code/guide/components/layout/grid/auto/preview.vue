<template>
    <Preview>
        <FluxPane>
            <FluxPaneBody>
                <FluxAutoGrid
                    :gap="21"
                    :min-column-width="200">
                    <div class="column-example"></div>
                    <div class="column-example"></div>
                    <div class="column-example"></div>
                    <div class="column-example"></div>
                </FluxAutoGrid>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxAutoGrid, FluxPane, FluxPaneBody } from '@flux-ui/components';
</script>
