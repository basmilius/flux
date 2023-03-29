<template>
    <flux-stack
        class="flux-pagination-bar"
        :axis="breakpoints.lg ? 'horizontal' : 'vertical'">
        <flux-form-input-group>
            <flux-form-input-addition>
                <span>{{ translate('flux_rows_per_page') }}</span>
            </flux-form-input-addition>

            <flux-form-select
                :model-value="perPage"
                :options="limitOptions"
                @update:model-value="$emit('limit', $event)"/>
        </flux-form-input-group>

        <flux-spacer v-if="breakpoints.lg"/>

        <flux-form-input-group v-if="total > perPage">
            <flux-form-input-addition>
                <span>
                    {{
                        translate('flux_displaying_of', {
                            from: (page - 1) * perPage + 1,
                            to: Math.min(total, page * perPage),
                            total: total
                        })
                    }}
                </span>
            </flux-form-input-addition>

            <flux-pagination
                arrows
                is-compact
                :page="page"
                :per-page="perPage"
                :total="total"
                @navigate="$emit('navigate', $event)"/>
        </flux-form-input-group>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { computed, toRefs, unref } from 'vue-demi';
    import { useBreakpoints, useTranslate } from '../composables';
    import { FluxFormSelectOption } from '../data';
    import { FluxFormInputAddition, FluxFormInputGroup, FluxFormSelect, FluxPagination, FluxSpacer, FluxStack } from '.';

    export interface Emits {
        (e: 'limit', limit: number): void;
        (e: 'navigate', page: number): void;
    }

    export interface Props {
        readonly limits: number[];
        readonly page: number;
        readonly perPage: number;
        readonly total: number;
    }

    defineEmits<Emits>();
    const props = withDefaults(defineProps<Props>(), {
        limits: () => [5, 10, 25, 50, 100]
    });
    const {limits} = toRefs(props);

    const translate = useTranslate();
    const {breakpoints} = useBreakpoints();

    const limitOptions = computed(() => unref(limits).map<FluxFormSelectOption>(limit => ({
        id: limit,
        label: `${limit}`
    })));
</script>

<style lang="scss">
    @layer component {
        .flux-pagination-bar {
            align-items: center;
        }
    }

    @layer cosy {
        .flux-pagination-bar {
            .flux-form-select {
                width: 78px;
            }

            .flux-pagination {
                margin-left: -1px;
            }

            .flux-pagination .flux-button:first-child {
                border-radius: 0;
            }
        }

        .flux-pane-footer > .flux-pagination-bar {
            flex-grow: 1;
        }
    }
</style>
