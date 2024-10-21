<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Toolbar"/>

        <Preview>
            <FluxPane style="width: 480px">
                <FluxPaneBody>
                    &nbsp;
                </FluxPaneBody>

                <FluxToolbar floating-mode="top-end">
                    <FluxToolbarGroup>
                        <FluxAction icon="grip-dots"/>
                        <FluxAction icon="angle-up"/>
                        <FluxAction icon="angle-down"/>
                    </FluxToolbarGroup>

                    <FluxSeparator axis="vertical"/>

                    <FluxToolbarGroup>
                        <FluxAction
                            icon="xmark"
                            is-destructive/>
                    </FluxToolbarGroup>
                </FluxToolbar>
            </FluxPane>
        </Preview>

        <ApiSection>
            <p>
                The toolbar component is used for actions within a certain context. For example: when you have a
                stack of products, toolbars can be used to display actions for each product. A toolbar can have
                groups, buttons and separators within them.
            </p>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponents>
                <tr>
                    <td><code>FluxToolbar</code></td>
                    <td>The toolbar itself.</td>
                </tr>
                <tr>
                    <td><code>FluxToolbarGroup</code></td>
                    <td>Groups one or more FluxToolbarButton components together.</td>
                </tr>
            </ApiComponents>

            <ApiComponent name="Toolbar">
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
            </ApiComponent>

            <ApiComponent name="ToolbarGroup">
                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>Contents of the toolbar group.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxAction, FluxPane, FluxPaneBody, FluxSeparator, FluxStack, FluxToolbar, FluxToolbarGroup } from '@basmilius/flux';
    import { ApiComponent, ApiComponents, ApiSection, PageTitle, Preview } from '@/components';
</script>
