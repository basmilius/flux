<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Spinner"/>

        <Preview>
            <FluxSpinner :size="42"/>
        </Preview>

        <ApiSection>
            <p>
                A spinner is a visual indicator used to show that a process or action is in progress. Spinners are
                commonly used to provide feedback to the user when a process is taking a long time, such as when loading
                data or performing a complex calculation. They help to provide a sense of progress and prevent confusion,
                letting the user know that the system is still working and that they should wait for the process to complete.
            </p>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponent name="Spinner">
                <template #props>
                    <tr>
                        <td><code>size</code><code>number</code></td>
                        <td>The size in pixels of the spinner.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>

        <ApiSection title="Examples">
            <ApiExample
                :code="basicCode"
                :component="basic"
                title="Basic"
                description="A basic spinner."/>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxSpinner, FluxStack } from '@basmilius/flux';
    import { ApiComponent, ApiExample, ApiSection, PageTitle, Preview } from '@docs/components';
    import basic from '@docs/code/components/spinner/basic.vue';
    import basicCode from '@docs/code/components/spinner/basic.vue?raw';
</script>
