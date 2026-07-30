<template>
    <div :class="$style.lab">
        <div :class="$style.readouts">
            <div :class="$style.numberFlowReadout">
                <span :class="$style.numberFlowLabel">Plain</span>
                <FluxVisualNumberFlow
                    :class="$style.numberFlowValue"
                    :value="value"/>
            </div>

            <div :class="$style.numberFlowReadout">
                <span :class="$style.numberFlowLabel">Currency</span>
                <FluxVisualNumberFlow
                    :class="$style.numberFlowValue"
                    :format="CURRENCY"
                    :value="value"/>
            </div>

            <div :class="$style.numberFlowReadout">
                <span :class="$style.numberFlowLabel">Compact</span>
                <FluxVisualNumberFlow
                    :class="$style.numberFlowValue"
                    :format="COMPACT"
                    :value="value"/>
            </div>
        </div>

        <FluxButtonStack>
            <FluxSecondaryButton
                label="+1"
                @click="value += 1"/>
            <FluxSecondaryButton
                label="+250"
                @click="value += 250"/>
            <FluxSecondaryButton
                label="-1,200"
                @click="value -= 1200"/>
            <FluxSecondaryButton
                label="Jump to 1,048,576"
                @click="value = 1048576"/>
            <FluxSecondaryButton
                label="Down to 9"
                @click="value = 9"/>
            <FluxSecondaryButton
                icon-leading="rotate"
                label="Reset"
                @click="value = 1250"/>
        </FluxButtonStack>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxSecondaryButton } from '@flux-ui/components';
    import { FluxVisualNumberFlow } from '@flux-ui/visuals';
    import { ref } from 'vue';

    const CURRENCY: Intl.NumberFormatOptions = {currency: 'EUR', maximumFractionDigits: 0, style: 'currency'};
    const COMPACT: Intl.NumberFormatOptions = {maximumFractionDigits: 1, notation: 'compact'};

    const value = ref(1250);
</script>

<style
    lang="scss"
    module>
    .lab {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    .readouts {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 24px;
    }

    @container playground (width < 690px) {
        .readouts {
            grid-template-columns: minmax(0, 1fr);
        }
    }

    .numberFlowReadout {
        display: flex;
        flex-direction: column;
        gap: 3px;
        padding: 18px;
        background: var(--surface);
        border: 1px solid var(--surface-stroke);
        border-radius: var(--radius);
    }

    .numberFlowLabel {
        font-size: 13px;
        color: var(--foreground-secondary);
    }

    .numberFlowValue {
        font-size: 27px;
        font-weight: 700;
    }
</style>
