<template>
    <flux-dashboard>
        <template #header>
            <flux-dashboard-header title="Home">
                <template #end>
                    <theme-toggle/>

                    <flux-flyout :width="270">
                        <template #opener="{open}">
                            <flux-avatar
                                is-clickable
                                alt="Bas"
                                :size="42"
                                url="https://imgproxy.glybe.nl/120,q75,jpg/1-b38d42e52f851f0ec94d118fad965277e3915b89da1012cef7e58674e3cf219a-img1386.jpeg"
                                @click="open"/>
                        </template>

                        <template #default="{close}">
                            <flux-window>
                                <template #default="{navigate}">
                                    <flux-menu>
                                        <flux-menu-group>
                                            <flux-menu-item
                                                icon-before="user"
                                                label="Profile"/>
                                        </flux-menu-group>

                                        <flux-separator/>

                                        <flux-menu-group>
                                            <flux-menu-item
                                                command-icon="angle-right"
                                                icon-before="language"
                                                label="Language"
                                                @click="navigate('language')"/>

                                            <flux-menu-item
                                                command="Light"
                                                command-icon="angle-right"
                                                icon-before="eclipse"
                                                label="Theme"
                                                @click="navigate('theme')"/>
                                        </flux-menu-group>

                                        <flux-separator/>

                                        <flux-menu-group>
                                            <flux-menu-item
                                                command-icon="angle-right"
                                                icon-before="circle-question"
                                                label="Need help?"
                                                @click="navigate('help')"/>

                                            <flux-menu-item
                                                icon-before="sparkles"
                                                label="What's new"/>
                                        </flux-menu-group>

                                        <flux-separator/>

                                        <flux-menu-group>
                                            <flux-menu-item
                                                icon-before="arrow-right-from-line"
                                                is-destructive
                                                label="Sign off"/>
                                        </flux-menu-group>
                                    </flux-menu>
                                </template>

                                <template #language="{back}">
                                    <flux-menu>
                                        <flux-menu-group>
                                            <flux-menu-item
                                                icon-before="angle-left"
                                                label="Back"
                                                @click="back()"/>
                                        </flux-menu-group>

                                        <flux-separator/>

                                        <flux-menu-group>
                                            <flux-menu-item
                                                is-active
                                                image-url="https://bmcdn.nl/assets/joypixels/v7.0/svg/1f1ec-1f1e7.svg"
                                                label="English"
                                                @click="back()"/>

                                            <flux-menu-item
                                                image-url="https://bmcdn.nl/assets/joypixels/v7.0/svg/1f1f3-1f1f1.svg"
                                                label="Nederlands"
                                                @click="back()"/>

                                            <flux-menu-item
                                                image-url="https://bmcdn.nl/assets/joypixels/v7.0/svg/1f1e9-1f1ea.svg"
                                                label="Deutsch"
                                                @click="back()"/>
                                        </flux-menu-group>
                                    </flux-menu>
                                </template>

                                <template #theme="{back}">
                                    <flux-menu>
                                        <flux-menu-group>
                                            <flux-menu-item
                                                icon-before="angle-left"
                                                label="Back"
                                                @click="back()"/>
                                        </flux-menu-group>

                                        <flux-separator/>

                                        <flux-menu-group>
                                            <flux-menu-item
                                                is-active
                                                icon-before="sun-alt"
                                                label="Light"
                                                @click="back()"/>

                                            <flux-menu-item
                                                icon-before="moon"
                                                label="Dark"
                                                @click="back()"/>
                                        </flux-menu-group>
                                    </flux-menu>
                                </template>
                            </flux-window>
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
                    <flux-menu is-large>
                        <flux-menu-group>
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
                        </flux-menu-group>
                    </flux-menu>
                </template>

                <template #footer>
                    &copy; <a href="#">WeAreFancee</a>
                </template>

                <flux-expandable-group>
                    <flux-menu is-large>
                        <flux-menu-item
                            icon-before="objects-column"
                            is-active
                            label="Home"/>

                        <flux-menu-group>
                            <flux-expandable>
                                <template #header="{open}">
                                    <flux-menu-item
                                        icon-before="circle"
                                        label="Events"
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

        <flux-stack :gap="21">
            <flux-pane-deck :min-column-width="300">
                <flux-statistic
                    change-color="success"
                    change-icon="arrow-trend-up"
                    change-value="75%"
                    color="primary"
                    icon="user"
                    label="Users"
                    value="1.000"/>

                <flux-statistic
                    color="primary"
                    icon="arrow-trend-up"
                    label="Users"
                    value="1.000"/>

                <flux-statistic
                    color="primary"
                    icon="arrow-trend-up"
                    label="Users"
                    value="1.000"/>

                <flux-statistic
                    color="primary"
                    icon="arrow-trend-up"
                    label="Users"
                    value="1.000"/>
            </flux-pane-deck>

            <flux-auto-grid
                :gap="21"
                :min-column-width="360">
                <flux-pane v-for="_ in 8">
                    <flux-pane-body>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid cum delectus earum eum hic minus repudiandae. Cum est id laborum maxime, nemo numquam quis! Debitis omnis ratione velit voluptas?
                    </flux-pane-body>
                </flux-pane>
            </flux-auto-grid>
        </flux-stack>
    </flux-dashboard>
</template>

<script
    lang="ts"
    setup>
    import { FluxAutoGrid, FluxAvatar, FluxDashboard, FluxDashboardHeader, FluxDashboardNavigation, FluxExpandable, FluxExpandableGroup, FluxFlyout, FluxMenu, FluxMenuGroup, FluxMenuItem, FluxPane, FluxPaneBody, FluxPaneDeck, FluxSeparator, FluxStack, FluxStatistic, FluxWindow } from '@fancee/flux';
    import { ThemeToggle } from '../components';
    import insightsLogo from '../images/logo-insights.svg?url';
    import publishingLogo from '../images/logo-publishing.svg?url';
    import ticketingLogo from '../images/logo-ticketing.svg?url';
</script>
