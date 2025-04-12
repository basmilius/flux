<template>
    <FluxMenuItem
        :command="valueLabel"
        command-icon="angle-right"
        :command-loading="isLoading"
        :icon-leading="item.icon"
        :label="item.label"
        type="button"
        @click="onClick"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxFilterItem, FluxFilterValue } from '@flux-ui/types';
    import { computed, ref, unref, watch } from 'vue';
    import { useLoaded } from '$flux/composable/private';
    import FluxMenuItem from '$flux/component/FluxMenuItem.vue';

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

    watch(() => item, async () => {
        valueLabel.value = await unref(getValueLabel)(value) ?? undefined;
    }, {deep: true, immediate: true});
</script>
