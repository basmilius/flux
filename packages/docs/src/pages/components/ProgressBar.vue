<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="ProgressBar"/>

        <Preview>
            <FluxPane style="width: 75%">
                <FluxPaneBody>
                    <FluxFormField label="Downloading">
                        <FluxProgressBar
                            :min="0"
                            :max="100"
                            :value="75"
                            status="The Blacklist S01E03 - The Stewmaker"/>
                    </FluxFormField>
                </FluxPaneBody>
            </FluxPane>
        </Preview>

        <ApiSection>
            <p>
                A progress bar serves as a visual indicator that communicates the ongoing status and advancement
                of a task, particularly those that require a significant amount of time to complete. It functions
                by providing a graphical representation of the task's progress, offering users a clear insight
                into both the current activity and the overall completion status.
            </p>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponent name="ProgressBar">
                <template #props>
                    <tr>
                        <td><code>is-indeterminate</code><code>boolean</code></td>
                        <td>Indicates that the progress bar is in an indetermined state.</td>
                    </tr>
                    <tr>
                        <td><code>max</code><code>number</code></td>
                        <td>The maximum value.</td>
                    </tr>
                    <tr>
                        <td><code>min</code><code>number</code></td>
                        <td>The minimum value.</td>
                    </tr>
                    <tr>
                        <td><code>status</code><code>string</code></td>
                        <td>The status message that is shown below the progress bar.</td>
                    </tr>
                    <tr>
                        <td><code>value</code><code>number</code></td>
                        <td>The current value.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>

        <ApiSection title="Examples">
            <ApiExample
                :code="basicCode"
                :component="basic"
                title="Basic"
                description="A basic progress bar with nothing much going on."/>

            <ApiExample
                :code="statusCode"
                :component="status"
                title="Status"
                description="An optional status message can be shown, that will also show the percentage."/>

            <ApiExample
                :code="indeterminateCode"
                :component="indeterminate"
                title="Indetermiante"
                description="A state of the progress bar where a process is not yet available."/>

            <ApiExample
                :code="completeCode"
                :component="complete"
                title="Complete"
                description="Complete example of what the progress bar can do."/>

            <ApiExample
                :code="snackbarCode"
                :component="snackbar"
                title="Snackbar"
                description="Progress bars can also be used within snackbars."/>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormField, FluxPane, FluxPaneBody, FluxProgressBar, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiExample, ApiSection, PageTitle, Preview } from '@docs/components';
    import basic from '@docs/code/components/progressBar/basic.vue';
    import basicCode from '@docs/code/components/progressBar/basic.vue?raw';
    import complete from '@docs/code/components/progressBar/complete.vue';
    import completeCode from '@docs/code/components/progressBar/complete.vue?raw';
    import indeterminate from '@docs/code/components/progressBar/indeterminate.vue';
    import indeterminateCode from '@docs/code/components/progressBar/indeterminate.vue?raw';
    import snackbar from '@docs/code/components/progressBar/snackbar.vue';
    import snackbarCode from '@docs/code/components/progressBar/snackbar.vue?raw';
    import status from '@docs/code/components/progressBar/status.vue';
    import statusCode from '@docs/code/components/progressBar/status.vue?raw';
</script>
