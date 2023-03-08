<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Action bar"/>

        <preview>
            <flux-pane>
                <flux-pane-header title="Filter"/>
                <flux-action-bar>
                    <template #primary>
                        <flux-primary-button
                            icon-before="circle-plus"
                            label="Event"/>
                    </template>

                    <template #filter>
                        Filter
                    </template>

                    <template #search>
                        <flux-form-input
                            type="search"
                            placeholder="Search anything..."/>
                    </template>
                </flux-action-bar>
                <flux-pane-body>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque neque nobis quasi recusandae reprehenderit. Ad amet, blanditiis, delectus dolorem dolorum error, esse expedita explicabo mollitia quam quia quisquam reiciendis temporibus?
                </flux-pane-body>
            </flux-pane>
        </preview>

        <section>
            <p>
                Badges are used as labels for a more specific element in the UI. This, for example, may be used to
                display the status of an order.
            </p>

            <p><br/></p>
            <h2>API</h2>

            <api-table title="Slots">
                <template #body>
                    <tr>
                        <td><code>primary</code><code>{}</code></td>
                        <td>One primary action for the action bar. Yes, more is allowed, but strongly discouraged.</td>
                    </tr>
                    <tr>
                        <td><code>search</code><code>{}</code></td>
                        <td>A search bar for the action bar. Typically a form input.</td>
                    </tr>
                    <tr>
                        <td><code>filter</code><code>FluxFlyout:slots:default</code></td>
                        <td>The filter button. The same slot api of the default slot from Flyout is used.</td>
                    </tr>
                    <tr>
                        <td><code>filterOpener</code><code>FluxFlyout:slots:opener</code></td>
                        <td>The filter flyout. The same slot api of the opener slot from Flyout is used.</td>
                    </tr>
                </template>
            </api-table>
        </section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxActionBar, FluxFormInput, FluxPane, FluxPaneBody, FluxPaneHeader, FluxPrimaryButton, FluxStack } from '@fancee/flux';
    import { ApiTable, PageTitle, Preview } from '@/components';
</script>
