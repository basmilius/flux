<template>
    <FluxFlex
        direction="vertical"
        :gap="15">
        <FluxSecondaryButton
            :label="isVisible ? 'Hide' : 'Show'"
            @click="isVisible = !isVisible"/>

        <FluxStaggerTransition
            :delay="90"
            :max="900"
            style="display: flex; flex-flow: column; gap: 9px;">
            <FluxPane
                v-for="item of visibleItems"
                :key="item"
                style="padding: 12px 15px;">
                {{ item }}
            </FluxPane>
        </FluxStaggerTransition>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxPane, FluxSecondaryButton, FluxStaggerTransition } from '@flux-ui/components';
    import { computed, ref } from 'vue';

    const items = ['Inbox', 'Drafts', 'Sent', 'Archive', 'Trash'];
    const isVisible = ref(true);

    const visibleItems = computed(() => isVisible.value ? items : []);
</script>
