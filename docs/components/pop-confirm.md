---
outline: deep

emits:
    -   name: cancel
        description: Triggered when the confirmation is declined, either through the cancel button or by dismissing the popup.
        type: [ ]

    -   name: confirm
        description: Triggered when the confirmation is accepted.
        type: [ ]

props:
    -   name: cancel-label
        description: Overrides the translated label of the cancel button.
        type: string
        optional: true

    -   name: confirm-label
        description: Overrides the translated label of the confirm button.
        type: string
        optional: true

    -   name: direction
        description: Specifies in what direction the popup should open. Forwarded to the flyout.
        type: FluxDirection
        default: vertical
        optional: true

    -   name: icon
        description: The icon that is shown next to the message.
        type: FluxIconName
        optional: true

    -   name: is-destructive
        description: Turns the confirm button into a destructive button and gives the cancel button the initial focus.
        type: boolean
        optional: true

    -   name: label
        description: An accessible label for the popup. Defaults to the title, or the message when there is no title.
        type: string
        optional: true

    -   name: margin
        description: A margin from the opener element. Forwarded to the flyout.
        type: number
        default: 9
        optional: true

    -   name: message
        description: The question that is asked.
        type: string
        optional: true

    -   name: title
        description: An optional heading above the message.
        type: string
        optional: true

    -   name: width
        description: The width of the popup in pixels (or any valid CSS length). Forwarded to the flyout.
        type: [ number, string ]
        optional: true

slots:
    -   name: default
        description: Replaces the body of the popup, the buttons stay.
        type:
            close: "(): void"

    -   name: opener
        description: The element that opens the popup.
        type:
            close: "(): void"
            open: "(): void"
            toggle: "(): void"
            isOpen: boolean

requiredIcons:
    - circle-check
---

# Pop confirm

A pop confirm asks a short question right next to the control that triggered it, instead of taking over the screen with a dialog. It renders in a [Flyout](./flyout) and closes itself as soon as the question is answered.

::: render
render=../code/components/pop-confirm/preview.vue
:::

::: tip Which one do I use?
Reach for a pop confirm when the action lives in the interface and the answer is obvious at a glance, and for [Confirm](./attention/confirm) when the decision deserves the user's full attention or has to be asked from code.
:::

::: tip
Dismissing the popup with escape or a click outside emits `cancel`, so a decision is always reported exactly once.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A pop confirm keeps a low-risk action such as archiving in place, right under its own button.
example=../code/components/pop-confirm/basic.vue
:::

::: example Destructive || A destructive confirmation colors its confirm button and puts the initial focus on cancel, so an accidental enter does nothing.
example=../code/components/pop-confirm/destructive.vue
:::

::: example Title || A title turns the question into a heading and leaves the message room to explain the consequence.
example=../code/components/pop-confirm/title.vue
:::

::: example Custom body || The default slot replaces the body of the popup, for instance to ask about the scope of the action.
example=../code/components/pop-confirm/custom.vue
:::

## Used components

- [Button](./button)
    - [Destructive](./button/destructive)
    - [Primary](./button/primary)
    - [Secondary](./button/secondary)
- [Flyout](./flyout)
- [Icon](./icon)
- [Pane](./pane)
    - [Body](./pane/body)
    - [Footer](./pane/footer)
- [Spacer](./layout/spacer)
