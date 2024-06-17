<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Tooltip"/>

        <Preview>
            <FluxButtonStack>
                <FluxTooltip
                    axis="horizontal"
                    content="Lorem ipsum dolor sit amet, consectetur adipisicing elit.">
                    <FluxSecondaryButton
                        icon-before="clone"
                        label="Hover me"/>
                </FluxTooltip>

                <FluxTooltip>
                    <template #content>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab consequatur dolor doloremque ipsa ipsum nulla, placeat qui, saepe sapiente tempora tenetur, unde? Aliquam commodi eaque explicabo ipsum iusto possimus reiciendis.</p>
                    </template>

                    <FluxSecondaryButton
                        icon-before="clone"
                        label="Hover me"/>
                </FluxTooltip>
            </FluxButtonStack>
        </Preview>

        <ApiSection>
            <p>
                Tooltips can be used to display additional information when the user hovers an element. It tries
                to position the tooltip within the viewport. When the content needs to be complex, a slot can
                be used.
            </p>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponent name="Tooltip">
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
            </ApiComponent>
        </ApiSection>

        <ApiSection title="Examples">
            <ApiExample
                :code="basicCode"
                :component="basic"
                title="Basic"
                description="A tooltip that uses its content prop to determine its content."/>

            <ApiExample
                :code="slotCode"
                :component="slot"
                title="Slot"
                description="A tooltip that uses the content slot to determine its content. This can be useful to display more dynamic tooltips."/>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxSecondaryButton, FluxStack, FluxTooltip } from '@basmilius/flux';
    import { ApiComponent, ApiExample, ApiSection, PageTitle, Preview } from '@docs/components';
    import basic from '@docs/code/components/tooltip/basic.vue';
    import basicCode from '@docs/code/components/tooltip/basic.vue?raw';
    import slot from '@docs/code/components/tooltip/slot.vue';
    import slotCode from '@docs/code/components/tooltip/slot.vue?raw';
</script>
