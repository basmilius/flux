<template>
    <FluxProse
        :class="$style.visualsPlayground"
        container
        tag="article">
        <h1>Flux Visuals playground</h1>
        <p>All sixteen components of <code>@flux-ui/visuals</code> are effects, and an effect can only be judged in the composition it was made for. This page puts each of them where it would actually ship, and then pulls the ones that are easy to confuse back out and lines them up side by side. It is a review sheet, not a tutorial.</p>
        <p>Read it twice, once in light and once in dark. An effect tuned against a dark surface tends to disappear on a light one, and the noise, the shimmer and the beams are the usual casualties. Then read it a third time with <code>prefers-reduced-motion</code> on and work through the checklist at the bottom of the page.</p>

        <h2>In place</h2>
        <p>The question every effect on this page has to answer: does it earn its place. A hero band with a grid pattern and a film grain, a pricing card wrapped in a border beam, a metric that counts up, a status list of pings, an empty state on an illustrated pane, an assistant that shimmers while it thinks. If an effect only reads as decoration once it sits inside real content, that is the finding.</p>
        <div
            :class="$style.hero"
            data-prose-full>
            <FluxVisualGridPattern
                glow
                :height="30"
                :stroke-dasharray="3"
                :width="30"/>

            <FluxVisualNoise :opacity=".05"/>

            <div :class="$style.heroContent">
                <FluxBadge
                    color="primary"
                    colored
                    icon="sparkles"
                    label="Flux Visuals"/>
                <span :class="$style.heroTitle">Movement that belongs to the design system</span>
                <span :class="$style.heroText">Sixteen decorative effects built on the same tokens as the rest of Flux, so a backdrop, a beam or a rolling number never looks like it was bolted on from a separate animation library.</span>
                <FluxButtonStack>
                    <FluxPrimaryButton
                        icon-leading="rocket"
                        label="Get started"/>
                    <FluxSecondaryButton
                        icon-leading="book"
                        label="Read the docs"/>
                </FluxButtonStack>
            </div>
        </div>
        <p>The grid pattern above carries <code>glow</code>, so it lights up under the pointer. Move across the band and check that the halo tracks without lag and that it stays inside the rounded corners. The grain over it is a plain <code>FluxVisualNoise</code> at five percent, which is lifted by half again in dark; if the band looks dirty rather than textured, that lift is the first thing to question.</p>
        <div
            :class="$style.effectGrid"
            data-prose-full>
            <FluxVisualBorderBeam>
                <FluxPane>
                    <FluxPaneHeader
                        subtitle="Everything in Starter, plus review tools"
                        title="Team"/>
                    <FluxPaneBody>
                        <FluxFlex
                            align="baseline"
                            direction="horizontal"
                            :gap="6">
                            <span :class="$style.price">€29</span>
                            <span :class="$style.caption">per editor, per month</span>
                        </FluxFlex>
                    </FluxPaneBody>
                    <FluxPaneBody>
                        <FluxPrimaryButton label="Choose Team"/>
                    </FluxPaneBody>
                </FluxPane>
            </FluxVisualBorderBeam>

            <FluxPane>
                <FluxPaneBody>
                    <FluxFlex
                        align="start"
                        direction="vertical"
                        :gap="6">
                        <span :class="$style.caption">Monthly recurring revenue</span>
                        <FluxVisualNumberFlow
                            :class="$style.effectMetric"
                            :format="CURRENCY"
                            :value="revenue"/>
                        <FluxBadge
                            color="success"
                            icon="arrow-trend-up"
                            label="+12.4% vs last month"/>
                    </FluxFlex>
                </FluxPaneBody>
            </FluxPane>

            <FluxPane>
                <FluxPaneHeader
                    icon="server"
                    subtitle="Live from the status page"
                    title="Services"/>
                <FluxPaneBody>
                    <FluxFlex
                        direction="vertical"
                        :gap="12">
                        <FluxFlex
                            v-for="service of services"
                            :key="service.name"
                            align="center"
                            direction="horizontal"
                            :gap="9">
                            <FluxVisualPing :color="service.color"/>
                            <span>{{ service.name }}</span>
                            <FluxSpacer/>
                            <span :class="$style.caption">{{ service.status }}</span>
                        </FluxFlex>
                    </FluxFlex>
                </FluxPaneBody>
            </FluxPane>

            <FluxPane>
                <FluxVisualPaneIllustration
                    :animated-colors="['#6071b5', '#f07db7']"
                    :animated-seed="130496"
                    :aspect-ratio="21 / 9"
                    is-masked>
                    <FluxBoxedIcon
                        name="box-archive"
                        :size="27"/>
                </FluxVisualPaneIllustration>
                <FluxPaneBody>
                    <FluxPlaceholder
                        message="Projects you archive end up here. Nothing has been archived in the last ninety days."
                        title="No archived projects"
                        variant="simple"/>
                </FluxPaneBody>
                <FluxPaneBody>
                    <FluxSecondaryButton
                        icon-leading="folder"
                        label="Browse all projects"/>
                </FluxPaneBody>
            </FluxPane>

            <FluxPane>
                <FluxPaneHeader
                    icon="robot"
                    subtitle="A label that says work is happening"
                    title="Assistant"/>
                <FluxPaneBody>
                    <FluxFlex
                        align="start"
                        direction="vertical"
                        :gap="15">
                        <FluxVisualTextShimmer
                            v-if="isThinking"
                            :class="$style.assistant">Reading the deployment logs</FluxVisualTextShimmer>
                        <span
                            v-else
                            :class="$style.assistant">Three deployments failed in the last hour.</span>

                        <FluxButtonStack>
                            <FluxSecondaryButton
                                :label="isThinking ? 'Finish' : 'Ask again'"
                                @click="isThinking = !isThinking"/>
                            <FluxSecondaryButton
                                icon-leading="copy"
                                @click="onCopy">
                                <template #label>
                                    <FluxVisualSlotText
                                        ref="copyLabel"
                                        text="Copy"/>
                                </template>
                            </FluxSecondaryButton>
                        </FluxButtonStack>
                    </FluxFlex>
                </FluxPaneBody>
            </FluxPane>

            <FluxPane>
                <FluxPaneHeader
                    icon="wand-magic-sparkles"
                    subtitle="The same button, two edge effects"
                    title="Beam and shine"/>
                <FluxPaneBody>
                    <FluxFlex
                        align="start"
                        direction="vertical"
                        :gap="15">
                        <FluxVisualBorderBeam variant="sm">
                            <FluxSecondaryButton
                                icon-leading="sparkles"
                                label="Generate with a beam"/>
                        </FluxVisualBorderBeam>

                        <FluxVisualBorderShine>
                            <FluxSecondaryButton
                                icon-leading="sparkles"
                                label="Generate with a shine"/>
                        </FluxVisualBorderShine>
                    </FluxFlex>
                </FluxPaneBody>
            </FluxPane>
        </div>
        <p>The two buttons in the last pane are the pair to look at hardest. The beam adds a wrapper and paints inside it, so it follows the button's corner radius; the shine clones the button and draws a conic gradient on a <code>::before</code>, so its radius comes from <code>--radius</code> and has to be corrected with the <code>radius</code> prop the moment the element it decorates is rounder or squarer than the default.</p>
        <p>The beam has five variants and they are not interchangeable: <code>sm</code> and <code>md</code> rotate a soft window around the perimeter, <code>line</code> sends a single travelling stroke along it, and the two pulse variants breathe without rotating at all. The pulse pair is the only one driven from JavaScript, through one shared frame-capped loop; the rest is CSS. A <code>mono</code> color variant, or <code>static-colors</code>, freezes the hue shift but keeps the movement.</p>
        <div
            :class="$style.beams"
            data-prose-full>
            <FluxVisualBorderBeam
                v-for="variant of BEAM_VARIANTS"
                :key="variant"
                :variant="variant">
                <FluxPane>
                    <FluxPaneBody>
                        <FluxFlex
                            align="start"
                            direction="vertical"
                            :gap="3">
                            <span :class="$style.caption">variant</span>
                            <strong>{{ variant }}</strong>
                        </FluxFlex>
                    </FluxPaneBody>
                </FluxPane>
            </FluxVisualBorderBeam>
        </div>

        <h2>The backgrounds together</h2>
        <p>Four backdrops at the same size, on the same surface, in the same row. They are easy to confuse from memory and easy to get subtly wrong: the two svg patterns are static and take their color from the stroke tokens, the flickering grid repaints every cell every frame, and the noise is a filter texture that blends with whatever sits under it. Compare the density first, then the contrast, then switch theme and compare both again.</p>
        <div
            :class="$style.tiles"
            data-prose-full>
            <div :class="$style.tile">
                <FluxAspectRatio :aspect-ratio="4 / 3">
                    <FluxVisualDotPattern
                        :height="16"
                        :width="16"/>
                </FluxAspectRatio>
                <span :class="$style.tileLabel">Dot pattern, svg, static</span>
            </div>

            <div :class="$style.tile">
                <FluxAspectRatio :aspect-ratio="4 / 3">
                    <FluxVisualGridPattern
                        :height="30"
                        :stroke-dasharray="3"
                        :width="30"/>
                </FluxAspectRatio>
                <span :class="$style.tileLabel">Grid pattern, svg, static</span>
            </div>

            <div :class="$style.tile">
                <FluxAspectRatio :aspect-ratio="4 / 3">
                    <FluxVisualFlickeringGrid/>
                </FluxAspectRatio>
                <span :class="$style.tileLabel">Flickering grid, canvas, per frame</span>
            </div>

            <div :class="$style.tile">
                <FluxAspectRatio :aspect-ratio="4 / 3">
                    <FluxVisualNoise
                        animated
                        :opacity=".06"/>
                </FluxAspectRatio>
                <span :class="$style.tileLabel">Noise, animated, blended</span>
            </div>
        </div>
        <p>The flickering grid is the odd one out: its <code>color</code> is resolved by painting it onto a detached canvas, so it takes a literal color and a design token handed to it silently paints black. It is shown here on its default blue, which is the same blue in both themes.</p>
        <p>Two more backdrops belong in this comparison, both painting in color rather than in a stroke token. The animated colors field is a canvas of drifting polygons under a heavy blur, and the pane illustration is not a separate effect at all: it is the grid pattern and that same field stacked under a mask, which is why it is the one to reach for at the top of a pane.</p>
        <div
            :class="$style.tiles"
            data-prose-full>
            <div :class="$style.tile">
                <FluxAspectRatio :aspect-ratio="4 / 3">
                    <FluxVisualAnimatedColors
                        :colors="['#d37709', '#d32475', '#6615de']"
                        :incrementor=".5"
                        :opacity="1"
                        :seed="130496"/>
                </FluxAspectRatio>
                <span :class="$style.tileLabel">Animated colors, canvas, per frame</span>
            </div>

            <div :class="$style.tile">
                <FluxAspectRatio :aspect-ratio="4 / 3">
                    <FluxVisualAnimatedColors
                        :colors="['#d37709', '#d32475', '#6615de']"
                        :opacity="1"
                        :seed="130496"
                        static/>
                </FluxAspectRatio>
                <span :class="$style.tileLabel">The same field, static</span>
            </div>

            <div :class="$style.tile">
                <FluxVisualPaneIllustration
                    :animated-colors="['#6071b5', '#f07db7']"
                    :animated-seed="130496"
                    :aspect-ratio="4 / 3"
                    is-masked/>
                <span :class="$style.tileLabel">Pane illustration, both stacked</span>
            </div>
        </div>

        <h2>The text effects together</h2>
        <p>Shimmer, scramble and slot text on one string, so the three can be told apart in a single glance. Swapping the string leaves the shimmer untouched, makes the scramble decode toward the new text, and makes the slot roll each changed glyph past the clip edge. Watch the third row for the baseline: the cells resize while they roll, so a shorter string must not make the line jump.</p>
        <TextEffectsRow/>
        <p>The shimmer is the only one of the three that runs on its own, forever, and the only one that is not really about the text: it sweeps a gradient over a <code>background-clip: text</code> fill regardless of what the label says. The other two own their element's DOM after mount and animate toward a value, which is why both keep a settled <code>aria-label</code> for screen readers rather than exposing the frames.</p>

        <h2>Attention and the highlighter family</h2>
        <p>The four attention effects fire once and stop, driven by a <code>trigger</code> that can be any value. Press each button twice in a row: playing the same effect back to back is where a restart tends to be swallowed. The bell underneath is the composition it exists for.</p>
        <AttentionRow/>
        <p>Highlighters draw a rough annotation over their own text. Standalone, each one waits for the layout to settle and then draws on its own schedule, so a sentence with several of them fires <FluxVisualHighlighter variant="highlight">all at once</FluxVisualHighlighter> and reads as <FluxVisualHighlighter color="var(--primary-solid)" variant="underline">a single event</FluxVisualHighlighter> rather than <FluxVisualHighlighter color="var(--danger-solid)" variant="circle">a sequence</FluxVisualHighlighter>.</p>
        <p :key="groupKey">
            <FluxVisualHighlighterGroup
                color="var(--primary-solid)"
                variant="underline">
                In a group the parent collects the annotations, orders them by document position and draws them <FluxVisualHighlighter>one after another</FluxVisualHighlighter>, so the same sentence reads as a <FluxVisualHighlighter>cascade</FluxVisualHighlighter>. Coordination is the thing that breaks here: replay it a few times and check that the order holds, that nothing draws twice, and that an <FluxVisualHighlighter variant="highlight" color="var(--warning-soft-hover)">override</FluxVisualHighlighter> still inherits the timing while it ignores the color.
            </FluxVisualHighlighterGroup>
        </p>
        <FluxButtonStack>
            <FluxSecondaryButton
                icon-leading="rotate"
                label="Replay the cascade"
                @click="++groupKey"/>
        </FluxButtonStack>

        <h2>Number flow</h2>
        <p>The same value in three formats, so a change can be judged on all of them at once. The interesting presses are the ones that are not a small increase: a decrease has to roll the other way, and the jump to seven digits has to grow the label without shoving whatever sits next to it. The compact format is the one to watch there, because it changes both the digits and the suffix in the same frame.</p>
        <NumberFlowLab/>
        <p>The digits are tabular, so the width only changes when the number of characters does. The value is written straight into the text node from a requestAnimationFrame tween, never through Vue, and the reactive <code>aria-label</code> carries the settled value so a screen reader never reads the frames streaming past.</p>

        <h2>Motion</h2>
        <p>Every component on this page moves, so the package has to hold up with <code>prefers-reduced-motion: reduce</code> switched on at the operating system. Turn it on and reload before checking the list below: the animated colors field and the flickering grid read the preference once when they start, so an already-running instance will not notice the switch.</p>
        <FluxNotice
            color="danger"
            icon="triangle-exclamation"
            title="Two effects keep moving">
            <p><strong>Border shine</strong> ignores the preference completely: its conic gradient spins forever with no guard in the component or in <code>Visual.module.scss</code>. <strong>Border beam</strong> only honors it for the two pulse variants; <code>sm</code>, <code>md</code> and <code>line</code> keep rotating, because the media query in <code>BorderBeam.module.scss</code> lists the pulse classes only.</p>
        </FluxNotice>
        <p>What the rest should do:</p>
        <ul>
            <li><strong>Animated colors</strong> paints one frame and stops. <strong>Pane illustration</strong> inherits that, on top of a pattern that never moved.</li>
            <li><strong>Attention</strong> does not move the target at all, and still emits <code>finished</code> straight away, so anything chained to it keeps working.</li>
            <li><strong>Border beam</strong>, <code>pulse-inner</code> and <code>pulse-outside</code>: the glow holds still and the shared loop is never registered.</li>
            <li><strong>Flickering grid</strong> draws one frozen field of squares, and redraws it on resize.</li>
            <li><strong>Highlighter</strong> and <strong>highlighter group</strong> appear fully drawn instead of sketching in, and the cascade collapses into a single step.</li>
            <li><strong>Noise</strong> keeps its grain but stops jumping. Only the <code>animated</code> variant is affected.</li>
            <li><strong>Number flow</strong>, <strong>slot text</strong> and <strong>text scramble</strong> snap to the new value with no tween, no roll and no decode.</li>
            <li><strong>Ping</strong> becomes a plain dot: both rings are dropped rather than paused, so nothing sits frozen mid-expansion.</li>
            <li><strong>Text shimmer</strong> falls back to a solid color and stays legible.</li>
            <li><strong>Dot pattern</strong> and <strong>grid pattern</strong> never animated. Their <code>glow</code> is a pointer-driven reveal, not autonomous motion, so it stays on.</li>
        </ul>
        <p>The other half of the motion question is what it costs while nothing is being interacted with. Five of these run continuously rather than per event, and only three of the five stop when they scroll out of view.</p>
        <ul>
            <li><strong>Animated colors</strong> is the most expensive: a full canvas repaint per frame under a 60px blur and a saturate filter. It stops off-screen through <code>useInView</code>, and a single frame can be had with <code>static</code>.</li>
            <li><strong>Flickering grid</strong> fills one rectangle per cell per frame, so its cost scales with the area divided by <code>size</code> plus <code>gap</code>. It stops off-screen through <code>useInView</code>.</li>
            <li><strong>Border beam</strong> pauses its animations off-screen with a 256px margin, and unregisters the pulse loop at the same time.</li>
            <li><strong>Border shine</strong> re-rasterizes a conic gradient on the main thread on every frame, through a registered <code>@property</code> angle, and it never stops. Off-screen, in a background tab or under reduced motion, it keeps going.</li>
            <li><strong>Noise</strong>, <strong>text shimmer</strong> and <strong>ping</strong> also run forever, but they animate a background position or a transform, so the browser can keep them cheap. None of the three watches the viewport.</li>
        </ul>
        <p>Put the flickering grid and the animated colors field side by side in one view, scroll them off, and watch the frame time recover. If it does not, the in-view gating is the first thing to check.</p>
    </FluxProse>
