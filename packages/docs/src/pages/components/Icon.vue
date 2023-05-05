<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Icon"/>

        <Preview>
            <FluxStack
                axis="horizontal"
                :gap="15">
                <FluxIcon variant="check-circle"/>
                <FluxIcon variant="lock"/>
                <FluxIcon variant="circle-exclamation"/>
                <FluxIcon variant="plus"/>
                <FluxIcon variant="xmark"/>
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
            </ApiComponent>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxIcon, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiSection, PageTitle, Preview } from '@/components';
</script>
