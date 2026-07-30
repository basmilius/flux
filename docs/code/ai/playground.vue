<template>
    <FluxProse
        :class="$style.aiPlayground"
        container
        tag="article">
        <h1>AI playground</h1>
        <p>Every component of <code>@flux-ui/ai</code> on one page, in the shape it actually ships in. Nothing here is a screenshot: the composer appends a real turn, the stream really streams, every disclosure really opens, and the answers come from a fixed script so the page reads the same on every visit.</p>
        <p>The conversation at the top is the whole product in one box. Everything under it isolates a part that is hard to judge while it sits inside an answer: the tail of a half-arrived response, a tool call that failed, a citation between two words. Scroll through once in light and once in dark.</p>

        <h2>A conversation</h2>
        <p>The composer under the conversation works. Pick a suggestion or type anything, press <kbd>Enter</kbd>, and the answer streams in while the list follows its own tail. Scroll up while it writes and the tail lets go, with a button in the corner to come back; the button only exists while you are reading back. <kbd>Shift</kbd> <kbd>Enter</kbd> is a newline rather than a send, and the send button turns into a stop button for as long as the answer runs.</p>
        <p>What to look at. The assistant turn runs the full width of the list while the user turn is a bubble capped at 540px on the opposite side, and the system turn at the top is a sunken strip that belongs to neither. In the first answer a reasoning block, a tool call and the prose stack inside a single turn, which is the arrangement that has to hold together: three disclosure surfaces above a paragraph, none of them shouting. The two citation markers sit inside the line box rather than stretching it. The actions under an answer fade in on hover, so the resting state of a long conversation stays quiet, and they stay hidden entirely while a turn is still streaming.</p>
        <ConversationDemo data-prose-wide/>

        <h2>Streaming</h2>
        <p>One fixed string, three characters every 24ms, restarted by the button under it. The response carries a heading, a bold run, a table, a list, a fenced code block and a link, so the whole markdown renderer is on screen at once.</p>
        <p>What to look at. Every word fades in as it lands and none of the words before it move, wherever the tail happens to be, including inside the code block. Only the tail is parsed again: the table grows a row at a time while it is the last block and freezes the moment the paragraph after it opens, and every block above the tail keeps the vnode it was built with. That is why the copy button on the code block holds its confirmation while the text under it keeps arriving. The rendered markdown lands in a <code>FluxProse</code>, so it should read exactly like the prose of this page.</p>
        <StreamingDemo/>
        <p>Two frames from the middle of a stream, frozen. These are the cases a naive renderer flickers on. On the left the closing pair of an emphasis run has not arrived: the run is closed virtually, so the words are already bold and never flip from literal asterisks to formatted text. On the right a link is half typed: the whole thing is held back until its closing bracket lands, so a partial url never becomes an anchor. Neither one should show a stray <code>*</code> or <code>[</code>.</p>
        <div
            :class="$style.aiPair"
            data-prose-full>
            <FluxPane>
                <FluxPaneHeader
                    subtitle="The closing pair has not arrived yet"
                    title="An unterminated bold run"/>
                <FluxPaneBody>
                    <FluxAiStreamingText
                        :content="unterminatedBold"
                        is-streaming/>
                </FluxPaneBody>
            </FluxPane>

            <FluxPane>
                <FluxPaneHeader
                    subtitle="The url is still being typed"
                    title="A half-typed link"/>
                <FluxPaneBody>
                    <FluxAiStreamingText
                        :content="halfTypedLink"
                        is-streaming/>
                </FluxPaneBody>
            </FluxPane>
        </div>
        <p>A fenced block is a <code>FluxAiCodeBlock</code>, which also stands on its own. The header carries the language from the info string, or the word code when the fence had none, and the copy button holds its confirmation for a couple of seconds before it falls back. Copy from the one on the left and watch the label rather than the clipboard.</p>
        <div
            :class="$style.aiPair"
            data-prose-full>
            <FluxAiCodeBlock
                :code="snippet"
                language="ts"/>

            <FluxAiCodeBlock :code="environment"/>
        </div>

        <h2>Reasoning</h2>
        <p>What to look at. A block that is still thinking carries a spinner and a summary that shimmers; the top one streams its thought for real and starts over once it has finished. A block that is done reports how long it took, in seconds under a minute and in minutes and seconds past it. Every one of them folds open and closed on click, and the chevron follows.</p>
        <FluxFlex
            direction="vertical"
            :gap="12">
            <FluxAiReasoning
                :content="thought"
                is-expanded
                is-streaming/>

            <FluxAiReasoning
                :content="thought"
                is-streaming/>

            <FluxAiReasoning
                :content="settledThought"
                :duration="9"/>

            <FluxAiReasoning
                :content="settledThought"
                :duration="92"
                is-expanded/>
        </FluxFlex>

        <h2>Tool calls</h2>
        <p>What to look at. The three statuses in the order they happen: running carries a spinner and no duration, success and failure each take their own accent, and the accent has to stay readable while the block is folded shut. Then the three shapes that break a naive layout. A tool name long enough to fill the row truncates to one line and still leaves the status and the duration readable. Arguments that are not valid JSON come out exactly as the model sent them rather than disappearing. A result past 900 characters truncates behind a button, which is the only part of the body that changes height on its own.</p>
        <FluxFlex
            direction="vertical"
            :gap="12">
            <FluxAiToolCall
                :arguments="{query: 'checkout funnel 21 july', limit: 5}"
                name="search_documentation"
                status="running"/>

            <FluxAiToolCall
                :arguments="{metric: 'checkout_conversion', from: '2026-07-21', to: '2026-07-22', split_by: 'device'}"
                :duration="1.2"
                name="query_analytics"
                :result="conversionResult"/>

            <FluxAiToolCall
                :arguments="{command: 'bun run report --week 30'}"
                :duration="30"
                name="run_command"
                result="timeout after 30s"
                status="error"/>

            <FluxAiToolCall
                :arguments="{email: 'ada@example.com', status: 'shipped', include_archived: true}"
                :duration="3.4"
                name="search_customer_orders_by_email_address_including_archived_and_cancelled"
                result="7 orders"/>

            <FluxAiToolCall
                arguments='{"filters": {"status": "paid", "device": "mob'
                :duration="0.2"
                is-expanded
                name="search_invoices"
                result="the stream ended before the arguments were complete"
                status="error"/>

            <FluxAiToolCall
                :arguments="{path: 'logs/address-lookup/2026-07-21.log'}"
                :duration="0.3"
                is-expanded
                name="read_file"
                :result="incidentLog"/>
        </FluxFlex>

        <h2>Citations</h2>
        <p>The same paragraph twice: on the left with three markers in it, on the right without a single one. What to look at. The markers take room, so the two columns do not break their lines in the same places, but they do have to share a baseline grid: every line on the left has to sit at the same height as the line on the right, and the gap between the two paragraphs has to match. A marker is a button that opens a card, so it also carries a focus ring and a hover state, and neither is allowed to push the line apart. Tab into the left column and walk through the three of them.</p>
        <div
            :class="$style.aiPair"
            data-prose-full>
            <FluxProse>
                <p>
                    Spacing, sizing and every positional offset sit on a 3px
                    grid.<FluxAiCitation
                        excerpt="All spacing and dimension values are based on a 3px grid: use multiples of 3px for width, height, padding, margin, gap and positional offsets."
                        :index="1"
                        title="Spacing and sizing"
                        url="https://flux-ui.dev/guide/introduction"/> Border radius, hairlines and font sizes follow a scale of their
                    own.<FluxAiCitation
                        excerpt="Hairline borders and outlines, border-radius and font-size are not bound to the 3px grid."
                        :index="2"
                        title="Spacing and sizing"
                        url="https://flux-ui.dev/guide/introduction"/> The base line box is 24px, and a component with a fixed height pulls its
                    margin box back to fit inside
                    one.<FluxAiCitation
                        excerpt="The base line height is 24px: line-height 1.6 on body times a font size of 15px. FluxBadge is 28px tall with a margin-block of -2px."
                        :index="3"
                        title="The 24px line box"
                        url="https://flux-ui.dev/guide/introduction"/>
                </p>

                <p>Change the line height of the body and every one of those components stretches its line and falls off the grid.</p>
            </FluxProse>

            <FluxProse>
                <p>Spacing, sizing and every positional offset sit on a 3px grid. Border radius, hairlines and font sizes follow a scale of their own. The base line box is 24px, and a component with a fixed height pulls its margin box back to fit inside one.</p>

                <p>Change the line height of the body and every one of those components stretches its line and falls off the grid.</p>
            </FluxProse>
        </div>

        <h2>The controls</h2>
        <p>What to look at. The model select is a flyout of radio items: the selected one carries a check, a badge sits next to a name without becoming a focus stop of its own, and the model that needs a better plan is disabled rather than hidden. The usage block is a description list with a progress bar under it. Below nine tenths of the window it is quiet and primary; past that it turns to warning and adds a line; at the limit it turns to danger. The compact variant at the bottom drops the labels and keeps the numbers, for a footer that only has one line to give.</p>
        <div
            :class="$style.trio"
            data-prose-full>
            <FluxPane>
                <FluxPaneHeader
                    icon="robot"
                    subtitle="One badge, one model out of reach"
                    title="Model select"/>
                <FluxPaneBody>
                    <FluxAiModelSelect
                        v-model="model"
                        :models="models"/>
                </FluxPaneBody>
            </FluxPane>

            <FluxPane>
                <FluxPaneHeader
                    icon="receipt"
                    subtitle="A tenth of the context window"
                    title="Usage"/>
                <FluxPaneBody>
                    <FluxAiUsage
                        cost="$0.14"
                        :input-tokens="18420"
                        :limit="200000"
                        :output-tokens="3175"/>
                </FluxPaneBody>
            </FluxPane>

            <FluxPane>
                <FluxPaneHeader
                    icon="triangle-exclamation"
                    subtitle="Near the limit, past it, and compact"
                    title="Usage under pressure"/>
                <FluxPaneBody>
                    <FluxFlex
                        direction="vertical"
                        :gap="18">
                        <FluxAiUsage
                            cost="$1.32"
                            :input-tokens="164280"
                            :limit="200000"
                            :output-tokens="21940"/>

                        <FluxSeparator/>

                        <FluxAiUsage
                            cost="$1.61"
                            :input-tokens="186400"
                            :limit="200000"
                            :output-tokens="24310"/>

                        <FluxSeparator/>

                        <FluxAiUsage
                            cost="$0.14"
                            :input-tokens="18420"
                            is-compact
                            :limit="200000"
                            :output-tokens="3175"/>
                    </FluxFlex>
                </FluxPaneBody>
            </FluxPane>
        </div>

        <h2>Untrusted output</h2>
        <p>A security demo, not a feature demo. Everything in the block below is markdown that came back from a model, and none of it is allowed to become markup: a tag stays the text it is, an event handler never runs, a link with a <code>javascript:</code> scheme loses its href, and a character reference is shown as written instead of decoded. What to look at is what is missing. Nothing should render, nothing should navigate, and the only clickable thing in the block is the one ordinary link at the end.</p>
        <FluxNotice
            color="warning"
            icon="triangle-exclamation"
            message="This block is a hostile response on purpose. If anything below renders as markup, opens a dialog or navigates away, the escaping is broken."
            title="Deliberately hostile input"/>
        <FluxPane data-prose-wide>
            <FluxPaneBody>
                <FluxAiStreamingText :content="untrusted"/>
            </FluxPaneBody>
        </FluxPane>

        <h2>Where each component lives</h2>
        <ul>
            <li><strong>A conversation</strong>: AiConversation, AiMessage, AiPromptInput, AiSuggestions, AiReasoning, AiToolCall, AiCitation, AiStreamingText.</li>
            <li><strong>Streaming</strong>: AiStreamingText, AiCodeBlock.</li>
            <li><strong>Reasoning</strong>: AiReasoning.</li>
            <li><strong>Tool calls</strong>: AiToolCall.</li>
            <li><strong>Citations</strong>: AiCitation.</li>
            <li><strong>The controls</strong>: AiModelSelect, AiUsage.</li>
            <li><strong>Untrusted output</strong>: AiStreamingText.</li>
        </ul>
    </FluxProse>
</template>

<script
    lang="ts"
    setup>
    import { useInterval } from '@basmilius/common';
    import { FluxAiCitation, FluxAiCodeBlock, type FluxAiModel, FluxAiModelSelect, FluxAiReasoning, FluxAiStreamingText, FluxAiToolCall, FluxAiUsage } from '@flux-ui/ai';
    import { FluxFlex, FluxNotice, FluxPane, FluxPaneBody, FluxPaneHeader, FluxProse, FluxSeparator } from '@flux-ui/components';
    import { computed, ref } from 'vue';
    import ConversationDemo from './playground/ConversationDemo.vue';
    import StreamingDemo from './playground/StreamingDemo.vue';

    const THOUGHT = [
        'The question is about a single day, so the weekly rollup is too coarse. The event stream split by device is the right source.',
        '',
        'Desktop and tablet barely move on the 21st, which narrows this to something that only mobile does: the address lookup.'
    ].join('\n');

    const models: FluxAiModel[] = [
        {id: 'mini', name: 'Storefront Mini', description: 'Quick answers over the last seven days.', badge: 'Fastest'},
        {id: 'standard', name: 'Storefront Standard', description: 'The everyday balance of speed and depth.'},
        {id: 'pro', name: 'Storefront Pro', description: 'Reasons over a full quarter of events.', badge: 'Team plan', isDisabled: true}
    ];

    const model = ref('standard');
    const thoughtCursor = ref(0);

    const conversionResult = JSON.stringify([
        {device: 'desktop', sessions: 18402, conversion: .0308, delta: -.0002},
        {device: 'mobile', sessions: 41877, conversion: .0172, delta: -.0068},
        {device: 'tablet', sessions: 3164, conversion: .0201, delta: -.0004}
    ], null, 4);

    const environment = [
        'FLUX_ANALYTICS_URL=https://analytics.example.com',
        'FLUX_ANALYTICS_TIMEOUT=15000'
    ].join('\n');

    const halfTypedLink = 'The rollout finished in three of four regions. The full log is on the [releases page](https://example.com/rel';

    const incidentLog = Array.from({length: 30}, (_, index) => `2026-07-21T10:${30 + index}:00Z  address-lookup  429  rate limit reached, 0 suggestions returned, request dropped after 2 retries`).join('\n');

    const settledThought = [
        'Two invoices carry the same number, which the sequence should make impossible.',
        '',
        'Both were written in the same second by the same worker, so the sequence was read twice before it was written back. That is a race rather than bad data.'
    ].join('\n');

    const snippet = [
        'const response = await fetch(\'/api/answer\', {method: \'POST\'});',
        'const reader = response.body?.getReader();',
        '',
        'while (reader) {',
        '    const {done, value} = await reader.read();',
        '',
        '    if (done) {',
        '        break;',
        '    }',
        '',
        '    answer.value += decoder.decode(value);',
        '}'
    ].join('\n');

    const unterminatedBold = 'The rollout finished in three of four regions. The one that was skipped is **eu-west-1';

    const untrusted = [
        'Everything below came back from a model and none of it becomes markup.',
        '',
        'An <img src=x onerror="alert(1)"> is shown as the text it is, and so is an inline <b>tag</b> or an <iframe src="https://example.com"></iframe>.',
        '',
        'A [link with a javascript scheme](javascript:alert(2)) loses its href and stays plain text, while [an ordinary link](https://example.com) keeps working and opens with `rel="noopener noreferrer"`.',
        '',
        'A character reference such as &amp; is shown as written rather than decoded, so what you read is exactly what the model sent.'
    ].join('\n');

    const thought = computed(() => THOUGHT.slice(0, thoughtCursor.value));

    useInterval(45, () => {
        thoughtCursor.value = thoughtCursor.value > THOUGHT.length + 90 ? 0 : thoughtCursor.value + 3;
    });
</script>

<style
    lang="scss"
    module>
    .aiPlayground {
        container: playground / inline-size;
        padding-block: 60px;
        max-width: 1800px;
        margin-inline: auto;
    }

    .aiPlayground > :global([data-prose-full]) {
        margin-inline: 30px;
    }

    .aiPair {
        display: grid;
        gap: 24px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        align-items: start;
    }

    .trio {
        display: grid;
        gap: 24px;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        align-items: start;
    }

    @container playground (width < 1008px) {
        .trio {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    @container playground (width < 690px) {
        .aiPair,
        .trio {
            grid-template-columns: minmax(0, 1fr);
        }
    }
</style>
