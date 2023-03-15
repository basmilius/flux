<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Toolbar"/>

        <preview>
            <flux-pane style="width: 480px">
                <flux-pane-body>
                    &nbsp;
                </flux-pane-body>

                <flux-toolbar floating-mode="top-end">
                    <flux-toolbar-group>
                        <flux-toolbar-button icon="grip-dots"/>
                        <flux-toolbar-button icon="angle-up"/>
                        <flux-toolbar-button icon="angle-down"/>
                    </flux-toolbar-group>

                    <flux-separator axis="vertical"/>

                    <flux-toolbar-group>
                        <flux-toolbar-button destructive icon="xmark"/>
                    </flux-toolbar-group>
                </flux-toolbar>
            </flux-pane>
        </preview>

        <section>
            <p>
                The toolbar component is used for actions within a certain context. For example: when you have a
                stack of products, toolbars can be used to display actions for each product. A toolbar can have
                groups, buttons and separators within them.
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
                        <td><code>FluxToolbar</code></td>
                        <td>The toolbar itself.</td>
                    </tr>
                    <tr>
                        <td><code>FluxToolbarButton</code></td>
                        <td>A single action within the toolbar.</td>
                    </tr>
                    <tr>
                        <td><code>FluxToolbarGroup</code></td>
                        <td>Groups one or more FluxToolbarButton components together.</td>
                    </tr>
                </template>
            </api-table>

            <api-table title="Props: FluxToolbar">
                <template #body>
                    <tr>
                        <td><code>floating-mode</code><code>'free' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'</code></td>
                        <td>The color of the timeline item. Gray is used when this prop is omitted.</td>
                    </tr>
                </template>
            </api-table>

            <api-table title="Props: FluxToolbarButton">
                <template #body>
                    <tr>
                        <td><code>destructive</code><code>boolean</code></td>
                        <td>Indicates that the button should be a destructive action.</td>
                    </tr>
                    <tr>
                        <td><code>disabled</code><code>boolean</code></td>
                        <td>Indicates that the button should be disabled.</td>
                    </tr>
                    <tr>
                        <td><code>icon</code><code>IconNames</code></td>
                        <td>The icon that is used.</td>
                    </tr>
                    <tr>
                        <td><code>is-loading</code><code>boolean</code></td>
                        <td>Sets a loading state to the button. This also disables it. The spinner will replace the icon used in the button.</td>
                    </tr>
                    <tr>
                        <td><code>label</code><code>string</code></td>
                        <td>The label displayed within the button.</td>
                    </tr>
                </template>
            </api-table>

            <api-table title="Emits: FluxToolbarButton">
                <template #body>
                    <tr>
                        <td><code>click</code><code>(evt: MouseEvent): void;</code></td>
                        <td>Triggered when the button is clicked.</td>
                    </tr>
                    <tr>
                        <td><code>mouseenter</code><code>(evt: MouseEvent): void;</code></td>
                        <td>Triggered when the cursor enters the button.</td>
                    </tr>
                    <tr>
                        <td><code>mouseleave</code><code>(evt: MouseEvent): void;</code></td>
                        <td>Triggered when the cursor leaves the button.</td>
                    </tr>
                </template>
            </api-table>

            <api-table title="Slots: FluxToolbar">
                <template #body>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>Contents of the toolbar.</td>
                    </tr>
                </template>
            </api-table>

            <api-table title="Slots: FluxToolbarGroup">
                <template #body>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>Contents of the toolbar group.</td>
                    </tr>
                </template>
            </api-table>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneBody, FluxSeparator, FluxStack, FluxToolbar, FluxToolbarButton, FluxToolbarGroup } from '@fancee/flux';
    import { ApiTable, PageTitle, Preview } from '@/components';
</script>
