<template>
    <FluxBadgeStack>
        <FluxBadge
            v-for="filter of filters"
            :key="filter"
            is-deletable
            :label="filter"
            @delete="onDelete(filter)"/>
    </FluxBadgeStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadge, FluxBadgeStack } from '@flux-ui/components';
    import { ref } from 'vue';

    const filters = ref([
        'Brand: Nike',
        'Color: Black',
        'Size: 42'
    ]);

    function onDelete(filter: string): void {
        filters.value = filters.value.filter(active => active !== filter);
    }
</script>
