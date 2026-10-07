# Sheet

A sheet opens against the bottom, top, left or right edge. Control visibility with `open` and set it to `false` in `onClose`. Set `isCloseable` to enable Escape, backdrop clicks and the grabber’s close action.

Drag the grabber to resize or dismiss the sheet. `snapPoints` accepts fractions of the viewport; arrow keys, Home and End move between them. Content scrolls inside the sheet. Dragging within the content hands off to the sheet at the scroll boundary. Wheel gestures use the same snap points and spring motion.

::: render
render=../code/components/sheet/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A sheet sized to its content.
example=../code/components/sheet/basic.vue
:::

::: example Positions || Choose one of the four edges.
example=../code/components/sheet/positions.vue
:::

::: example Snap points
example=../code/components/sheet/snap-points.vue
:::

::: example Scrollable body || A sheet containing an ordinary scrolling region.
example=../code/components/sheet/scrollable.vue
:::
