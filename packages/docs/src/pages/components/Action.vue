<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Action"/>

        <Preview>
            <FluxPane>
                <FluxPaneBody>
                    <FluxActions>
                        <FluxAction
                            destructive
                            icon="circle-xmark"/>

                        <FluxAction icon="circle-sort"/>

                        <FluxAction icon="circle-minus"/>
                    </FluxActions>
                </FluxPaneBody>
            </FluxPane>
        </Preview>

        <ApiSection>
            <p>
                Actions can be used to add functionality to for example data tables. They can navigate to another view
                or perform an in-page action, like a share overlay.
            </p>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponent name="Action">
                <template #props>
                    <tr>
                        <td><code>destructive</code><code>boolean</code></td>
                        <td>Indicates that the action should be a destructive action.</td>
                    </tr>
                    <tr>
                        <td><code>disabled</code><code>boolean</code></td>
                        <td>Indicates that the action should be disabled.</td>
                    </tr>
                    <tr>
                        <td><code>icon</code><code>IconNames</code></td>
                        <td>The icon that is used.</td>
                    </tr>
                    <tr>
                        <td><code>is-loading</code><code>boolean</code></td>
                        <td>Sets a loading state to the action. This also disables it. The spinner will replace the icon used in the action.</td>
                    </tr>
                    <tr>
                        <td><code>label</code><code>string</code></td>
                        <td>The label displayed within the action.</td>
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
                        <td>Triggered when the action is clicked.</td>
                    </tr>
                    <tr>
                        <td><code>mouseenter</code><code>(evt: MouseEvent): void;</code></td>
                        <td>Triggered when the cursor enters the action.</td>
                    </tr>
                    <tr>
                        <td><code>mouseleave</code><code>(evt: MouseEvent): void;</code></td>
                        <td>Triggered when the cursor leaves the action.</td>
                    </tr>
                </template>
            </ApiComponent>

            <ApiComponent name="Actions">
                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>The actions within the action group.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxAction, FluxActions, FluxPane, FluxPaneBody, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiSection, PageTitle, Preview } from '@/components';
</script>
