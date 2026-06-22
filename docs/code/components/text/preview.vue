<template>
    <Preview>
        <FluxFlex direction="vertical">
            <FluxText
                size="display"
                tabular
                :weight="600">12,480</FluxText>

            <FluxText :weight="500">Conversion funnel</FluxText>

            <FluxText
                color="muted"
                size="small">From first visit to purchase</FluxText>
        </FluxFlex>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxText } from '@flux-ui/components';
</script>
