---
outline: deep

props:
    -   name: v-model:expanded
        description: Whether the items of a collapsible group are shown.
        type: boolean
        optional: true
        default: true

    -   name: icon
        description: The icon of the header.
        type: FluxIconName
        optional: true

    -   name: is-collapsible
        description: Turns the header into a button that folds the group.
        type: boolean
        optional: true

    -   name: is-separated
        description: Whether a striped separator leads the group. It is hidden for the first group in a list.
        type: boolean
        optional: true
        default: true

    -   name: label
        description: The label of the header.
        type: string
        optional: true

slots:
    -   name: default
        description: The items of the group.

    -   name: header
        description: A custom header for the group.

requiredIcons:
    - angle-down
---

# Card list group

Groups items of a [Card list](./) under an optional header, split from the previous group by a [separator](./separator).

<FrontmatterDocs/>
