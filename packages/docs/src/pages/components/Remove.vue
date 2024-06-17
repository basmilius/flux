<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Remove"/>

        <Preview>
            <FluxAspectRatio :aspect-ratio="1">
                <FluxPane style="width: 72px">
                    <FluxPaneBody>
                        <FluxRemove/>
                    </FluxPaneBody>
                </FluxPane>
            </FluxAspectRatio>
        </Preview>

        <ApiSection>
            <p>
                Our Remove component is a simple and intuitive Vue component that allows users to easily remove other
                components within a larger system. With a single button and a clear "X" icon, users can quickly and
                easily remove components with a single click.
            </p>
        </ApiSection>

        <ApiSection title="Required icons">
            <ApiRequiredIcons :icons="['xmark']"/>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponent name="Remove">
                <template #props>
                    <tr>
                        <td><code>icon</code><code>IconNames</code></td>
                        <td>A custom icon for the remove button.</td>
                    </tr>
                    <tr>
                        <td><code>is-hidden</code><code>boolean</code></td>
                        <td>Controls that the remove button is hidden or not.</td>
                    </tr>
                </template>

                <template #emits>
                    <tr>
                        <td><code>click</code><code>(evt: MouseEvent): void;</code></td>
                        <td>Triggered when the button is clicked.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxAspectRatio, FluxPane, FluxPaneBody, FluxRemove, FluxStack } from '@basmilius/flux';
    import { ApiComponent, ApiRequiredIcons, ApiSection, PageTitle, Preview } from '@docs/components';
</script>
