# Performance checks

Use these examples to check selections, asynchronous search and large datasets.

## Async selections

Alice starts selected in both controls. Search for Bob and wait for the results. Alice should remain visible as the current selection, and the selected values below should stay unchanged. In the multiple select, add Bob and remove either selection.

Search for `robert` as well. The server returns Bob for this alias, so Bob should appear even though his label does not contain the query.

::: example Async selections || Selected labels remain visible while search results change.
example=../code/showcase/performance/async-select.vue
:::

## Search races and focus

Open the palette, type `a`, wait until it starts loading, then type `b`. Only the result for `ab` should appear. Repeat while clearing the input, switching to Local, or closing and reopening the palette before a response arrives.

Activate a result with Enter. Close with Escape and check that focus returns to the opener. Unmount and mount the palette between repetitions; keyboard navigation and the controls outside the palette should continue working.

::: example Search races || Short queries respond more slowly than longer queries.
example=../code/showcase/performance/command-palette.vue
:::

## Large datasets

Open the multiselect, search for an option and change the selection. In the tree select, search for `target`; its four ancestors should remain visible. Clear the search and expand or collapse a branch to check that normal navigation still works.

The layout button measures the calculation for a wide layer of 20,000 nodes. It does not mount those nodes. For the rendered result, check the [vertical and horizontal flow examples](../flow/composables/useFlowLayout).

::: example Large datasets || Large option lists, a nested tree and a wide flow layout.
example=../code/showcase/performance/large-lists.vue
:::

## Charts

Check each chart page on its own, including tooltips, resizing and light/dark mode:

- [Bar](../statistics/components/charts/bar), [line](../statistics/components/charts/line), [area](../statistics/components/charts/area) and [mixed](../statistics/components/charts/mixed).
- [Scatter](../statistics/components/charts/scatter), [bubble](../statistics/components/charts/bubble), [box plot](../statistics/components/charts/box-plot) and [candlestick](../statistics/components/charts/candlestick).
- [Pie](../statistics/components/charts/pie), [donut](../statistics/components/charts/donut), [polar area](../statistics/components/charts/polar-area), [radar](../statistics/components/charts/radar), [radial bar](../statistics/components/charts/radial-bar), [heatmap](../statistics/components/charts/heatmap) and [treemap](../statistics/components/charts/treemap).

Also check the existing [overlay examples](../components/overlay) for nested dialogs and focus return.
