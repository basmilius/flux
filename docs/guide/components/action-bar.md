---
outline: deep

emits:
    -   name: reset
        description: Triggered when the filter reset button is clicked. This is not available if a custom filter opener button is used.
        type: [ ]

props:
    -   name: is-resettable
        description: Indicates that the applied filter is resettable.
        type: boolean
        optional: true

slots:
    -   name: primary
        description: A place for the primary action.

    -   name: actions-end
        description: The space at the end of the action bar.

    -   name: actions-start
        description: The space at the start of the action bar.

    -   name: actions-after-search
        description: The space after the search bar.

    -   name: actions-before-search
        description: The space before the search bar.

    -   name: search
        description: A place for the search bar.

    -   name: filter
        description: A place for the filter, which is shown in a flyout.
        type:
            paneX: number
            paneY: number
            openerWidth: number
            openerHeight: number
            close: "(): void"

    -   name: filter-opener
        description: A place for the filter opener button.
        type:
            close: "(): void"
            open: "(): void"
            toggle: "(): void"
            
requiredIcons:
    - filter
    - xmark
---

<script
    lang="ts"
    setup>
    import { FluxActionBar, FluxFormInput, FluxPane, FluxPaneBody, FluxPaneHeader, FluxPrimaryButton, FluxSecondaryButton, FluxSeparator } from '@basmilius/flux';
</script>

# Action bar

Action bars are toolbars commonly used alongside data tables. They can display a primary action, a search bar, and a filter button. Filters are typically displayed within a flyout containing a window.

<Preview>
    <FluxPane>
        <FluxPaneHeader title="Filter"/>
        <FluxActionBar>
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

<FrontmatterDocs/>

## Used components

- [Button](./button)
- [Button group](./button-group)
- [Flyout](./flyout)
- [Spacer](./layout/spacer)
- [Stack](./layout/stack)
- [Tooltip](./tooltip)
