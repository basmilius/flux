<template>
    <FluxStack>
        <PageTitle
            section="Components"
            title="Action bar"/>

        <Preview>
            <FluxPane>
                <FluxPaneHeader title="Filter"/>

                <FluxActionBar is-resettable>
                    <template #primary>
                        <FluxPrimaryButton
                            icon-before="circle-plus"
                            label="Event"/>
                    </template>

                    <template #filter>
                        <FluxPaneBody>
                            Filter contents.
                        </FluxPaneBody>
                    </template>

                    <template #search>
                        <FluxFormInput
                            type="search"
                            icon-before="magnifying-glass"
                            placeholder="Search anything..."/>
                    </template>

                    <template #actions-before-search>
                        <FluxSecondaryButton
                            icon-before="arrow-down-to-line"
                            label="Download"/>

                        <FluxSeparator axis="vertical"/>
                    </template>
                </FluxActionBar>

                <FluxPaneBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque neque nobis quasi recusandae reprehenderit. Ad amet, blanditiis, delectus dolorem dolorum error, esse expedita explicabo mollitia quam quia quisquam reiciendis temporibus?
                </FluxPaneBody>
            </FluxPane>
        </Preview>

        <ApiSection>
            <p>
                Action bars are toolbars that can be used along data tables. They can show a primary action, a search bar
                and a filter button. Filters are commonly shown within a flyout that contains a window.
            </p>
        </ApiSection>

        <ApiSection title="Required icons">
            <ApiRequiredIcons :icons="['filter']"/>
        </ApiSection>

        <ApiSection title="API">
            <ApiComponent name="ActionBar">
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
            </ApiComponent>
        </ApiSection>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxActionBar, FluxFormInput, FluxPane, FluxPaneBody, FluxPaneHeader, FluxPrimaryButton, FluxSecondaryButton, FluxSeparator, FluxStack } from '@basmilius/flux';
    import { ApiComponent, ApiRequiredIcons, ApiSection, PageTitle, Preview } from '@/components';
</script>
