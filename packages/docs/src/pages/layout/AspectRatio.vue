<template>
    <flux-stack>
        <page-title
            section="Layout"
            title="Aspect ratio"/>

        <preview>
            <flux-stack
                axis="horizontal"
                :gap="15">
                <flux-pane>
                    <flux-aspect-ratio
                        :aspect-ratio="1"
                        style="height: 108px"/>
                </flux-pane>

                <flux-pane>
                    <flux-aspect-ratio
                        :aspect-ratio="16 / 9"
                        style="height: 108px"/>
                </flux-pane>

                <flux-pane>
                    <flux-aspect-ratio
                        :aspect-ratio="9 / 16"
                        style="height: 108px"/>
                </flux-pane>
            </flux-stack>
        </preview>

        <api-section>
            <p>
                The aspect ratio component makes sure that the element has a certain aspect ratio and tries to keep
                it in that ratio. One of height and width should be available for this component to work.
            </p>
        </api-section>

        <api-section title="API">
            <api-component name="AspectRatio">
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
            </api-component>
        </api-section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxAspectRatio, FluxPane, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiSection, PageTitle, Preview } from '@/components';
</script>
