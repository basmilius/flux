<template>
    <FluxMenuItem
        :command="valueLabel"
        command-icon="angle-right"
        :command-loading="isLoading"
        :disabled="disabled"
        :icon-leading="item.icon"
        :label="item.label"
        type="button"
        @click="onClick"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxFilterDefinition, FluxFilterValue } from '@flux-ui/types';
    import { useFilterValueLabel } from '~flux/components/composable/private';
    import FluxMenuItem from '../FluxMenuItem.vue';

    const emit = defineEmits<{
        click: [MouseEvent];
    }>();

    const {
        item,
        value
    } = defineProps<{
        readonly item: FluxFilterDefinition;
        readonly value: FluxFilterValue;
        readonly disabled?: boolean;
    }>();

    const {isLoading, valueLabel} = useFilterValueLabel(() => item, () => value);

    function onClick(evt: MouseEvent): void {
        emit('click', evt);
    }
</script>
