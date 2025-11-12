<template>
    <Preview>
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
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxPaneBody, FluxPaneDeck } from '@flux-ui/components';
</script>
