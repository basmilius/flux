---
outline: deep

emits:
    -   name: close
        description: Triggered when the close button is clicked.
        type: [ ]

props:
    -   name: icon
        description: The icon that is shown at the start of the notice.
        type: FluxIconName
        optional: true

    -   name: is-center
        description: Centers the contents of the notice horizontally.
        type: boolean
        optional: true

    -   name: is-closeable
        description: Allows the notice to be closed.
        type: boolean
        optional: true

    -   name: is-fluid
        description: Indicates that the notice is used fluidly.
        type: boolean
        optional: true

    -   name: is-loading
        description: Adds a loading state at the start of the notice.
        type: boolean
        optional: true

    -   name: is-small
        description: Enables the small variant of the notice.
        type: boolean
        optional: true

    -   name: message
        description: The message of the notice.
        type: string
        optional: true

    -   name: title
        description: The title of the notice.
        type: string
        optional: true

    -   name: variant
        description: The color variant of the notice.
        type: FluxColorVariant
        optional: true

slots:
    -   name: default
        description: Extra content that should be rendered inside the notice.

    -   name: end
        description: Content that should render at the horizontal end of the notice.

requiredIcons:
    - xmark
---

# Notice

A UI element designed to inform or alert users about important statuses, events, or actions. It can include an icon, a message, and an optional title, ensuring that critical information is effectively communicated and stands out within the user interface.

::: render
render=../../../code/guide/components/attention/notice/preview.vue
:::

::: tip
For temporary notifications that auto-dismiss or need less prominence, consider using the [Snackbar](./snackbar) component. Snackbars are ideal for brief messages.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || Notices can display the result of an action that the user performed. The variant of the notice depends on whether the result of that action is positive or negative.
example=../../../code/guide/components/attention/notice/basic.vue
:::

::: example Small || A smaller notice can be used within a pane or, for example, within sidebars.
example=../../../code/guide/components/attention/notice/small.vue
:::

::: example Loading || Notices may also indicate that something is loading.
example=../../../code/guide/components/attention/notice/loading.vue
:::

## Serverty examples

Variants such as `success`, `error`, `warning`, `info`, and `gray` help convey the severity of the message. For example:

- `danger` — Failed to save data. Please try again.
- `info` — New updates are available.
- `success` — Data saved successfully.
- `warning` — You have unsaved changes.
- `gray` — We've updated the invoice filter, see what's new.

## Used components

- [Icon](../icon)
- [Spinner](../spinner)
