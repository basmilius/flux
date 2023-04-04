<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Comment"/>

        <preview>
            <flux-pane>
                <flux-pane-body :gap="30">
                    <flux-comment is-flipped/>
                    <flux-comment is-received/>
                </flux-pane-body>
            </flux-pane>
        </preview>

        <api-section>
            <p>
                A FluxComment can be used to display an user generated message. It displays an avatar, period and
                the message itself. The component can also be used within chat interfaces and have a received state.
            </p>
        </api-section>

        <api-section title="API">
            <api-component name="Comment">
                <template #props>
                    <tr>
                        <td><code>is-flipped</code><code>boolean</code></td>
                        <td>Flips the contents of the comment.</td>
                    </tr>
                    <tr>
                        <td><code>is-received</code><code>boolean</code></td>
                        <td>Indicates that the comment is received.</td>
                    </tr>
                </template>
            </api-component>
        </api-section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxComment, FluxPane, FluxPaneBody, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiSection, PageTitle, Preview } from '@/components';
</script>
