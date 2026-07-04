<template>
    <FluxFlex
        align="start"
        direction="vertical"
        :gap="15">
        <FluxVisualTextShimmer
            color="var(--primary-300)"
            shimmer-color="var(--primary-600)"
            :duration="1.6"
            :spread="25"
            style="font-size: 21px; font-weight: 600;">
            Syncing data
        </FluxVisualTextShimmer>

        <FluxVisualTextShimmer
            color="var(--success-300)"
            shimmer-color="var(--success-600)"
            :duration="1.6"
            :spread="25"
            style="font-size: 21px; font-weight: 600;">
            Deploying release
        </FluxVisualTextShimmer>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex } from '@flux-ui/components';
    import { FluxVisualTextShimmer } from '@flux-ui/visuals';
</script>
