---
outline: deep

props:
    -   name: button-icon
        description: The icon that is used for the more button.
        type: FluxIconName
        optional: true
        default: ellipsis-h

    -   name: flyout-direction
        description: The direction of the flyout.
        type: FluxDirection
        optional: true
        
    -   name: flyout-is-auto-width
        description: If the flyout width should be the same as the opener.
        type: boolean
        
    -   name: flyout-margin
        description: The margin offset from the opener to the flyout.
        type: number
        optional: true
        
    -   name: flyout-width
        description: The width of the flyout.
        type: number
        optional: true

slots:
    -   name: button
        description: The button with the primary action.
        type:
            close: '(): void'
            open: '(): void'
            toggle: '(): void'
            
    -   name: flyout
        description: The content of the flyout.
        type:
            close: '(): void'
            paneX: number
            paneY: number
            openerWidth: number
            openerHeight: number
            
requiredIcons:
    - ellipsis-h
---

# Split

Split buttons are buttons that have one primary action and multiple secondary actions. A common usecase for this component is a download button with more options for that download.

::: render
render=../../../code/guide/components/button/split/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic split button.
render=../../../code/guide/components/button/split/basic.vue
:::

## Used components

- [Button](../button)
    - [Secondary](../button/secondary)
- [Flyout](../flyout)
