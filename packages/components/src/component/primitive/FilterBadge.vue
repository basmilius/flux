<template>
    <FluxBadge
        v-if="valueLabel"
        :class="$style.filterBadge"
        :is-loading="isLoading.value"
        :label="valueLabel"
        @click="onClick"/>
</template>

<script
    lang="ts"
    setup>
    import { useLoaded } from '@basmilius/common';
    import type { FluxFilterItem, FluxFilterValue } from '@flux-ui/types';
    import { computed, ref, unref, watch } from 'vue';
    import { FluxBadge } from '$flux/component';
    import $style from '$flux/css/component/Filter.module.scss';

    const emit = defineEmits<{
        click: [MouseEvent];
    }>();

    const {
        item,
        value
    } = defineProps<{
        readonly item: FluxFilterItem;
        readonly value: FluxFilterValue;
    }>();

    const {isLoading, loaded} = useLoaded();
    const getValueLabel = computed(() => loaded(item.getValueLabel));

    const valueLabel = ref<string>();

    function onClick(evt: MouseEvent): void {
        emit('click', evt);
    }

    watch([() => item, () => value], async () => {
        valueLabel.value = await unref(getValueLabel)(value) ?? undefined;
    }, {deep: true, immediate: true});
</script>
