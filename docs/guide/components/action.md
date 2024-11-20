---
outline: deep

emits:
    -   name: click
        description: Triggered when the button is clicked.
        type: [ MouseEvent ]

    -   name: mouseenter
        description: Triggered when the button is being hovered.
        type: [ MouseEvent ]

    -   name: mouseleave
        description: Triggered when the button is not being hovered anymore.
        type: [ MouseEvent ]

props:
    -   name: type
        description: The type of button.
        type: [ '"button"', '"link"', '"route"' ]
        default: button
        optional: true

    -   name: disabled
        description: Disable the button.
        type: boolean
        optional: true

    -   name: icon
        description: The icon at the end of the button.
        type: IconName
        optional: true

    -   name: is-destructive
        description: Indicates that the action is a destructive action.
        type: boolean
        optional: true

    -   name: is-loading
        description: Shows a loading state within the button instead of the icon at the start.
        type: boolean
        optional: true

    -   name: is-submit
        description: Indicates that the button is a submit button. This will enable form submission.
        type: boolean
        optional: true

    -   name: label
        description: The label that is shown in the button.
        type: string
        optional: true

    -   name: tabindex
        description: The tabindex of the button, works exactly the same as html.
        type: [ 'string', 'number' ]
        optional: true

    -   name: href
        description: This prop is enabled if the button's type is set to link. It's the same as the <a> HTML element.
        type: string
        optional: true

    -   name: rel
        description: This prop is enabled if the button's type is set to link. It's the same as the <a> HTML element.
        type: string
        optional: true

    -   name: target
        description: This prop is enabled if the button's type is set to link. It's the same as the <a> HTML element.
        type: string
        optional: true

    -   name: to
        description: This prop is enabled if the button's type is set to route. This integrates with Vue Router.
        type: To
        optional: true
---

<script
    lang="ts"
    setup>
    import { FluxAction, FluxActions, FluxPane, FluxPaneBody } from '@basmilius/flux';
</script>

# Action

Actions can be used to add functionality to components like data tables. They can navigate to another view or perform an in-page action, such as displaying a share overlay.

<Preview>
    <FluxPane>
        <FluxPaneBody>
            <FluxActions>
                <FluxAction
                    icon="circle-xmark"
                    is-destructive/>
                <FluxAction icon="circle-sort"/>
                <FluxAction icon="circle-minus"/>
            </FluxActions>
        </FluxPaneBody>
    </FluxPane>
</Preview>

<FrontmatterDocs/>

## Examples

Todo

## Snippet

```vue
<FluxAction icon="trash"/>
```

## Used components

- [Icon](./icon)
- [Spinner](./spinner)
