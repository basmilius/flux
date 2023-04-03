<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Split button"/>

        <preview>
            <flux-split-button>
                <template #button>
                    <flux-secondary-button label="Download"/>
                </template>

                <template #flyout="{close}">
                    <flux-menu>
                        <flux-menu-group>
                            <flux-menu-item
                                icon-before="scissors"
                                label="Cut"
                                @click="close"/>
                            <flux-menu-item
                                icon-before="clone"
                                label="Copy"
                                @click="close"/>
                            <flux-menu-item
                                icon-before="paste"
                                label="Paste"
                                @click="close"/>
                        </flux-menu-group>

                        <flux-separator/>

                        <flux-menu-group>
                            <flux-menu-item
                                icon-before="gear"
                                label="Preferences"
                                @click="close"/>
                        </flux-menu-group>
                    </flux-menu>
                </template>
            </flux-split-button>
        </preview>

        <api-section>
            <p>
                Split buttons are buttons that have one primary action and multiple secondary actions. A common
                usecase for this component is a download button with more options for that download.
            </p>
        </api-section>

        <api-section title="Required icons">
            <api-required-icons :icons="['ellipsis-h']"/>
        </api-section>

        <api-section title="API">
            <api-component name="SplitButton">
                <template #props>
                    <tr>
                        <td><code>button-icon</code><code>IconNames</code></td>
                        <td>The icon used for the more button.</td>
                    </tr>
                    <tr>
                        <td><code>flyout-axis</code><code>'horizontal' | 'vertical'</code></td>
                        <td>Controls where the flyout is opened.</td>
                    </tr>
                    <tr>
                        <td><code>flyout-is-auto-width</code><code>boolean</code></td>
                        <td>Sets the flyout width to the same as the opener.</td>
                    </tr>
                    <tr>
                        <td><code>flyout-margin</code><code>number</code></td>
                        <td>Controls the offset of the flyout from its opener.</td>
                    </tr>
                    <tr>
                        <td><code>flyout-width</code><code>number</code></td>
                        <td>Width of the flyout.</td>
                    </tr>
                </template>
            </api-component>
        </api-section>

        <api-section title="Examples">
            <api-example
                :code="basicCode"
                :component="basic"
                title="Basic"
                description="A basic example of a split button."/>
        </api-section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuGroup, FluxMenuItem, FluxSecondaryButton, FluxSeparator, FluxSplitButton, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiExample, ApiRequiredIcons, ApiSection, PageTitle, Preview } from '@/components';
    import basic from '../../code/components/splitButton/basic.vue';
    import basicCode from '../../code/components/splitButton/basic.vue?raw';
</script>
