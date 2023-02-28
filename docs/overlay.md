# <flux-overlay/>

An overlay component is a semi-transparent UI element that covers the entire screen and is used to provide
focus and modality to a specific element or action. The overlay blocks interaction with the main content
and only allows interaction with the elements it covers. This component is typically used to display modal
dialogs, popups, or to dim the background when a user interacts with a specific element. It is not
customizable, meaning its appearance and behavior cannot be altered by the user.

### Props

| Name           | Type      | Description                                                  |
|----------------|-----------|--------------------------------------------------------------|
| `is-closeable` | `boolean` | Controls if the overlay should render a close button itself. |

### Emits

| Name    | Type       | Description                           |
|---------|------------|---------------------------------------|
| `close` | `(): void` | Triggered when the overlay is closed. |

### Slots

| Name    | Context |
|---------|---------|
| default | {}      |
