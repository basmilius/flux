<template>
    <div :class="$style.paginationBar">
        <FluxPagination
            v-if="total > perPage"
            arrows
            :page="page"
            :per-page="perPage"
            :total="total"
            @navigate="$emit('navigate', $event)"/>

        <FluxSpacer :class="$style.paginationBarSpacer"/>

        <div :class="$style.paginationBarLimit">
            <span :class="$style.paginationBarLimitDisplayingOf">
                {{
                    translate('flux.displayingOf', {
                        from: (page - 1) * perPage + 1,
                        to: Math.min(total, page * perPage),
                        total: total
                    })
                }}
            </span>

            <FluxFormSelect
                v-model="limit"
                :class="$style.paginationBarLimitSelect"
                :options="limitOptions"/>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxFormSelectOption } from '@flux-ui/types';
    import { computed, ref, watch } from 'vue';
    import { useTranslate } from '$flux/composable/private';
    import FluxFormSelect from './FluxFormSelect.vue';
    import FluxPagination from './FluxPagination.vue';
    import FluxSpacer from './FluxSpacer.vue';
    import $style from '$flux/css/component/Pagination.module.scss';

    const emit = defineEmits<{
        limit: [number];
        navigate: [number];
    }>();

    const {
        limits = [5, 10, 25, 50, 100],
        perPage
    } = defineProps<{
        readonly limits?: number[];
        readonly page: number;
        readonly perPage: number;
        readonly total: number;
    }>();

    const translate = useTranslate();

    const limit = ref(perPage);

    const limitOptions = computed(() => limits.map<FluxFormSelectOption>(n => ({
        label: translate('flux.showN', {n}),
        value: n
    })));

    watch(limit, limit => emit('limit', limit));

    watch(() => perPage, perPage => limit.value = perPage, {immediate: true});
</script>
