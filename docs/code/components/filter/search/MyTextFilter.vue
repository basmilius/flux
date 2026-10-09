<template>
    <FluxMenuGroup>
        <FluxFilterSearch
            v-model="query"
            placeholder="Contains..."/>

        <FluxMenuItem
            disabled
            :label="query ? `Showing results for “${query}”` : 'Type to filter'"/>
    </FluxMenuGroup>
</template>

<script
    lang="ts"
    setup>
    import { defineFilter, FluxFilterSearch, FluxMenuGroup, FluxMenuItem, pickFilterCommon, useFilterInjection } from '@flux-ui/components';
    import type { FluxFilterSpec } from '@flux-ui/types';
    import { computed } from 'vue';

    type Props = FluxFilterSpec;

    defineFilter<Props>(p => ({
        ...pickFilterCommon(p),
        type: 'text',
        async getValueLabel(value) {
            return typeof value === 'string' && value.length > 0 ? value : null;
        }
    }));

    const {
        name
    } = defineProps<Props>();

    const {getValue, setValue} = useFilterInjection();

    const query = computed({
        get: () => String(getValue(name) ?? ''),
        set: value => setValue(name, value.length > 0 ? value : undefined)
    });
</script>
