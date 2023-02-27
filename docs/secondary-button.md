# <flux-secondary-button/>

A secondary button is a type of button used for secondary actions on a page or interface. These actions may
include less significant tasks, such as editing an item or cancelling a process. The visual design of a
secondary button is often less prominent than a primary button, and is intended to complement the main
call-to-action on the page. Secondary buttons serve as an additional way for users to interact with the
interface and access additional features and functionality. When designing your interface, consider the
importance of the actions associated with each type of button, and choose an appropriate visual design
that clearly communicates the purpose of each button.

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
