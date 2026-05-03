<template>
    <FluxPane>
        <FluxTabs is-pills>
            <FluxTab
                icon="cubes"
                label="Components">
                <FluxPaneBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid aperiam earum facilis fugiat in, itaque laboriosam, libero molestias nulla, pariatur qui quod sequi sint totam? Fuga ipsum placeat unde.
                </FluxPaneBody>
            </FluxTab>

            <FluxTab
                icon="desktop"
                label="Dashboard">
                <FluxPaneBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid aperiam earum facilis fugiat in, itaque laboriosam, libero molestias nulla, pariatur qui quod sequi sint totam? Fuga ipsum placeat unde.
                </FluxPaneBody>
            </FluxTab>

            <FluxTab
                icon="puzzle-piece"
                label="Internals">
                <FluxPaneBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid aperiam earum facilis fugiat in, itaque laboriosam, libero molestias nulla, pariatur qui quod sequi sint totam? Fuga ipsum placeat unde.
                </FluxPaneBody>
            </FluxTab>
        </FluxTabs>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxPaneBody, FluxTab, FluxTabs } from '@flux-ui/components';
</script>
