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
                        <flux-pane-body>
                            Filter contents.
                        </flux-pane-body>
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

        <api-section>
            <p>
                Action bars are toolbars that can be used along data tables. They can show a primary action, a search bar
                and a filter button. Filters are commonly shown within a flyout that contains a window.
            </p>
        </api-section>

        <api-section title="Required icons">
            <api-required-icons :icons="['filter']"/>
        </api-section>

        <api-section title="API">
            <api-component name="ActionBar">
                <template #slots>
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
            </api-component>
        </api-section>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxActionBar, FluxFormInput, FluxPane, FluxPaneBody, FluxPaneHeader, FluxPrimaryButton, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiRequiredIcons, ApiSection, PageTitle, Preview } from '@/components';
</script>
