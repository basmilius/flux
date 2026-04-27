# Helper functions

Utility type guards for working with form select data structures.

## isFluxFormSelectGroup

Checks if a given item is a [Form select](../../components/form/select/) group.

```ts
import { isFluxFormSelectGroup } from '@flux-ui/components';

if (isFluxFormSelectGroup(item)) {
    console.log('This is a group with children:', item.label);
}
```

## isFluxFormSelectOption

Checks if a given item is a [Form select](../../components/form/select/) option.

```ts
import { isFluxFormSelectOption } from '@flux-ui/components';

if (isFluxFormSelectOption(item)) {
    console.log('This is a selectable option with value:', item.value);
}
```

## Type declarations

```ts
declare function isFluxFormSelectGroup(item: unknown): item is FluxFormSelectGroup;

declare function isFluxFormSelectOption(item: unknown): item is FluxFormSelectOption;
```
