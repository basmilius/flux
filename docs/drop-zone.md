# <flux-drop-zone/>

Allows files to be dropped on the contents of the drop zone. This is mainly used in ui elements
that allow users to upload files. It can be used in combination with `flux-gallery` for example.

### Props

| Name                  | Type        | Description                                                              |
|-----------------------|-------------|--------------------------------------------------------------------------|
| `accept`              | `string`    | Which files to accept, same as the accept attribute on input[type=file]. |
| `is-disabled`         | `boolean`   | Wether the drop zone is disabled.                                        |
| `is-empty`            | `boolean`   | Wether the placeholder should be shown.                                  |
| `is-multiple`         | `boolean`   | If it's allowed to upload multiple files.                                |
| `placeholder-button`  | `string`    | The text on the button within the placeholder.                           |
| `placeholder-icon`    | `IconNames` | The icon of the placeholder.                                             |
| `placeholder-message` | `string`    | The message of the placeholder.                                          |
| `placeholder-title`   | `string`    | The title of the placeholder.                                            |

### Emits

| Name     | Type                      | Description                                   |
|----------|---------------------------|-----------------------------------------------|
| `select` | `(files: FileList): void` | Triggered when files are dropped or selected. |

### Slots

| Name    | Context                                                                 |
|---------|-------------------------------------------------------------------------|
| default | { isDragging: boolean; isDraggingOver: boolean; showPicker: Function; } |
