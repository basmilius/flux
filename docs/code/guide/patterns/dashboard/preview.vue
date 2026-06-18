<template>
    <Preview>
        <FluxContainer style="width: 100%">
            <FluxGrid
                :columns="12"
                :gap="18">
                <FluxGridColumn
                    v-for="kpi in kpis"
                    :key="kpi.label"
                    :xs="12"
                    :md="4">
                    <FluxPane style="height: 100%">
                        <FluxPaneBody>
                            <FluxFlex
                                direction="vertical"
                                :gap="12">
                                <FluxFlex align="center">
                                    <FluxBoxedIcon
                                        :color="kpi.color"
                                        :name="kpi.icon"
                                        :size="42"/>

                                    <FluxFlexItem :grow="1">
                                        <span style="opacity: .6">{{ kpi.label }}</span>
                                    </FluxFlexItem>

                                    <FluxTooltip :content="kpi.tooltip">
                                        <FluxBadge
                                            :color="kpi.delta >= 0 ? 'success' : 'danger'"
                                            :icon="kpi.delta >= 0 ? 'arrow-trend-up' : 'arrow-trend-down'"
                                            :label="`${Math.abs(kpi.delta)}%`"/>
                                    </FluxTooltip>
                                </FluxFlex>

                                <strong style="font-size: 1.75rem">{{ kpi.value }}</strong>
                            </FluxFlex>
                        </FluxPaneBody>
                    </FluxPane>
                </FluxGridColumn>

                <FluxGridColumn
                    :xs="12"
                    :md="7">
                    <FluxPane style="height: 100%">
                        <FluxPaneHeader
                            icon="gauge-high"
                            title="Monthly goal"
                            subtitle="Revenue target for June">
                            <template #after>
                                <FluxBadge
                                    color="primary"
                                    label="On track"/>
                            </template>
                        </FluxPaneHeader>

                        <FluxPaneBody>
                            <FluxFlex
                                direction="vertical"
                                :gap="18">
                                <FluxProgressBar
                                    status="$36.2k of $48.0k"
                                    :value="0.75"/>

                                <div style="padding: 0 9px">
                                    <FluxTicks
                                        :lower="0"
                                        :upper="48"/>
                                </div>
                            </FluxFlex>
                        </FluxPaneBody>

                        <FluxPaneFooter>
                            <FluxIcon name="calendar-check"/>

                            <span style="opacity: .6">12 days remaining</span>

                            <FluxSpacer/>

                            <FluxLink
                                href="#"
                                label="View report"/>
                        </FluxPaneFooter>
                    </FluxPane>
                </FluxGridColumn>

                <FluxGridColumn
                    :xs="12"
                    :md="5">
                    <FluxPane style="height: 100%">
                        <FluxPaneHeader
                            icon="users"
                            title="Project team">
                            <template #after>
                                <FluxAvatarGroup
                                    :max="4"
                                    :size="30">
                                    <FluxAvatar
                                        v-for="member in team"
                                        :key="member"
                                        :fallback-initials="member"/>
                                </FluxAvatarGroup>
                            </template>
                        </FluxPaneHeader>

                        <FluxPaneBody>
                            <FluxPersona
                                name="Bas Milius"
                                title="Lead engineer"
                                :avatar-size="42"
                                avatar-src="https://avatars.githubusercontent.com/u/978257?v=4"/>
                        </FluxPaneBody>
                    </FluxPane>
                </FluxGridColumn>

                <FluxGridColumn
                    :xs="12"
                    :md="6">
                    <FluxPane style="height: 100%">
                        <FluxPaneHeader
                            icon="circle-info"
                            title="Workspace"/>

                        <FluxPaneBody>
                            <FluxDescriptionList direction="horizontal">
                                <FluxDescriptionItem
                                    icon="building"
                                    label="Organization">
                                    Acme Inc.
                                </FluxDescriptionItem>

                                <FluxDescriptionItem
                                    icon="cubes"
                                    label="Plan">
                                    <FluxBadge
                                        color="info"
                                        label="Enterprise"/>
                                </FluxDescriptionItem>

                                <FluxDescriptionItem
                                    icon="server"
                                    label="Region">
                                    eu-west-1
                                </FluxDescriptionItem>

                                <FluxDescriptionItem
                                    icon="calendar"
                                    label="Renews">
                                    1 January 2027
                                </FluxDescriptionItem>
                            </FluxDescriptionList>
                        </FluxPaneBody>
                    </FluxPane>
                </FluxGridColumn>

                <FluxGridColumn
                    :xs="12"
                    :md="6">
                    <FluxPane style="height: 100%">
                        <FluxPaneHeader
                            icon="rectangle-history"
                            title="Recent activity"/>

                        <FluxPaneBody>
                            <FluxTimeline>
                                <FluxTimelineItem
                                    color="success"
                                    icon="rocket"
                                    when="Today, 09:12"
                                    title="Deployment succeeded">
                                    Release v2.4.0 rolled out to production.
                                </FluxTimelineItem>

                                <FluxTimelineItem
                                    color="info"
                                    icon="code-branch"
                                    when="Yesterday, 16:40"
                                    title="Merged pull request">
                                    Feature branch merged into main.
                                </FluxTimelineItem>

                                <FluxTimelineItem
                                    title="Bas Milius commented"
                                    photo="https://avatars.githubusercontent.com/u/978257?v=4"
                                    when="Yesterday, 14:05">
                                    Looks great, shipping it.
                                </FluxTimelineItem>
                            </FluxTimeline>
                        </FluxPaneBody>
                    </FluxPane>
                </FluxGridColumn>
            </FluxGrid>
        </FluxContainer>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import { FluxAvatar, FluxAvatarGroup, FluxBadge, FluxBoxedIcon, FluxContainer, FluxDescriptionItem, FluxDescriptionList, FluxFlex, FluxFlexItem, FluxGrid, FluxGridColumn, FluxIcon, FluxLink, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxPersona, FluxProgressBar, FluxSpacer, FluxTicks, FluxTimeline, FluxTimelineItem, FluxTooltip } from '@flux-ui/components';

    const kpis: { label: string; value: string; delta: number; color: FluxColor; icon: FluxIconName; tooltip: string }[] = [
        {label: 'Revenue', value: '$48.2k', delta: 12, color: 'success', icon: 'money-bill', tooltip: 'Compared to last month'},
        {label: 'Active users', value: '8,420', delta: 4, color: 'primary', icon: 'users', tooltip: 'Compared to last month'},
        {label: 'Churn', value: '1.8%', delta: -2, color: 'danger', icon: 'arrow-trend-down', tooltip: 'Compared to last month'}
    ];

    const team = ['BM', 'JD', 'AS', 'KL', 'MN', 'PQ'];
</script>
