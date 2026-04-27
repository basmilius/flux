# useFormFieldInjection

This composable provides access to the [Form field](../../components/form/field/) context. It supplies a unique ID that can be used for `for`/`id` attribute pairing between labels and inputs.

## Usage

```ts
import { useFormFieldInjection } from '@flux-ui/components';

const { id } = useFormFieldInjection();
```

## Type declarations

```ts
declare function useFormFieldInjection(): {
    readonly id: string;
};
```

## Used by

- [Form](../../components/form/)
    - [Input](../../components/form/input/)
    - [Select](../../components/form/select/)
    - [Text area](../../components/form/text-area)
