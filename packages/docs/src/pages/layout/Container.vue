<template>
    <FluxStack>
        <PageTitle
            section="Layout"
            title="Container"/>

        <Preview>
            <FluxPane style="height: 108px; width: 75%;"/>
        </Preview>

        <ApiSection>
            <p>
                The primary container which dynamically changes widths based on the viewport.
            </p>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponent name="Container">
                <template #props>
                    <tr>
                        <td><code>gutter</code><code>number</code></td>
                        <td>The gutter on each side of the container.</td>
                    </tr>
                </template>

                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>The contents of the container.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxStack } from '@basmilius/flux';
    import { ApiComponent, ApiSection, PageTitle, Preview } from '@docs/components';
</script>
