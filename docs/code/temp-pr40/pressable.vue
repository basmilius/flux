<template>
    <FluxFlex direction="column">
        <FluxInfo color="warning">
            <strong>What to look for.</strong>
            Every link below should behave exactly as it did on <code>main</code>. Hover each one and read the status bar, or right-click and copy the address: the URL must come back <strong>unchanged</strong>, spaces included. The last two must be inert.
        </FluxInfo>

        <FluxGrid :columns="2">
            <FluxPane
                v-for="item of cases"
                :key="item.label">
                <FluxPaneHeader :title="item.label"/>

                <FluxPaneBody>
                    <FluxFlex
                            direction="column"
                            :gap="9">
                        <code class="case-href">{{ item.href || '(empty string)' }}</code>

                        <FluxSecondaryButton
                            :href="item.href"
                            :label="item.expected"
                            type="link"/>
                    </FluxFlex>
                </FluxPaneBody>
            </FluxPane>
        </FluxGrid>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    const cases = [
        {label: 'Space in the path', href: '/files/my report.pdf', expected: 'Must keep the space'},
        {label: 'Space in a query', href: 'mailto:someone@example.com?subject=Hello World', expected: 'Must keep "Hello World"'},
        {label: 'Space in a fragment', href: '#section one', expected: 'Must keep the space'},
        {label: 'Blob download', href: 'blob:https://example.com/9c3e-4a1f', expected: 'Must be clickable'},
        {label: 'Custom app scheme', href: 'slack://channel?id=C123', expected: 'Must be clickable'},
        {label: 'Plain https', href: 'https://flux-ui.dev', expected: 'Must be clickable'},
        {label: 'Dangerous scheme', href: 'javascript:alert(1)', expected: 'Must be inert'},
        {label: 'Obfuscated scheme', href: 'java\tscript:alert(1)', expected: 'Must be inert'}
    ];
</script>

<style scoped>
    .case-href {
        overflow-wrap: anywhere;
        font-size: 13px;
        color: var(--foreground-secondary);
    }
</style>
