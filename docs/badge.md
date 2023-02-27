# <flux-badge/>

Badges are used as labels for a more specific element in the UI. This, for example, may be
used to display the status of an order.

### Props

| Name           | Type                                                       | Description                                              |
|----------------|------------------------------------------------------------|----------------------------------------------------------|
| `color`        | `'primary' \| 'error' \| 'info' \| 'success' \| 'warning'` | The color used within the badge.                         |
| `dot`          | `boolean`                                                  | If a dot should be visible within the badge.             |
| `icon`         | `IconNames`                                                | An icon shown within the badge. This supersedes the dot. |
| `is-deletable` | `boolean`                                                  | If the badge is deletable.                               |
| `label`        | `string`                                                   | The label of the badge.                                  |

### Emits

| Name     | Type       | Description                                  |
|----------|------------|----------------------------------------------|
| `delete` | `(): void` | Triggered when the delete button is clicked. |
