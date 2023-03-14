<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Icon"/>

        <preview>
            <flux-stack
                axis="horizontal"
                :gap="15">
                <flux-icon variant="check-circle"/>
                <flux-icon variant="lock"/>
                <flux-icon variant="circle-exclamation"/>
                <flux-icon variant="plus"/>
                <flux-icon variant="xmark"/>
            </flux-stack>
        </preview>

        <section>
            <p>
                A component to display a single <a
                href="https://fontawesome.com"
                rel="noopener"
                target="_blank">Font Awesome</a>
                icon. The icon can be customized through css and is used in multiple Flux components, such as Buttons.
            </p>

            <p><br/></p>
            <h2>API</h2>

            <api-table title="Props">
                <template #body>
                    <tr>
                        <td><code>size</code><code>number</code></td>
                        <td>Size of the icon in pixels.</td>
                    </tr>
                    <tr>
                        <td><code>variant</code><code>IconNames</code></td>
                        <td>The icon to use.</td>
                    </tr>
                </template>
            </api-table>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxIcon, FluxStack } from '@fancee/flux';
    import { ApiTable, PageTitle, Preview } from '@/components';
</script>
