---
outline: deep

slots:
    -   name: default
        description: The custom content to embed in the menu, such as a color picker, slider or small form.
---

# Menu pane

A container that lets you drop a full interactive component (a [Color picker](../color/picker), a slider or a small form) into a [Menu](./), a [Menu flyout](./flyout) submenu or a [Context menu](../context-menu).

A plain [Menu](./) runs a roving focus zone: arrow keys move between its items and only one item sits in the tab order at a time. Wrapping custom content in a Menu pane opts that subtree out of the focus zone, so the embedded component keeps its own keyboard behavior. Arrow keys drive its sliders and steppers and `Tab` reaches every control. Arrow navigation across the surrounding menu items simply skips over the pane; reach it with `Tab`.

Clicking inside a pane never closes the menu, so the embedded component stays usable while the menu is open.

For a single control on one line next to a label, a [Menu control](./control) is the better fit: it opts out of the focus zone in exactly the same way, but keeps the row aligned with the menu items around it. For a plain on/off setting, use a [Menu toggle](./toggle).

::: render
render=../../code/components/menu/pane/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Color picker || Embed a full color picker in a menu flyout submenu. Drag the saturation field, use the sliders and type into the inputs without the menu interfering.
example=../../code/components/menu/pane/color-picker.vue
:::

::: example Slider || A single control such as a slider. Focus it with `Tab`, then the arrow keys adjust the value instead of moving between menu items.
example=../../code/components/menu/pane/slider.vue
:::

::: example Range slider || A two-thumb range. Each thumb is its own focus stop and the arrow keys move it without disturbing the menu.
example=../../code/components/menu/pane/range.vue
:::

::: example Text area || A multi-line input. Typing, Enter and the arrow keys for the caret all stay inside the field.
example=../../code/components/menu/pane/note.vue
:::

::: example Filter || A search field that filters the items below it. Typing (including the arrow keys for the caret) stays inside the input.
example=../../code/components/menu/pane/filter.vue
:::

::: example Form || A small form in one pane. `Tab` reaches every field and the button, and submitting never closes the menu on its own.
example=../../code/components/menu/pane/settings.vue
:::
