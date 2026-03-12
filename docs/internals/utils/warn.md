# warn

Logs a console warning prefixed with `[Flux]`. Used internally to notify developers of potential issues or misuse of components.

## Usage

```ts
import { warn } from '@flux-ui/internals';

warn('Component requires a parent FluxRoot.');
```

## Type declarations

```ts
declare function warn(...data: any[]): void;
```
