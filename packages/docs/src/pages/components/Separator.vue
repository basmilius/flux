<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Separator"/>

        <Preview>
            <FluxPane>
                <FluxPaneBody>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, blanditiis distinctio dolore eaque, eveniet fuga laborum maxime molestiae nemo nostrum, quis quo totam ullam. Accusantium animi aperiam cupiditate esse nisi.</p>
                </FluxPaneBody>

                <FluxSeparator/>

                <FluxPaneBody>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere minus perspiciatis quae quisquam. Consequuntur corporis dicta, dolorum maiores, molestiae nemo officia quae quaerat quibusdam quo ratione vel veritatis voluptas voluptatibus.</p>
                </FluxPaneBody>
            </FluxPane>
        </Preview>

        <ApiSection>
            <p>
                The separator component is a visual divider used to separate content on a page. It has the ability to be
                oriented along the x-axis or y-axis, depending on the value of its axis property.
            </p>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponent name="Separator">
                <template #props>
                    <tr>
                        <td><code>axis</code><code>'horizontal' | 'vertical'</code></td>
                        <td>The direction of the separator.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneBody, FluxSeparator, FluxStack } from '@basmilius/flux';
    import { ApiComponent, ApiSection, PageTitle, Preview } from '@docs/components';
</script>
