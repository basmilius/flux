<template>
    <FluxFadeTransition>
        <FluxMenuGroup
            v-if="totalLevels > 1"
            :key="totalLevels"
            is-horizontal>
            <FluxMenuItem
                icon-leading="grid-2"
                :is-highlighted="0 === viewIndex"
                @click="goToLevel(0)"/>

            <FluxMenuItem
                v-for="(context, index) of contexts"
                :key="context.id"
                :icon-leading="context.icon"
                :is-highlighted="index + 1 === viewIndex"
                @click="goToLevel(index + 1)"/>
        </FluxMenuGroup>
    </FluxFadeTransition>
</template>

<script
    lang="ts"
    setup>
    import { FluxFadeTransition, FluxMenuGroup, FluxMenuItem } from '@flux-ui/components';
    import { useApplicationMenu } from '../composable';

    const {contexts, totalLevels, viewIndex, goToLevel} = useApplicationMenu();
</script>
