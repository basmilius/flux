<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Button group"/>

        <Preview>
            <FluxButtonGroup>
                <FluxSecondaryButton label="Left"/>
                <FluxSecondaryButton label="Center"/>
                <FluxSecondaryButton label="Right"/>
            </FluxButtonGroup>
        </Preview>

        <ApiSection>
            <p>
                Groups multiple button. The button group component will adjust the border radius of its underlying
                buttons and remove gaps between them.
            </p>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponent name="ButtonGroup">
                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>The buttons that should be part of the group.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>

        <ApiSection title="Examples">
            <ApiExample
                :code="basicCode"
                :component="basic"
                title="Basic"
                description="A basic example of a button group."/>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonGroup, FluxSecondaryButton, FluxStack } from '@basmilius/flux';
    import { ApiComponent, ApiExample, ApiSection, PageTitle, Preview } from '@docs/components';
    import basic from '@docs/code/components/buttonGroup/basic.vue';
    import basicCode from '@docs/code/components/buttonGroup/basic.vue?raw';
</script>
