<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Persona"/>

        <Preview>
            <FluxPane style="width: 60%">
                <FluxPaneBody>
                    <FluxStack axis="horizontal">
                        <FluxPersona
                            avatar-alt="Bas"
                            :avatar-size="42"
                            avatar-url="/images/bas.jpg"
                            name="Bas Milius"
                            title="Flux Engineer"/>

                        <FluxSpacer/>

                        <FluxPersona
                            avatar-alt="Bas"
                            :avatar-size="42"
                            avatar-url="/images/bas.jpg"
                            is-compact
                            name="Bas Milius"
                            title="Flux Engineer"/>
                    </FluxStack>
                </FluxPaneBody>
            </FluxPane>
        </Preview>

        <ApiSection>
            <p>
                The Persona component is a versatile Vue component that combines an avatar, name, and title to provide
                a complete representation of a user or other entity. With the ability to display an image, initials, or
                an icon, the avatar portion of the component is fully customizable and can be adapted to suit your
                specific needs. The name and title fields are also customizable and can be used to display any relevant
                information about the entity being represented.
            </p>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponent name="Persona">
                <template #props>
                    <tr>
                        <td><code>avatar-alt</code><code>string</code></td>
                        <td>A brief description of the avatar.</td>
                    </tr>
                    <tr>
                        <td><code>avatar-fallback</code><code>'colorized' | 'neutral'</code></td>
                        <td>Which fallback type to use. A colorized fallback displays a random color based on the content.</td>
                    </tr>
                    <tr>
                        <td><code>avatar-fallback-icon</code><code>IconNames</code></td>
                        <td>Fallback icon, when no url or initials are given.</td>
                    </tr>
                    <tr>
                        <td><code>avatar-fallback-initials</code><code>string</code></td>
                        <td>The initials to use within the fallback.</td>
                    </tr>
                    <tr>
                        <td><code>avatar-size</code><code>number</code></td>
                        <td>The size of the avatar.</td>
                    </tr>
                    <tr>
                        <td><code>avatar-url</code><code>string</code></td>
                        <td>URL to the image displayed within the avatar.</td>
                    </tr>
                    <tr>
                        <td><code>is-compact</code><code>boolean</code></td>
                        <td>Use the compact version of the persona.</td>
                    </tr>
                    <tr>
                        <td><code>name</code><code>string</code></td>
                        <td>Name of the entity in the persona.</td>
                    </tr>
                    <tr>
                        <td><code>title</code><code>string</code></td>
                        <td>Title of the entity in the persona.</td>
                    </tr>
                </template>

                <template #emits>
                    <tr>
                        <td><code>click</code><code>(evt: MouseEvent): void;</code></td>
                        <td>Triggered when the persona is clicked.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneBody, FluxPersona, FluxSpacer, FluxStack } from '@basmilius/flux';
    import { ApiComponent, ApiSection, PageTitle, Preview } from '@/components';
</script>
