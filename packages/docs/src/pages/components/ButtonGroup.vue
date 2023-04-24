<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Button group"/>

        <preview>
            <flux-button-group>
                <flux-secondary-button label="Left"/>
                <flux-secondary-button label="Center"/>
                <flux-secondary-button label="Right"/>
            </flux-button-group>
        </preview>

        <api-section>
            <p>
                Groups multiple button. The button group component will adjust the border radius of its underlying
                buttons and remove gaps between them.
            </p>
        </api-section>

        <api-section title="API">
            <api-component name="ButtonGroup">
                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>The buttons that should be part of the group.</td>
                    </tr>
                </template>
            </api-component>
        </api-section>

        <api-section title="Examples">
            <api-example
                :code="basicCode"
                :component="basic"
                title="Basic"
                description="A basic example of a button group."/>
        </api-section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonGroup, FluxSecondaryButton, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiExample, ApiSection, PageTitle, Preview } from '@/components';
    import basic from '@/code/components/buttonGroup/basic.vue';
    import basicCode from '@/code/components/buttonGroup/basic.vue?raw';
</script>
