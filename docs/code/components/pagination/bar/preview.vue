<template>
    <Preview>
        <FluxPane>
            <FluxPaneBody>
                <FluxPaginationBar
                    :page="1"
                    :per-page="10"
                    :total="100"/>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxPaginationBar, FluxPane, FluxPaneBody } from '@flux-ui/components';
</script>
