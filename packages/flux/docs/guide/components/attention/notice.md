---
outline: deep

emits:
    -   name: close
        description: Triggered when the close button is clicked.
        type: [ ]

props:
    -   name: icon
        description: The icon that is shown at the start of the notice.
        type: IconName
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
        type: ColorVariant
        optional: true

slots:
    -   name: default
        description: Extra content that should be rendered inside the notice.
        
    -   name: end
        description: Content that should render at the horizontal end of the notice.

requiredIcons:
    - xmark
---

<script
    lang="ts"
    setup>
    import { FluxNotice } from '@basmilius/flux';
    import BasicExample from '../../../code/guide/components/attention/notice/basic.vue';
    import LoadingExample from '../../../code/guide/components/attention/notice/loading.vue';
    import SmallExample from '../../../code/guide/components/attention/notice/small.vue';
</script>

# Notice

A UI element designed to inform or alert users about important statuses, events, or actions. It can include an icon, a message, and an optional title, ensuring that critical information is effectively communicated and stands out within the user interface.

<Preview>
    <FluxNotice
        icon="circle-exclamation"
        is-small
        message="Please note that this is a warning message."
        variant="warning"/>
</Preview>

::: tip
For temporary notifications that auto-dismiss or need less prominence, consider using the [Snackbar](./snackbar) component. Snackbars are ideal for brief messages.
:::

<FrontmatterDocs/>

## Examples

### Basic

Notices can display the result of an action that the user performed. The variant of the notice depends on whether the result of that action is positive or negative.

<Preview>
    <BasicExample/>
</Preview>

<<< @/code/guide/components/attention/notice/basic.vue

### Small

A smaller notice can be used within a pane or, for example, within sidebars.

<Preview>
    <SmallExample/>
</Preview>

<<< @/code/guide/components/attention/notice/small.vue

### Loading

Notices may also indicate that something is loading.

<Preview>
    <LoadingExample/>
</Preview>

<<< @/code/guide/components/attention/notice/loading.vue

## Serverty examples

Variants such as `success`, `error`, `warning`, and `info` help convey the severity of the message. For example:
- `danger` — Failed to save data. Please try again.
- `info` — New updates are available.
- `success` — Data saved successfully.
- `warning` — You have unsaved changes.

## Used components

- [Icon](../icon)
- [Spinner](../spinner)
