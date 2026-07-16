<template>
    <FluxTabBar>
        <FluxTabBarItem
            :is-active="index == 0"
            label="Bas Milius"
            @click="index = 0">
            <template #start>
                <FluxAvatar
                    alt="Bas Milius"
                    fallback-initials="BM"
                    :size="21"
                    status="success"/>
            </template>

            <template #end>
                <FluxBadge label="8"/>
            </template>
        </FluxTabBarItem>

        <FluxTabBarItem
            :is-active="index == 1"
            label="Anna de Vries"
            @click="index = 1">
            <template #start>
                <FluxAvatar
                    alt="Anna de Vries"
                    fallback-initials="AV"
                    :size="21"
                    status="warning"/>
            </template>

            <template #end>
                <FluxBadge label="2"/>
            </template>
        </FluxTabBarItem>
    </FluxTabBar>
</template>

<script
    setup
    lang="ts">
    import { FluxAvatar, FluxBadge, FluxTabBar, FluxTabBarItem } from '@flux-ui/components';
    import { ref } from 'vue';

    const index = ref(0);
</script>
