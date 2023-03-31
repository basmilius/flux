<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Window"/>

        <preview>
            <flux-pane
                v-height-transition
                style="align-self: start; translate: 0 54px; width: 300px">
                <flux-window>
                    <template #default="{navigate}">
                        <flux-menu>
                            <flux-menu-group>
                                <flux-menu-item
                                    icon-before="arrow-up-arrow-down"
                                    command="Leads"
                                    command-icon="angle-right"
                                    label="Sort by"
                                    @click="navigate('sorting')"/>

                                <flux-menu-item
                                    icon-before="calendar"
                                    command="Last year"
                                    command-icon="angle-right"
                                    label="Period"
                                    @click="navigate('period')"/>

                                <flux-menu-item
                                    icon-before="star"
                                    command="2 selected"
                                    command-icon="angle-right"
                                    label="Status"
                                    @click="navigate('status')"/>
                            </flux-menu-group>

                            <flux-separator/>

                            <flux-menu-group>
                                <flux-menu-item
                                    icon-before="clone"
                                    label="Duplicate"/>

                                <flux-menu-item
                                    icon-before="trash"
                                    label="Delete"/>

                                <flux-menu-item
                                    icon-before="arrow-down-to-line"
                                    label="Download CSV"/>

                                <flux-menu-item
                                    icon-before="arrow-down-to-line"
                                    label="Download PDF"/>
                            </flux-menu-group>

                            <flux-separator/>

                            <flux-menu-group>
                                <flux-menu-item
                                    icon-before="gear"
                                    label="Preferences"/>
                            </flux-menu-group>
                        </flux-menu>
                    </template>

                    <template #sorting="{back}">
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
                                    label="Leads"
                                    @click="back()"/>

                                <flux-menu-item
                                    label="Most traffic"
                                    @click="back()"/>

                                <flux-menu-item
                                    label="Recent"
                                    @click="back()"/>
                            </flux-menu-group>
                        </flux-menu>
                    </template>

                    <template #period="{back}">
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
                                    label="Today"
                                    @click="back()"/>

                                <flux-menu-item
                                    label="Last week"
                                    @click="back()"/>

                                <flux-menu-item
                                    label="Last month"
                                    @click="back()"/>

                                <flux-menu-item
                                    is-active
                                    label="Last year"
                                    @click="back()"/>

                                <flux-menu-item
                                    label="Last 5 years"
                                    @click="back()"/>
                            </flux-menu-group>
                        </flux-menu>
                    </template>

                    <template #status="{back}">
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
                                    icon-before="circle-check"
                                    label="Active"
                                    @click="back()"/>

                                <flux-menu-item
                                    icon-before="circle-check"
                                    label="Concept"
                                    @click="back()"/>

                                <flux-menu-item
                                    icon-before="circle"
                                    label="Concluded"
                                    @click="back()"/>

                                <flux-menu-item
                                    icon-before="circle"
                                    label="Removed"
                                    @click="back()"/>
                            </flux-menu-group>
                        </flux-menu>
                    </template>
                </flux-window>
            </flux-pane>
        </preview>

        <api-section>
            <p>
                Windows are user interface components that allow users to navigate through multiple slots, displaying
                one slot at a time. They are commonly used for presenting filters and submenus that may not need to be
                visible immediately. With windows, users can interact with various options without cluttering the
                primary interface, creating a seamless user experience.
            </p>
        </api-section>

        <api-section title="API">
            <api-component name="Window">
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
            </api-component>
        </api-section>

        <api-section title="Examples">
            <api-example
                :code="filterCode"
                :component="filter"
                title="Filter"
                description="Windows can be used to provide filters for for example data tables."/>
        </api-section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuGroup, FluxMenuItem, FluxPane, FluxSeparator, FluxStack, FluxWindow, heightTransition } from '@fancee/flux';
    import { ApiComponent, ApiExample, ApiSection, PageTitle, Preview } from '@/components';
    import filter from '../../code/components/window/filter.vue';
    import filterCode from '../../code/components/window/filter.vue?raw';

    const vHeightTransition = heightTransition;
</script>
