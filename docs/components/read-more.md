---
outline: deep

emits:
    -   name: update:is-expanded
        description: Triggered when the content is expanded or collapsed.
        type: [ boolean ]

props:
    -   name: is-expanded
        description: Controls whether the content is expanded. Can be used with v-model to drive the state from outside.
        type: boolean
        optional: true
        default: false

    -   name: label-less
        description: Overrides the translated label of the toggle while the content is expanded.
        type: string
        optional: true

    -   name: label-more
        description: Overrides the translated label of the toggle while the content is collapsed.
        type: string
        optional: true

    -   name: lines
        description: The number of lines that stay visible while the content is collapsed.
        type: number
        optional: true
        default: 3

slots:
    -   name: default
        description: The content that is clamped.

    -   name: toggle
        description: A custom control that expands and collapses the content. Only rendered when the content overflows.
        type:
            contentId: string
            isExpanded: boolean
            toggle: "(): void"
---

# Read more

The read more clamps its content to a number of lines and reveals the rest behind a toggle. It suits long descriptions in a detail pane, a changelog entry or a product summary, where the full text should stay available without pushing everything else off the screen.

The clamp follows the real line height of the content, so it keeps working when the text is set at another size. The toggle only appears when the content actually overflows, which means short content renders as plain text.

::: render
render=../code/components/read-more/preview.vue
:::

::: tip
While collapsed, the last visible line fades out into the surface the component sits on. Because that fade is painted with `--surface-current`, it follows a pane, a menu or a raised layer without any extra configuration.
:::

::: tip
The default toggle is a real button with `aria-expanded` and `aria-controls` wired to the content. When you replace it through the `toggle` slot, bind the `contentId` and `isExpanded` slot props on your own control to keep that relationship.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || Content longer than three lines is clamped and gets a toggle to reveal the rest.
example=../code/components/read-more/basic.vue
:::

::: example Lines || The clamp can be set to any number of lines, for instance two lines in a dense list.
example=../code/components/read-more/lines.vue
:::

::: example Custom toggle || The toggle slot replaces the built-in control, for instance with a button that carries a chevron.
example=../code/components/read-more/custom-toggle.vue
:::

::: example Controlled || Binding is-expanded with v-model lets another control in the interface expand and collapse the content.
example=../code/components/read-more/controlled.vue
:::
