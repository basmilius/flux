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

        <api-section>
            <p>
                Badges are used as labels for a more specific element in the UI. This, for example, may be used to
                display the status of an order.
            </p>
        </api-section>

        <api-section title="API">
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
        </api-section>

        <api-section title="Examples">
            <api-example
                :code="basicCode"
                :component="basic"
                title="Basic"
                description="A basic badge can be used to show additional information about something else."/>

            <api-example
                :code="dotCode"
                :component="dot"
                title="Dot"
                description="A badge with a dot can be used to indicate status of something. For example the status of a server or the payment status of an order."/>

            <api-example
                :code="iconCode"
                :component="icon"
                title="Icon"
                description="Icons within badges can be used to improve the meaning of the badge. This can for example be used to display features of something."/>

            <api-example
                :code="loadingCode"
                :component="loading"
                title="Loading"
                description="Badges with a loading state can be used to indicate that a row within a table is doing something, such as saving a particular row."/>
        </api-section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadge, FluxBadgeStack, FluxStack } from '@fancee/flux';
    import { ApiExample, ApiSection, ApiTable, CodePreview, PageTitle, Preview } from '@/components';
    import basic from '@/code/components/badge/basic.vue';
    import basicCode from '@/code/components/badge/basic.vue?raw';
    import dot from '../../code/components/badge/dot.vue';
    import dotCode from '../../code/components/badge/dot.vue?raw';
    import icon from '../../code/components/badge/icon.vue';
    import iconCode from '../../code/components/badge/icon.vue?raw';
    import loading from '../../code/components/badge/loading.vue';
    import loadingCode from '../../code/components/badge/loading.vue?raw';
</script>
