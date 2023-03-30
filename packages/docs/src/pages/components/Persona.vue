<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Persona"/>

        <preview>
            <flux-pane style="width: 60%">
                <flux-pane-body>
                    <flux-stack axis="horizontal">
                        <flux-persona
                            avatar-alt="Bas"
                            :avatar-size="42"
                            avatar-url="https://imgproxy.glybe.nl/120,q75,jpg/1-b38d42e52f851f0ec94d118fad965277e3915b89da1012cef7e58674e3cf219a-img1386.jpeg"
                            name="Bas Milius"
                            title="Flux Engineer"/>

                        <flux-persona
                            avatar-alt="Bas"
                            :avatar-size="42"
                            avatar-url="https://imgproxy.glybe.nl/120,q75,jpg/1-b38d42e52f851f0ec94d118fad965277e3915b89da1012cef7e58674e3cf219a-img1386.jpeg"
                            is-compact
                            name="Bas Milius"
                            title="Flux Engineer"/>
                    </flux-stack>
                </flux-pane-body>
            </flux-pane>
        </preview>

        <section>
            <p>
                The Persona component is a versatile Vue component that combines an avatar, name, and title to provide
                a complete representation of a user or other entity. With the ability to display an image, initials, or
                an icon, the avatar portion of the component is fully customizable and can be adapted to suit your
                specific needs. The name and title fields are also customizable and can be used to display any relevant
                information about the entity being represented.
            </p>

            <p><br/></p>
            <h2>API</h2>

            <api-table title="Props">
                <template #body>
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
            </api-table>

            <api-table title="Emits">
                <template #body>
                    <tr>
                        <td><code>click</code><code>(evt: MouseEvent): void;</code></td>
                        <td>Triggered when the persona is clicked.</td>
                    </tr>
                </template>
            </api-table>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneBody, FluxPersona, FluxStack } from '@fancee/flux';
    import { ApiTable, PageTitle, Preview } from '@/components';
</script>
