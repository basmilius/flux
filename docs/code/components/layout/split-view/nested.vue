<template>
    <FluxSplitView style="height: 280px; width: 100%; border: 1px solid var(--surface-stroke); border-radius: 6px">
        <FluxSplitViewPane :default-size="160">
            <div style="padding: 12px">Sidebar</div>
        </FluxSplitViewPane>

        <FluxSplitViewPane>
            <FluxSplitView
                direction="vertical"
                style="height: 100%">
                <FluxSplitViewPane>
                    <div style="padding: 12px">Top pane</div>
                </FluxSplitViewPane>

                <FluxSplitViewPane :default-size="80">
                    <div style="padding: 12px">Bottom pane</div>
                </FluxSplitViewPane>
            </FluxSplitView>
        </FluxSplitViewPane>
    </FluxSplitView>
</template>

<script
    setup
    lang="ts">
    import { FluxSplitView, FluxSplitViewPane } from '@flux-ui/components';
</script>
