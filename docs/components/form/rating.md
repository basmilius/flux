---
outline: deep

emits:
    -   name: change
        description: Triggered when the rating changes, with the new value (or null when cleared).
        type: [ 'number | null' ]

props:
    -   name: allow-half
        description: Whether half-step ratings can be selected.
        type: boolean
        optional: true

    -   name: clearable
        description: Whether clicking the active value resets the rating to null. When enabled, pressing Delete or Backspace also clears the rating.
        type: boolean
        optional: true

    -   name: count
        description: The number of stars.
        type: number
        optional: true
        default: 5

    -   name: disabled
        description: Whether the rating is disabled.
        type: boolean
        optional: true

    -   name: error
        description: An error message, putting the rating in an invalid state.
        type: [ 'string | null' ]
        optional: true

    -   name: icon
        description: The icon used for the stars.
        type: FluxIconName
        optional: true
        default: star

    -   name: is-readonly
        description: Whether the rating is read-only.
        type: boolean
        optional: true

    -   name: name
        description: The name of the field, rendered as a hidden input for form submission.
        type: string
        optional: true

    -   name: size
        description: The size of the stars in pixels.
        type: number
        optional: true

requiredIcons:
    - star
---

# Rating

The Rating component lets a user pick a score by selecting stars. It supports half-step selection, a read-only mode for displaying an existing rating, and full keyboard control: arrow keys adjust the value, number keys jump to a score, Home/End select the extremes, and Delete/Backspace clear it when `clearable`. The model value is a number, or `null` when no rating is set.

::: render
render=../../code/components/form/rating/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic rating.
example=../../code/components/form/rating/basic.vue
:::

::: example Half steps || A rating that allows half steps.
example=../../code/components/form/rating/half-steps.vue
:::

::: example Read-only || A read-only rating for displaying a value.
example=../../code/components/form/rating/readonly.vue
:::

::: example Clearable || A clearable rating; keyboard users can press Delete or Backspace to reset it.
example=../../code/components/form/rating/clearable.vue
:::

## Used components

- [Icon](../icon)
