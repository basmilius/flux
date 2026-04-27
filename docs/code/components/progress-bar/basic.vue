<template>
    <FluxPane>
        <FluxPaneBody>
            <FluxProgressBar
                :value="0.75"/>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxPaneBody, FluxProgressBar } from '@flux-ui/components';
</script>
