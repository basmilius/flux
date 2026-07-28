<template>
    <div :class="$style.streaming">
        <div :class="$style.streamingBody">
            <FluxAiStreamingText
                :content="content"
                :is-streaming="isStreaming"/>
        </div>

        <FluxButtonStack>
            <FluxSecondaryButton
                icon-leading="rotate"
                label="Restart"
                @click="cursor = 0"/>

            <FluxSecondaryButton
                :disabled="!isStreaming"
                label="Skip to the end"
                @click="cursor = response.length"/>
        </FluxButtonStack>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { useInterval } from '@basmilius/common';
    import { FluxAiStreamingText } from '@flux-ui/ai';
    import { FluxButtonStack, FluxSecondaryButton } from '@flux-ui/components';
    import { computed, ref } from 'vue';

    const response = [
        '## Weekly storefront report',
        '',
        'Checkout conversion is **back to normal** after the address lookup incident on the 21st. Mobile is the only surface that ever moved.',
        '',
        '| Surface | Conversion | Change |',
        '| --- | ---: | ---: |',
        '| Desktop | 3.11% | +0.01pp |',
        '| Mobile | 2.36% | -0.04pp |',
        '| Tablet | 2.04% | +0.03pp |',
        '',
        'Three things are worth doing this week:',
        '',
        '- add the funnel alert, so a silent lookup failure pages someone',
        '- fall back to manual entry on mobile after two failed lookups',
        '- mail the 4,102 abandoned carts a reminder before the weekend',
        '',
        'The fallback is a two line change in the address step:',
        '',
        '```ts',
        'if (lookup.failures >= 2) {',
        '    step.mode = \'manual\';',
        '}',
        '```',
        '',
        'The write-up is on the [incident page](https://example.com/incidents/2026-07-21).'
    ].join('\n');

    const cursor = ref(0);

    const content = computed(() => response.slice(0, cursor.value));
    const isStreaming = computed(() => cursor.value < response.length);

    useInterval(24, () => {
        if (isStreaming.value) {
            cursor.value += 3;
        }
    });
</script>

<style
    lang="scss"
    module>
    .streaming {
        display: flex;
        flex-flow: column;
        gap: 18px;
    }

    // A floor rather than a height: the box never grows while the answer does, and the
    // tail of a long response is still reachable.
    .streamingBody {
        min-height: 723px;
        padding: 24px;
        background: var(--surface-raised);
        border: 1px solid var(--surface-stroke-out);
        border-radius: var(--radius-double);
    }
</style>
