# <flux-validated-form-field/>

The same as `<flux-form-field/>`, but adds validation from `vee-validate`.

### Props

| Name          | Type      | Description                                              |
|---------------|-----------|----------------------------------------------------------|
| `error`       | `string`  | The error that should be shown below the form element.   |
| `hint`        | `string`  | The hint that should be shown below the form element.    |
| `is-optional` | `boolean` | Marks the field as optional.                             |
| `label`       | `string`  | The label of the form element.                           |
| `rules`       | `string`  | The validation rule. Refer to vee-validate for examples. |
