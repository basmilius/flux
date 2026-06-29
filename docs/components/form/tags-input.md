---
outline: deep

emits:
    -   name: add
        description: Triggered when a tag is added, with the tag value.
        type: [ string ]

    -   name: remove
        description: Triggered when a tag is removed, with the tag value.
        type: [ string ]

props:
    -   name: allow-duplicates
        description: Whether duplicate tags are allowed.
        type: boolean
        optional: true

    -   name: delimiters
        description: The keys that commit the current input as a tag.
        type: string[]
        optional: true
        default: "['Enter', ',']"

    -   name: disabled
        description: Whether the input is disabled.
        type: boolean
        optional: true

    -   name: error
        description: An error message, putting the input in an invalid state.
        type: [ 'string | null' ]
        optional: true

    -   name: max
        description: The maximum number of tags.
        type: number
        optional: true

    -   name: placeholder
        description: Placeholder shown when there are no tags.
        type: string
        optional: true

    -   name: suggestions
        description: Optional suggestions shown in a dropdown while typing.
        type: FluxFormSelectOption[]
        optional: true

    -   name: tag-color
        description: The color of the tags.
        type: FluxColor
        optional: true

    -   name: validate
        description: A function that returns whether a value is a valid tag.
        type: ( value:&nbsp;string ) => boolean
        optional: true
---

# Tags input

The Tags input component lets users build a list of tags by typing and committing each value, for example to assign keywords or labels. Values are committed on Enter or a comma (configurable), pasted text is split into multiple tags, and Backspace on an empty input removes the last tag. When `suggestions` are provided, a filtered dropdown is shown while typing.

::: info
Picking a suggestion stores its `value` (as a string) when one is set, falling back to the `label` otherwise. This keeps the bound `v-model` made up of stable identifiers rather than display text. The input is exposed as a `role="combobox"` and links the highlighted suggestion through `aria-activedescendant`.
:::

::: render
render=../../code/components/form/tags-input/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic tags input.
example=../../code/components/form/tags-input/basic.vue
:::

::: example Suggestions || A tags input with suggestions.
example=../../code/components/form/tags-input/suggestions.vue
:::

## Used components

- [Tag](../tag)
