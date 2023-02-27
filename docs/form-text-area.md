# <flux-form-text-area/>

This is a customizable text area element that can be used to capture longer-form user input, such
as comments, messages, or descriptions. It's similar to a regular text input element, but with a
larger box that can accommodate multiple lines of text. The text area element can emit events on
input change, blur, and focus, making it easy to handle user input in real-time.

### Props

| Name            | Type      | Description                                                                          |
|-----------------|-----------|--------------------------------------------------------------------------------------|
| `auto-complete` | `string`  | A string to define auto complete, refer to the html docs which values are supported. |
| `auto-focus`    | `boolean` | Wether the input should receive focus on mount.                                      |
| `max-length`    | `number`  | The maximum length of the content of the input.                                      |
| `placeholder`   | `string`  | A placeholder that is shown when no content is entered.                              |
| `rows`          | `number`  | The amount of rows the text area should have by default.                             |
| `value`         | `string`  | The value of the input.                                                              |

### Emits

| Name    | Type                    | Description                                          |
|---------|-------------------------|------------------------------------------------------|
| `blur`  | `(): void`              | Triggered when the input is blurred.                 |
| `focus` | `(): void`              | Triggered when the input is focused.                 |
| `input` | `(value: string): void` | Triggered when the content of the input has changed. |
