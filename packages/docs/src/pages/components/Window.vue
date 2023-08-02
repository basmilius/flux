<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Window"/>

        <Preview>
            <FluxPane
                v-height-transition
                style="align-self: start; translate: 0 54px; width: 300px">
                <FluxWindow>
                    <template #default="{navigate}">
                        <FluxMenu>
                            <FluxMenuGroup>
                                <FluxMenuItem
                                    icon-before="arrow-up-arrow-down"
                                    command="Leads"
                                    command-icon="angle-right"
                                    label="Sort by"
                                    @click="navigate('sorting')"/>

                                <FluxMenuItem
                                    icon-before="calendar"
                                    command="Last year"
                                    command-icon="angle-right"
                                    label="Period"
                                    @click="navigate('period')"/>

                                <FluxMenuItem
                                    icon-before="star"
                                    command="2 selected"
                                    command-icon="angle-right"
                                    label="Status"
                                    @click="navigate('status')"/>
                            </FluxMenuGroup>

                            <FluxSeparator/>

                            <FluxMenuGroup>
                                <FluxMenuItem
                                    icon-before="clone"
                                    label="Duplicate"/>

                                <FluxMenuItem
                                    icon-before="trash"
                                    label="Delete"/>

                                <FluxMenuItem
                                    icon-before="arrow-down-to-line"
                                    label="Download CSV"/>

                                <FluxMenuItem
                                    icon-before="arrow-down-to-line"
                                    label="Download PDF"/>
                            </FluxMenuGroup>

                            <FluxSeparator/>

                            <FluxMenuGroup>
                                <FluxMenuItem
                                    icon-before="gear"
                                    label="Preferences"/>
                            </FluxMenuGroup>
                        </FluxMenu>
                    </template>

                    <template #sorting="{back}">
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
                                    label="Leads"
                                    @click="back()"/>

                                <FluxMenuItem
                                    label="Most traffic"
                                    @click="back()"/>

                                <FluxMenuItem
                                    label="Recent"
                                    @click="back()"/>
                            </FluxMenuGroup>
                        </FluxMenu>
                    </template>

                    <template #period="{back}">
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
                                    label="Today"
                                    @click="back()"/>

                                <FluxMenuItem
                                    label="Last week"
                                    @click="back()"/>

                                <FluxMenuItem
                                    label="Last month"
                                    @click="back()"/>

                                <FluxMenuItem
                                    is-active
                                    label="Last year"
                                    @click="back()"/>

                                <FluxMenuItem
                                    label="Last 5 years"
                                    @click="back()"/>
                            </FluxMenuGroup>
                        </FluxMenu>
                    </template>

                    <template #status="{back}">
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
                                    icon-before="circle-check"
                                    label="Active"
                                    @click="back()"/>

                                <FluxMenuItem
                                    icon-before="circle-check"
                                    label="Concept"
                                    @click="back()"/>

                                <FluxMenuItem
                                    icon-before="circle"
                                    label="Concluded"
                                    @click="back()"/>

                                <FluxMenuItem
                                    icon-before="circle"
                                    label="Removed"
                                    @click="back()"/>
                            </FluxMenuGroup>
                        </FluxMenu>
                    </template>
                </FluxWindow>
            </FluxPane>
        </Preview>

        <ApiSection>
            <p>
                Windows are user interface components that allow users to navigate through multiple slots, displaying
                one slot at a time. They are commonly used for presenting filters and submenus that may not need to be
                visible immediately. With windows, users can interact with various options without cluttering the
                primary interface, creating a seamless user experience.
            </p>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponent name="Window">
                <template #slots>
                    <tr>
                        <td><code>default</code><code>{navigate}</code></td>
                        <td>The primary view for the Window. Use navigate('[name]') to navigate to a new view.</td>
                    </tr>
                    <tr>
                        <td><code>[custom]</code><code>{back, navigate}</code></td>
                        <td>You may add your own slots that have their own names. Use the back function to navigate back to a view. The back function should always be called with parenthesis.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>

        <ApiSection title="Examples">
            <ApiExample
                :code="filterCode"
                :component="filter"
                title="Filter"
                description="Windows can be used to provide filters for for example data tables."/>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuGroup, FluxMenuItem, FluxPane, FluxSeparator, FluxStack, FluxWindow, heightTransition } from '@fancee/flux';
    import { ApiComponent, ApiExample, ApiSection, PageTitle, Preview } from '@docs/components';
    import filter from '@docs/code/components/window/filter.vue';
    import filterCode from '@docs/code/components/window/filter.vue?raw';

    const vHeightTransition = heightTransition;
</script>
