<template>
    <FluxFilterBase
        v-model="modelValue"
        :resettable="resettable"
        @reset="reset">
        <template #filters>
            <slot/>
        </template>

        <template #default="{ filters, menuItems }">
            <FluxFilterWindow
                :filters="filters"
                :menu-items="menuItems"
                :resettable="resettable"
                @reset="reset"/>
        </template>
    </FluxFilterBase>
</template>

<script
    lang="ts"
    setup>
    import type { FluxFilterState } from '@flux-ui/types';
    import FluxFilterBase from './FluxFilterBase.vue';
    import FluxFilterWindow from '$flux/component/FluxFilterWindow.vue';

    const emit = defineEmits<{
        reset: [string]
    }>();

    const modelValue = defineModel<FluxFilterState>({
        required: true
    });

    defineProps<{
        readonly resettable?: string[];
    }>();

    defineSlots<{
        default(): any;
    }>();

    function reset(name: string): void {
        emit('reset', name);
    }
</script>
