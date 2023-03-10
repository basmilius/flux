<template>
    <flux-stack>
        <page-title
            section="Playground"
            title="Bas' speelparadijs"/>

        <section>
            <preview>
                <flux-stack style="width: 360px">
                    <flux-statistic
                        color="primary"
                        icon="circle"
                        label="Label"
                        value="Value"/>

                    <flux-statistic
                        color="danger"
                        change-color="danger"
                        change-icon="arrow-down"
                        change-value="10%"
                        icon="user"
                        label="Users this month"
                        value="750"/>

                    <flux-statistic
                        color="primary"
                        change-color="success"
                        change-icon="arrow-trend-up"
                        change-value="1.250"
                        icon="star"
                        label="Leads"
                        value="16.500"/>
                </flux-stack>
            </preview>

            <p><br/></p>

            <preview>
                <flux-pane style="width: 480px">
                    <flux-pane-body>
                        <flux-timeline>
                            <flux-timeline-item
                                icon="star"
                                title="Timeline component"
                                when="9 maart 2023 22:00">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci commodi debitis dolor dolores, ducimus facere, fugit id impedit ipsam mollitia nam nobis reiciendis temporibus vero. Accusamus in repellat voluptatibus.</p>
                            </flux-timeline-item>

                            <flux-timeline-item
                                color="primary"
                                icon="star"
                                photo="https://staging.fanc.ee/uploads/shops/headers/bh40dmg5.uwr.jpg">
                                <p>Timeline items can also contain an image instead of an icon. An icon is still supported though!</p>
                            </flux-timeline-item>

                            <flux-timeline-item
                                color="danger"
                                icon="circle-exclamation">
                                <p>This is a smaller timeline item.</p>
                            </flux-timeline-item>

                            <flux-timeline-item
                                color="info"
                                icon="star"
                                title="Without a datetime">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam amet asperiores consectetur eligendi, eum in itaque mollitia nihil, praesentium quasi quod sint temporibus voluptatem. Beatae consequuntur doloremque reprehenderit tempora? Accusamus.
                            </flux-timeline-item>

                            <flux-timeline-item
                                color="success"
                                icon="star">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquid debitis eius eligendi esse illo in laudantium molestiae! Accusantium aliquid dignissimos eligendi natus nemo quis repellat unde ut vero! Cum?
                            </flux-timeline-item>

                            <flux-timeline-item
                                color="warning"
                                icon="star">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus animi aspernatur corporis cupiditate dolorem error est expedita ipsa ipsam, iste magni maxime, odit pariatur quaerat quisquam rerum veniam, vero voluptatibus!
                            </flux-timeline-item>
                        </flux-timeline>
                    </flux-pane-body>
                </flux-pane>
            </preview>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneBody, FluxStack, FluxStatistic, FluxTimeline, FluxTimelineItem } from '@fancee/flux';
    import { PageTitle, Preview } from '@/components';
</script>
