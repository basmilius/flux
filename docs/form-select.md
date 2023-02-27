# <flux-form-select/>

This is a form select element that allows the user to choose from a list of options. It is similar to a
drop-down menu, but with more advanced functionality. The select element can be configured to allow for
the selection of multiple values, which is useful when the user needs to select more than one option.
It's a great option for forms that require multiple selections, such as when a user needs to choose
multiple interests, hobbies, or preferences.

### Props

| Name          | Type                                              | Description                                        |
|---------------|---------------------------------------------------|----------------------------------------------------|
| `is-editable` | `boolean`                                         | Wether the user can search for options.            |
| `is-multiple` | `boolean`                                         | Wether multi select is allowed.                    |
| `options`     | `(FluxFormSelectOption \| FluxFormSelectGroup)[]` | The options that are available in the form select. |
| `placeholder` | `string`                                          | The placeholder shown.                             |
| `value`       | `string \| number \| (string \| number)[]`        | The current value.                                 |

### Emits

| Name    | Type                                                      | Description                                          |
|---------|-----------------------------------------------------------|------------------------------------------------------|
| `input` | `(value: string \| number \| (string \| number)[]): void` | Triggered when the content of the input has changed. |
