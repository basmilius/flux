# <flux-toolbar-button/>

An action within a `<flux-toolbar/>`.

### Props

| Name          | Type        | Description                                        |
|---------------|-------------|----------------------------------------------------|
| `destructive` | `booleab`   | Wether this action is destructive.                 |
| `icon`        | `IconNames` | The icon used for the toolbar button.              |
| `is-loading`  | `boolean`   | If the toolbar button should show a loading state. |
| `label`       | `string`    | The label of the toolbar button.                   |

### Emits

| Name    | Type                      | Description                                        |
|---------|---------------------------|----------------------------------------------------|
| `click` | `(evt: MouseEvent): void` | Triggered when the toolbar button is clicked. |
