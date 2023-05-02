<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Root"/>

        <api-section>
            <p>
                Some functionality of Flux require a root element where other elements can be injected into. This component
                should be used as the main component of your application.
            </p>

            <p>
                Alerts and confirms are rendered here for example.
            </p>
        </api-section>

        <api-section title="API">
            <api-component name="Root">
                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>The contents of the application.</td>
                    </tr>
                </template>
            </api-component>
        </api-section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiSection, PageTitle } from '@/components';
</script>
