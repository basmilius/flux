<template>
    <FluxPaneDeck
        :min-column-width="150"
        style="width: 90%; margin: 0 auto;">
        <FluxPane>
            <FluxPaneBody>
                Pane 1
            </FluxPaneBody>
        </FluxPane>

        <FluxPane>
            <FluxPaneBody>
                Pane 2
            </FluxPaneBody>
        </FluxPane>

        <FluxPane>
            <FluxPaneBody>
                Pane 3
            </FluxPaneBody>
        </FluxPane>
    </FluxPaneDeck>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneBody, FluxPaneDeck } from '@basmilius/flux';
</script>
