# Routing

Flux links accept URL strings and objects with `pathname`, `search` and `hash`. They render anchors. To keep navigation inside your router, handle a component’s click callback or compose its content with your router’s link component when the component supports `asChild`.

```tsx
import {FluxPrimaryButton} from '@flux-ui/react';

export function AccountLink() {
    return <FluxPrimaryButton type="link" href="/account" label="Account"/>;
}
```

## Application shell

`FluxApplication` accepts `route` and `router` props. `route.fullPath` identifies the location, and `route.matched` lists the matching records from outermost to innermost. A record can provide a React component under `components.menu`; `FluxApplicationMenuContextStack` renders those menu levels. The router object provides `back()` and, optionally, `navigate(to)`.

```tsx
import {FluxApplication, type FluxApplicationRoute, type FluxApplicationRouter} from '@flux-ui/react';
import type {ReactNode} from 'react';

export function AppShell({route, router, children}: {
    route: FluxApplicationRoute;
    router: FluxApplicationRouter;
    children: ReactNode;
}) {
    return <FluxApplication route={route} router={router}>{children}</FluxApplication>;
}
```

Map your chosen router’s location and navigation methods to this interface. Flux does not install or configure a routing library. Ordinary Flux anchors do not automatically call the supplied `navigate` method; use `useRouter()` within the application shell when a custom menu action needs it.

The [application playground](/react/application/playground) includes a local route adapter and nested menus. The [overlay](/react/components/overlay#router-driven) and [slide over](/react/components/slide-over#router-driven) pages show URL-controlled dialogs.
