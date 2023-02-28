# <flux-toggle/>

A toggle component is a type of user interface element that allows the user to switch between two
states, such as "on" and "off." It is often represented as a switch or button that can be flipped
to change the state. Toggles are commonly used in settings menus or options pages, allowing users
to enable or disable specific features or settings. They provide a simple and intuitive way for
users to interact with the interface and control the behavior of the application.

### Props

| Name    | Type      | Description              |
|---------|-----------|--------------------------|
| `value` | `boolean` | The state of the toggle. |

### Emits

| Name    | Type               | Description                      |
|---------|--------------------|----------------------------------|
| `input` | `(value: boolean)` | The updated state of the toggle. |
