<template>
    <flux-dashboard>
        <template #header>
            <flux-dashboard-header title="Home">
                <template #end>
                    <theme-toggle/>

                    <flux-flyout>
                        <template #opener="{open}">
                            <flux-avatar
                                alt="Bas"
                                :size="42"
                                url="https://imgproxy.glybe.nl/120,q75,jpg/1-b38d42e52f851f0ec94d118fad965277e3915b89da1012cef7e58674e3cf219a-img1386.jpeg"
                                @click="open"/>
                        </template>

                        <template #default="{close}">
                            <flux-menu>
                                <flux-menu-group>
                                    <flux-menu-item
                                        icon-before="circle"
                                        label="Ticketing"
                                        @click="close"/>

                                    <flux-menu-item
                                        icon-before="circle"
                                        label="Insights"
                                        @click="close"/>

                                    <flux-menu-item
                                        icon-before="circle"
                                        label="Publishing"
                                        @click="close"/>
                                </flux-menu-group>
                            </flux-menu>
                        </template>
                    </flux-flyout>
                </template>
            </flux-dashboard-header>
        </template>

        <template #navigation>
            <flux-dashboard-navigation
                application-name="Ticketing"
                :logo-url="ticketingLogo">
                <template #apps="{closeAppSwitcher}">
                    <flux-menu>
                        <flux-menu-item
                            :image-url="ticketingLogo"
                            label="Ticketing"
                            @click="closeAppSwitcher"/>

                        <flux-menu-item
                            :image-url="insightsLogo"
                            label="Insights"
                            @click="closeAppSwitcher"/>

                        <flux-menu-item
                            :image-url="publishingLogo"
                            label="Publishing"
                            @click="closeAppSwitcher"/>
                    </flux-menu>
                </template>

                <template #footer>
                    &copy; <a href="#">WeAreFancee</a>
                </template>

                <flux-expandable-group>
                    <flux-menu>
                        <flux-menu-item
                            icon-before="objects-column"
                            is-active
                            label="Home"/>

                        <flux-menu-item
                            icon-before="circle"
                            label="Events"/>

                        <flux-menu-item
                            icon-before="circle"
                            label="App-teams"/>

                        <flux-menu-item
                            icon-before="circle"
                            label="Finance"/>

                        <flux-menu-item
                            icon-before="circle"
                            label="Marketing"/>

                        <flux-menu-group
                            v-if="false"
                            v-for="i of [1, 2, 3]">
                            <flux-expandable :key="i">
                                <template #header="{open}">
                                    <flux-menu-item
                                        icon-before="circle"
                                        :label="`Group ${i}`"
                                        @click="open"/>
                                </template>

                                <template #body>
                                    <flux-menu-group>
                                        <flux-menu-item
                                            is-indented
                                            label="Overview"/>

                                        <flux-menu-item
                                            is-indented
                                            label="Tickets"/>

                                        <flux-menu-item
                                            is-indented
                                            label="New event"/>
                                    </flux-menu-group>
                                </template>
                            </flux-expandable>
                        </flux-menu-group>
                    </flux-menu>
                </flux-expandable-group>
            </flux-dashboard-navigation>
        </template>

        <flux-container :gutter="0">
            <flux-stack :gap="21">
                <flux-pane v-for="_ of Array(20).fill(null)">
                    <flux-pane-body>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, aspernatur assumenda beatae earum eum eveniet facere hic laboriosam minima nisi perspiciatis quaerat quam repellendus repudiandae sapiente sit veniam voluptate voluptates!
                    </flux-pane-body>
                </flux-pane>
            </flux-stack>
        </flux-container>
    </flux-dashboard>
</template>

<script
    lang="ts"
    setup>
    import { FluxAvatar, FluxContainer, FluxDashboard, FluxDashboardHeader, FluxDashboardNavigation, FluxExpandable, FluxExpandableGroup, FluxFlyout, FluxMenu, FluxMenuGroup, FluxMenuItem, FluxPane, FluxPaneBody, FluxSpacer, FluxStack } from '@fancee/flux';
    import { ThemeToggle } from '../components';
    import insightsLogo from '../images/logo-insights.svg?url';
    import publishingLogo from '../images/logo-publishing.svg?url';
    import ticketingLogo from '../images/logo-ticketing.svg?url';
</script>
