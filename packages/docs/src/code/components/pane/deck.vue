<template>
    <flux-pane-deck style="width: 90%; margin: 0 auto;">
        <flux-pane>
            <flux-pane-body>
                Pane 1
            </flux-pane-body>
        </flux-pane>
        <flux-pane>
            <flux-pane-body>
                Pane 2
            </flux-pane-body>
        </flux-pane>
        <flux-pane>
            <flux-pane-body>
                Pane 3
            </flux-pane-body>
        </flux-pane>
    </flux-pane-deck>
</template>

<script
    lang="ts"
    setup>
    import {
        FluxPane,
        FluxPaneBody,
        FluxPaneDeck
    } from '@fancee/flux';
</script>
