<template>
    <FluxStack>
        <PageTitle
            section="Layout"
            title="Auto grid"/>

        <Preview>
            <FluxPane>
                <FluxPaneBody>
                    <FluxAutoGrid
                        :gap="21"
                        :min-column-width="210">
                        <div
                            v-for="i in 3"
                            :key="i"
                            class="column-example"/>
                    </FluxAutoGrid>
                </FluxPaneBody>
            </FluxPane>
        </Preview>

        <ApiSection>
            <p>
                The AutoGrid component is a Vue component that automatically adjusts the width of its children to ensure
                they have a minimum width. It intelligently determines the number of columns that fit best within the
                parent container, making it easy to create responsive layouts that adapt to various screen sizes.
            </p>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponent name="AutoGrid">
                <template #props>
                    <tr>
                        <td><code>gap</code><code>number</code></td>
                        <td>The gap in pixels between each element.</td>
                    </tr>
                    <tr>
                        <td><code>min-column-width</code><code>number</code></td>
                        <td>The minimum width of each child.</td>
                    </tr>
                </template>

                <template #slots>
                    <tr>
                        <td><code>default</code><code>{}</code></td>
                        <td>The elements that should be placed within the auto grid.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxAutoGrid, FluxPane, FluxPaneBody, FluxStack } from '@basmilius/flux';
    import { ApiComponent, ApiSection, PageTitle, Preview } from '@docs/components';
</script>
