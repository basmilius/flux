<template>
    <h2>Trackers</h2>
    <p>The tracker draws every line as one SVG overlay, measured from the markers that are actually on the page and cut into segments between them. Nothing is masked against a background, so the same tracker works on a pane, on the page and inside another component without a single hard-coded color underneath it. The left column is inside a pane and the middle one sits directly on the page, which is the pair that proves it.</p>
    <p>What to look at: the gap the line leaves around every marker, the curve where a step group branches off the rail and rejoins it, and the dashed stroke that connects the steps inside a group against the solid stroke of the rail itself. Both strokes have to stay visible in dark mode without turning into the divider they run past. Resize the window too, since the whole path is remeasured from the DOM rather than laid out in CSS.</p>
    <div
        :class="$style.trackers"
        data-prose-full>
        <FluxStatisticsBase
            icon="truck"
            title="Order timeline">
            <FluxStatisticsTracker>
                <FluxStatisticsTrackerLabel
                    color="success"
                    label="Completed"/>

                <FluxStatisticsTrackerEntry
                    color="success"
                    description="Payment confirmed"
                    icon="box"
                    title="Order placed"
                    when="Mar 8, 09:12"/>

                <FluxStatisticsTrackerLabel
                    color="primary"
                    label="In progress"/>

                <FluxStatisticsTrackerEntry
                    color="primary"
                    icon="truck"
                    title="Shipment 1"
                    when="Mar 9, 14:20">
                    <template #end>
                        <FluxBadge
                            color="primary"
                            colored
                            label="In progress"/>
                    </template>

                    Two of the three parcels have left the warehouse.

                    <FluxStatisticsTrackerSteps>
                        <FluxStatisticsTrackerStep
                            label="Carrier selected"
                            state="done"/>
                        <FluxStatisticsTrackerStep
                            label="Shipping label generated"
                            state="done"/>
                        <FluxStatisticsTrackerStep
                            label="Packing in progress"
                            state="active"/>
                        <FluxStatisticsTrackerStep label="Handed to carrier"/>
                    </FluxStatisticsTrackerSteps>
                </FluxStatisticsTrackerEntry>

                <FluxStatisticsTrackerEntry
                    description="left a note"
                    icon="message"
                    title="Jane Cooper"
                    when="Mar 9, 16:04">
                    <FluxPane>
                        <FluxPaneBody>
                            Please double-check the packaging on the second parcel.
                        </FluxPaneBody>
                    </FluxPane>
                </FluxStatisticsTrackerEntry>

                <FluxStatisticsTrackerLabel label="Up next"/>

                <FluxStatisticsTrackerEntry
                    description="Tomorrow between 10:00 and 14:00"
                    icon="house"
                    title="Delivery"/>
            </FluxStatisticsTracker>
        </FluxStatisticsBase>

        <div>
            <FluxStatisticsTracker>
                <FluxStatisticsTrackerLabel
                    color="gray"
                    label="Every intent"/>

                <FluxStatisticsTrackerEntry
                    v-for="entry of entries"
                    :key="entry.color"
                    :color="entry.color"
                    :description="entry.description"
                    :icon="entry.icon"
                    :title="entry.title"
                    :when="entry.when"/>

                <FluxStatisticsTrackerLabel
                    color="info"
                    label="Without an icon"/>

                <FluxStatisticsTrackerEntry
                    color="info"
                    description="An entry without an icon falls back to a dot marker."
                    title="Plain marker"
                    when="Mar 12, 08:00">
                    <template #start>
                        <FluxIcon name="sparkles"/>
                    </template>

                    <template #end>
                        <FluxBadge
                            color="info"
                            label="New"/>
                    </template>
                </FluxStatisticsTrackerEntry>

                <FluxStatisticsTrackerEntry
                    description="Two step groups under one entry, so the branch is drawn twice."
                    icon="screwdriver-wrench"
                    title="Maintenance">
                    <FluxStatisticsTrackerSteps>
                        <FluxStatisticsTrackerStep
                            label="Backup taken"
                            state="done"/>
                        <FluxStatisticsTrackerStep
                            label="Migration running"
                            state="active"/>
                    </FluxStatisticsTrackerSteps>

                    <FluxStatisticsTrackerSteps>
                        <FluxStatisticsTrackerStep label="Cache warmed"/>
                        <FluxStatisticsTrackerStep label="Traffic restored"/>
                    </FluxStatisticsTrackerSteps>
                </FluxStatisticsTrackerEntry>
            </FluxStatisticsTracker>
        </div>

        <div :class="$style.trackersCards">
            <FluxStatisticsTrackerCard
                icon="truck"
                subtitle="2 shipments, arriving tomorrow"
                title="Your order is on the way">
                <FluxStatisticsTrackerCardSegment state="done"/>
                <FluxStatisticsTrackerCardSegment state="done"/>
                <FluxStatisticsTrackerCardSegment state="done"/>
                <FluxStatisticsTrackerCardSegment
                    state="active"
                    :value="45"/>
                <FluxStatisticsTrackerCardSegment/>
            </FluxStatisticsTrackerCard>

            <FluxStatisticsTrackerCard
                color="success"
                icon="user-check"
                labels="bottom"
                subtitle="3 of 5 steps completed"
                title="Onboarding">
                <FluxStatisticsTrackerCardSegment
                    label="Account"
                    state="done"/>
                <FluxStatisticsTrackerCardSegment
                    label="Profile"
                    state="done"/>
                <FluxStatisticsTrackerCardSegment
                    label="Team"
                    state="done"/>
                <FluxStatisticsTrackerCardSegment
                    label="Billing"
                    state="active"
                    :value="70"/>
                <FluxStatisticsTrackerCardSegment label="Done"/>
            </FluxStatisticsTrackerCard>

            <FluxStatisticsTrackerCard
                color="warning"
                icon="stopwatch"
                labels="top"
                subtitle="Labels above the track"
                title="Release train">
                <FluxStatisticsTrackerCardSegment
                    label="Build"
                    state="done"/>
                <FluxStatisticsTrackerCardSegment
                    label="Test"
                    state="done"/>
                <FluxStatisticsTrackerCardSegment
                    label="Stage"
                    state="active"
                    :value="20"/>
                <FluxStatisticsTrackerCardSegment label="Production"/>
            </FluxStatisticsTrackerCard>

            <FluxStatisticsTrackerCard
                subtitle="Segments in their own colors"
                title="Capacity">
                <template #end>
                    <FluxBadge
                        color="danger"
                        colored
                        label="Nearly full"/>
                </template>

                <FluxStatisticsTrackerCardSegment
                    color="success"
                    label="Used"
                    state="done"/>
                <FluxStatisticsTrackerCardSegment
                    color="warning"
                    label="Reserved"
                    state="done"/>
                <FluxStatisticsTrackerCardSegment
                    color="danger"
                    label="Burst"
                    state="active"
                    :value="82"/>
                <FluxStatisticsTrackerCardSegment label="Free"/>
            </FluxStatisticsTrackerCard>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadge, FluxIcon, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { FluxStatisticsBase, FluxStatisticsTracker, FluxStatisticsTrackerCard, FluxStatisticsTrackerCardSegment, FluxStatisticsTrackerEntry, FluxStatisticsTrackerLabel, FluxStatisticsTrackerStep, FluxStatisticsTrackerSteps } from '@flux-ui/statistics';
    import type { FluxColor, FluxIconName } from '@flux-ui/types';

    const entries: { color: FluxColor; description: string; icon: FluxIconName; title: string; when: string }[] = [
        {color: 'gray', description: 'Queued behind two other jobs', icon: 'box-archive', title: 'Queued', when: 'Mar 11, 07:10'},
        {color: 'primary', description: 'Picked up by the worker pool', icon: 'bolt', title: 'Started', when: 'Mar 11, 07:12'},
        {color: 'info', description: '18,204 records read', icon: 'database', title: 'Reading', when: 'Mar 11, 07:14'},
        {color: 'success', description: 'All records written', icon: 'circle-check', title: 'Written', when: 'Mar 11, 07:21'},
        {color: 'warning', description: 'Two records needed a second pass', icon: 'triangle-exclamation', title: 'Retried', when: 'Mar 11, 07:22'},
        {color: 'danger', description: 'One record could not be mapped', icon: 'ban', title: 'Rejected', when: 'Mar 11, 07:23'}
    ];
</script>

<style
    lang="scss"
    module>
    .trackers {
        display: grid;
        align-items: start;
        gap: 24px;
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .trackersCards {
        display: flex;
        flex-flow: column;
        gap: 24px;
    }

    @container playground (width < 1320px) {
        .trackers {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    @container playground (width < 690px) {
        .trackers {
            grid-template-columns: minmax(0, 1fr);
        }
    }
</style>
