# <flux-stack/>

A stack component is a layout component that arranges child elements in a stack along a specified axis, with
a configurable gap between elements. The axis property defines the direction in which the elements are stacked
(e.g. horizontally or vertically), while the gap property sets the size of the space between elements. Stacks
can be used to organize content in a compact and organized manner, and are commonly used to create simple and
flexible layouts in web and mobile applications.

### Props

| Name          | Type                         | Description                                                                   |
|---------------|------------------------------|-------------------------------------------------------------------------------|
| `axis`        | `'horizontal' \| 'vertical'` | The stack direction.                                                          |
| `gap`         | `integer`                    | The gap between the elements within the stack.                                |
| `is-growing`  | `boolean`                    | If the items within the stack should grow with the stack.                     |
| `is-wrapping` | `boolean`                    | If the items within the stack should wrap when there isn't enough space left. |

### Slots

| Name    | Context |
|---------|---------|
| default | {}      |
