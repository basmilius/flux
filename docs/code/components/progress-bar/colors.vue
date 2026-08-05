<template>
    <FluxPane>
        <FluxPaneBody>
            <FluxFlex :gap="15">
                <FluxProgressBar
                    v-for="color of colors"
                    :key="color"
                    :color="color"
                    :value="0.6"/>
            </FluxFlex>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxFlex, FluxPane, FluxPaneBody, FluxProgressBar } from '@flux-ui/components';
    import type { FluxColor } from '@flux-ui/types';

    const colors: FluxColor[] = ['gray', 'primary', 'danger', 'info', 'success', 'warning'];
</script>
