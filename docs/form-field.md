# <flux-form-field/>

A form field provides a label and an optional hint or error for another form element. Form fields
should be used as a parent for components such as `<flux-form-input/>`. A form field can also be marked
as optional, which will render the optional text next to the label.

### Props

| Name          | Type      | Description                                            |
|---------------|-----------|--------------------------------------------------------|
| `error`       | `string`  | The error that should be shown below the form element. |
| `hint`        | `string`  | The hint that should be shown below the form element.  |
| `is-optional` | `boolean` | Marks the field as optional.                           |
| `label`       | `string`  | The label of the form element.                         |
