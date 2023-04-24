<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Tooltip"/>

        <preview>
            <flux-button-stack>
                <flux-tooltip
                    axis="horizontal"
                    content="Lorem ipsum dolor sit amet, consectetur adipisicing elit.">
                    <flux-secondary-button
                        icon-before="clone"
                        label="Hover me"/>
                </flux-tooltip>

                <flux-tooltip>
                    <template #content>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab consequatur dolor doloremque ipsa ipsum nulla, placeat qui, saepe sapiente tempora tenetur, unde? Aliquam commodi eaque explicabo ipsum iusto possimus reiciendis.</p>
                    </template>

                    <flux-secondary-button
                        icon-before="clone"
                        label="Hover me"/>
                </flux-tooltip>
            </flux-button-stack>
        </preview>

        <api-section>
            <p>
                Tooltips can be used to display additional information when the user hovers an element. It tries
                to position the tooltip within the viewport. When the content needs to be complex, a slot can
                be used.
            </p>
        </api-section>

        <api-section title="API">
            <api-component name="Tooltip">
                <template #props>
                    <tr>
                        <td><code>axis</code><code>'horizontal' | 'vertical'</code></td>
                        <td>The axis where the tooltip should be displayed.</td>
                    </tr>
                    <tr>
                        <td><code>content</code><code>string</code></td>
                        <td>The contents of the tooltip.</td>
                    </tr>
                </template>

                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>The element that needs a tooltip.</td>
                    </tr>
                    <tr>
                        <td><code>content</code><code>{}</code></td>
                        <td>The contents of the tooltip.</td>
                    </tr>
                </template>
            </api-component>
        </api-section>

        <api-section title="Examples">
            <api-example
                :code="basicCode"
                :component="basic"
                title="Basic"
                description="A tooltip that uses its content prop to determine its content."/>

            <api-example
                :code="slotCode"
                :component="slot"
                title="Slot"
                description="A tooltip that uses the content slot to determine its content. This can be useful to display more dynamic tooltips."/>
        </api-section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxSecondaryButton, FluxStack, FluxTooltip } from '@fancee/flux';
    import { ApiComponent, ApiExample, ApiSection, PageTitle, Preview } from '@/components';
    import basic from '@/code/components/tooltip/basic.vue';
    import basicCode from '@/code/components/tooltip/basic.vue?raw';
    import slot from '@/code/components/tooltip/slot.vue';
    import slotCode from '@/code/components/tooltip/slot.vue?raw';
</script>
