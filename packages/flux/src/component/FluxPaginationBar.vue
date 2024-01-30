<template>
    <FluxStack
        class="flux-pagination-bar"
        :axis="breakpoints.lg ? 'horizontal' : 'vertical'">
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
    import { computed, ref, toRefs, unref, watch } from 'vue';
    import { useBreakpoints } from '@/composable';
    import { useTranslate } from '@/composable/private';
    import type { FluxFormSelectOption } from '@/data';
    import FluxFormInputAddition from './FluxFormInputAddition.vue';
    import FluxFormInputGroup from './FluxFormInputGroup.vue';
    import FluxFormSelect from './FluxFormSelect.vue';
    import FluxPagination from './FluxPagination.vue';
    import FluxSpacer from './FluxSpacer.vue';
    import FluxStack from './FluxStack.vue';

    export interface Emits {
        (e: 'limit', limit: number): void;

        (e: 'navigate', page: number): void;
    }

    export interface Props {
        readonly limits?: number[];
        readonly page: number;
        readonly perPage: number;
        readonly total: number;
    }

    const emit = defineEmits<Emits>();
    const props = withDefaults(defineProps<Props>(), {
        limits: () => [5, 10, 25, 50, 100]
    });
    const {limits, perPage} = toRefs(props);

    const translate = useTranslate();
    const {breakpoints} = useBreakpoints();

    const limit = ref(unref(perPage));

    const limitOptions = computed(() => unref(limits).map<FluxFormSelectOption>(limit => ({
        id: limit,
        label: `${limit}`
    })));

    watch(limit, limit => emit('limit', limit));

    watch(perPage, perPage => limit.value = perPage, {immediate: true});
</script>

<style lang="scss">
    .flux-pagination-bar {
        align-items: center;

        .flux-form-input-group {
            max-width: max-content;
        }

        .flux-form-select {
            width: 78px;
        }

        .flux-pagination .flux-button:first-child {
            border-radius: 0;
        }
    }

    .flux-pane-footer > .flux-pagination-bar {
        flex-grow: 1;
    }
</style>
