# <flux-notice/>

A notice component is a UI component that displays a message to the user, typically to provide information
or alert them to a particular status or event. The component may include an icon, message, and an optional
title. It is used to communicate important information to the user in a clear and concise manner.

### Props

| Name         | Type                                          | Description                                    |
|--------------|-----------------------------------------------|------------------------------------------------|
| `icon`       | `IconNames`                                   | The icon used for the notice.                  |
| `is-loading` | `boolean`                                     | Wether the notice should show a loading state. |
| `message`    | `string`                                      | The message of the notice.                     |
| `title`      | `string`                                      | The title of the notice.                       |
| `variant`    | `'error' \| 'info' \| 'success' \| 'warning'` | The notice variant.                            |
