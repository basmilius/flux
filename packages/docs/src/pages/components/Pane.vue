<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Pane"/>

        <Preview>
            <FluxPane>
                <FluxPaneHeader
                    icon="key"
                    title="Sessions"
                    sub-title="List with your active sessions."/>

                <FluxPaneBody>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, blanditiis distinctio dolore eaque, eveniet fuga laborum maxime molestiae nemo nostrum, quis quo totam ullam. Accusantium animi aperiam cupiditate esse nisi.</p>
                </FluxPaneBody>

                <FluxPaneFooter>
                    <FluxDestructiveButton label="Logout everywhere"/>
                </FluxPaneFooter>
            </FluxPane>
        </Preview>

        <ApiSection>
            <p>
                A pane component is a container used to display content in a visually distinct section of a user
                interface. It serves as a way to separate and organize information. A pane is built with other Pane
                elements that each have their own purpose.
            </p>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponents>
                <tr>
                    <td><code>FluxPane</code></td>
                    <td>The Pane itself. Provides a background, border and little shadow.</td>
                </tr>
                <tr>
                    <td><code>FluxPaneBody</code></td>
                    <td>Padded body of a Pane, can contain user interface elements such as forms or just text.</td>
                </tr>
                <tr>
                    <td><code>FluxPaneDeck</code></td>
                    <td>This component groups multiple FluxPane's together.</td>
                </tr>
                <tr>
                    <td><code>FluxPaneFooter</code></td>
                    <td>When a Pane has buttons, they can be displayed in the footer. Provides a light gray background and a border.</td>
                </tr>
                <tr>
                    <td><code>FluxPaneHeader</code></td>
                    <td>A default header for a Pane. Provides support for an icon and a title. Pane headers should be used when no other options are available.</td>
                </tr>
                <tr>
                    <td><code>FluxPaneIllustration</code></td>
                    <td>Pane illustrations are opiniated designed illutrations used in "feature discovery cards". Illustrations should be designed outside of Flux.</td>
                </tr>
                <tr>
                    <td><code>FluxPaneMedia</code></td>
                    <td>Can hold an image that is used as the media within a pane.</td>
                </tr>
            </ApiComponents>

            <ApiComponent name="Pane">
                <template #props>
                    <tr>
                        <td><code>columns</code><code>number</code></td>
                        <td>How much grid columns the pane should have.</td>
                    </tr>
                    <tr>
                        <td><code>is-contained</code><code>boolean</code></td>
                        <td>If the contents of the pane should be contained within it. When applied, content cannot break-out of the pane.</td>
                    </tr>
                    <tr>
                        <td><code>is-loading</code><code>boolean</code></td>
                        <td>Whether the pane should show a loading overlay.</td>
                    </tr>
                    <tr>
                        <td><code>tag</code><code>string</code></td>
                        <td>The tag of the panel.</td>
                    </tr>
                    <tr>
                        <td><code>href</code><code>string</code></td>
                        <td>HTMLAnchorElement.href</td>
                    </tr>
                    <tr>
                        <td><code>rel</code><code>string</code></td>
                        <td>HTMLAnchorElement.rel</td>
                    </tr>
                    <tr>
                        <td><code>target</code><code>string</code></td>
                        <td>HTMLAnchorElement.target</td>
                    </tr>
                    <tr>
                        <td><code>to</code><code>FluxRoutingLocation</code></td>
                        <td>A routing location, same as vue-router.</td>
                    </tr>
                </template>

                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>Contents of the pane.</td>
                    </tr>
                </template>
            </ApiComponent>

            <ApiComponent name="PaneBody">
                <template #props>
                    <tr>
                        <td><code>span</code><code>number</code></td>
                        <td>Within a Pane that has a grid, this controls how much columns it should take.</td>
                    </tr>
                </template>

                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>Contents of the pane body.</td>
                    </tr>
                </template>
            </ApiComponent>

            <ApiComponent name="PaneDeck">
                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>Contains the FluxPane's that should be grouped together.</td>
                    </tr>
                </template>
            </ApiComponent>

            <ApiComponent name="PaneFooter">
                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>Contents of the pane footer.</td>
                    </tr>
                </template>
            </ApiComponent>

            <ApiComponent name="PaneHeader">
                <template #props>
                    <tr>
                        <td><code>icon</code><code>IconNames</code></td>
                        <td>The icon showed in the header.</td>
                    </tr>
                    <tr>
                        <td><code>span</code><code>number</code></td>
                        <td>Within a Pane that has a grid, this controls how much columns it should take.</td>
                    </tr>
                    <tr>
                        <td><code>sub-title</code><code>string</code></td>
                        <td>The sub-title showed in the header.</td>
                    </tr>
                    <tr>
                        <td><code>title</code><code>string</code></td>
                        <td>The title showed in the header.</td>
                    </tr>
                </template>

                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>Contents of the pane header.</td>
                    </tr>
                </template>
            </ApiComponent>

            <ApiComponent name="PaneIllustration">
                <template #props>
                    <tr>
                        <td><code>animated-colors</code><code>string[]</code></td>
                        <td>An array of hex values to use in the color glowing effect.</td>
                    </tr>
                    <tr>
                        <td><code>animated-opacity</code><code>number</code></td>
                        <td>The global opacity level of the animation.</td>
                    </tr>
                    <tr>
                        <td><code>animated-seed</code><code>number</code></td>
                        <td>The randomizer seed to user for the animation.</td>
                    </tr>
                    <tr>
                        <td><code>aspect-ratio</code><code>number</code></td>
                        <td>Aspect ratio to use for the illustration.</td>
                    </tr>
                    <tr>
                        <td><code>is-masked</code><code>number</code></td>
                        <td>When applied, the illustration fades away in the background.</td>
                    </tr>
                </template>

                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>Contents of the pane illustration.</td>
                    </tr>
                    <tr>
                        <td><code>controlled</code><code>{}</code></td>
                        <td>Contents of the pane illustration, but controlled by the pane illustration.</td>
                    </tr>
                </template>
            </ApiComponent>

            <ApiComponent name="PaneMedia">
                <template #props>
                    <tr>
                        <td><code>image-alt</code><code>string</code></td>
                        <td>Alt tag for the image.</td>
                    </tr>
                    <tr>
                        <td><code>image-focal-point</code><code>[number, number]</code></td>
                        <td>Focal point of the image.</td>
                    </tr>
                    <tr>
                        <td><code>image-url</code><code>string</code></td>
                        <td>Source url of the image.</td>
                    </tr>
                    <tr>
                        <td><code>is-inset</code><code>boolean</code></td>
                        <td>When applied, the media has some whitespace around it..</td>
                    </tr>
                    <tr>
                        <td><code>span</code><code>number</code></td>
                        <td>Within a Pane that has a grid, this controls how much columns it should take.</td>
                    </tr>
                    <tr>
                        <td><code>span</code><code>number</code></td>
                        <td>Within a Pane that has a grid, this controls how much columns it should take.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>

        <ApiSection title="Examples">
            <ApiExample
                :code="basicCode"
                :component="basic"
                title="Basic"
                description="A basic pane with text."/>

            <ApiExample
                :code="formCode"
                :component="form"
                title="Form"
                description="Form within a pane."/>

            <ApiExample
                :code="loadingCode"
                :component="loading"
                title="Loading"
                description="A pane that is in a loading state."/>

            <ApiExample
                :code="featureDiscoveryCode"
                :component="featureDiscovery"
                title="Feature discovery"
                description="Pane that uses an illustration for feature discovery."/>

            <ApiExample
                :code="deckCode"
                :component="deck"
                title="Deck"
                description="A group of Panes in a Deck."/>

            <ApiExample
                :code="mediaCode"
                :component="media"
                title="Media"
                description="A Pane that contains a PaneMedia component."/>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxDestructiveButton, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiComponents, ApiExample, ApiSection, PageTitle, Preview } from '@docs/components';
    import basic from '@docs/code/components/pane/basic.vue';
    import basicCode from '@docs/code/components/pane/basic.vue?raw';
    import deck from '@docs/code/components/pane/deck.vue';
    import deckCode from '@docs/code/components/pane/deck.vue?raw';
    import featureDiscovery from '@docs/code/components/pane/featureDiscovery.vue';
    import featureDiscoveryCode from '@docs/code/components/pane/featureDiscovery.vue?raw';
    import form from '@docs/code/components/pane/form.vue';
    import formCode from '@docs/code/components/pane/form.vue?raw';
    import loading from '@docs/code/components/pane/loading.vue';
    import loadingCode from '@docs/code/components/pane/loading.vue?raw';
    import media from '@docs/code/components/pane/media.vue';
    import mediaCode from '@docs/code/components/pane/media.vue?raw';
</script>
