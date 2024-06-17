<template>
    <FluxStack>
        <PageTitle
            section="Content"
            title="Translations"/>

        <ApiSection>
            <p>
                Flux leverages a variety of strings within its library, and the beauty lies in their inherent
                translatability on the implementing side. To facilitate this seamless translation process, Flux
                introduces a composable function to yield a translate function. This integration contributes to
                the overall ease and adaptability of the Flux library implementation.
            </p>
        </ApiSection>

        <ApiSection title="useTranslate()">
            <HighlightedCode
                :code="useTranslateCode"
                language="typescript"/>
        </ApiSection>

        <FluxPane class="api-component flux-typography-aware">
            <FluxPaneHeader
                class="api-component-header api-components-header"
                title="Available strings"/>

            <ApiTable>
                <template #head>
                    <tr>
                        <th>Key</th>
                        <th>Value</th>
                    </tr>
                </template>

                <template #body>
                    <tr v-for="(value, key) of english">
                        <td>{{ key }}</td>
                        <td>{{ value }}</td>
                    </tr>
                </template>
            </ApiTable>
        </FluxPane>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneHeader, FluxStack } from '@basmilius/flux';
    import { ApiSection, ApiTable, HighlightedCode, PageTitle } from '@docs/components';
    import { english } from '@/composable/private/useTranslate';

    const useTranslateCode = `import { useTranslate } from '@basmilius/flux';\n\nconst {t} = useTranslate();\n\nconsole.log(t('flux.back')); // "Back"`;
</script>
