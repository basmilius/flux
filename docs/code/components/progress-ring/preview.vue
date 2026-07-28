<template>
    <Preview>
        <FluxProgressRing
            v-slot="{progress}"
            label="Storage used"
            :size="84"
            :value="0.68">
            <FluxText :weight="600">
                {{ progress }}
            </FluxText>
        </FluxProgressRing>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxProgressRing, FluxText } from '@flux-ui/components';
</script>
