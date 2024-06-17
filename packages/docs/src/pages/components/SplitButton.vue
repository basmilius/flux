<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Split button"/>

        <Preview>
            <FluxSplitButton>
                <template #button>
                    <FluxSecondaryButton label="Download"/>
                </template>

                <template #flyout="{close}">
                    <FluxMenu>
                        <FluxMenuGroup>
                            <FluxMenuItem
                                icon-before="scissors"
                                label="Cut"
                                @click="close"/>
                            <FluxMenuItem
                                icon-before="clone"
                                label="Copy"
                                @click="close"/>
                            <FluxMenuItem
                                icon-before="paste"
                                label="Paste"
                                @click="close"/>
                        </FluxMenuGroup>

                        <FluxSeparator/>

                        <FluxMenuGroup>
                            <FluxMenuItem
                                icon-before="gear"
                                label="Preferences"
                                @click="close"/>
                        </FluxMenuGroup>
                    </FluxMenu>
                </template>
            </FluxSplitButton>
        </Preview>

        <ApiSection>
            <p>
                Split buttons are buttons that have one primary action and multiple secondary actions. A common
                usecase for this component is a download button with more options for that download.
            </p>
        </ApiSection>

        <ApiSection title="Required icons">
            <ApiRequiredIcons :icons="['ellipsis-h']"/>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponent name="SplitButton">
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
            </ApiComponent>
        </ApiSection>

        <ApiSection title="Examples">
            <ApiExample
                :code="basicCode"
                :component="basic"
                title="Basic"
                description="A basic example of a split button."/>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuGroup, FluxMenuItem, FluxSecondaryButton, FluxSeparator, FluxSplitButton, FluxStack } from '@basmilius/flux';
    import { ApiComponent, ApiExample, ApiRequiredIcons, ApiSection, PageTitle, Preview } from '@docs/components';
    import basic from '@docs/code/components/splitButton/basic.vue';
    import basicCode from '@docs/code/components/splitButton/basic.vue?raw';
</script>
