# Helpers

Import helpers from `@flux-ui/react`. The compatibility exports include filter helpers, focus utilities, input masking, colors and geometry.

The filter factory in this branch is an identity function. It does not compile component metadata or register filters. Compose the React filter components with the props documented on their pages.

```tsx
import { isFluxFormSelectOption, resolveTo } from '@flux-ui/react';

const href = resolveTo({pathname: '/account', hash: '#profile'});
const isOption = isFluxFormSelectOption({label: 'One', value: 1});
```

The [internals pages](/react/internals/) list the current helper signatures. Export coverage does not guarantee the same behavior as the original implementation; the [status page](/react/status) lists the known gaps.
