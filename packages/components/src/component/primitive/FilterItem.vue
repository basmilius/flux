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
    import { useLoaded } from '@basmilius/common';
    import type { FluxFilterDefinition, FluxFilterValue } from '@flux-ui/types';
    import { computed, ref, unref, watch } from 'vue';
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

    const {isLoading, loaded} = useLoaded();
    const getValueLabel = computed(() => loaded(item.getValueLabel));

    const valueLabel = ref<string>();

    function onClick(evt: MouseEvent): void {
        emit('click', evt);
    }

    watch([() => item, () => value], async ([, nextValue], _prev, onCleanup) => {
        let cancelled = false;
        onCleanup(() => {
            cancelled = true;
        });

        const nextLabel = await unref(getValueLabel)(nextValue);

        if (!cancelled) {
            valueLabel.value = nextLabel ?? undefined;
        }
    }, {deep: true, immediate: true});
</script>
