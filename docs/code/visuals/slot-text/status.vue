<template>
    <FluxFlex
        align="start"
        direction="vertical"
        :gap="15">
        <FluxVisualSlotText
            :color="current.color"
            direction="up"
            :text="current.label"
            style="font-size: 24px; font-weight: 600;"/>

        <FluxSecondaryButton
            icon-leading="rotate"
            label="Advance status"
            @click="advance"/>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxSecondaryButton } from '@flux-ui/components';
    import { FluxVisualSlotText } from '@flux-ui/visuals';
    import { computed, ref } from 'vue';

    const statuses = [
        {label: 'Queued', color: 'var(--gray-500)'},
        {label: 'Running', color: 'var(--info-500)'},
        {label: 'Succeeded', color: 'var(--success-500)'},
        {label: 'Failed', color: 'var(--danger-500)'}
    ];

    const index = ref(0);
    const current = computed(() => statuses[index.value]);

    function advance(): void {
        index.value = (index.value + 1) % statuses.length;
    }
</script>
