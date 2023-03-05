<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Notice"/>

        <preview>
            <flux-notice
                icon="sparkles"
                title="New release"
                message="Version 2023.3 contains new features for colors, badges and stacks."
                variant="info"/>
        </preview>

        <section>
            <p>
                A notice component is a UI component that displays a message to the user, typically to provide
                information or alert them to a particular status or event. A notice may include an icon, message,
                and an optional title. It is used to communicate important information to the user in a clear
                and concise manner.
            </p>

            <p><br/></p>
            <h2>API</h2>

            <api-table title="Props">
                <template #body>
                    <tr>
                        <td><code>icon</code><code>IconNames</code></td>
                        <td>The icon used within the notice.</td>
                    </tr>
                    <tr>
                        <td><code>is-loading</code><code>boolean</code></td>
                        <td>Sets if the notice should display a loading spinner.</td>
                    </tr>
                    <tr>
                        <td><code>is-small</code><code>boolean</code></td>
                        <td>Sets if the notice should use a smaller variant.</td>
                    </tr>
                    <tr>
                        <td><code>message</code><code>string</code></td>
                        <td>The message within the notice.</td>
                    </tr>
                    <tr>
                        <td><code>title</code><code>string</code></td>
                        <td>The title of the notice.</td>
                    </tr>
                    <tr>
                        <td><code>variant</code><code>'gray' | 'primary' | 'danger' | 'info' | 'success' | 'warning'</code></td>
                        <td>The color variant of the notice.</td>
                    </tr>
                </template>
            </api-table>

            <p><br/></p>
            <h2>Examples</h2>

            <h3>Basic</h3>
            <p>
                Notices can display the result of an action that the user performed. The variant of the
                notice depends on if the result of that action is good or bad.
            </p>
            <code-preview
                :code="basicCode as string"
                :component="basic"/>

            <h3>Small</h3>
            <p>
                A smaller notice can be used within a Pane, for example within sidebars.
            </p>
            <code-preview
                :code="smallCode as string"
                :component="small"/>

            <h3>Loading</h3>
            <p>
                Notices may also indicate that something is loading.
            </p>
            <code-preview
                :code="loadingCode as string"
                :component="loading"/>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxNotice, FluxStack } from '@fancee/flux';
    import { ApiTable, CodePreview, PageTitle, Preview } from '@/components';
    import basic from '@/code/components/notice/basic.vue';
    import basicCode from '@/code/components/notice/basic.vue?raw';
    import small from '@/code/components/notice/small.vue';
    import smallCode from '@/code/components/notice/small.vue?raw';
    import loading from '@/code/components/notice/loading.vue';
    import loadingCode from '@/code/components/notice/loading.vue?raw';
</script>
