# Types

Import React types from `@flux-ui/react`. Each component page lists the props accepted by the current implementation, including callback and render-prop types.

```tsx
import type { ComponentProps } from 'react';
import { FluxPrimaryButton } from '@flux-ui/react';
import type { FluxColor, FluxSize, FluxTo } from '@flux-ui/react';

type ButtonProps = ComponentProps<typeof FluxPrimaryButton>;
```

`ComponentProps` also works for components that do not export a separate named props type.

## Routing

`FluxTo` is a URL string or an object with optional `path`, `pathname`, `name`, `params`, `query`, `search` and `hash` fields. Provide `router.resolve(to)` through `FluxRouterProvider` to resolve named routes with your routing library.

## Shared data

The React package re-exports shared data types where they are framework-independent. Prefer the React entry point for component contracts; types from the original framework packages can describe a different API.
