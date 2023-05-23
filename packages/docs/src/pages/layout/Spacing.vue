<template>
    <FluxStack>
        <PageTitle
            section="Layout"
            title="Spacing"/>

        <Preview>
            <FluxPane>
                <FluxPaneBody>
                    <FluxButtonStack axis="horizontal">
                        <FluxSecondaryButton
                            icon-before="angle-left"
                            label="Button"/>

                        <FluxSpacing
                            class="spacing-example"
                            size="12"/>

                        <FluxSecondaryButton
                            icon-before="arrow-rotate-left"
                            label="Button"/>

                        <FluxPrimaryButton
                            icon-before="circle-check"
                            label="Button"/>
                    </FluxButtonStack>
                </FluxPaneBody>
            </FluxPane>
        </Preview>

        <ApiSection>
            <p>
                The spacing component adds a div within its parent flex container with a predefined size. It works in both
                column and row flex containers. The sizes are predefined.
            </p>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponent name="Spacing">
                <template #props>
                    <tr>
                        <td><code>size</code><code>0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17</code></td>
                        <td>The amount of space the component should take up. This value is not the actual size, but a reference to it.</td>
                    </tr>
                </template>
            </ApiComponent>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxPane, FluxPaneBody, FluxPrimaryButton, FluxSecondaryButton, FluxSpacing, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiSection, PageTitle, Preview } from '@docs/components';
</script>

<style
    lang="scss"
    scoped>
    .spacer-example {
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgb(var(--gray-2));
        border: 1px dashed rgb(var(--gray-4));
        border-radius: var(--radius);

        &::before {
            content: 'Spacer';
            color: rgb(var(--gray-6));
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
        }
    }
</style>
