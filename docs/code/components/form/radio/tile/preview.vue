<template>
    <Preview>
        <FluxFormRadioGroup
            v-model="frequency"
            style="width: 489px"
            is-inline>
            <FluxFormRadioTile
                value="once"
                icon="bolt"
                label="One-time"
                sub-label="Add credit just this once."/>

            <FluxFormRadioTile
                value="recurring"
                icon="rotate"
                label="Recurring"
                sub-label="Top up automatically each cycle."/>
        </FluxFormRadioGroup>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxFormRadioGroup, FluxFormRadioTile } from '@flux-ui/components';
    import { ref } from 'vue';

    const frequency = ref('once');
</script>
