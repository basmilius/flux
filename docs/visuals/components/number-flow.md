---
outline: deep

props:
    -   name: value
        description: The number that is displayed. Whenever this value changes, the display tweens from the value on screen to the new one.
        type: number

    -   name: animate-on-mount
        description: Count up from zero to value when the component first mounts. Turn this off to render the final value immediately.
        type: boolean
        default: true
        optional: true

    -   name: duration
        description: The tween duration, in milliseconds.
        type: number
        default: 800
        optional: true

    -   name: easing
        description: The easing curve the rAF tween samples each frame. Accepts a JavaScript easing function, a cubic-bezier() string or one of the named keywords. The default matches the --swift-out curve from @flux-ui/components.
        type: [ '"linear"', '"ease-in"', '"ease-out"', '"ease-in-out"', 'cubic-bezier(x1, y1, x2, y2)', '(t: number) => number' ]
        default: 'cubic-bezier(0.55, 0, 0.1, 1)'
        optional: true

    -   name: format
        description: Intl.NumberFormat options used to render every frame, for thousands separators, currency, percentages and decimals. When omitted the value is rendered as a whole number.
        type: Intl.NumberFormatOptions
        optional: true

    -   name: locale
        description: The locale passed to Intl.NumberFormat. Defaults to the runtime locale.
        type: string
        optional: true
---

# Number flow

Number flow renders a single `<span>` that tweens smoothly between numbers, ideal for KPI tiles, counters and live metrics. On mount it counts up from zero, and whenever `value` changes it rolls from the number currently on screen to the new one. Every frame is rendered through `Intl.NumberFormat`, so thousands separators, currency, percentages and decimals all animate cleanly, and tabular figures keep the value from shifting horizontally as digits change.

::: render
render=../../code/visuals/number-flow/preview.vue
:::

::: tip
The tween respects `prefers-reduced-motion`: when reduced motion is requested the value swaps straight to its target instead of tweening. The final, settled value is always exposed as the accessible label, so screen readers read the real number rather than the frames streaming past.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || Bind a reactive value and the display tweens every time it changes.
example=../../code/visuals/number-flow/basic.vue
:::

::: example Easing || Swap the easing curve through the easing prop: a named keyword, a cubic-bezier() string or your own function. Each row tweens to the same value so the curves are easy to compare.
example=../../code/visuals/number-flow/easing.vue
:::

::: example KPI tile || A live dashboard stat: the value counts up on mount and rolls each time the underlying data updates, formatted as currency.
example=../../code/visuals/number-flow/kpi-tile.vue
:::

::: example Formatting || Pass Intl.NumberFormat options through format to render currency, percentages and decimals, each tweening in its own format.
example=../../code/visuals/number-flow/formatting.vue
:::
