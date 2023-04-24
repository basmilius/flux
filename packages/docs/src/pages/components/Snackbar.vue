<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Snackbar"/>

        <preview>
            <flux-stack
                :gap="15"
                style="width: 420px">
                <flux-snackbar
                    color="success"
                    icon="circle-check"
                    message="Your profile details are saved."
                    title="Saved"
                    is-rendered/>

                <flux-snackbar
                    :actions="{view: 'Review'}"
                    color="warning"
                    icon="circle-exclamation"
                    message="Our terms of service have been updated. Review to continue."
                    title="Updated Terms of Service"
                    is-rendered/>

                <flux-snackbar
                    :actions="{update: 'Update', close: 'Close'}"
                    icon="circle-arrow-up"
                    message="A new version of WeAreFancee is available. Would you like to update?"
                    title="Update available"
                    is-rendered/>
            </flux-stack>
        </preview>

        <api-section>
            <p>
                A snackbar can be used to inform the user about a task that the system performed or will perform in the
                future. Snackbars can contain actions that the user may choose.
            </p>
        </api-section>

        <api-section title="Required icons">
            <api-required-icons :icons="['xmark']"/>
        </api-section>

        <api-section title="API">
            <api-components>
                <tr>
                    <td><code>FluxSnackbar</code></td>
                    <td>A single snackbar.</td>
                </tr>
                <tr>
                    <td><code>FluxSnackbarProvider</code></td>
                    <td>Component that renders global snackbars.</td>
                </tr>
            </api-components>

            <api-component name="Snackbar">
                <template #props>
                    <tr>
                        <td><code>actions</code><code>Record&lt;string, string&gt;</code></td>
                        <td>Available actions for the user.</td>
                    </tr>
                    <tr>
                        <td><code>color</code><code>'primary' | 'danger' | 'info' | 'success' | 'warning'</code></td>
                        <td>The color of the snackbar.</td>
                    </tr>
                    <tr>
                        <td><code>icon</code><code>IconNames</code></td>
                        <td>The icon to of the snackbar.</td>
                    </tr>
                    <tr>
                        <td><code>is-closeable</code><code>boolean</code></td>
                        <td>Indicates that the snackbar should be closeable.</td>
                    </tr>
                    <tr>
                        <td><code>is-loading</code><code>boolean</code></td>
                        <td>Indicates that the snackbar has a loading state.</td>
                    </tr>
                    <tr>
                        <td><code>is-rendered</code><code>boolean</code></td>
                        <td>Render the snackbar inline instead of globally.</td>
                    </tr>
                    <tr>
                        <td><code>message</code><code>string</code></td>
                        <td>Message within the snackbar.</td>
                    </tr>
                    <tr>
                        <td><code>sub-message</code><code>string</code></td>
                        <td>Sub message within the snackbar.</td>
                    </tr>
                    <tr>
                        <td><code>title</code><code>string</code></td>
                        <td>Title within the snackbar.</td>
                    </tr>
                </template>
            </api-component>
        </api-section>

        <api-section title="Examples">
            <api-example
                :code="globalCode"
                :component="global"
                title="Global"
                description="Snackbars are rendered globally by default."/>

            <api-example
                :code="apiCode"
                :component="api"
                title="API"
                description="Snackbars can also be shown from code, with a duration."/>

            <api-example
                :code="actionsCode"
                :component="actions"
                title="Actions"
                description="Snackbars can also display actions that the user can perform."/>

            <api-example
                :code="localCode"
                :component="local"
                title="Local"
                description="Instead of rendering snackbars globally, they can also render inline."/>
        </api-section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxSnackbar, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiComponents, ApiExample, ApiRequiredIcons, ApiSection, PageTitle, Preview } from '@/components';
    import actions from '@/code/components/snackbar/actions.vue';
    import actionsCode from '@/code/components/snackbar/actions.vue?raw';
    import api from '@/code/components/snackbar/api.vue';
    import apiCode from '@/code/components/snackbar/api.vue?raw';
    import global from '@/code/components/snackbar/global.vue';
    import globalCode from '@/code/components/snackbar/global.vue?raw';
    import local from '@/code/components/snackbar/local.vue';
    import localCode from '@/code/components/snackbar/local.vue?raw';
</script>
