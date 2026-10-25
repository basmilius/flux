# Moving to Flux for React

The React package is new in this branch, so there is no previous React release to upgrade from. Use the [installation guide](./installation/manual) for a new app.

When porting an existing Flux app, keep the component names and replace framework-specific APIs:

| Original API | React API |
| --- | --- |
| Default content | `children` |
| Named content | A React node or render prop, as listed on the component page |
| Two-way model binding | A value prop and its change callback |
| Click event | `onClick` |
| CSS class | `className` |
| Inline style string | A style object |
| Package-specific imports | `@flux-ui/react` |

Read the React props table for each component. Some APIs, including tables and overlays, differ beyond the syntax. See [port status](/react/status) for the API adaptations and validation scope.
