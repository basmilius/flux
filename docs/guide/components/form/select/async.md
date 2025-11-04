---
outline: deep

emits:
    -   name: update:model-value
        description: Triggered when the value is changed.
        type: [ FluxFormSelectValue ]

props:
    -   name: model-value
        description: The selected value(s) of the select element.
        type: FluxFormSelectValue

    -   name: disabled
        description: If the select element is disabled.
        type: boolean
        optional: true

    -   name: is-multiple
        description: If the select element allows multiple values to be selected.
        type: boolean
        optional: true

    -   name: placeholder
        description: The placeholder text to display when no value is selected.
        type: string
        optional: true
        
    -   name: fetch-options
        description: The function to call when the form select needs options by their id.
        type: [ 'fetchOptions(ids: FluxFormSelectValueSingle[]): Promise<FluxFormSelectEntry[]>' ]
        
    -   name: fetch-relevant
        description: The function to call when the form select needs relevant options.
        type: [ 'fetchRelevant(): Promise<FluxFormSelectEntry[]>' ]
        
    -   name: fetch-search
        description: The function to call when the form select needs options based on the given search query.
        type: [ 'fetchSearch(searchQuery: string): Promise<FluxFormSelectEntry[]>' ]

requiredIcons:
    - angle-down
    - magnifying-glass
---

# Select async

This is a dynamic form select element that retrieves options dynamically, allowing the user to choose from a list of selections. It resembles a drop-down menu but offers enhanced functionality. The select element can be tailored to permit the selection of multiple values, making it convenient for users who need to choose more than one option. It's particularly beneficial for forms requiring multiple selections, such as selecting multiple interests, hobbies, or preferences.

::: render
render=../../../../code/guide/components/form/select/async/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic asynchronous form select.
example=../../../../code/guide/components/form/select/async/basic.vue
:::

::: example Multiple || An asynchronous form select in where you can select multiple options.
example=../../../../code/guide/components/form/select/async/multiple.vue
:::

## Used components

- [Form](../../form)
    - [Input](../input)
- [Menu](../../menu)
    - [Item](../../menu/item)
    - [Group](../../menu/group)
    - [SubHeader](../../menu/sub-header)
- [Icon](../../icon)
- [Spinner](../../spinner)
- [Tag](../../tag)
