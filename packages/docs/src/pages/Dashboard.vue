<template>
    <flux-dashboard>
        <template #header>
            <flux-dashboard-header title="Home">
                <template #end>
                    <theme-toggle/>

                    <flux-flyout :width="270">
                        <template #opener="{open}">
                            <flux-persona
                                avatar-alt="Bas"
                                :avatar-size="42"
                                avatar-url="https://imgproxy.glybe.nl/120,q75,jpg/1-b38d42e52f851f0ec94d118fad965277e3915b89da1012cef7e58674e3cf219a-img1386.jpeg"
                                name="Bas Milius"
                                title="Flux Engineer"
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
                                                icon-before="circle-question"
                                                label="Need help?"/>

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
                        <flux-menu-group>
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

            <flux-pane>
                <flux-action-bar>
                    <template #primary>
                        <flux-primary-button
                            icon-before="circle-plus"
                            label="Event"/>
                    </template>

                    <template #filter>
                        <flux-pane-body>
                            Filter contents.
                        </flux-pane-body>
                    </template>

                    <template #search>
                        <flux-form-input
                            type="search"
                            placeholder="Search anything..."/>
                    </template>
                </flux-action-bar>

                <flux-data-table
                    :data-set="dataSet.slice((page - 1) * perPage, (page * perPage))"
                    :page="page"
                    :per-page="perPage"
                    :total="dataSet.length"
                    is-hoverable>
                    <template #header>
                        <flux-table-header>Name</flux-table-header>
                        <flux-table-header>Email</flux-table-header>
                        <flux-table-header is-shrinking>Status</flux-table-header>
                        <flux-table-header is-shrinking/>
                    </template>

                    <template #name="{name}">
                        <flux-table-cell>{{ name }}</flux-table-cell>
                    </template>

                    <template #email="{email}">
                        <flux-table-cell>{{ email }}</flux-table-cell>
                    </template>

                    <template #isActive="{isActive}">
                        <flux-table-cell>
                            <flux-badge-stack>
                                <flux-badge
                                    v-if="isActive"
                                    color="success"
                                    icon="circle-check"
                                    label="Active"/>


                                <flux-badge
                                    v-else
                                    color="danger"
                                    icon="circle-xmark"
                                    label="Inactive"/>
                            </flux-badge-stack>
                        </flux-table-cell>
                    </template>

                    <template #actions="{}">
                        <flux-table-cell>
                            <flux-table-actions>
                                <flux-table-action icon="pen"/>
                                <flux-table-action icon="ellipsis-h"/>
                            </flux-table-actions>
                        </flux-table-cell>
                    </template>
                </flux-data-table>
                <flux-pane-footer>
                    <flux-pagination-bar
                        :page="page"
                        :per-page="perPage"
                        :total="dataSet.length"
                        @limit="setPerPage"
                        @navigate="setPage"/>
                </flux-pane-footer>
            </flux-pane>

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
    import { FluxActionBar, FluxAutoGrid, FluxBadge, FluxBadgeStack, FluxDashboard, FluxDashboardHeader, FluxDashboardNavigation, FluxDataTable, FluxExpandable, FluxExpandableGroup, FluxFlyout, FluxFormInput, FluxMenu, FluxMenuGroup, FluxMenuItem, FluxPaginationBar, FluxPane, FluxPaneBody, FluxPaneDeck, FluxPaneFooter, FluxPersona, FluxPrimaryButton, FluxSeparator, FluxStack, FluxStatistic, FluxTableAction, FluxTableActions, FluxTableCell, FluxTableHeader, FluxWindow } from '@fancee/flux';
    import { ThemeToggle } from '../components';
    import { computed, ref } from 'vue';
    import insightsLogo from '../images/logo-insights.svg?url';
    import publishingLogo from '../images/logo-publishing.svg?url';
    import ticketingLogo from '../images/logo-ticketing.svg?url';

    const dataSet = computed(() => Array(95).fill(null).map((_, index) => ({
        id: index,
        name: `Name ${index + 1}`,
        email: `entry-${index + 1}@fanc.ee`,
        isActive: index % 2 === 0
    })));

    const page = ref(1);
    const perPage = ref(5);

    function setPage(p: number): void {
        page.value = p;
    }

    function setPerPage(limit: number): void {
        perPage.value = limit;
    }
</script>
