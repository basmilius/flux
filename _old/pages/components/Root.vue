<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Root"/>

        <ApiSection>
            <p>
                Some functionality of Flux require a root element where other elements can be injected into. This component
                should be used as the main component of your application.
            </p>

            <p>
                Alerts and confirms are rendered here for example.
            </p>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponent name="Root">
                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>The contents of the application.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxStack } from '@basmilius/flux';
    import { ApiComponent, ApiSection, PageTitle } from '@/components';
</script>
