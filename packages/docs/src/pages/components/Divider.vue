<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Divider"/>

        <Preview>
            <FluxPane>
                <FluxPaneBody>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, animi beatae cumque, eligendi eveniet hic ipsum itaque nesciunt nisi non odio officiis, perferendis quas quos sed soluta veritatis voluptate voluptates!</p>

                    <FluxDivider/>

                    <p>Aliquam commodi dolor ea fuga nihil odio, quam. Alias cupiditate fuga harum ipsam laboriosam minima nemo praesentium similique sit vitae. Dolorum enim et exercitationem laborum minus odio pariatur. Iste, recusandae?</p>

                    <FluxDivider>
                        <FluxSecondaryButton
                            icon-before="circle-check"
                            label="Button"/>
                    </FluxDivider>

                    <p>Ab ad aliquid animi culpa, dolor eveniet expedita facilis fuga incidunt itaque iure magni nam natus nostrum numquam perspiciatis quae, quas qui rem saepe sint temporibus veritatis vitae! Hic, iusto!</p>
                </FluxPaneBody>
            </FluxPane>
        </Preview>

        <ApiSection>
            <p>
                A horizontal line that can show optional content within it.
            </p>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponent name="Divider">
                <template #props>
                    <tr>
                        <td><code>content-placement</code><code>'start' | 'center' | 'end'</code></td>
                        <td>The placement of the content in the divider.</td>
                    </tr>
                </template>

                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>The content of the divider.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>

        <ApiSection title="Examples">
            <ApiExample
                :code="basicCode"
                :component="basic"
                title="Basic"
                description="A basic divider with nothing else to it."/>

            <ApiExample
                :code="buttonCode"
                :component="button"
                title="Button"
                description="A divider with a button within it."/>

            <ApiExample
                :code="iconCode"
                :component="icon"
                title="Icon"
                description="A divider with an icon within it."/>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxDivider, FluxPane, FluxPaneBody, FluxSecondaryButton, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiExample, ApiSection, PageTitle, Preview } from '@docs/components';
    import basic from '@docs/code/components/divider/basic.vue';
    import basicCode from '@docs/code/components/divider/basic.vue?raw';
    import button from '@docs/code/components/divider/button.vue';
    import buttonCode from '@docs/code/components/divider/button.vue?raw';
    import icon from '@docs/code/components/divider/icon.vue';
    import iconCode from '@docs/code/components/divider/icon.vue?raw';
</script>
