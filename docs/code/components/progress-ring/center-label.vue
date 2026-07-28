<template>
    <FluxProgressRing
        v-slot="{progress}"
        color="success"
        label="Profile completeness"
        :size="102"
        :thickness="9"
        :value="0.8">
        <FluxFlex
            align="center"
            direction="vertical"
            :gap="0">
            <FluxText
                size="large"
                :weight="600">
                {{ progress }}
            </FluxText>

            <FluxText
                color="muted"
                size="small">
                complete
            </FluxText>
        </FluxFlex>
    </FluxProgressRing>
</template>

<script
    setup
    lang="ts">
    import { FluxFlex, FluxProgressRing, FluxText } from '@flux-ui/components';
</script>
