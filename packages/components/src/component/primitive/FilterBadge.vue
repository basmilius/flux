<template>
    <FluxBadge
        v-if="valueLabel"
        :class="$style.filterBadge"
        :is-loading="isLoading"
        :label="valueLabel"
        @click="onClick"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxFilterDefinition, FluxFilterValue } from '@flux-ui/types';
    import { useFilterValueLabel } from '~flux/components/composable/private';
    import FluxBadge from '../FluxBadge.vue';
    import $style from '~flux/components/css/component/Filter.module.scss';

    const emit = defineEmits<{
        click: [MouseEvent];
    }>();

    const {
        item,
        value
    } = defineProps<{
        readonly item: FluxFilterDefinition;
        readonly value: FluxFilterValue;
    }>();

    const {isLoading, valueLabel} = useFilterValueLabel(() => item, () => value);

    function onClick(evt: MouseEvent): void {
        emit('click', evt);
    }
</script>
