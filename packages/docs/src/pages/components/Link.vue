<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Link"/>

        <Preview>
            <FluxLink label="Link button"/>
        </Preview>

        <ApiSection>
            <p>
                <em>Todo</em>
            </p>
        </ApiSection>

        <ApiSection title="Required icons">
            <ApiRequiredIcons :icons="['arrow-right-long']"/>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponent name="Link">
                <template #props>
                    <tr>
                        <td><code>disabled</code><code>boolean</code></td>
                        <td>Indicates that the link should be disabled.</td>
                    </tr>
                    <tr>
                        <td><code>icon</code><code>IconNames</code></td>
                        <td>The icon that is used as a prefix.</td>
                    </tr>
                    <tr>
                        <td><code>label</code><code>string</code></td>
                        <td>The label displayed within the link.</td>
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
                        <td><code>type</code><code>'link' | 'link' | 'route'</code></td>
                        <td>The type of link changes how the link handles a click.</td>
                    </tr>
                </template>

                <template #emits>
                    <tr>
                        <td><code>click</code><code>(evt: MouseEvent): void;</code></td>
                        <td>Triggered when the link is clicked.</td>
                    </tr>
                    <tr>
                        <td><code>mouseenter</code><code>(evt: MouseEvent): void;</code></td>
                        <td>Triggered when the cursor enters the link.</td>
                    </tr>
                    <tr>
                        <td><code>mouseleave</code><code>(evt: MouseEvent): void;</code></td>
                        <td>Triggered when the cursor leaves the link.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxLink, FluxStack } from '@basmilius/flux';
    import { ApiComponent, ApiRequiredIcons, ApiSection, PageTitle, Preview } from '@/components';
</script>
