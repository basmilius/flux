<template>
    <FluxStack
        :class="$style.paginationBar"
        :direction="breakpoints.lg ? 'horizontal' : 'vertical'">
        <FluxFormInputGroup>
            <FluxFormInputAddition>
                <span>{{ translate('flux.rowsPerPage') }}</span>
            </FluxFormInputAddition>

            <FluxFormSelect
                v-model="limit"
                :options="limitOptions"/>
        </FluxFormInputGroup>

        <FluxSpacer v-if="breakpoints.lg"/>

        <FluxFormInputGroup>
            <FluxFormInputAddition>
                <span>
                    {{
                        translate('flux.displayingOf', {
                            from: (page - 1) * perPage + 1,
                            to: Math.min(total, page * perPage),
                            total: total
                        })
                    }}
                </span>
            </FluxFormInputAddition>

            <FluxPagination
                v-if="total > perPage"
                arrows
                is-compact
                :page="page"
                :per-page="perPage"
                :total="total"
                @navigate="$emit('navigate', $event)"/>
        </FluxFormInputGroup>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { computed, ref, watch } from 'vue';
    import { useBreakpoints } from '@/composable';
    import { useTranslate } from '@/composable/private';
    import type { FluxFormSelectOption } from '@/types';
    import FluxFormInputAddition from './FluxFormInputAddition.vue';
    import FluxFormInputGroup from './FluxFormInputGroup.vue';
    import FluxFormSelect from './FluxFormSelect.vue';
    import FluxPagination from './FluxPagination.vue';
    import FluxSpacer from './FluxSpacer.vue';
    import FluxStack from './FluxStack.vue';
    import $style from '@/css/component/Pagination.module.scss';

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
    const {breakpoints} = useBreakpoints();

    const limit = ref(perPage);

    const limitOptions = computed(() => limits.map<FluxFormSelectOption>(limit => ({
        label: limit.toString(),
        value: limit
    })));

    watch(limit, limit => emit('limit', limit));

    watch(() => perPage, perPage => limit.value = perPage, {immediate: true});
</script>
