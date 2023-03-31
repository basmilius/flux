<template>
    <flux-stack>
        <page-title
            section="Layout"
            title="Stack"/>

        <preview>
            <flux-pane>
                <flux-pane-body>
                    <flux-stack
                        axis="horizontal"
                        :gap="15">
                        <div class="column-example"/>
                        <div class="column-example"/>
                        <div class="column-example"/>
                        <div class="column-example"/>
                    </flux-stack>
                </flux-pane-body>
            </flux-pane>
        </preview>

        <api-section>
            <p>
                A stack component is a layout component that arranges child elements in a stack along a specified axis, with
                a configurable gap between elements. The axis property defines the direction in which the elements are stacked
                (e.g. horizontally or vertically), while the gap property sets the size of the space between elements. Stacks
                can be used to organize content in a compact and organized manner, and are commonly used to create simple and
                flexible layouts in web and mobile applications.
            </p>
        </api-section>

        <api-section title="API">
            <api-components>
                <tr>
                    <td><code>FluxStack</code></td>
                    <td></td>
                </tr>
                <tr>
                    <td><code>FluxBadgeStack</code></td>
                    <td></td>
                </tr>
                <tr>
                    <td><code>FluxButtonStack</code></td>
                    <td></td>
                </tr>
                <tr>
                    <td><code>FluxInfoStack</code></td>
                    <td></td>
                </tr>
                <tr>
                    <td><code>FluxNoticeStack</code></td>
                    <td></td>
                </tr>
            </api-components>

            <api-component name="Stack">
                <template #props>
                    <tr>
                        <td><code>axis</code><code>'horizontal' | 'vertical'</code></td>
                        <td>The stack direction.</td>
                    </tr>
                    <tr>
                        <td><code>gap</code><code>number</code></td>
                        <td>The gap in pixels between each element.</td>
                    </tr>
                    <tr>
                        <td><code>is-fill</code><code>boolean</code></td>
                        <td>When provided, the stack fills its parent.</td>
                    </tr>
                    <tr>
                        <td><code>is-growing</code><code>boolean</code></td>
                        <td>When provided, the stack elements grow based on the stack's width.</td>
                    </tr>
                    <tr>
                        <td><code>is-wrapping</code><code>boolean</code></td>
                        <td>When provided, the elements within the stack wrap when there isn't enough space left.</td>
                    </tr>
                </template>
            </api-component>
        </api-section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneBody, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiComponents, ApiSection, PageTitle, Preview } from '@/components';
</script>

<style
    lang="scss"
    scoped>
    .column-example {
        display: flex;
        height: 39px;
        width: 90px;
        align-items: center;
        justify-content: center;
        background: rgb(var(--gray-2));
        border: 1px dashed rgb(var(--gray-4));
        border-radius: var(--radius);

        &::before {
            content: 'Column';
            color: rgb(var(--gray-6));
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
        }
    }
</style>
