<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Root"/>

        <section>
            <p>
                Some functionality of Flux require a root element where other elements can be injected into. This component
                should be used as the main component of your application.
            </p>

            <p>
                Alerts and confirms are rendered here for example.
            </p>

            <p><br/></p>
            <h2>API</h2>

            <api-table title="Slots">
                <template #body>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>The contents of the application.</td>
                    </tr>
                </template>
            </api-table>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxStack } from '@fancee/flux';
    import { ApiTable, PageTitle } from '@/components';
</script>
