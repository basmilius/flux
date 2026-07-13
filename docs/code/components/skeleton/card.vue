<template>
    <FluxPane style="width: 320px">
        <FluxSkeleton
            variant="rectangle"
            :height="160"/>

        <FluxPaneBody>
            <div style="display: flex; flex-direction: column">
                <FluxSkeleton
                    variant="text"
                    width="60%"
                    :height="20"/>

                <FluxSkeleton/>
                <FluxSkeleton/>
                <FluxSkeleton width="40%"/>
            </div>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxPaneBody, FluxSkeleton } from '@flux-ui/components';
</script>
