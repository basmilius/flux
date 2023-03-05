<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Badge"/>

        <preview>
            <flux-badge-stack>
                <flux-badge label="Badge"/>
                <flux-badge
                    color="danger"
                    dot
                    label="Badge"/>
                <flux-badge
                    color="success"
                    icon="circle-check"
                    label="Badge"/>
                <flux-badge
                    is-loading
                    label="Badge"/>
                <flux-badge
                    is-deletable
                    label="Badge"/>
            </flux-badge-stack>
        </preview>

        <section>
            <p>
                Badges are used as labels for a more specific element in the UI. This, for example, may be used to
                display the status of an order.
            </p>

            <p><br/></p>
            <h2>API</h2>

            <api-table title="Props">
                <template #body>
                    <tr>
                        <td><code>color</code><code>'primary' | 'danger' | 'info' | 'success' | 'warning'</code></td>
                        <td>The color used within the badge.</td>
                    </tr>
                    <tr>
                        <td><code>dot</code><code>boolean</code></td>
                        <td>Adds a colored dot to the badge.</td>
                    </tr>
                    <tr>
                        <td><code>icon</code><code>IconNames</code></td>
                        <td>The icon used within the icon.</td>
                    </tr>
                    <tr>
                        <td><code>is-clickable</code><code>boolean</code></td>
                        <td>Allows the badge to be clicked.</td>
                    </tr>
                    <tr>
                        <td><code>is-deletable</code><code>boolean</code></td>
                        <td>Allows the badge to be deleted.</td>
                    </tr>
                    <tr>
                        <td><code>is-loading</code><code>boolean</code></td>
                        <td>Enables the loading state of the badge.</td>
                    </tr>
                    <tr>
                        <td><code>label</code><code>string</code></td>
                        <td>The label displayed within the badge.</td>
                    </tr>
                </template>
            </api-table>

            <api-table title="Emits">
                <template #body>
                    <tr>
                        <td><code>click</code><code>(evt: MouseEvent): void;</code></td>
                        <td>Triggered when the badge is clicked. This only works when the is-clickable prop is set.</td>
                    </tr>
                    <tr>
                        <td><code>delete</code><code>(): void;</code></td>
                        <td>Triggered when the delete button within the badge is clicked. This only works when the is-deletable prop is set.</td>
                    </tr>
                </template>
            </api-table>

            <p><br/></p>
            <h2>Examples</h2>

            <h3>Basic</h3>
            <p>
                A basic badge can be used to show additional information about something else.
            </p>
            <code-preview
                :code="basicCode as string"
                :component="basic"/>

            <h3>Dot</h3>
            <p>
                A badge with a dot can be used to indicate status of something. For example the status
                of a server or the payment status of an order.
            </p>
            <code-preview
                :code="dotCode as string"
                :component="dot"/>

            <h3>Icon</h3>
            <p>
                Icons within badges can be used to improve the meaning of the badge. This can for example
                be used to display features of something.
            </p>
            <code-preview
                :code="iconCode as string"
                :component="icon"/>

            <h3>Loading</h3>
            <p>
                Badges with a loading state can be used to indicate that a row within a table is doing
                something, such as saving a particular row.
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
    import { FluxBadge, FluxBadgeStack, FluxStack } from '@fancee/flux';
    import { ApiTable, CodePreview, PageTitle, Preview } from '@/components';
    import basic from '@/code/components/badge/basic.vue';
    import basicCode from '@/code/components/badge/basic.vue?raw';
    import dot from '../../code/components/badge/dot.vue';
    import dotCode from '../../code/components/badge/dot.vue?raw';
    import icon from '../../code/components/badge/icon.vue';
    import iconCode from '../../code/components/badge/icon.vue?raw';
    import loading from '../../code/components/badge/loading.vue';
    import loadingCode from '../../code/components/badge/loading.vue?raw';
</script>
