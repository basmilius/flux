# Settings

A settings screen is where the entire form layer comes together: text inputs, selects, pickers, toggles and grouped choices, organised into sections with clear affordances. This recipe lays out a profile form and its preference controls.

::: render
render=../../code/guide/patterns/settings/preview.vue
:::

`FluxForm` wraps the pane so the footer's `FluxPublishButton` submits it. Fields are grouped with `FluxFormSection` and laid out with `FluxFormRow`, `FluxFormGrid` and `FluxFormColumn`. Helper text uses `FluxFormFieldAddition`, and composite inputs use `FluxFormInputGroup` with a `FluxFormInputAddition`.

## Examples

::: example Preference controls || Grouped checkboxes and radios, sliders, a rating, a tags input, and a `FluxDisabled` section — every interactive form control in one place.
example=../../code/guide/patterns/settings/controls.vue
:::

::: example Notification list || A settings list where each row is `is-control`: clicking anywhere on the row toggles its `FluxToggle`, because `FluxItem` renders as the control's label element.
example=../../code/guide/patterns/settings/notifications.vue
:::

::: example Pickers || Color, date, date-range, date-time, time-zone, tree-view and async-select inputs.
example=../../code/guide/patterns/settings/pickers.vue
:::

## Used components

`FluxForm`, `FluxFormSection`, `FluxFormColumn`, `FluxFormRow`, `FluxFormGrid`, `FluxFormField`, `FluxFormFieldAddition`, `FluxFormInput`, `FluxFormInputGroup`, `FluxFormInputAddition`, `FluxFormNumberInput`, `FluxFormPinInput`, `FluxFormTextArea`, `FluxFormSelect`, `FluxFormSelectAsync`, `FluxFormCombobox`, `FluxFormCheckbox`, `FluxFormCheckboxGroup`, `FluxFormRadio`, `FluxFormRadioGroup`, `FluxFormSlider`, `FluxFormRangeSlider`, `FluxFormRating`, `FluxFormTagsInput`, `FluxFormDateInput`, `FluxFormDateRangeInput`, `FluxFormDateTimeInput`, `FluxFormTimeZonePicker`, `FluxFormTreeViewSelect`, `FluxToggle`, `FluxColorPicker`, `FluxColorSelect`, `FluxDisabled`, `FluxItem`, `FluxItemMedia`, `FluxItemContent`, `FluxItemActions`, `FluxItemStack`, `FluxBoxedIcon`, `FluxNotice`, `FluxNoticeStack`, `FluxDivider`, `FluxSeparator`, `FluxPublishButton`, `FluxSecondaryButton`, `FluxSpacer`, `FluxPane`, `FluxPaneHeader`, `FluxPaneBody`, `FluxPaneFooter`.
