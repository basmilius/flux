<template>
    <FluxPaneBody>
        <FluxFormColumn>
            <FluxFormField :label="translate('flux.min')">
                <FluxFormSlider
                    :formatter="formatter"
                    :is-ticks-visible="isTicksVisible"
                    :model-value="currentValue[0]"
                    :max="max"
                    :min="min"
                    :step="step"
                    @update:model-value="update({lower: $event})"/>

                <template #value>
                    {{ formatter ? formatter(currentValue[0]) : currentValue[0] }}
                </template>
            </FluxFormField>

            <FluxFormField :label="translate('flux.max')">
                <FluxFormSlider
                    :formatter="formatter"
                    :is-ticks-visible="isTicksVisible"
                    :model-value="currentValue[1]"
                    :max="max"
                    :min="min"
                    :step="step"
                    @update:model-value="update({upper: $event})"/>

                <template #value>
                    {{ formatter ? formatter(currentValue[1]) : currentValue[1] }}
                </template>
            </FluxFormField>
        </FluxFormColumn>
    </FluxPaneBody>
</template>

<script
    lang="ts"
    setup>
    import { formatNumber } from '@basmilius/utils';
    import type { FluxFilterRangeSpec } from '@flux-ui/types';
    import { computed, unref } from 'vue';
    import { useFilterInjection } from '~flux/components/composable';
    import { useTranslate } from '~flux/components/composable/private';
    import { defineFilter, pickFilterCommon } from '~flux/components/util';
    import FluxFormColumn from './FluxFormColumn.vue';
    import FluxFormField from './FluxFormField.vue';
    import FluxFormSlider from './FluxFormSlider.vue';
    import FluxPaneBody from './FluxPaneBody.vue';

    type Props = FluxFilterRangeSpec & {
        readonly isTicksVisible?: boolean;
        readonly max: number;
        readonly min: number;
        readonly step?: number;
    };

    defineFilter<Props>(p => ({
        ...pickFilterCommon(p),
        type: 'range',
        async getValueLabel(value) {
            if (!value || !Array.isArray(value) || value.length !== 2) {
                return null;
            }

            const [lower, upper] = value as number[];
            const format = p.formatter ?? formatNumber;

            return `${format(lower!)} – ${format(upper!)}`;
        }
    }));

    const {
        formatter = formatNumber,
        max,
        min,
        name,
        step = 1
    } = defineProps<Props>();

    const {state, setValue} = useFilterInjection();
    const translate = useTranslate();

    const currentValue = computed(() => (unref(state)[name] ?? [min, max]) as number[]);

    function update({lower, upper}: { lower?: number, upper?: number }): void {
        if (lower || lower === 0) {
            upper ??= unref(currentValue)[1];

            if (lower > upper) {
                upper = lower;
            }
        }

        if (upper || upper === 0) {
            lower ??= unref(currentValue)[0];

            if (lower > upper) {
                lower = upper;
            }
        }

        setValue(name, [lower!, upper!]);
    }
</script>
