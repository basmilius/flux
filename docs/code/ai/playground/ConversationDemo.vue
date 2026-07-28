<template>
    <div :class="$style.chat">
        <FluxAiConversation
            ref="conversation"
            label="Storefront analytics">
            <FluxAiMessage role="system">
                You are the analytics assistant for the Flux storefront. Answer with numbers a reader can point at, and name the source of every claim.
            </FluxAiMessage>

            <FluxAiMessage
                avatar-fallback-initials="BM"
                date-time="2026-07-22T09:12:00+02:00"
                role="user"
                when="09:12">
                Checkout conversion dropped six percent yesterday. What happened?
            </FluxAiMessage>

            <FluxAiMessage
                date-time="2026-07-22T09:12:00+02:00"
                icon="sparkles"
                role="assistant"
                when="09:12">
                <div :class="$style.answer">
                    <FluxAiReasoning
                        :content="reasoning"
                        :duration="8"/>

                    <FluxAiToolCall
                        :arguments="{metric: 'checkout_conversion', from: '2026-07-21', to: '2026-07-22', split_by: 'device'}"
                        :duration="1.2"
                        name="query_analytics"
                        :result="conversionResult"/>

                    <FluxProse>
                        <p>
                            The drop is mobile only. Desktop held at 3.08% and tablet at 2.01%, both inside their usual band, while mobile conversion fell from 2.40% to 1.72% between 10:40 and
                            14:05.<FluxAiCitation
                                excerpt="Mobile checkout conversion: 1.72% (-0.68pp). Desktop: 3.08% (-0.02pp). Tablet: 2.01% (-0.04pp)."
                                :index="1"
                                title="Checkout funnel, 21 July"
                                url="https://example.com/reports/checkout-funnel"/>
                        </p>

                        <p>
                            That window is the address lookup incident. The provider started answering with 429 at 10:38 and recovered at 14:03, and the field swallowed the error instead of falling back to manual
                            entry.<FluxAiCitation
                                excerpt="Rate limit reached at 10:38 CEST. Requests answered with 429 until 14:03 CEST. No user facing error was shown."
                                :index="2"
                                title="Incident 2026-07-21: address lookup rate limited"
                                url="https://example.com/incidents/2026-07-21"/>
                        </p>

                        <ul>
                            <li>12,904 mobile sessions reached the address step, and 4,102 of those never reached payment.</li>
                            <li>Desktop was unaffected: it falls back to manual entry after two failed lookups.</li>
                            <li>Conversion returned to 2.36% on Wednesday morning without a deploy.</li>
                        </ul>
                    </FluxProse>
                </div>

                <template #footer>
                    Answered from 2 sources in 4.1s.
                </template>

                <template #actions>
                    <FluxAction
                        icon="copy"
                        aria-label="Copy"
                        @click="onCopyClick"/>

                    <FluxAction
                        icon="rotate"
                        aria-label="Retry"/>

                    <FluxAction
                        :is-active="rating === 'up'"
                        icon="thumbs-up"
                        aria-label="Good answer"
                        @click="onRateClick('up')"/>

                    <FluxAction
                        :is-active="rating === 'down'"
                        icon="thumbs-down"
                        aria-label="Bad answer"
                        @click="onRateClick('down')"/>
                </template>
            </FluxAiMessage>

            <FluxAiMessage
                v-for="turn of turns"
                :key="turn.id"
                :avatar-fallback-initials="turn.role === 'user' ? 'BM' : undefined"
                :date-time="turn.dateTime"
                :icon="turn.role === 'assistant' ? 'sparkles' : undefined"
                :is-streaming="turn.isStreaming"
                :role="turn.role"
                :when="turn.when">
                <FluxAiStreamingText
                    v-if="turn.role === 'assistant'"
                    :content="turn.content"
                    :is-streaming="turn.isStreaming"/>

                <span v-else>{{ turn.content }}</span>

                <template
                    v-if="turn.role === 'assistant'"
                    #actions>
                    <FluxAction
                        icon="copy"
                        aria-label="Copy"
                        @click="onCopyClick"/>

                    <FluxAction
                        icon="rotate"
                        aria-label="Retry"/>
                </template>
            </FluxAiMessage>
        </FluxAiConversation>

        <FluxAiPromptInput
            v-model="prompt"
            v-model:attachments="attachments"
            ref="composer"
            accept="image/*,.csv,.pdf"
            :is-streaming="isAnswering"
            placeholder="Ask a follow-up about the storefront..."
            @stop="onStop"
            @submit="onSubmit">
            <FluxAiSuggestions
                v-if="!prompt"
                :suggestions="suggestions"
                @select="onSuggestionSelect"/>
        </FluxAiPromptInput>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { useInterval } from '@basmilius/common';
    import { FluxAiCitation, FluxAiConversation, FluxAiMessage, FluxAiPromptInput, FluxAiReasoning, FluxAiStreamingText, type FluxAiSuggestion, FluxAiSuggestions, FluxAiToolCall } from '@flux-ui/ai';
    import { FluxAction, FluxProse, showSnackbar } from '@flux-ui/components';
    import { computed, nextTick, ref, useTemplateRef } from 'vue';

    type Turn = {
        readonly answer: string;
        content: string;
        readonly dateTime: string;
        readonly id: number;
        isStreaming: boolean;
        readonly role: 'assistant' | 'user';
        readonly when: string;
    };

    // The playground answers from a fixed script, so the page reads the same on every
    // visit no matter what is typed.
    const ANSWERS = [
        [
            'Last Tuesday is the better baseline, and it makes the 21st look like the outlier it is.',
            '',
            '| Week | Mobile | Desktop |',
            '| --- | ---: | ---: |',
            '| 7 July | 2.41% | 3.09% |',
            '| 14 July | 2.38% | 3.11% |',
            '| 21 July | **1.72%** | 3.08% |',
            '',
            'Nothing else shipped in that window, so the address lookup is the only change that lines up with the dip.'
        ].join('\n'),
        [
            'Here is the rule I would add. It watches the funnel step instead of the provider, so it also catches a lookup that fails silently with a `200`.',
            '',
            '```ts',
            'defineAlert({',
            '    metric: \'checkout.step.address.completion\',',
            '    window: \'15m\',',
            '    condition: value => value < 0.82,',
            '    notify: [\'#storefront\']',
            '});',
            '```',
            '',
            'A normal Tuesday sits at 0.94 and the 21st fell to 0.61 within twenty minutes, so the threshold has room on both sides.'
        ].join('\n'),
        [
            'Short version for the incident note:',
            '',
            '1. The address lookup hit its rate limit at 10:38 and stayed there until 14:03.',
            '2. Mobile checkout conversion fell from 2.40% to 1.72% over that window.',
            '3. Roughly 4,100 sessions stopped at the address step and never reached payment.',
            '',
            'The full timeline is on the [incident page](https://example.com/incidents/2026-07-21).'
        ].join('\n')
    ];

    const conversationRef = useTemplateRef<InstanceType<typeof FluxAiConversation>>('conversation');
    const composerRef = useTemplateRef('composer');

    const attachments = ref<File[]>([]);
    const prompt = ref('');
    const rating = ref<'down' | 'up' | null>(null);
    const turns = ref<Turn[]>([]);

    let nextAnswer = 0;
    let nextId = 1;

    const conversionResult = JSON.stringify([
        {device: 'desktop', sessions: 18402, conversion: .0308, delta: -.0002},
        {device: 'mobile', sessions: 41877, conversion: .0172, delta: -.0068},
        {device: 'tablet', sessions: 3164, conversion: .0201, delta: -.0004}
    ], null, 4);

    const reasoning = [
        'The question is about a single day, so the weekly rollup is too coarse. The event stream split by device is the right source.',
        '',
        'Desktop and tablet barely move on the 21st while mobile falls off between 10:40 and 14:05. The status log has an address lookup incident in that same window, so the two belong next to each other before I answer.'
    ].join('\n');

    const suggestions: FluxAiSuggestion[] = [
        {id: 'compare', icon: 'chart-line', label: 'Compare with last Tuesday'},
        {id: 'alert', icon: 'wand-magic-sparkles', label: 'Draft an alert rule'},
        {id: 'note', icon: 'file-lines', label: 'Write the incident note'}
    ];

    const isAnswering = computed(() => turns.value.some(turn => turn.isStreaming));

    useInterval(24, () => {
        const turn = turns.value.at(-1);

        if (!turn?.isStreaming) {
            return;
        }

        // The component takes the whole response so far, so this grows the string
        // rather than handing it a delta.
        turn.content = turn.answer.slice(0, turn.content.length + 3);
        turn.isStreaming = turn.content.length < turn.answer.length;
    });

    function stamp(): Pick<Turn, 'dateTime' | 'when'> {
        const now = new Date();

        return {
            dateTime: now.toISOString(),
            when: now.toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit'})
        };
    }

    function onCopyClick(): void {
        showSnackbar({
            icon: 'circle-check',
            message: 'Answer copied to the clipboard.'
        });
    }

    function onRateClick(value: 'down' | 'up'): void {
        rating.value = rating.value === value ? null : value;
    }

    function onStop(): void {
        const turn = turns.value.at(-1);

        if (turn) {
            turn.isStreaming = false;
        }
    }

    async function onSubmit(value: string): Promise<void> {
        turns.value.push({
            ...stamp(),
            answer: '',
            content: value,
            id: nextId++,
            isStreaming: false,
            role: 'user'
        }, {
            ...stamp(),
            answer: ANSWERS[nextAnswer++ % ANSWERS.length],
            content: '',
            id: nextId++,
            isStreaming: true,
            role: 'assistant'
        });

        attachments.value = [];
        prompt.value = '';

        await nextTick();

        conversationRef.value?.scrollToBottom();
    }

    function onSuggestionSelect(suggestion: FluxAiSuggestion): void {
        prompt.value = suggestion.label;
        composerRef.value?.focus();
    }
</script>

<style
    lang="scss"
    module>
    .chat {
        display: flex;
        height: 780px;
        padding: 24px;
        flex-flow: column;
        gap: 18px;
        background: var(--surface-raised);
        border: 1px solid var(--surface-stroke-out);
        border-radius: var(--radius-double);
    }

    // A turn holds a reasoning block, a tool call and the answer itself, and the
    // message leaves the spacing between them to its content.
    .answer {
        display: flex;
        flex-flow: column;
        gap: 12px;
    }
</style>
