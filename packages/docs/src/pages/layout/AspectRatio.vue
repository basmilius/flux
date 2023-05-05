<template>
    <FluxStack>
        <PageTitle
            section="Layout"
            title="Aspect ratio"/>

        <Preview>
            <FluxStack
                axis="horizontal"
                :gap="15">
                <FluxPane>
                    <FluxAspectRatio
                        :aspect-ratio="1"
                        style="height: 108px"/>
                </FluxPane>

                <FluxPane>
                    <FluxAspectRatio
                        :aspect-ratio="16 / 9"
                        style="height: 108px"/>
                </FluxPane>

                <FluxPane>
                    <FluxAspectRatio
                        :aspect-ratio="9 / 16"
                        style="height: 108px"/>
                </FluxPane>
            </FluxStack>
        </Preview>

        <ApiSection>
            <p>
                The aspect ratio component makes sure that the element has a certain aspect ratio and tries to keep
                it in that ratio. One of height and width should be available for this component to work.
            </p>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponent name="AspectRatio">
                <template #props>
                    <tr>
                        <td><code>aspect-ratio</code><code>number</code></td>
                        <td>The aspect ratio, can be a formula such as "16 / 9".</td>
                    </tr>
                </template>

                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>The contents of the aspect ratio.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxAspectRatio, FluxPane, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiSection, PageTitle, Preview } from '@/components';
</script>
