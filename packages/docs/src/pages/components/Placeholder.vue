<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Placeholder"/>

        <preview>
            <flux-pane style="width: 75%">
                <flux-pane-body>
                    <flux-placeholder
                        icon="rectangle-history"
                        title="Header"
                        message="Upload a few images to use as the shop header.">
                        <flux-secondary-button label="Upload"/>
                    </flux-placeholder>
                </flux-pane-body>
            </flux-pane>
        </preview>

        <api-section>
            <p>
                A Placeholder is used for situations where the user should provide content, but it hasn't already. This
                component will display the steps the user has to take.
            </p>
        </api-section>

        <api-section title="API">
            <api-component name="Placeholder">
                <template #props>
                    <tr>
                        <td><code>icon</code><code>IconNames</code></td>
                        <td>The icon used within th eplaceholder..</td>
                    </tr>
                    <tr>
                        <td><code>is-button</code><code>boolean</code></td>
                        <td>Controls if the placeholder is a button.</td>
                    </tr>
                    <tr>
                        <td><code>message</code><code>string</code></td>
                        <td>Message within the placeholder.</td>
                    </tr>
                    <tr>
                        <td><code>title</code><code>string</code></td>
                        <td>Title within the placeholder.</td>
                    </tr>
                    <tr>
                        <td><code>variant</code><code>'extended' | 'simple' | 'small'</code></td>
                        <td>Placeholder variant. Only the extended placeholder may contain buttons.</td>
                    </tr>
                </template>

                <template #emits>
                    <tr>
                        <td><code>click</code><code>(evt: MouseEvent): void;</code></td>
                        <td>Triggered when the placeholder is clicked.</td>
                    </tr>
                </template>
            </api-component>
        </api-section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneBody, FluxPlaceholder, FluxSecondaryButton, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiSection, PageTitle, Preview } from '@/components';
</script>
