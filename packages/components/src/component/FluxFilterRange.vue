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
    import type { FluxIconName } from '@flux-ui/types';
    import { computed, unref } from 'vue';
    import { useFilterInjection } from '$flux/composable';
    import { useTranslate } from '$flux/composable/private';
    import FluxFormColumn from './FluxFormColumn.vue';
    import FluxFormField from './FluxFormField.vue';
    import FluxFormSlider from './FluxFormSlider.vue';
    import FluxPaneBody from './FluxPaneBody.vue';

    const {
        formatter = formatNumber,
        max,
        min,
        name,
        step = 1
    } = defineProps<{
        readonly icon?: FluxIconName;
        readonly isTicksVisible?: boolean;
        readonly label: string;
        readonly name: string;
        readonly max: number;
        readonly min: number;
        readonly step?: number;
        readonly formatter?: (value: number) => string;
    }>();

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
