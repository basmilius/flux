# <flux-destructive-button/>

A destructive button is a type of button used for actions that permanently alter data or remove information, such
as deleting an item. Its visual design reflects the seriousness of the action. It's important to use caution and
provide a confirmation prompt before triggering a destructive action.

### Props

| Name          | Type                            | Description                                                                                                                                                                    |
|---------------|---------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`        | `'button' \| 'link' \| 'route'` | The type of target of the button.<br>- `button` is for handling the `click` event yourself.<br>- `link` is used for external links.<br>- `route` is used for internal routing. |
| `icon-after`  | `IconNames`                     | The icon to use at the end of the button.                                                                                                                                      |
| `icon-before` | `IconNames`                     | The icon to use at the start of the button.                                                                                                                                    |
| `is-loading`  | `boolean`                       | If the button should show a loading state. If this is true, the start icon will be hidden.                                                                                     |
| `label`       | `string`                        | The label of the button.                                                                                                                                                       |
| `href`        | `string`                        | The external link target.                                                                                                                                                      |
| `rel`         | `string`                        | The external link rel.                                                                                                                                                         |
| `target`      | `string`                        | The external link target.                                                                                                                                                      |
| `to`          | `Location`                      | The internal routing target.                                                                                                                                                   |

### Emits

| Name    | Type                      | Description                           |
|---------|---------------------------|---------------------------------------|
| `click` | `(evt: MouseEvent): void` | Triggered when the button is clicked. |
