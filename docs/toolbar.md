# <flux-toolbar/>

The toolbar component is used for actions within a certain context. For example: when you
have a stack of products, toolbars can be used to display actions for each product.

### Props

| Name           | Type                                                                   | Description                                                                                                                |
|----------------|------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| `floatingMode` | `'free' \| 'top-start' \| 'top-end' \| 'bottom-start' \| 'bottom-end'` | Where the toolbar is positioned. When `free` is used, the toolbar position should be controlled within your own component. |


### Slots

| Name    | Context |
|---------|---------|
| default | {}      |
