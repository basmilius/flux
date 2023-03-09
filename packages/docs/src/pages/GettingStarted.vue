<template>
    <flux-stack>
        <page-title
            section="Setup"
            title="Getting started"/>

        <section>
            <p>
                Flux is a Vue component library that can be used with both Vue 2 and Vue 3. Its flexibility makes it an ideal
                solution for developers looking to streamline the process of building consistent and intuitive user interfaces.
                Flux offers a variety of pre-built components that can be easily integrated into your Vue application, saving
                you time and effort. Whether you're starting a new project or migrating an existing one, Flux can help you
                achieve a high-quality user interface with ease.
            </p>

            <h2>Vue 3.0</h2>
            <ol>
                <li>
                    <p>Open your project's root directory in your terminal.</p>
                </li>
                <li>
                    <p>Run the following command to install Flux.</p>
                    <highlighted-code
                        code="pnpm install @fancee/flux"
                        language="shell"/>
                </li>
                <li>
                    <p>Once the installation is complete add the following to your <code>main.ts</code> file.</p>
                    <highlighted-code
                        code="import '@fancee/flux/style.css';"
                        language="typescript"/>
                </li>
                <li>
                    <p>Import the components you want to use, like this:</p>
                    <highlighted-code
                        :code="usageCode as string"
                        language="vue"/>
                </li>
            </ol>

            <h2>Vue 2.7</h2>
            <ol>
                <li>
                    <p>Open your project's root directory in your terminal.</p>
                </li>
                <li>
                    <p>Run the following command to install Flux.</p>
                    <highlighted-code
                        code="pnpm install @fancee/flux-vue2"
                        language="shell"/>
                </li>
                <li>
                    <p>Once the installation is complete add the following to your <code>main.ts</code> file.</p>
                    <highlighted-code
                        code="import '@fancee/flux-vue2/style.css';"
                        language="typescript"/>
                </li>
                <li>
                    <p>Import the components you want to use, like this:</p>
                    <highlighted-code
                        :code="usageCode as string"
                        language="vue"/>
                </li>
            </ol>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxStack } from '@fancee/flux';
    import { HighlightedCode, PageTitle } from '@/components';
    import usageCode from '@/code/getting-started/component-usage.vue?raw'
</script>
