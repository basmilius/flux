---
outline: deep

emits:
    -   name: click
        description: Triggered when the event is clicked.
        type: [ MouseEvent ]

props:
    -   name: date
        description: The date or date range of the event.
        type: DateTime | DateTime[]

    -   name: label
        description: The label of the event.
        type: string

slots:
    -   name: tooltip
        description: An optional tooltip for when the event is being hovered.
---

# Calendar

This component is used within the [Calendar](./calendar) component and resembles
a single calendar event.

<FrontmatterDocs/>
