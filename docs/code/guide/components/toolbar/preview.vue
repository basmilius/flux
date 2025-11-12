<template>
    <Preview>
        <FluxPane>
            <FluxToolbar
                floating-mode="top-end">
                <FluxToolbarGroup>
                    <FluxAction
                        icon="grip"/>

                    <FluxAction
                        icon="angle-up"/>

                    <FluxAction
                        icon="angle-down"/>
                </FluxToolbarGroup>

                <FluxSeparator
                    direction="vertical"/>

                <FluxAction
                    is-destructive
                    icon="trash"/>
            </FluxToolbar>

            <FluxPaneBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid aperiam earum facilis fugiat in, itaque laboriosam, libero molestias nulla, pariatur qui quod sequi sint totam? Fuga ipsum placeat unde.
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxAction, FluxPane, FluxPaneBody, FluxSeparator, FluxToolbar, FluxToolbarGroup } from '@flux-ui/components';
</script>
