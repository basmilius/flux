<template>
    <FluxFlyout>
        <template #opener="{ open }">
            <FluxSecondaryButton
                icon-leading="user"
                label="More information"
                @click="open()"/>
        </template>

        <FluxPaneBody style="max-width: 420px">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium consequatur, cupiditate debitis eveniet ex explicabo facere facilis fugit magni molestiae nemo nihil nobis nulla odit officiis praesentium rerum saepe voluptatibus!</p>
        </FluxPaneBody>
    </FluxFlyout>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlyout, FluxPaneBody, FluxSecondaryButton } from '@basmilius/flux';
</script>
