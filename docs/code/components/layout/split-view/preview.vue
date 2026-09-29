<template>
    <Preview>
        <FluxPane style="width: 100%; height: 240px">
            <FluxSplitView style="height: 100%">
                <FluxSplitViewPane :default-size="200">
                    <div style="padding: var(--pane-padding)">Sidebar</div>
                </FluxSplitViewPane>

                <FluxSplitViewPane>
                    <div style="padding: var(--pane-padding)">Main content</div>
                </FluxSplitViewPane>
            </FluxSplitView>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxSplitView, FluxSplitViewPane } from '@flux-ui/components';
</script>
