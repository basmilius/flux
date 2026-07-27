<template>
    <FluxFlex
        align="start"
        direction="vertical"
        :gap="15">
        <FluxVisualTextShimmer
            color="var(--primary-border)"
            shimmer-color="var(--primary-text)"
            :duration="1.6"
            :spread="25"
            style="font-size: 21px; font-weight: 600;">
            Syncing data
        </FluxVisualTextShimmer>

        <FluxVisualTextShimmer
            color="var(--success-border)"
            shimmer-color="var(--success-text)"
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
