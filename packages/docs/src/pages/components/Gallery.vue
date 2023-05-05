<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Gallery"/>

        <Preview>
            <FluxPane style="width: 50%">
                <FluxPaneBody>
                    <FluxGallery>
                        <FluxGalleryItem url="https://staging.fanc.ee/uploads/shops/headers/bh40dmg5.uwr.jpg"/>
                        <FluxGalleryItem url="https://staging.fanc.ee/uploads/shops/headers/vocrmejv.5mm.jpg"/>
                        <FluxGalleryItem url="https://staging.fanc.ee/uploads/shops/headers/q5mvww5g.2lu.jpg"/>
                        <FluxGalleryItem url="https://staging.fanc.ee/uploads/shops/headers/bh40dmg5.uwr.jpg"/>
                        <FluxGalleryItem url="https://staging.fanc.ee/uploads/shops/headers/vocrmejv.5mm.jpg"/>
                        <FluxGalleryItem url="https://staging.fanc.ee/uploads/shops/headers/q5mvww5g.2lu.jpg"/>
                    </FluxGallery>
                </FluxPaneBody>
            </FluxPane>
        </Preview>

        <ApiSection>
            <p>
                The Gallery component is used to display multiple media entities in a grid. It also allows the user
                to upload new media to it and control them further.
            </p>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponents>
                <tr>
                    <td><code>FluxGallery</code></td>
                    <td>The gallery itself.</td>
                </tr>
                <tr>
                    <td><code>FluxGalleryItem</code></td>
                    <td>A single item within the gallery.</td>
                </tr>
            </ApiComponents>

            <ApiComponent name="Gallery">
                <template #props>
                    <tr>
                        <td><code>is-editable</code><code>boolean</code></td>
                        <td>Allows the gallery to be edited, this also includes uploading new images.</td>
                    </tr>
                    <tr>
                        <td><code>items</code><code>string[]</code></td>
                        <td>Urls of images within the gallery.</td>
                    </tr>
                    <tr>
                        <td><code>pending-items</code><code>string[]</code></td>
                        <td>Urls of pending images within the gallery.</td>
                    </tr>
                </template>

                <template #emits>
                    <tr>
                        <td><code>delete</code><code>(index: number): void;</code></td>
                        <td>Triggered when an item within the gallery is being removed.</td>
                    </tr>
                    <tr>
                        <td><code>upload</code><code>(files: File[]): void;</code></td>
                        <td>Triggered when new images have been uploads by the user.</td>
                    </tr>
                </template>

                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>Allows custom gallery items to be placed without items and pending-items.</td>
                    </tr>
                </template>
            </ApiComponent>

            <ApiComponent name="GalleryItem">
                <template #props>
                    <tr>
                        <td><code>is-deletable</code><code>boolean</code></td>
                        <td>Allows the gallery item to be deleted by the user.</td>
                    </tr>
                    <tr>
                        <td><code>is-pending</code><code>boolean</code></td>
                        <td>Indicates that the gallery item is not ready yet. For example while uploading.</td>
                    </tr>
                    <tr>
                        <td><code>url</code><code>string</code></td>
                        <td>The source of the image in the gallery item.</td>
                    </tr>
                </template>

                <template #emits>
                    <tr>
                        <td><code>delete</code><code>(): void;</code></td>
                        <td>Triggered when the remove button within the gallery item is clicked.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxGallery, FluxGalleryItem, FluxPane, FluxPaneBody, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiComponents, ApiSection, PageTitle, Preview } from '@/components';
</script>