</template>

<script
    lang="ts"
    setup>
    import { FluxAspectRatio, FluxBadge, FluxBoxedIcon, FluxButtonStack, FluxFlex, FluxNotice, FluxPane, FluxPaneBody, FluxPaneHeader, FluxPlaceholder, FluxPrimaryButton, FluxProse, FluxSecondaryButton, FluxSpacer } from '@flux-ui/components';
    import type { FluxColor, FluxVisualBorderBeamVariant } from '@flux-ui/types';
    import { FluxVisualAnimatedColors, FluxVisualBorderBeam, FluxVisualBorderShine, FluxVisualDotPattern, FluxVisualFlickeringGrid, FluxVisualGridPattern, FluxVisualHighlighter, FluxVisualHighlighterGroup, FluxVisualNoise, FluxVisualNumberFlow, FluxVisualPaneIllustration, FluxVisualPing, FluxVisualSlotText, FluxVisualTextShimmer } from '@flux-ui/visuals';
    import { onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue';
    import AttentionRow from './playground/AttentionRow.vue';
    import NumberFlowLab from './playground/NumberFlowLab.vue';
    import TextEffectsRow from './playground/TextEffectsRow.vue';

    const BEAM_VARIANTS: FluxVisualBorderBeamVariant[] = ['sm', 'md', 'line', 'pulse-inner', 'pulse-outside'];
    const CURRENCY: Intl.NumberFormatOptions = {currency: 'EUR', maximumFractionDigits: 0, style: 'currency'};

    const services: { name: string; status: string; color: FluxColor }[] = [
        {name: 'API gateway', status: 'Operational', color: 'success'},
        {name: 'Background jobs', status: 'Degraded', color: 'warning'},
        {name: 'Payments', status: 'Outage', color: 'danger'}
    ];

    const copyLabelRef = useTemplateRef<InstanceType<typeof FluxVisualSlotText>>('copyLabel');
    const groupKey = ref(0);
    const isThinking = ref(true);
    const revenue = ref(84500);

    let timer = 0;

    onMounted(() => {
        timer = window.setInterval(() => revenue.value += 1450, 3000);
    });

    onBeforeUnmount(() => window.clearInterval(timer));

    function onCopy(): void {
        copyLabelRef.value?.flash('Copied', {enter: {direction: 'up'}});
    }
</script>

<style
    lang="scss"
    module>
    .visualsPlayground {
        container: playground / inline-size;
        padding-block: 60px;
        max-width: 1800px;
        margin-inline: auto;
    }

    .visualsPlayground > :global([data-prose-full]) {
        margin-inline: 30px;
    }

    .effectGrid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 24px;
        align-items: start;
    }

    @container playground (width < 1320px) {
        .effectGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    @container playground (width < 690px) {
        .effectGrid {
            grid-template-columns: minmax(0, 1fr);
        }
    }

    // The pulse-outside beam paints its halo outside the element, so this row
    // needs more room between the cells than the rest of the page.
    .beams {
        display: grid;
        grid-template-columns: repeat(5, minmax(0, 1fr));
        gap: 42px;
        align-items: start;
    }

    @container playground (width < 1320px) {
        .beams {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    @container playground (width < 690px) {
        .beams {
            grid-template-columns: minmax(0, 1fr);
        }
    }

    .tiles {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 24px;
        align-items: start;
    }

    @container playground (width < 1320px) {
        .tiles {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    @container playground (width < 690px) {
        .tiles {
            grid-template-columns: minmax(0, 1fr);
        }
    }

    // Isolated so the blend mode of the noise tile bites into the tile surface
    // rather than into whatever the page paints behind it.
    .tile {
        position: relative;
        display: flex;
        isolation: isolate;
        overflow: hidden;
        flex-direction: column;
        background: var(--surface);
        border: 1px solid var(--surface-stroke);
        border-radius: var(--radius);
    }

    .tileLabel {
        padding: 9px 12px;
        font-size: 13px;
        background: var(--surface);
        border-top: 1px solid var(--surface-stroke);
        color: var(--foreground-secondary);
    }

    .hero {
        position: relative;
        display: flex;
        isolation: isolate;
        overflow: hidden;
        align-items: center;
        min-height: 291px;
        padding: 45px;
        background: var(--surface);
        border: 1px solid var(--surface-stroke);
        border-radius: var(--radius);
    }

    .heroContent {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 15px;
        align-items: start;
        max-width: 600px;
    }

    .heroTitle {
        font-size: 33px;
        font-weight: 700;
        line-height: 1.2;
    }

    .heroText {
        color: var(--foreground-secondary);
    }

    .caption {
        font-size: 13px;
        color: var(--foreground-secondary);
    }

    .price {
        font-size: 33px;
        font-weight: 700;
    }

    .effectMetric {
        font-size: 33px;
        font-weight: 700;
    }

    .assistant {
        font-size: 18px;
        font-weight: 600;
    }
</style>
