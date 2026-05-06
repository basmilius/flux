<template>
    <FluxSplitView
        direction="vertical"
        style="height: 280px; width: 100%; border: 1px solid var(--surface-stroke); border-radius: 6px">
        <FluxSplitViewPane :default-size="100">
            <div style="padding: 12px">Top</div>
        </FluxSplitViewPane>

        <FluxSplitViewPane>
            <div style="padding: 12px">Bottom</div>
        </FluxSplitViewPane>
    </FluxSplitView>
</template>

<script
    setup
    lang="ts">
    import { FluxSplitView, FluxSplitViewPane } from '@flux-ui/components';
</script>
