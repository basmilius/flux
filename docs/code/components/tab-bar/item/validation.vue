<template>
    <FluxTabBar>
        <FluxTabBarItem
            icon="user"
            :is-active="index == 0"
            label="Profile"
            @click="index = 0"/>

        <FluxTabBarItem
            icon="lock"
            :is-active="index == 1"
            label="Security"
            @click="index = 1">
            <template #end>
                <FluxBadge
                    v-if="securityErrors > 0"
                    color="danger"
                    icon="circle-exclamation"
                    :label="String(securityErrors)"/>
            </template>
        </FluxTabBarItem>

        <FluxTabBarItem
            icon="gear"
            :is-active="index == 2"
            label="Preferences"
            @click="index = 2"/>
    </FluxTabBar>
</template>

<script
    setup
    lang="ts">
    import { FluxBadge, FluxTabBar, FluxTabBarItem } from '@flux-ui/components';
    import { ref } from 'vue';

    const index = ref(0);
    const securityErrors = ref(2);
</script>
