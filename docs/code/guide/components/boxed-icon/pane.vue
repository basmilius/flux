<template>
    <FluxPane
        variant="flat"
        style="max-width: 300px">
        <FluxPaneBody>
            <FluxBoxedIcon
                color="primary"
                name="rocket"
                :size="48"/>
        </FluxPaneBody>

        <FluxPaneHeader title="Let's get started"/>

        <FluxPaneBody>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxBoxedIcon, FluxPane, FluxPaneBody, FluxPaneHeader } from '@flux-ui/components';
</script>
