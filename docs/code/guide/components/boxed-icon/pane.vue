<template>
    <FluxPane
        variant="flat"
        style="max-width: 300px">
        <FluxPaneBody>
            <FluxBoxedIcon
                color="primary"
                :size="48"
                variant="rocket"/>
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
    import { FluxBoxedIcon, FluxPane, FluxPaneBody, FluxPaneHeader } from '@basmilius/flux';
</script>
