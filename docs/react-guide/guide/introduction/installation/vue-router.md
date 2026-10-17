# Routing

Connect your router with `FluxRouterProvider`. Components using `type="route"` and `to` resolve their URL through `router.resolve` and call `router.navigate` for an unmodified click. Modifier keys and links opening another browsing context retain normal browser behavior.

```tsx
import {FluxPrimaryButton, FluxRouterProvider, type FluxRoute, type FluxRouter} from '@flux-ui/react';

export function AccountNavigation({route, router}: {route: FluxRoute; router: FluxRouter}) {
    return <FluxRouterProvider route={route} router={router}>
        <FluxPrimaryButton type="route" to="/account" label="Account"/>
    </FluxRouterProvider>;
}
```

`FluxTo` accepts URL strings, path objects and named routes with parameters. Map `resolve(to)` and `navigate(to)` to your routing library; `back()` handles backward navigation. For an ordinary browser link, use `type="link"` with `href`.

## Application shell

`FluxApplication` accepts `route` and `router` directly and supplies the routing context to its children. `route.fullPath` identifies the location, and `route.matched` lists matching records from outermost to innermost. A record can provide a React component under `components.menu`; `FluxApplicationMenuContextStack` renders those menu levels.

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

Flux does not install or configure a routing library. Keep `route` synchronized with your router so active menu items, collapsible groups and nested menus follow navigation.

The [application playground](/react/application/playground) includes a local route adapter and nested menus. The [overlay](/react/components/overlay#router-driven) and [slide over](/react/components/slide-over#router-driven) pages show URL-controlled dialogs.
