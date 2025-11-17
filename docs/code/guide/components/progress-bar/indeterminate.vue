<template>
    <FluxPane>
        <FluxPaneBody>
            <FluxProgressBar
                is-indeterminate
                status="Collecting files..."/>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxPaneBody, FluxProgressBar } from '@flux-ui/components';
</script>
