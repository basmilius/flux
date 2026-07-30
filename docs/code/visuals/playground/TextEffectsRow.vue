<template>
    <div :class="$style.rows">
        <div :class="$style.row">
            <span :class="$style.textEffectLabel">Shimmer</span>
            <FluxVisualTextShimmer
                :class="$style.textEffectValue"
                :duration="1.8"
                :spread="25">{{ text }}</FluxVisualTextShimmer>
        </div>

        <div :class="$style.row">
            <span :class="$style.textEffectLabel">Scramble</span>
            <FluxVisualTextScramble
                ref="scramble"
                :class="$style.textEffectValue"
                :text="text"/>
        </div>

        <div :class="$style.row">
            <span :class="$style.textEffectLabel">Slot text</span>
            <FluxVisualSlotText
                :class="$style.textEffectValue"
                :text="text"/>
        </div>

        <FluxButtonStack>
            <FluxSecondaryButton
                icon-leading="arrow-right-arrow-left"
                label="Swap the string"
                @click="onSwap"/>
            <FluxSecondaryButton
                icon-leading="rotate"
                label="Replay the scramble"
                @click="onReplay"/>
        </FluxButtonStack>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxSecondaryButton } from '@flux-ui/components';
    import { FluxVisualSlotText, FluxVisualTextScramble, FluxVisualTextShimmer } from '@flux-ui/visuals';
    import { ref, useTemplateRef } from 'vue';

    // Different lengths on purpose: the shorter string makes slot text drop cells,
    // which is where the line is most likely to reflow while it rolls.
    const STRINGS = ['Deploying to production', 'Deployed to staging'];

    const scrambleRef = useTemplateRef<InstanceType<typeof FluxVisualTextScramble>>('scramble');
    const index = ref(0);
    const text = ref(STRINGS[0]);

    function onSwap(): void {
        index.value = (index.value + 1) % STRINGS.length;
        text.value = STRINGS[index.value];
    }

    function onReplay(): void {
        scrambleRef.value?.replay();
    }
</script>

<style
    lang="scss"
    module>
    .rows {
        display: flex;
        flex-direction: column;
        gap: 18px;
    }

    .row {
        display: flex;
        gap: 18px;
        align-items: baseline;
    }

    .textEffectLabel {
        flex: 0 0 auto;
        width: 96px;
        font-size: 13px;
        color: var(--foreground-secondary);
    }

    .textEffectValue {
        font-size: 21px;
        font-weight: 600;
    }
</style>
