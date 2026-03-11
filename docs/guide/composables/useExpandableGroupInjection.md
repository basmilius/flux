# useExpandableGroupInjection

This composable provides access to the [Expandable group](../components/expandable/group) context. It allows child expandable items to register with the group and respond to group-level actions like closing all items.

## Usage

```ts
import { useExpandableGroupInjection } from '@flux-ui/components';

const { closeAll, register, unregister } = useExpandableGroupInjection();
```

## Type declarations

```ts
declare function useExpandableGroupInjection(): {
    closeAll(): void;
    register(uid: number, instance: object): void;
    unregister(uid: number): void;
};
```

## Used by

- [Expandable](../components/expandable/)
