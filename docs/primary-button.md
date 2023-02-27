# <flux-primary-button/>

Primary buttons are the main call-to-action on a page or interface, used to initiate the most important
actions. The purpose of a primary button is to guide the user towards completing a key task, such as
submitting a form, making a purchase, or starting a process. When designing your interface, prioritize
the placement and design of primary buttons to ensure that they are easy to find and use, and that they
clearly communicate the purpose of the action.

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
