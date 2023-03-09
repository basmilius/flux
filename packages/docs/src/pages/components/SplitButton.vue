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
                                icon-before="copy"
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

        <section>
            <p>
                Split buttons are buttons that have one primary action and multiple secondary actions. A common
                usecase for this component is a download button with more options for that download.
            </p>

            <p><br/></p>
            <h2>API</h2>

            <api-table title="Props">
                <template #body>
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
            </api-table>

            <p><br/></p>
            <h2>Examples</h2>

            <h3>Basic</h3>
            <p>
                A basic example of a split button.
            </p>
            <code-preview
                :code="basicCode as string"
                :component="basic"/>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuGroup, FluxMenuItem, FluxSecondaryButton, FluxSeparator, FluxSplitButton, FluxStack } from '@fancee/flux';
    import { ApiTable, CodePreview, PageTitle, Preview } from '@/components';
    import basic from '../../code/components/splitButton/basic.vue';
    import basicCode from '../../code/components/splitButton/basic.vue?raw';
</script>
