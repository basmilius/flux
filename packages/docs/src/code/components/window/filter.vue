<template>
    <FluxButtonStack>
        <FluxFlyout>
            <template #opener="{open}">
                <FluxSecondaryButton
                    icon-before="ellipsis-h"
                    @click="open"/>
            </template>

            <template #default="{close}">
                <FluxPane
                    v-height-transition
                    style="width: 300px">
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
            </template>
        </FluxFlyout>
    </FluxButtonStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxFlyout, FluxMenu, FluxMenuGroup, FluxMenuItem, FluxPane, FluxSecondaryButton, FluxSeparator, FluxWindow, vHeightTransition } from '@basmilius/flux';
</script>
