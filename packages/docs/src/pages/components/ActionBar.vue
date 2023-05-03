<template>
    <flux-stack>
        <page-title
            section="Components"
            title="Action bar"/>

        <preview>
            <flux-pane>
                <flux-pane-header title="Filter"/>
                <flux-action-bar is-resettable>
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
                            icon-before="magnifying-glass"
                            placeholder="Search anything..."/>
                    </template>

                    <template #actions-before-search>
                        <flux-secondary-button
                            icon-before="arrow-down-to-line"
                            label="Download"/>

                        <flux-separator axis="vertical"/>
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
                <template #props>
                    <tr>
                        <td><code>is-resettable</code><code>boolean</code></td>
                        <td>Enables the default reset button. Only works if the filter-opener slot isn't overridden.</td>
                    </tr>
                </template>

                <template #emits>
                    <tr>
                        <td><code>reset</code><code>(): void</code></td>
                        <td>Triggered when the default reset button is clicked. Only works if the filter-opener slot isn't overridden.</td>
                    </tr>
                </template>

                <template #slots>
                    <tr>
                        <td><code>primary</code><code>{}</code></td>
                        <td>One primary action for the action bar. Yes, more is allowed, but strongly discouraged.</td>
                    </tr>
                    <tr>
                        <td><code>actions-after-search</code><code>{}</code></td>
                        <td>A place for actions after the search bar in the action bar.</td>
                    </tr>
                    <tr>
                        <td><code>actions-before-search</code><code>{}</code></td>
                        <td>A place for actions before the search bar in the action bar.</td>
                    </tr>
                    <tr>
                        <td><code>actions-end</code><code>{}</code></td>
                        <td>A place for actions at the end of the action bar.</td>
                    </tr>
                    <tr>
                        <td><code>actions-start</code><code>{}</code></td>
                        <td>A place for actions at the start of the action bar.</td>
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
                        <td><code>filter-opener</code><code>FluxFlyout:slots:opener</code></td>
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
    import { FluxActionBar, FluxFormInput, FluxPane, FluxPaneBody, FluxPaneHeader, FluxPrimaryButton, FluxSecondaryButton, FluxSeparator, FluxStack } from '@fancee/flux';
    import { ApiComponent, ApiRequiredIcons, ApiSection, PageTitle, Preview } from '@/components';
</script>
