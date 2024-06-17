<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Icon"/>

        <Preview>
            <FluxStack
                is-centered
                :gap="72">
                <FluxStack
                    axis="horizontal"
                    :gap="15">
                    <FluxIcon variant="check-circle"/>
                    <FluxIcon variant="lock"/>
                    <FluxIcon variant="circle-exclamation"/>
                    <FluxIcon variant="plus"/>
                    <FluxIcon variant="xmark"/>
                </FluxStack>

                <FluxStack
                    axis="horizontal"
                    :gap="15">
                    <FluxBoxedIcon variant="check-circle"/>
                    <FluxBoxedIcon variant="lock"/>
                    <FluxBoxedIcon variant="circle-exclamation"/>
                    <FluxBoxedIcon variant="plus"/>
                    <FluxBoxedIcon variant="xmark"/>
                </FluxStack>
            </FluxStack>
        </Preview>

        <ApiSection>
            <p>
                A component to display a single <a
                href="https://fontawesome.com"
                rel="noopener"
                target="_blank">Font Awesome</a> icon. The
                icon can be customized through css and is used in multiple Flux components, such as Buttons.
            </p>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponents>
                <tr>
                    <td><code>FluxIcon</code></td>
                    <td>Renders the SVG code of the icon.</td>
                </tr>
                <tr>
                    <td><code>FluxBoxedIcon</code></td>
                    <td>Renders the icon within a box.</td>
                </tr>
            </ApiComponents>

            <ApiComponent name="Icon">
                <template #props>
                    <tr>
                        <td><code>size</code><code>number</code></td>
                        <td>Size of the icon in pixels.</td>
                    </tr>
                    <tr>
                        <td><code>variant</code><code>IconNames</code></td>
                        <td>The icon to use.</td>
                    </tr>
                </template>

                <template #emits>
                    <tr>
                        <td><code>click</code><code>(evt: MouseEvent): void;</code></td>
                        <td>Triggered when the icon is clicked.</td>
                    </tr>
                </template>
            </ApiComponent>

            <ApiComponent name="BoxedIcon">
                <template #props>
                    <tr>
                        <td><code>size</code><code>number</code></td>
                        <td>Size of the icon in pixels.</td>
                    </tr>
                    <tr>
                        <td><code>variant</code><code>IconNames</code></td>
                        <td>The icon to use.</td>
                    </tr>
                </template>

                <template #emits>
                    <tr>
                        <td><code>click</code><code>(evt: MouseEvent): void;</code></td>
                        <td>Triggered when the icon is clicked.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxBoxedIcon, FluxIcon, FluxStack } from '@basmilius/flux';
    import { ApiComponent, ApiComponents, ApiSection, PageTitle, Preview } from '@docs/components';
</script>
