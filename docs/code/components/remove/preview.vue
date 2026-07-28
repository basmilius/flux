<template>
    <Preview>
        <FluxPane :style="{width: '180px'}">
            <FluxPaneBody>
                <div :style="{position: 'relative'}">
                    <img
                        alt="A photo"
                        src="/assets/demo/image-1.jpg"
                        :style="{width: '100%', borderRadius: '9px', display: 'block'}"/>

                    <FluxRemove/>
                </div>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxPaneBody, FluxRemove } from '@flux-ui/components';
</script>
