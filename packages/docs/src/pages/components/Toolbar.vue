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
                        <flux-action icon="grip-dots"/>
                        <flux-action icon="angle-up"/>
                        <flux-action icon="angle-down"/>
                    </flux-toolbar-group>

                    <flux-separator axis="vertical"/>

                    <flux-toolbar-group>
                        <flux-action
                            destructive
                            icon="xmark"/>
                    </flux-toolbar-group>
                </flux-toolbar>
            </flux-pane>
        </preview>

        <api-section>
            <p>
                The toolbar component is used for actions within a certain context. For example: when you have a
                stack of products, toolbars can be used to display actions for each product. A toolbar can have
                groups, buttons and separators within them.
            </p>
        </api-section>

        <api-section title="API">
            <api-components>
                <tr>
                    <td><code>FluxToolbar</code></td>
                    <td>The toolbar itself.</td>
                </tr>
                <tr>
                    <td><code>FluxToolbarGroup</code></td>
                    <td>Groups one or more FluxToolbarButton components together.</td>
                </tr>
            </api-components>

            <api-component name="Toolbar">
                <template #props>
                    <tr>
                        <td><code>floating-mode</code><code>'free' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'</code></td>
                        <td>The color of the timeline item. Gray is used when this prop is omitted.</td>
                    </tr>
                </template>

                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>Contents of the toolbar.</td>
                    </tr>
                </template>
            </api-component>

            <api-component name="ToolbarGroup">
                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>Contents of the toolbar group.</td>
                    </tr>
                </template>
            </api-component>
        </api-section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxAction, FluxPane, FluxPaneBody, FluxSeparator, FluxStack, FluxToolbar, FluxToolbarGroup } from '@fancee/flux';
    import { ApiComponent, ApiComponents, ApiSection, PageTitle, Preview } from '@/components';
</script>
