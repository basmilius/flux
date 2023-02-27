# <flux-publish-button/>

Publish buttons are used to initiate the publishing process for content. When creating or editing content, a
publish button is typically the final step before making the content live and accessible to a wider audience.
The publish button may only be used for publish actions.

### Props

| Name         | Type                            | Description                                                                                                                                                                    |
|--------------|---------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`       | `'button' \| 'link' \| 'route'` | The type of target of the button.<br>- `button` is for handling the `click` event yourself.<br>- `link` is used for external links.<br>- `route` is used for internal routing. |
| `icon-after` | `IconNames`                     | The icon to use at the end of the button.                                                                                                                                      |
| `is-done`    | `boolean`                       | If the publish action is done.                                                                                                                                                 |
| `is-loading` | `boolean`                       | If the publish action is currently in process.                                                                                                                                 |
| `label`      | `string`                        | The label of the button.                                                                                                                                                       |
| `to`         | `Location`                      | The internal routing target.                                                                                                                                                   |

### Emits

| Name    | Type                      | Description                           |
|---------|---------------------------|---------------------------------------|
| `click` | `(evt: MouseEvent): void` | Triggered when the button is clicked. |
