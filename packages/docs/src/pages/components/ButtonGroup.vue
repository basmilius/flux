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

        <section>
            <p>
                Groups multiple button. The button group component will adjust the border radius of its underlying
                buttons and remove gaps between them.
            </p>

            <p><br/></p>
            <h2>Examples</h2>

            <h3>Basic</h3>
            <p>
                A basic example of a button group.
            </p>
            <code-preview
                :code="basicCode as string"
                :component="basic"/>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonGroup, FluxSecondaryButton, FluxStack } from '@fancee/flux';
    import { CodePreview, PageTitle, Preview } from '@/components';
    import basic from '../../code/components/buttonGroup/basic.vue';
    import basicCode from '../../code/components/buttonGroup/basic.vue?raw';
</script>
