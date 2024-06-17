<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Comment"/>

        <Preview>
            <FluxPane>
                <FluxPaneBody :gap="30">
                    <FluxComment
                        avatar-url="/images/bas.jpg"
                        is-flipped
                        name="Bas Milius"
                        period="13:04">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aut blanditiis consectetur doloribus earum, eos expedita magnam necessitatibus officia perferendis possimus praesentium quisquam repellendus rerum sequi totam vel voluptas voluptatem.</p>
                    </FluxComment>

                    <FluxComment
                        avatar-fallback-initials="BM"
                        is-received
                        name="Bas Milius"
                        period="13:37">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consectetur consequuntur dolores facilis, incidunt qui quia voluptatum. Ea facilis harum hic, laborum quo reiciendis voluptates! Ex excepturi nemo suscipit totam.</p>
                    </FluxComment>
                </FluxPaneBody>
            </FluxPane>
        </Preview>

        <ApiSection>
            <p>
                A FluxComment can be used to display an user generated message. It displays an avatar, period and
                the message itself. The component can also be used within chat interfaces and have a received state.
            </p>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponent name="Comment">
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
                        <td><code>avatar-url</code><code>string</code></td>
                        <td>URL to the image displayed within the avatar.</td>
                    </tr>
                    <tr>
                        <td><code>is-flipped</code><code>boolean</code></td>
                        <td>Flips the contents of the comment.</td>
                    </tr>
                    <tr>
                        <td><code>is-received</code><code>boolean</code></td>
                        <td>Indicates that the comment is received.</td>
                    </tr>
                    <tr>
                        <td><code>name</code><code>string</code></td>
                        <td>Name of the author of the comment.</td>
                    </tr>
                    <tr>
                        <td><code>period</code><code>string</code></td>
                        <td>Period the comment was placed.</td>
                    </tr>
                </template>

                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>Contents of the comment.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxComment, FluxPane, FluxPaneBody, FluxStack } from '@basmilius/flux';
    import { ApiComponent, ApiSection, PageTitle, Preview } from '@docs/components';
</script>
