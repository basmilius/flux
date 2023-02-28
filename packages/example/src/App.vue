<template>
    <div style="padding: 30px; max-width: 1200px; margin: 0 auto;">
        <flux-container-grid layout="sidebar-start">

            <flux-pane>
                <flux-expandable-group>
                    <flux-expandable label="Expandable 1">
                        <template #body>
                            <flux-menu>
                                <flux-menu-group>
                                    <flux-menu-item
                                        icon-before="circle"
                                        label="Cut"/>
                                    <flux-menu-item
                                        command="⌘C"
                                        icon-before="circle"
                                        label="Copy"/>
                                    <flux-menu-item
                                        command="⌘V"
                                        icon-before="circle"
                                        label="Paste"/>
                                </flux-menu-group>
                                <flux-separator/>
                                <flux-menu-group>
                                    <flux-menu-item
                                        icon-before="circle"
                                        label="Download..."/>
                                    <flux-menu-item
                                        icon-before="circle"
                                        label="Modify..."/>
                                </flux-menu-group>
                                <flux-separator/>
                                <flux-menu-group>
                                    <flux-menu-item
                                        command="⌘O"
                                        icon-before="circle"
                                        label="Preferences"/>
                                </flux-menu-group>
                            </flux-menu>
                        </template>
                    </flux-expandable>
                    <flux-expandable label="Expandable 2">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium assumenda beatae commodi cum deleniti eius fugit in incidunt ipsam nisi porro repellat saepe sed similique tenetur, voluptate voluptatem. Alias.
                    </flux-expandable>
                    <flux-expandable label="Expandable 3">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam consequuntur, dolorem dolores ipsa quibusdam quis sapiente! Dignissimos dolore error exercitationem, incidunt ipsam itaque laborum minus nemo, odit officia tempore voluptate.
                    </flux-expandable>
                </flux-expandable-group>
            </flux-pane>

            <flux-pane>
                <flux-pane-header title="Hallo"/>

                <flux-pane-body>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus adipisci amet at beatae dolorem, dolores facilis ipsum itaque iure iusto nemo officia praesentium recusandae reiciendis repudiandae, tenetur vel vero voluptatem.
                </flux-pane-body>

                <flux-pane-body>
                    <flux-stack axis="horizontal">
                        <flux-button-group>
                            <flux-secondary-button label="Download"/>
                            <flux-secondary-button icon-before="ellipsis-h"/>
                        </flux-button-group>

                        <flux-split-button :flyout-width="360">
                            <template #button>
                                <flux-secondary-button label="Download"/>
                            </template>
                            <template #flyout>
                                <flux-pane-body>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur dolores minima molestias obcaecati placeat quisquam quos repudiandae sequi voluptate? Accusamus aliquam architecto blanditiis corporis fugit obcaecati pariatur repellat repellendus soluta.
                                </flux-pane-body>
                            </template>
                        </flux-split-button>
                    </flux-stack>
                </flux-pane-body>

                <flux-pane-body>
                    <flux-badge-stack>
                        <flux-badge
                            dot
                            is-clickable
                            color="primary"
                            label="Badge"/>

                        <flux-badge
                            icon="circle"
                            is-clickable
                            is-loading
                            color="primary"
                            label="Badge"/>
                    </flux-badge-stack>
                </flux-pane-body>

                <flux-pane-body>
                    <flux-form-column>
                        <flux-form-field label="Form field">
                            <flux-form-input/>
                        </flux-form-field>
                        <flux-form-field label="Form field">
                            <flux-form-input/>
                        </flux-form-field>
                    </flux-form-column>
                </flux-pane-body>

                <flux-pane-footer>
                    <flux-flyout>
                        <template #opener="{toggle}">
                            <flux-secondary-button
                                label="Flyout"
                                @click="toggle"/>
                        </template>

                        <template #default="{close}">
                            <flux-menu>
                                <flux-menu-group>
                                    <flux-menu-item
                                        icon-before="circle"
                                        label="Cut"
                                        @click="close"/>
                                    <flux-menu-item
                                        command="⌘C"
                                        icon-before="circle"
                                        label="Copy"
                                        @click="close"/>
                                    <flux-menu-item
                                        command="⌘V"
                                        icon-before="circle"
                                        label="Paste"
                                        @click="close"/>
                                </flux-menu-group>
                                <flux-separator/>
                                <flux-menu-group>
                                    <flux-menu-item
                                        icon-before="circle"
                                        label="Download..."
                                        @click="close"/>
                                    <flux-menu-item
                                        icon-before="circle"
                                        label="Modify..."
                                        @click="close"/>
                                </flux-menu-group>
                                <flux-separator/>
                                <flux-menu-group>
                                    <flux-menu-item
                                        command="⌘O"
                                        icon-before="circle"
                                        label="Preferences"
                                        @click="close"/>
                                </flux-menu-group>
                            </flux-menu>
                        </template>
                    </flux-flyout>
                    <flux-spacer/>
                    <flux-secondary-button label="Annuleren"/>
                    <flux-primary-button
                        is-loading
                        label="Opslaan"/>
                </flux-pane-footer>
            </flux-pane>

        </flux-container-grid>
    </div>
</template>

<script
    lang="ts"
    setup>
    import {
        FluxBadge,
        FluxBadgeStack,
        FluxButtonGroup,
        FluxContainerGrid,
        FluxExpandable,
        FluxExpandableGroup,
        FluxFlyout,
        FluxFormColumn,
        FluxFormField,
        FluxFormInput,
        FluxMenu,
        FluxMenuGroup,
        FluxMenuItem,
        FluxPane,
        FluxPaneBody,
        FluxPaneFooter,
        FluxPaneHeader,
        FluxPrimaryButton,
        FluxSecondaryButton,
        FluxSeparator,
        FluxSpacer,
        FluxSplitButton,
        FluxStack
    } from '@fancee/flux';
</script>
