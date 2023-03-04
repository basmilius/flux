<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Spinner"/>

        <preview>
            <flux-spinner :size="42"/>
        </preview>

        <section>
            <p>
                A spinner is a visual indicator used to show that a process or action is in progress. Spinners are
                commonly used to provide feedback to the user when a process is taking a long time, such as when loading
                data or performing a complex calculation. They help to provide a sense of progress and prevent confusion,
                letting the user know that the system is still working and that they should wait for the process to complete.
            </p>

            <p><br/></p>
            <h2>API</h2>

            <api-table title="Props">
                <template #body>
                    <tr>
                        <td><code>size</code><code>number</code></td>
                        <td>The size in pixels of the spinner.</td>
                    </tr>
                </template>
            </api-table>

            <p><br/></p>
            <h2>Examples</h2>

            <h3>Basic</h3>
            <p>
                A basic spinner.
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
    import { FluxSpinner, FluxStack } from '@fancee/flux';
    import { ApiTable, CodePreview, PageTitle, Preview } from '@/components';
    import basic from '@/code/components/spinner/basic.vue';
    import basicCode from '@/code/components/spinner/basic.vue?raw';
</script>
