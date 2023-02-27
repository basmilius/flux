# <flux-segmented-control/>

The segmented control component is a UI element that allows users to choose between multiple options, by
selecting one of the multiple segments. Each segment is represented as a button, with a distinct label,
and the currently selected segment is indicated visually, for example, by a highlighted background. The 
component is commonly used in navigation, forms, or settings, and provides a compact and intuitive way for
users to make a choice.

### Props

| Name    | Type       | Description                                |
|---------|------------|--------------------------------------------|
| `items` | `string[]` | The segments as strings.                   |
| `value` | `integer`  | The index of the currently active segment. |

### Emits

| Name    | Type                    | Description                         |
|---------|-------------------------|-------------------------------------|
| `input` | `(index: number): void` | Triggered when the segment changes. |
