<template>
    <Preview>
        <FluxPane>
            <FluxPaneBody>
                <FluxPagination
                    arrows
                    :total="200"
                    :page="13"
                    :per-page="10"/>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxPagination, FluxPane, FluxPaneBody } from '@flux-ui/components';
</script>
