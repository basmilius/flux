# Helpers

Import helpers from `@flux-ui/react`. The compatibility exports include filter helpers, focus utilities, input masking, colors and geometry.

`defineFilter` types a factory for a custom filter’s metadata. Assign the result to the component’s `filterDefinition` property; `FluxFilter` and `FluxFilterBar` use it to discover the filter, initialize defaults and render its value summary. See [custom filters](/react/components/filter/#custom-filters).

```tsx
import { isFluxFormSelectOption, resolveTo } from '@flux-ui/react';

const href = resolveTo({pathname: '/account', hash: '#profile'});
const isOption = isFluxFormSelectOption({label: 'One', value: 1});
```

The [internals pages](/react/internals/) list the current helper signatures. The [status page](/react/status) describes the source comparison and browser checks.
