<template>
    <FluxStack>
        <page-title
            section="Components"
            title="Avatar"/>

        <Preview>
            <FluxPane style="width: 60%">
                <FluxPaneBody>
                    <FluxStack
                        axis="horizontal"
                        :gap="18"
                        is-centered
                        is-wrapping>
                        <FluxAvatar
                            alt="Bas"
                            :size="42"
                            status="success"
                            url="/images/bas.jpg"/>

                        <FluxAvatar
                            alt="Bas"
                            fallback-initials="BM"
                            :size="42"
                            status="danger"/>

                        <FluxAvatar
                            alt="Bas"
                            fallback="neutral"
                            fallback-initials="BM"
                            :size="42"/>

                        <FluxAvatar
                            alt="Bas"
                            :size="42"/>

                        <FluxAvatar
                            alt="Bas"
                            fallback="neutral"
                            :size="42"/>
                    </FluxStack>
                </FluxPaneBody>
            </FluxPane>
        </Preview>

        <ApiSection>
            <p>
                The Avatar component is a reusable UI element that can display an image, initials, or an icon. It accepts
                props for each of these options and dynamically displays the appropriate content based on what is passed
                in. This component can be used to represent a user or any other entity in a system that requires a
                visual representation.
            </p>
        </ApiSection>

        <ApiSection title="Required icons">
            <ApiRequiredIcons :icons="['user']"/>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponent name="Avatar">
                <template #props>
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
                        <td><code>status</code><code>'gray' | 'primary' | 'danger' | 'info' | 'success' | 'warning'</code></td>
                        <td>The color of the status indicator of the avatar.</td>
                    </tr>
                    <tr>
                        <td><code>url</code><code>string</code></td>
                        <td>URL to the image displayed within the avatar.</td>
                    </tr>
                </template>

                <template #emits>
                    <tr>
                        <td><code>click</code><code>(evt: MouseEvent): void;</code></td>
                        <td>Triggered when the avatar is clicked.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxAvatar, FluxPane, FluxPaneBody, FluxStack } from '@basmilius/flux';
    import { ApiComponent, ApiRequiredIcons, ApiSection, PageTitle, Preview } from '@/components';
</script>
