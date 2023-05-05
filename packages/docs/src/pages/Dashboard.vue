<template>
    <FluxDashboard>
        <template #header>
            <FluxDashboardHeader title="Home">
                <template #end>
                    <ThemeToggle/>

                    <FluxFlyout :width="270">
                        <template #opener="{open}">
                            <FluxPersona
                                avatar-alt="Bas"
                                :avatar-size="42"
                                avatar-url="https://imgproxy.glybe.nl/120,q75,jpg/1-b38d42e52f851f0ec94d118fad965277e3915b89da1012cef7e58674e3cf219a-img1386.jpeg"
                                name="Bas Milius"
                                title="Flux Engineer"
                                @click="open"/>
                        </template>

                        <template #default="{close}">
                            <FluxWindow>
                                <template #default="{navigate}">
                                    <FluxMenu>
                                        <FluxMenuGroup>
                                            <FluxMenuItem
                                                icon-before="user"
                                                label="Profile"/>
                                        </FluxMenuGroup>

                                        <FluxSeparator/>

                                        <FluxMenuGroup>
                                            <FluxMenuItem
                                                command-icon="angle-right"
                                                icon-before="language"
                                                label="Language"
                                                @click="navigate('language')"/>

                                            <FluxMenuItem
                                                command="Light"
                                                command-icon="angle-right"
                                                icon-before="eclipse"
                                                label="Theme"
                                                @click="navigate('theme')"/>
                                        </FluxMenuGroup>

                                        <FluxSeparator/>

                                        <FluxMenuGroup>
                                            <FluxMenuItem
                                                icon-before="circle-question"
                                                label="Need help?"/>

                                            <FluxMenuItem
                                                icon-before="sparkles"
                                                label="What's new"/>
                                        </FluxMenuGroup>

                                        <FluxSeparator/>

                                        <FluxMenuGroup>
                                            <FluxMenuItem
                                                icon-before="arrow-right-from-line"
                                                is-destructive
                                                label="Sign off"/>
                                        </FluxMenuGroup>
                                    </FluxMenu>
                                </template>

                                <template #language="{back}">
                                    <FluxMenu>
                                        <FluxMenuGroup>
                                            <FluxMenuItem
                                                icon-before="angle-left"
                                                label="Back"
                                                @click="back()"/>
                                        </FluxMenuGroup>

                                        <FluxSeparator/>

                                        <FluxMenuGroup>
                                            <FluxMenuItem
                                                is-active
                                                image-url="https://bmcdn.nl/assets/joypixels/v7.0/svg/1f1ec-1f1e7.svg"
                                                label="English"
                                                @click="back()"/>

                                            <FluxMenuItem
                                                image-url="https://bmcdn.nl/assets/joypixels/v7.0/svg/1f1f3-1f1f1.svg"
                                                label="Nederlands"
                                                @click="back()"/>

                                            <FluxMenuItem
                                                image-url="https://bmcdn.nl/assets/joypixels/v7.0/svg/1f1e9-1f1ea.svg"
                                                label="Deutsch"
                                                @click="back()"/>
                                        </FluxMenuGroup>
                                    </FluxMenu>
                                </template>

                                <template #theme="{back}">
                                    <FluxMenu>
                                        <FluxMenuGroup>
                                            <FluxMenuItem
                                                icon-before="angle-left"
                                                label="Back"
                                                @click="back()"/>
                                        </FluxMenuGroup>

                                        <FluxSeparator/>

                                        <FluxMenuGroup>
                                            <FluxMenuItem
                                                is-active
                                                icon-before="sun-alt"
                                                label="Light"
                                                @click="back()"/>

                                            <FluxMenuItem
                                                icon-before="moon"
                                                label="Dark"
                                                @click="back()"/>
                                        </FluxMenuGroup>
                                    </FluxMenu>
                                </template>
                            </FluxWindow>
                        </template>
                    </FluxFlyout>
                </template>
            </FluxDashboardHeader>
        </template>

        <template #navigation>
            <FluxDashboardNavigation
                application-name="Ticketing"
                :logo-url="ticketingLogo">
                <template #apps="{closeAppSwitcher}">
                    <FluxMenu is-large>
                        <FluxMenuGroup>
                            <FluxMenuItem
                                :image-url="ticketingLogo"
                                label="Ticketing"
                                @click="closeAppSwitcher"/>

                            <FluxMenuItem
                                :image-url="insightsLogo"
                                label="Insights"
                                @click="closeAppSwitcher"/>

                            <FluxMenuItem
                                :image-url="publishingLogo"
                                label="Publishing"
                                @click="closeAppSwitcher"/>
                        </FluxMenuGroup>
                    </FluxMenu>
                </template>

                <template #footer>
                    &copy; <a href="#">WeAreFancee</a>
                </template>

                <FluxExpandableGroup>
                    <FluxMenu is-large>
                        <FluxMenuGroup>
                            <FluxMenuItem
                                icon-before="objects-column"
                                is-active
                                label="Home"/>

                            <FluxMenuGroup>
                                <FluxExpandable>
                                    <template #header="{open}">
                                        <FluxMenuItem
                                            icon-before="circle"
                                            label="Events"
                                            @click="open"/>
                                    </template>

                                    <template #body>
                                        <FluxMenuGroup>
                                            <FluxMenuItem
                                                is-indented
                                                label="Overview"/>

                                            <FluxMenuItem
                                                is-indented
                                                label="Tickets"/>

                                            <FluxMenuItem
                                                is-indented
                                                label="New event"/>
                                        </FluxMenuGroup>
                                    </template>
                                </FluxExpandable>
                            </FluxMenuGroup>

                            <FluxMenuItem
                                icon-before="circle"
                                label="App-teams"/>

                            <FluxMenuItem
                                icon-before="circle"
                                label="Finance"/>

                            <FluxMenuItem
                                icon-before="circle"
                                label="Marketing"/>
                        </FluxMenuGroup>
                    </FluxMenu>
                </FluxExpandableGroup>
            </FluxDashboardNavigation>
        </template>

        <FluxStack :gap="21">
            <FluxPaneDeck :min-column-width="300">
                <FluxStatistic
                    change-color="success"
                    change-icon="arrow-trend-up"
                    change-value="75%"
                    color="primary"
                    icon="user"
                    label="Users"
                    value="1.000"/>

                <FluxStatistic
                    color="primary"
                    icon="arrow-trend-up"
                    label="Users"
                    value="1.000"/>

                <FluxStatistic
                    color="primary"
                    icon="arrow-trend-up"
                    label="Users"
                    value="1.000"/>

                <FluxStatistic
                    color="primary"
                    icon="arrow-trend-up"
                    label="Users"
                    value="1.000"/>
            </FluxPaneDeck>

            <FluxAutoGrid
                :gap="21"
                :min-column-width="360">
                <FluxPane v-for="_ in 8">
                    <FluxPaneBody>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid cum delectus earum eum hic minus repudiandae. Cum est id laborum maxime, nemo numquam quis! Debitis omnis ratione velit voluptas?
                    </FluxPaneBody>
                </FluxPane>
            </FluxAutoGrid>
        </FluxStack>
    </FluxDashboard>
</template>

<script
    lang="ts"
    setup>
    import { FluxAutoGrid, FluxDashboard, FluxDashboardHeader, FluxDashboardNavigation, FluxExpandable, FluxExpandableGroup, FluxFlyout, FluxMenu, FluxMenuGroup, FluxMenuItem, FluxPane, FluxPaneBody, FluxPaneDeck, FluxPersona, FluxSeparator, FluxStack, FluxStatistic, FluxWindow } from '@fancee/flux';
    import { ThemeToggle } from '@/components';
    import insightsLogo from '@/images/logo-insights.svg?url';
    import publishingLogo from '@/images/logo-publishing.svg?url';
    import ticketingLogo from '@/images/logo-ticketing.svg?url';
</script>
