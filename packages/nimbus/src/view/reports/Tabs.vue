<template>
    <FluxTabBar>
        <FluxTabBarItem
            v-for="item of tabs"
            :key="item.name"
            :icon="item.icon"
            :is-active="active === item.name"
            :label="item.label"
            type="route"
            :to="{name: item.name}"/>
    </FluxTabBar>
</template>

<script
    lang="ts"
    setup>
    import { FluxTabBar, FluxTabBarItem } from '@flux-ui/components';
    import type { FluxIconName } from '@flux-ui/types';
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const active = computed(() => String(route.name ?? ''));

    const tabs: { name: string; label: string; icon: FluxIconName }[] = [
        {name: 'reports', label: 'Overview', icon: 'chart-line'},
        {name: 'reports-financial', label: 'Financial', icon: 'sack-dollar'},
        {name: 'reports-team', label: 'Team', icon: 'user-group'},
        {name: 'reports-pipeline', label: 'Pipeline', icon: 'diagram-project'}
    ];
</script>
