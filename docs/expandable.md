# <flux-expandable/>

A component that provides a toggleable container for additional content. It consists of a header with a label ,
and a body that holds the expandable content. When the header button is clicked, the body opens or closes to
reveal or hide the content.

### Props

| Name    | Type     | Description                                    |
|---------|----------|------------------------------------------------|
| `label` | `string` | The label used in the header of the component. |

### Emits

| Name     | Type                | Description                            |
|----------|---------------------|----------------------------------------|
| `toggle` | `(opened: boolean)` | The new opened state of the component. |

### Slots

| Name    | Context                                                                                |
|---------|----------------------------------------------------------------------------------------|
| default | { label: string; close: Function; }                                                    |
| header  | { label: string; isOpen: boolean; close: Function; open: Function; toggle: Function; } |
| body    | { label: string; close: Function; }                                                    |
