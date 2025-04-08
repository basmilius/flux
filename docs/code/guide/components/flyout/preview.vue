<template>
    <Preview>
        <FluxFlyout>
            <template #opener="{ open }">
                <FluxSecondaryButton
                    icon-leading="clone"
                    label="Open Flyout"
                    @click="open()"/>
            </template>

            <template #default="{ close }">
                <FluxPane style="max-width: 420px">
                    <FluxPaneBody>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A asperiores cum debitis dolor, explicabo facere illo ipsa iste labore, maiores molestias odit optio qui quo reprehenderit ut veniam veritatis. Saepe.</p>

                        <FluxSecondaryButton
                            data-typography-aware
                            label="Close"
                            @click="close()"/>
                    </FluxPaneBody>
                </FluxPane>
            </template>
        </FluxFlyout>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlyout, FluxPane, FluxPaneBody, FluxSecondaryButton } from '@flux-ui/flux';
</script>
