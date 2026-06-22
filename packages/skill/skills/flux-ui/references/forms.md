# Forms

Flux forms are **compositional**: a `FluxForm` wraps the form, each control is
wrapped in a `FluxFormField` that supplies the label/hint/error, and the control
itself (`FluxFormInput`, `FluxFormSelect`, …) goes in the field's default slot.
Content usually sits inside a `FluxPaneBody`.

## Canonical structure (verified)

```vue
<template>
  <FluxPane style="max-width: 390px">
    <FluxForm>
      <FluxPaneBody>
        <FluxFormField label="Label" is-optional
          hint="A helpful hint can be shown here."
          error="Something is wrong with the input!">
          <FluxFormInput placeholder="Any input here!" />
        </FluxFormField>
      </FluxPaneBody>
    </FluxForm>
  </FluxPane>
</template>
<script lang="ts" setup>
  import { FluxForm, FluxFormField, FluxFormInput, FluxPane, FluxPaneBody } from '@flux-ui/components';
</script>
```

## FluxFormField props

- `label: string` — the field label.
- `error?: string` — error message shown after the input.
- `hint?: string` — hint message shown after the input.
- `is-optional?: boolean` — marks the field optional.
- `max-length?: number` / `current-length?: number` — character counter.

Slots: `default ({ id })` (the control — `id` is provided for wiring the label),
`addition` (extra rows, see below), `value` (a value shown next to the label).

## Multiple hints / errors

For more than one message, use the field's `#addition` slot and one
`FluxFormFieldAddition` per message:

```vue
<FluxFormField label="Label">
  <FluxFormInput placeholder="Any input here!" />
  <template #addition>
    <FluxFormFieldAddition v-for="h in hints" :key="h"
      icon="circle-info" mode="hint" :message="h" />
    <FluxFormFieldAddition v-for="e in errors" :key="e"
      icon="circle-exclamation" mode="error" :message="e" />
  </template>
</FluxFormField>
```

`FluxFormFieldAddition` props: `icon` (FA name), `mode: "hint" | "error"`,
`message`. Register `circle-info` and `circle-exclamation` for the default look.

## Controls (wrap each in a FluxFormField)

**Note the naming traps** (`FluxToggle`, `FluxQuantitySelector`,
`FluxFormRangeSlider`, `Flux…Input` dates).

- Text: `FluxFormInput` (+ `FluxFormInputGroup`, `FluxFormInputAddition`).
- Numeric: `FluxFormNumberInput`, `FluxQuantitySelector`.
- Long text: `FluxFormTextArea`.
- Choice: `FluxFormSelect`, `FluxFormSelectAsync` (async-loaded options),
  `FluxFormCombobox` (input + filtered options).
- Boolean: `FluxToggle`, `FluxFormCheckbox` (+ `FluxFormCheckboxGroup`). Bind a
  plain boolean `v-model` — **do not set `is-switch`** by default; it's a rare
  stylistic variant, not the normal toggle (real apps use `<FluxToggle v-model />`
  with no extra props).
- Pick-one: `FluxFormRadioGroup` wrapping `FluxFormRadio` items.
- Range: `FluxFormSlider`, `FluxFormRangeSlider`.
- Date/time: `FluxFormDateInput`, `FluxFormDateRangeInput`,
  `FluxFormDateTimeInput`, `FluxFormTimeZonePicker`. (A time-only field is
  documented as "coming soon".)
- Tags: `FluxFormTagsInput` (tag/token entry).
- Rating: `FluxFormRating` (star/rating input).
- Specialised: `FluxFormPinInput`, `FluxFormTreeViewSelect`, `FluxColorPicker`,
  `FluxColorSelect`.

### Select options

`FluxFormSelect` options use the `FluxFormSelectEntry` shape; the type guards
`isFluxFormSelectOption` and `isFluxFormSelectGroup` are exported for narrowing
option vs group entries.

## Form layout helpers

`FluxFormSection` (titled section), `FluxFormRow`, `FluxFormColumn`,
`FluxFormGrid` arrange multiple fields. For overall page layout use the layout
primitives instead (`references/layout.md`).

> **`FluxFormColumn` has no `span` prop** — it's a plain cell. Column widths come
> from `FluxFormGrid`'s `:columns="n"`, which lays out its `FluxFormColumn`
> children in **n equal tracks**. For uneven widths, use `FluxFormRow` (or a
> different column count), not a `span`.

## Submit

The submit button uses `is-submit`; a primary submit is typically a
`FluxPrimaryButton is-submit`. Pair with `FluxButtonStack` for submit + cancel.

## Pattern: CRUD form

The docs include a worked **CRUD form** pattern at
`https://flux-ui.dev/guide/patterns/crud-form` — read it before building a
create/edit form; it shows the idiomatic wiring of fields, validation messages,
and submit/cancel actions. A real-app skeleton (page wrapper, `FluxFormSection` /
`FluxFormRow` grouping, `is-submit`, `FluxDropZone` upload) is in
`references/patterns.md` §2.
