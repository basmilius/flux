<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Remove"/>

        <preview>
            <flux-aspect-ratio :aspect-ratio="1">
                <flux-pane style="width: 72px">
                    <flux-pane-body>
                        <flux-remove/>
                    </flux-pane-body>
                </flux-pane>
            </flux-aspect-ratio>
        </preview>

        <api-section>
            <p>
                Our Remove component is a simple and intuitive Vue component that allows users to easily remove other
                components within a larger system. With a single button and a clear "X" icon, users can quickly and
                easily remove components with a single click.
            </p>
        </api-section>

        <api-section title="API">
            <api-component name="Remove">
                <template #props>
                    <tr>
                        <td><code>icon</code><code>IconNames</code></td>
                        <td>A custom icon for the remove button.</td>
                    </tr>
                    <tr>
                        <td><code>is-hidden</code><code>boolean</code></td>
                        <td>Controls that the remove button is hidden or not.</td>
                    </tr>
                </template>

                <template #emits>
                    <tr>
                        <td><code>click</code><code>(evt: MouseEvent): void;</code></td>
                        <td>Triggered when the button is clicked.</td>
                    </tr>
                </template>
            </api-component>
        </api-section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxAspectRatio, FluxPane, FluxPaneBody, FluxRemove, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiSection, PageTitle, Preview } from '@/components';
</script>
