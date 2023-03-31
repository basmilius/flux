<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Avatar"/>

        <preview>
            <flux-pane style="width: 60%">
                <flux-pane-body>
                    <flux-stack
                        axis="horizontal"
                        :gap="18"
                        is-centered
                        is-wrapping>
                        <flux-avatar
                            alt="Bas"
                            :size="42"
                            url="https://imgproxy.glybe.nl/120,q75,jpg/1-b38d42e52f851f0ec94d118fad965277e3915b89da1012cef7e58674e3cf219a-img1386.jpeg"/>

                        <flux-avatar
                            alt="Bas"
                            fallback-initials="BM"
                            :size="42"/>

                        <flux-avatar
                            alt="Bas"
                            fallback="neutral"
                            fallback-initials="BM"
                            :size="42"/>

                        <flux-avatar
                            alt="Bas"
                            :size="42"/>

                        <flux-avatar
                            alt="Bas"
                            fallback="neutral"
                            :size="42"/>
                    </flux-stack>
                </flux-pane-body>
            </flux-pane>
        </preview>

        <api-section>
            <p>
                The Avatar component is a reusable UI element that can display an image, initials, or an icon. It accepts
                props for each of these options and dynamically displays the appropriate content based on what is passed
                in. This component can be used to represent a user or any other entity in a system that requires a
                visual representation.
            </p>
        </api-section>

        <api-section title="API">
            <api-table title="Props">
                <template #body>
                    <tr>
                        <td><code>alt</code><code>string</code></td>
                        <td>A brief description of the avatar.</td>
                    </tr>
                    <tr>
                        <td><code>fallback</code><code>'colorized' | 'neutral'</code></td>
                        <td>Which fallback type to use. A colorized fallback displays a random color based on the content.</td>
                    </tr>
                    <tr>
                        <td><code>fallback-icon</code><code>IconNames</code></td>
                        <td>Fallback icon, when no url or initials are given.</td>
                    </tr>
                    <tr>
                        <td><code>fallback-initials</code><code>string</code></td>
                        <td>The initials to use within the fallback.</td>
                    </tr>
                    <tr>
                        <td><code>is-clickable</code><code>boolean</code></td>
                        <td>Controls if the avatar is clickable.</td>
                    </tr>
                    <tr>
                        <td><code>size</code><code>number</code></td>
                        <td>The size of the avatar.</td>
                    </tr>
                    <tr>
                        <td><code>url</code><code>string</code></td>
                        <td>URL to the image displayed within the avatar.</td>
                    </tr>
                </template>
            </api-table>

            <api-table title="Emits">
                <template #body>
                    <tr>
                        <td><code>click</code><code>(evt: MouseEvent): void;</code></td>
                        <td>Triggered when the avatar is clicked.</td>
                    </tr>
                </template>
            </api-table>
        </api-section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxAvatar, FluxPane, FluxPaneBody, FluxStack } from '@fancee/flux';
    import { ApiSection, ApiTable, PageTitle, Preview } from '@/components';
</script>
