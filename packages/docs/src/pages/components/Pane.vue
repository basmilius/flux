<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Pane"/>

        <preview>
            <flux-pane>
                <flux-pane-header
                    icon="key"
                    title="Sessions"/>

                <flux-pane-body>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, blanditiis distinctio dolore eaque, eveniet fuga laborum maxime molestiae nemo nostrum, quis quo totam ullam. Accusantium animi aperiam cupiditate esse nisi.</p>
                </flux-pane-body>

                <flux-pane-footer>
                    <flux-destructive-button label="Logout everywhere"/>
                </flux-pane-footer>
            </flux-pane>
        </preview>

        <section>
            <p>
                A pane component is a container used to display content in a visually distinct section of a user
                interface. It serves as a way to separate and organize information. A pane is built with other Pane
                elements that each have their own purpose.
            </p>

            <p><br/></p>
            <h2>API</h2>

            <api-table title="Components">
                <template #head>
                    <tr>
                        <th>Name</th>
                        <th>When to use</th>
                    </tr>
                </template>
                <template #body>
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
                </template>
            </api-table>

            <api-table title="Props: FluxPane">
                <template #body>
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
            </api-table>

            <api-table title="Props: FluxPaneBody">
                <template #body>
                    <tr>
                        <td><code>span</code><code>number</code></td>
                        <td>Within a Pane that has a grid, this controls how much columns it should take.</td>
                    </tr>
                </template>
            </api-table>

            <api-table title="Props: FluxPaneHeader">
                <template #body>
                    <tr>
                        <td><code>icon</code><code>IconNames</code></td>
                        <td>The icon showed in the header.</td>
                    </tr>
                    <tr>
                        <td><code>span</code><code>number</code></td>
                        <td>Within a Pane that has a grid, this controls how much columns it should take.</td>
                    </tr>
                    <tr>
                        <td><code>title</code><code>string</code></td>
                        <td>The title showed in the header.</td>
                    </tr>
                </template>
            </api-table>

            <api-table title="Props: FluxPaneIllustration">
                <template #body>
                    <tr>
                        <td><code>is-controlled</code><code>boolean</code></td>
                        <td>When given, the opiniated styling is not applied to the contents of the illustaration.</td>
                    </tr>
                </template>
            </api-table>

            <api-table title="Props: FluxPaneMedia">
                <template #body>
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
            </api-table>

            <api-table title="Slots: FluxPane">
                <template #body>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>Contents of the pane.</td>
                    </tr>
                </template>
            </api-table>

            <api-table title="Slots: FluxPaneBody">
                <template #body>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>Contents of the pane body.</td>
                    </tr>
                </template>
            </api-table>

            <api-table title="Slots: FluxPaneDeck">
                <template #body>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>Contains the FluxPane's that should be grouped together.</td>
                    </tr>
                </template>
            </api-table>

            <api-table title="Slots: FluxPaneFooter">
                <template #body>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>Contents of the pane footer.</td>
                    </tr>
                </template>
            </api-table>

            <api-table title="Slots: FluxPaneHeader">
                <template #body>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>Contents of the pane header.</td>
                    </tr>
                </template>
            </api-table>

            <api-table title="Slots: FluxPaneIllustration">
                <template #body>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>Contents of the pane illustration.</td>
                    </tr>
                </template>
            </api-table>

            <p><br/></p>
            <h2>Examples</h2>

            <h3>Basic</h3>
            <p>
                A basic pane with text.
            </p>
            <code-preview
                :code="basicCode as string"
                :component="basic"/>

            <h3>Form</h3>
            <p>
                Form within a pane.
            </p>
            <code-preview
                :code="formCode as string"
                :component="form"/>

            <h3>Loading</h3>
            <p>
                A pane that is in a loading state.
            </p>
            <code-preview
                :code="loadingCode as string"
                :component="loading"/>

            <h3>Feature discovery</h3>
            <p>
                Pane that uses an illustration for feature discovery.
            </p>
            <code-preview
                :code="featureDiscoveryCode as string"
                :component="featureDiscovery"/>

            <h3>Deck</h3>
            <p>
                A group of Panes in a Deck.
            </p>
            <code-preview
                :code="deckCode as string"
                :component="deck"/>

            <h3>Media</h3>
            <p>
                A Pane that contains a PaneMedia component.
            </p>
            <code-preview
                :code="mediaCode as string"
                :component="media"/>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxDestructiveButton, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxStack } from '@fancee/flux';
    import { ApiTable, CodePreview, PageTitle, Preview } from '@/components';
    import basic from '../../code/components/pane/basic.vue';
    import basicCode from '../../code/components/pane/basic.vue?raw';
    import deck from '../../code/components/pane/deck.vue';
    import deckCode from '../../code/components/pane/deck.vue?raw';
    import featureDiscovery from '../../code/components/pane/featureDiscovery.vue';
    import featureDiscoveryCode from '../../code/components/pane/featureDiscovery.vue?raw';
    import form from '../../code/components/pane/form.vue';
    import formCode from '../../code/components/pane/form.vue?raw';
    import loading from '../../code/components/pane/loading.vue';
    import loadingCode from '../../code/components/pane/loading.vue?raw';
    import media from '../../code/components/pane/media.vue';
    import mediaCode from '../../code/components/pane/media.vue?raw';
</script>
