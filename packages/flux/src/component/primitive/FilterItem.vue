<template>
    <FluxMenuItem
        :command="valueLabel"
        command-icon="angle-right"
        :command-loading="isLoading"
        :icon-before="item.icon"
        :label="item.label"
        type="button"
        @click="onClick()"/>
</template>

<script
    lang="ts"
    setup>
    import { computed, ref, unref, watch } from 'vue';
    import { useLoaded, useTranslate } from '@/composable/private';
    import type { FluxFilterItem, FluxFilterValue } from '@/data';
    import FluxMenuItem from '../FluxMenuItem.vue';

    export type Emits = {
        (e: 'click'): void;
    };

    export type Props = {
        readonly item: FluxFilterItem;
        readonly value: FluxFilterValue;
    };

    const emit = defineEmits<Emits>();
    const props = defineProps<Props>();

    const {isLoading, loaded} = useLoaded();
    const translate = useTranslate();
    const getValueLabel = computed(() => loaded(props.item.getValueLabel));

    const valueLabel = ref<string | null>('');

    function onClick(): void {
        emit('click');
    }

    watch(() => props.item, async () => {
        valueLabel.value = await unref(getValueLabel)(props.value, translate);
    }, {deep: true, immediate: true});
</script>
