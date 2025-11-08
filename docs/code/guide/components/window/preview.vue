<template>
    <Preview>
        <FluxPane
            v-height-transition
            style="width: 300px">
            <FluxWindow>
                <template #default="{navigate}">
                    <FluxMenu>
                        <FluxMenuGroup>
                            <FluxMenuItem
                                icon-leading="arrow-up-arrow-down"
                                command="Leads"
                                command-icon="angle-right"
                                label="Sort by"
                                @click="navigate('sorting')"/>

                            <FluxMenuItem
                                icon-leading="calendar"
                                command="Last year"
                                command-icon="angle-right"
                                label="Period"
                                @click="navigate('period')"/>

                            <FluxMenuItem
                                icon-leading="star"
                                command="2 selected"
                                command-icon="angle-right"
                                label="Status"
                                @click="navigate('status')"/>
                        </FluxMenuGroup>

                        <FluxSeparator/>

                        <FluxMenuGroup>
                            <FluxMenuItem
                                icon-leading="clone"
                                label="Duplicate"/>

                            <FluxMenuItem
                                icon-leading="trash"
                                label="Delete"/>

                            <FluxMenuItem
                                icon-leading="arrow-down-to-line"
                                label="Download CSV"/>

                            <FluxMenuItem
                                icon-leading="arrow-down-to-line"
                                label="Download PDF"/>
                        </FluxMenuGroup>

                        <FluxSeparator/>

                        <FluxMenuGroup>
                            <FluxMenuItem
                                icon-leading="gear"
                                label="Preferences"/>
                        </FluxMenuGroup>
                    </FluxMenu>
                </template>

                <template #sorting="{ back }">
                    <FluxMenu>
                        <FluxMenuGroup>
                            <FluxMenuItem
                                icon-leading="angle-left"
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

                <template #period="{ back }">
                    <FluxMenu>
                        <FluxMenuGroup>
                            <FluxMenuItem
                                icon-leading="angle-left"
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

                <template #status="{ back }">
                    <FluxMenu>
                        <FluxMenuGroup>
                            <FluxMenuItem
                                icon-leading="angle-left"
                                label="Back"
                                @click="back()"/>
                        </FluxMenuGroup>

                        <FluxSeparator/>

                        <FluxMenuGroup>
                            <FluxMenuItem
                                icon-leading="circle-check"
                                label="Active"
                                @click="back()"/>

                            <FluxMenuItem
                                icon-leading="circle-check"
                                label="Concept"
                                @click="back()"/>

                            <FluxMenuItem
                                icon-leading="circle"
                                label="Concluded"
                                @click="back()"/>

                            <FluxMenuItem
                                icon-leading="circle"
                                label="Removed"
                                @click="back()"/>
                        </FluxMenuGroup>
                    </FluxMenu>
                </template>
            </FluxWindow>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxMenu, FluxMenuGroup, FluxMenuItem, FluxPane, FluxSeparator, FluxWindow } from '@flux-ui/components';
</script>
