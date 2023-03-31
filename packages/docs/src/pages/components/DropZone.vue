<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Drop zone"/>

        <preview>
            <flux-pane>
                <flux-pane-body>
                    <flux-drop-zone
                        accept="image/*"
                        is-empty
                        is-multiple
                        placeholder-icon="rectangle-history"
                        placeholder-button="Upload"
                        placeholder-message="Place a file here to upload..."
                        placeholder-title="Header"/>
                </flux-pane-body>
            </flux-pane>
        </preview>

        <api-section>
            <p>
                Allows files to be dropped on the contents of the drop zone. This is mainly used in ui
                elements that allow users to upload files. It can be used in combination with FluxGallery
                for example.
            </p>
        </api-section>

        <api-section title="API">
            <api-component name="DropZone">
                <template #props>
                    <tr>
                        <td><code>accept</code><code>string</code></td>
                        <td>Which files to accept, same as the accept attribute on input[type=file].</td>
                    </tr>
                    <tr>
                        <td><code>is-disabled</code><code>boolean</code></td>
                        <td>Wether the drop zone is disabled.</td>
                    </tr>
                    <tr>
                        <td><code>is-empty</code><code>boolean</code></td>
                        <td>Wether the placeholder should be shown.</td>
                    </tr>
                    <tr>
                        <td><code>is-multiple</code><code>boolean</code></td>
                        <td>If it's allowed to upload multiple files.</td>
                    </tr>
                    <tr>
                        <td><code>placeholder-button</code><code>string</code></td>
                        <td>The text on the button within the placeholder.</td>
                    </tr>
                    <tr>
                        <td><code>placeholder-icon</code><code>IconNames</code></td>
                        <td>The icon of the placeholder.</td>
                    </tr>
                    <tr>
                        <td><code>placeholder-message</code><code>string</code></td>
                        <td>The message of the placeholder.</td>
                    </tr>
                    <tr>
                        <td><code>placeholder-title</code><code>string</code></td>
                        <td>The title of the placeholder.</td>
                    </tr>
                </template>

                <template #emits>
                    <tr>
                        <td><code>select</code><code>(files: FileList): void</code></td>
                        <td>Triggered when files are dropped or selected.</td>
                    </tr>
                </template>

                <template #slots>
                    <tr>
                        <td><code>default</code><code>{ isDragging: boolean; isDraggingOver: boolean; showPicker: Function; }</code></td>
                        <td>Contents of the drop zone.</td>
                    </tr>
                </template>
            </api-component>
        </api-section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxDropZone, FluxPane, FluxPaneBody, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiSection, PageTitle, Preview } from '@/components';
</script>
