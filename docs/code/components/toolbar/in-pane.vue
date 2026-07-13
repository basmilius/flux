<template>
    <FluxPane style="width: 390px">
        <FluxPaneHeader
            title="Document"/>

        <FluxToolbar aria-label="Text formatting">
            <FluxToolbarGroup>
                <FluxAction
                    icon="bold"
                    aria-label="Bold"/>

                <FluxAction
                    icon="italic"
                    aria-label="Italic"/>

                <FluxAction
                    icon="underline"
                    aria-label="Underline"/>
            </FluxToolbarGroup>

            <FluxSeparator
                direction="vertical"/>

            <FluxToolbarGroup>
                <FluxAction
                    icon="list-ul"
                    aria-label="Bulleted list"/>

                <FluxAction
                    icon="list-ol"
                    aria-label="Numbered list"/>
            </FluxToolbarGroup>
        </FluxToolbar>

        <FluxPaneBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid aperiam earum facilis fugiat in, itaque laboriosam, libero molestias nulla, pariatur qui quod sequi sint totam? Fuga ipsum placeat unde.
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxAction, FluxPane, FluxPaneBody, FluxPaneHeader, FluxSeparator, FluxToolbar, FluxToolbarGroup } from '@flux-ui/components';
</script>
