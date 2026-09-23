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
    import { FluxBadge } from '@flux-ui/components';
    import type { FluxFilterDefinition, FluxFilterValue } from '@flux-ui/types';
    import { useFilterValueLabel } from '~flux/filter/composable/private';
    import $style from '~flux/filter/css/component/Filter.module.scss';

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
