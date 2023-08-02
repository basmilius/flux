<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Button"/>

        <Preview>
            <FluxButtonStack>
                <FluxPrimaryButton
                    icon-before="circle-check"
                    label="Save"/>

                <FluxSecondaryButton
                    icon-after="ellipsis-h"
                    label="More"/>

                <FluxDestructiveButton
                    icon-before="circle-exclamation"
                    label="Delete"/>

                <FluxPublishButton
                    is-loading
                    label="Publishing"/>
            </FluxButtonStack>
        </Preview>

        <ApiSection>
            <p>
                Buttons are clickable elements that have an action behind it. They can be used to start a new flow,
                alter an existing one or perform actions. When designing your interface, prioritize the placement and
                design of primary buttons to ensure that they are easy to find and use, and that they clearly
                communicate the purpose of the action.
            </p>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponents>
                <tr>
                    <td><code>FluxDestructiveButton</code></td>
                    <td>Destructive actions, such as deleting or disabling something. For example: A trash button that removes a single row from a table.</td>
                </tr>
                <tr>
                    <td><code>FluxPrimaryButton</code></td>
                    <td>Primary actions on the page, such as saving something or starting a new flow. For example: Saving a profile.</td>
                </tr>
                <tr>
                    <td><code>FluxPublishButton</code></td>
                    <td>When the content that is edited can be published. For example: A user wants to publish a new blog post, the button can be used here.</td>
                </tr>
                <tr>
                    <td><code>FluxSecondaryButton</code></td>
                    <td>Generally speaking, for all other types of buttons. Keep in mind that not everything needs to be a button, liks will also do sometimes.</td>
                </tr>
            </ApiComponents>

            <ApiComponent name="Button">
                <template #props>
                    <tr>
                        <td><code>disabled</code><code>boolean</code></td>
                        <td>Indicates that the button should be disabled.</td>
                    </tr>
                    <tr>
                        <td><code>icon-after</code><code>IconNames</code></td>
                        <td>The icon that is used as a suffix.</td>
                    </tr>
                    <tr>
                        <td><code>icon-before</code><code>IconNames</code></td>
                        <td>The icon that is used as a prefix.</td>
                    </tr>
                    <tr>
                        <td><code>is-done</code><code>boolean</code></td>
                        <td>Indicates that the publishing task has completed. Only for FluxPublishButton.</td>
                    </tr>
                    <tr>
                        <td><code>is-loading</code><code>boolean</code></td>
                        <td>Sets a loading state to the button. This also disables it. The spinner will replace the icon used in the button.</td>
                    </tr>
                    <tr>
                        <td><code>is-submit</code><code>boolean</code></td>
                        <td>Indicates that the button is used as a submit button for a form.</td>
                    </tr>
                    <tr>
                        <td><code>label</code><code>string</code></td>
                        <td>The label displayed within the button.</td>
                    </tr>
                    <tr>
                        <td><code>size</code><code>'small' | 'medium' | 'large'</code></td>
                        <td>The size of the button.</td>
                    </tr>
                    <tr>
                        <td><code>href</code><code>string</code></td>
                        <td>HTMLAnchorElement.href</td>
                    </tr>
                    <tr>
                        <td><code>rel</code><code>string</code></td>
                        <td>HTMLAnchorElement.rel</td>
                    </tr>
                    <tr>
                        <td><code>target</code><code>string</code></td>
                        <td>HTMLAnchorElement.target</td>
                    </tr>
                    <tr>
                        <td><code>to</code><code>FluxRoutingLocation</code></td>
                        <td>A routing location, same as vue-router.</td>
                    </tr>
                    <tr>
                        <td><code>type</code><code>'button' | 'link' | 'route'</code></td>
                        <td>The type of button changes how the button handles a click.</td>
                    </tr>
                </template>

                <template #emits>
                    <tr>
                        <td><code>click</code><code>(evt: MouseEvent): void;</code></td>
                        <td>Triggered when the button is clicked.</td>
                    </tr>
                    <tr>
                        <td><code>mouseenter</code><code>(evt: MouseEvent): void;</code></td>
                        <td>Triggered when the cursor enters the button.</td>
                    </tr>
                    <tr>
                        <td><code>mouseleave</code><code>(evt: MouseEvent): void;</code></td>
                        <td>Triggered when the cursor leaves the button.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>

        <ApiSection title="Examples">
            <ApiExample
                :code="primaryCode"
                :component="primary"
                title="Primary"
                description="Primary buttons can be used for tasks such as saving."/>

            <ApiExample
                :code="secondaryCode"
                :component="secondary"
                title="Secondary"
                description="Secondary buttons can be used in situations that are not covered by other buttons."/>

            <ApiExample
                :code="destructiveCode"
                :component="destructive"
                title="Destructive"
                description="Destructive buttons can be used for destructive actions such as deleting something."/>

            <ApiExample
                :code="publishCode"
                :component="publish"
                title="Publish"
                description="Publish buttons can be used in situations where the user can publish something."/>

            <ApiExample
                :code="sizesCode"
                :component="sizes"
                title="Sizes"
                description="Buttons can have three different sizes."/>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxDestructiveButton, FluxPrimaryButton, FluxPublishButton, FluxSecondaryButton, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiComponents, ApiExample, ApiSection, PageTitle, Preview } from '@docs/components';
    import primary from '@docs/code/components/button/primary.vue';
    import primaryCode from '@docs/code/components/button/primary.vue?raw';
    import secondary from '@docs/code/components/button/secondary.vue';
    import secondaryCode from '@docs/code/components/button/secondary.vue?raw';
    import destructive from '@docs/code/components/button/destructive.vue';
    import destructiveCode from '@docs/code/components/button/destructive.vue?raw';
    import publish from '@docs/code/components/button/publish.vue';
    import publishCode from '@docs/code/components/button/publish.vue?raw';
    import sizes from '@docs/code/components/button/sizes.vue';
    import sizesCode from '@docs/code/components/button/sizes.vue?raw';
</script>
