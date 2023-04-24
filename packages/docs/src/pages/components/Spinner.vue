<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Spinner"/>

        <preview>
            <flux-spinner :size="42"/>
        </preview>

        <api-section>
            <p>
                A spinner is a visual indicator used to show that a process or action is in progress. Spinners are
                commonly used to provide feedback to the user when a process is taking a long time, such as when loading
                data or performing a complex calculation. They help to provide a sense of progress and prevent confusion,
                letting the user know that the system is still working and that they should wait for the process to complete.
            </p>
        </api-section>

        <api-section title="API">
            <api-component name="Spinner">
                <template #props>
                    <tr>
                        <td><code>size</code><code>number</code></td>
                        <td>The size in pixels of the spinner.</td>
                    </tr>
                </template>
            </api-component>
        </api-section>

        <api-section title="Examples">
            <api-example
                :code="basicCode"
                :component="basic"
                title="Basic"
                description="A basic spinner."/>
        </api-section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxSpinner, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiExample, ApiSection, PageTitle, Preview } from '@/components';
    import basic from '@/code/components/spinner/basic.vue';
    import basicCode from '@/code/components/spinner/basic.vue?raw';
</script>
