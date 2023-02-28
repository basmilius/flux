# <flux-menu-item/>

A menu item is an action within a `<flux-menu/>` or `<flux-menu-group/>`. It is used to
navigate the user away from the current screen or to perform an action.

### Props

| Name          | Type                            | Description                                                                                                                                                                       |
|---------------|---------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`        | `'button' \| 'link' \| 'route'` | The type of target of the menu item.<br>- `button` is for handling the `click` event yourself.<br>- `link` is used for external links.<br>- `route` is used for internal routing. |
| `icon-after`  | `IconNames`                     | The icon to use at the end of the menu item.                                                                                                                                      |
| `icon-before` | `IconNames`                     | The icon to use at the start of the menu item.                                                                                                                                    |
| `is-loading`  | `boolean`                       | If the menu item should show a loading state. If this is true, the start icon will be hidden.                                                                                     |
| `label`       | `string`                        | The label of the menu item.                                                                                                                                                       |
| `href`        | `string`                        | The external link target.                                                                                                                                                         |
| `rel`         | `string`                        | The external link rel.                                                                                                                                                            |
| `target`      | `string`                        | The external link target.                                                                                                                                                         |
| `to`          | `Location`                      | The internal routing target.                                                                                                                                                      |

### Emits

| Name    | Type                      | Description                              |
|---------|---------------------------|------------------------------------------|
| `click` | `(evt: MouseEvent): void` | Triggered when the menu item is clicked. |
