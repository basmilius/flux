<template>
    <flux-button-stack>
        <flux-flyout>
            <template #opener="{open}">
                <flux-secondary-button
                    icon-before="ellipsis-h"
                    @click="open"/>
            </template>

            <template #default="{close}">
                <flux-pane
                    v-height-transition
                    style="width: 300px">
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
            </template>
        </flux-flyout>
    </flux-button-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxFlyout, FluxMenu, FluxMenuGroup, FluxMenuItem, FluxPane, FluxSecondaryButton, FluxSeparator, FluxWindow, heightTransition } from '@fancee/flux';

    const vHeightTransition = heightTransition;
</script>
