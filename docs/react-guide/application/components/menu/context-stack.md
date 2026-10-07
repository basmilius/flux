# Application menu context stack

The context stack renders the `menu` component from each matched route record supplied to `FluxApplication`. Pass ordinary React components in `route.matched[].components.menu`, ordered from the outermost route to the innermost. These are React component references, not lazy Vue route loaders.

The [routing guide](/react/guide/introduction/installation/vue-router) describes the route and router interfaces. The [menu-context playground](/react/application/playground/contexts) demonstrates a working adapter with two nested menu levels.

<FrontmatterDocs/>

## Snippet

<<< @/code/application/menu/context-stack/snippet.vue
