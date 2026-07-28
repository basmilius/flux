<template>
    <Preview>
        <FluxStaggerTransition
            appear
            style="display: flex; flex-flow: column; gap: 9px; width: min(100%, 270px);">
            <FluxPane
                v-for="item of items"
                :key="item"
                style="padding: 12px 15px;">
                {{ item }}
            </FluxPane>
        </FluxStaggerTransition>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { useInterval } from '@basmilius/common';
    import { FluxPane, FluxStaggerTransition } from '@flux-ui/components';
    import { ref } from 'vue';

    const labels = ['Inbox', 'Drafts', 'Sent', 'Archive', 'Trash'];
    const items = ref(labels);

    useInterval(2400, () => {
        items.value = items.value.length > 0 ? [] : labels;
    });
</script>
