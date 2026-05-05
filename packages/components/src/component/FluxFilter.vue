<template>
    <FluxFilterBase
        v-model="modelValue"
        @clear="onClear"
        @reset="onReset">
        <template #filters>
            <slot/>
        </template>

        <template #default="{ filters, menuItems }">
            <FluxFilterWindow
                :filters="filters"
                :menu-items="menuItems"/>
        </template>
    </FluxFilterBase>
</template>

<script
    lang="ts"
    setup>
    import type { FluxFilterState } from '@flux-ui/types';
    import type { VNode } from 'vue';
    import FluxFilterBase from './FluxFilterBase.vue';
    import FluxFilterWindow from './FluxFilterWindow.vue';

    const emit = defineEmits<{
        clear: [string];
        reset: [string];
    }>();

    const modelValue = defineModel<FluxFilterState>({
        required: true
    });

    defineSlots<{
        default(): VNode[];
    }>();

    function onClear(name: string): void {
        emit('clear', name);
    }

    function onReset(name: string): void {
        emit('reset', name);
    }
</script>
