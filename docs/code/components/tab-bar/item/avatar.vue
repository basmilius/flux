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
        </FluxTabBarItem>

        <FluxTabBarItem
            :is-active="index == 2"
            label="Tom Jansen"
            @click="index = 2">
            <template #start>
                <FluxAvatar
                    alt="Tom Jansen"
                    fallback-initials="TJ"
                    :size="21"
                    status="gray"/>
            </template>
        </FluxTabBarItem>
    </FluxTabBar>
</template>

<script
    setup
    lang="ts">
    import { FluxAvatar, FluxTabBar, FluxTabBarItem } from '@flux-ui/components';
    import { ref } from 'vue';

    const index = ref(0);
</script>
