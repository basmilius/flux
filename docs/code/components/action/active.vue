<template>
    <FluxActionStack>
        <FluxAction
            icon="align-left"
            :is-active="alignment === 'left'"
            @click="alignment = 'left'"/>

        <FluxAction
            icon="align-center"
            :is-active="alignment === 'center'"
            @click="alignment = 'center'"/>

        <FluxAction
            icon="align-right"
            :is-active="alignment === 'right'"
            @click="alignment = 'right'"/>
    </FluxActionStack>
</template>

<script
    setup
    lang="ts">
    import { FluxAction, FluxActionStack } from '@flux-ui/components';
    import { ref } from 'vue';

    const alignment = ref<'left' | 'center' | 'right'>('left');
</script>
