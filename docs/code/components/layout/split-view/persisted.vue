<template>
    <FluxSplitView
        remember-key="docs-persisted-example"
        style="height: 240px; width: 100%; border: 1px solid var(--surface-stroke); border-radius: 6px">
        <FluxSplitViewPane :default-size="180">
            <div style="padding: 12px">Resize me, your size persists.</div>
        </FluxSplitViewPane>

        <FluxSplitViewPane>
            <div style="padding: 12px">Reload the page to confirm.</div>
        </FluxSplitViewPane>
    </FluxSplitView>
</template>

<script
    setup
    lang="ts">
    import { FluxSplitView, FluxSplitViewPane } from '@flux-ui/components';
</script>
