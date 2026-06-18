<template>
    <Preview>
        <FluxPane style="width: 100%; max-width: 540px">
            <FluxAspectRatio :aspect-ratio="21 / 9">
                <FluxAnimatedColors
                    :colors="['#6071b5', '#d32475', '#f07db7']"
                    :opacity="1"
                    :seed="130496"/>
            </FluxAspectRatio>

            <FluxPaneBody>
                <FluxPersona
                    name="Aurora workspace"
                    title="Updated 4 minutes ago"
                    avatar-fallback-icon="bolt"
                    :avatar-size="42"/>
            </FluxPaneBody>

            <FluxTabs>
                <FluxTab
                    icon="rectangle-history"
                    label="Activity">
                    <FluxPaneBody>
                        <FluxTimeline>
                            <FluxTimelineItem
                                color="success"
                                icon="circle-check"
                                when="Today, 09:12"
                                title="Pipeline finished">
                                All checks passed on the main branch.
                            </FluxTimelineItem>

                            <FluxTimelineItem
                                color="info"
                                icon="cloud"
                                when="Today, 08:30"
                                title="Backup completed">
                                Nightly snapshot stored in eu-west-1.
                            </FluxTimelineItem>

                            <FluxTimelineItem
                                color="warning"
                                icon="bell"
                                when="Yesterday, 22:18"
                                title="Threshold reached">
                                CPU usage peaked at 82% during the deploy.
                            </FluxTimelineItem>
                        </FluxTimeline>
                    </FluxPaneBody>
                </FluxTab>

                <FluxTab
                    icon="chart-line"
                    label="Insights">
                    <FluxPaneGroup>
                        <FluxPaneMedia
                            image-url="/assets/demo/image-2.jpg"
                            is-inset/>

                        <FluxPaneBody>
                            <FluxAspectRatio
                                :aspect-ratio="21 / 9"
                                style="border-radius: 9px; overflow: hidden">
                                <FluxGridPattern
                                    :width="42"
                                    :height="42"
                                    :stroke-dasharray="2"
                                    :squares="[
                                        [2, 1],
                                        [4, 2],
                                        [7, 1],
                                        [9, 3]
                                    ]"/>
                            </FluxAspectRatio>
                        </FluxPaneBody>

                        <FluxPaneBody>
                            <FluxInfoStack>
                                <FluxInfo icon="chart-area">
                                    Engagement is up 18% week over week, driven by the new onboarding flow.
                                </FluxInfo>

                                <FluxInfo icon="circle-info">
                                    Numbers are sampled hourly and may lag a few minutes behind live traffic.
                                </FluxInfo>
                            </FluxInfoStack>
                        </FluxPaneBody>
                    </FluxPaneGroup>
                </FluxTab>
            </FluxTabs>

            <FluxPaneIllustration
                :animated-colors="['#6615de', '#d37709']"
                :animated-seed="42"
                is-masked>
                <FluxBoxedIcon
                    color="primary"
                    name="stars"
                    :size="48"/>
            </FluxPaneIllustration>

            <FluxPaneHeader
                title="Unlock advanced insights"
                subtitle="Upgrade to surface anomaly detection"/>

            <FluxPaneBody style="position: relative">
                <FluxAspectRatio
                    :aspect-ratio="21 / 9"
                    style="position: absolute; inset: 0; opacity: .3">
                    <FluxDotPattern
                        :width="15"
                        :height="15"
                        style="fill: var(--gray-500)"/>
                </FluxAspectRatio>

                <p style="position: relative">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi, repellat.</p>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxAnimatedColors, FluxAspectRatio, FluxBoxedIcon, FluxDotPattern, FluxGridPattern, FluxInfo, FluxInfoStack, FluxPane, FluxPaneBody, FluxPaneGroup, FluxPaneHeader, FluxPaneIllustration, FluxPaneMedia, FluxPersona, FluxTab, FluxTabs, FluxTimeline, FluxTimelineItem } from '@flux-ui/components';
</script>
