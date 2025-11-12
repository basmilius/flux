<template>
    <FluxPane>
        <FluxPaneBody>
            <FluxStack
                direction="horizontal"
                :gap="10">
                <div class="column-example"></div>
                <div class="column-example"></div>
                <div class="column-example"></div>
                <div class="column-example"></div>
            </FluxStack>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxPaneBody, FluxStack } from '@flux-ui/components';
</script>
