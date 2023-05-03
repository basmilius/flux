<template>
    <flux-pane style="width: 420px">
        <flux-pane-body>
            <flux-stack :gap="15">
                <flux-progress-bar
                    :min="0"
                    :max="100"
                    :value="50"/>
                <flux-progress-bar is-indeterminate/>
            </flux-stack>
        </flux-pane-body>
    </flux-pane>
</template>

<script lang="ts">
    export const enabled = false;
</script>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneBody, FluxProgressBar, FluxStack } from '@fancee/flux';
</script>
