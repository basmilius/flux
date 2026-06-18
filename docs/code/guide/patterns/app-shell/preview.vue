<template>
    <Preview>
        <FluxContainer style="width: 100%">
            <FluxPane style="height: 480px; overflow: hidden">
                <FluxSplitView style="height: 100%">
                    <FluxSplitViewPane :default-size="252">
                        <FluxScroller style="height: 100%; padding: 12px">
                            <FluxMenu>
                                <FluxMenuTitle title="Acme Inc."/>

                                <FluxMenuGroup>
                                    <FluxMenuItem
                                        href="#overview"
                                        icon-leading="gauge-high"
                                        is-highlighted
                                        label="Overview"/>

                                    <FluxMenuItem
                                        href="#analytics"
                                        icon-leading="chart-line"
                                        label="Analytics"/>

                                    <FluxMenuItem
                                        href="#inbox"
                                        icon-leading="bell"
                                        label="Inbox"/>
                                </FluxMenuGroup>

                                <FluxSeparator/>

                                <FluxMenuGroup>
                                    <FluxMenuSubHeader label="Workspace"/>

                                    <FluxMenuCollapsible
                                        icon-leading="cubes"
                                        label="Projects">
                                        <FluxMenuItem
                                            href="#active"
                                            label="Active"/>

                                        <FluxMenuItem
                                            href="#archived"
                                            label="Archived"/>
                                    </FluxMenuCollapsible>

                                    <FluxMenuItem
                                        href="#team"
                                        icon-leading="users"
                                        label="Team"/>
                                </FluxMenuGroup>

                                <FluxSpacer/>
                                <FluxSeparator/>

                                <FluxMenuGroup>
                                    <FluxMenuItem
                                        href="#settings"
                                        icon-leading="gear"
                                        label="Settings"/>
                                </FluxMenuGroup>
                            </FluxMenu>
                        </FluxScroller>
                    </FluxSplitViewPane>

                    <FluxSplitViewPane>
                        <FluxFlex
                            direction="vertical"
                            :gap="0"
                            style="height: 100%">
                            <FluxSticky has-shadow-on-stick>
                                <FluxFlex
                                    align="center"
                                    :gap="12"
                                    style="padding: 15px 18px; background: var(--surface)">
                                    <FluxBreadcrumb>
                                        <FluxBreadcrumbItem
                                            href="#"
                                            label="Acme Inc."/>

                                        <FluxBreadcrumbItem
                                            href="#"
                                            label="Projects"/>

                                        <FluxBreadcrumbItem label="Overview"/>
                                    </FluxBreadcrumb>

                                    <FluxSpacer/>

                                    <FluxBadge
                                        color="success"
                                        label="Live"/>

                                    <FluxSegmentedControl
                                        v-model="view"
                                        style="width: 180px">
                                        <FluxSegmentedControlItem
                                            value="grid"
                                            icon="grid-2"/>

                                        <FluxSegmentedControlItem
                                            value="list"
                                            icon="list"/>
                                    </FluxSegmentedControl>
                                </FluxFlex>

                                <FluxFlex
                                    style="padding: 0 18px; background: var(--surface)">
                                    <FluxTabBar>
                                        <FluxTabBarItem
                                            v-for="(tab, index) in tabs"
                                            :key="tab"
                                            :label="tab"
                                            :is-active="activeTab === index"
                                            @click="activeTab = index"/>
                                    </FluxTabBar>
                                </FluxFlex>
                            </FluxSticky>

                            <FluxScroller
                                has-fade
                                style="flex-grow: 1; padding: 18px">
                                <FluxFlex
                                    direction="vertical"
                                    :gap="9">
                                    <PreviewColumn
                                        v-for="i in 12"
                                        :key="i">
                                        {{ tabs[activeTab] }} — row {{ i }}
                                    </PreviewColumn>
                                </FluxFlex>
                            </FluxScroller>
                        </FluxFlex>
                    </FluxSplitViewPane>
                </FluxSplitView>
            </FluxPane>
        </FluxContainer>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadge, FluxBreadcrumb, FluxBreadcrumbItem, FluxContainer, FluxFlex, FluxMenu, FluxMenuCollapsible, FluxMenuGroup, FluxMenuItem, FluxMenuSubHeader, FluxMenuTitle, FluxPane, FluxScroller, FluxSegmentedControl, FluxSegmentedControlItem, FluxSeparator, FluxSpacer, FluxSplitView, FluxSplitViewPane, FluxSticky, FluxTabBar, FluxTabBarItem } from '@flux-ui/components';
    import { ref } from 'vue';

    const view = ref('grid');
    const activeTab = ref(0);

    const tabs = ['Overview', 'Activity', 'Members', 'Settings'];
</script>
