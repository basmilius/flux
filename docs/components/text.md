---
outline: deep

props:
    -   name: align
        description: The horizontal text alignment.
        type: [ '"start"', '"center"', '"end"' ]
        optional: true

    -   name: color
        description: The color of the text. Use a FluxColor, or one of the semantic keywords muted and prominent.
        type: [ 'FluxColor', '"muted"', '"prominent"' ]
        optional: true

    -   name: size
        description: The size of the text, mapped onto the Flux type scale.
        type: [ '"small"', '"medium"', '"large"', '"display"' ]
        optional: true

    -   name: tabular
        description: Renders digits with tabular figures, useful for aligning numbers in columns.
        type: boolean
        optional: true

    -   name: tag
        description: The HTML element that is rendered. Defaults to a span.
        type: string
        optional: true

    -   name: truncate
        description: Truncates the text to a single line with an ellipsis.
        type: boolean
        optional: true

    -   name: weight
        description: The font weight of the text, as a standard numeric font-weight value.
        type: [ '100', '200', '300', '400', '500', '600', '700', '800', '900' ]
        optional: true

slots:
    -   name: default
        description: The text content.
---

# Text

The Text component renders inline or block text styled with the Flux type scale. It keeps typography consistent across your app, so you don't have to reach for custom CSS to set a size, weight, color, or tabular figures.

::: render
render=../code/components/text/preview.vue
:::

::: tip
By default Text renders a `span` and inherits the surrounding font size. Set the `size` prop to opt into the type scale, or use `tag` to render a different element such as a `p`.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A simple piece of text, inheriting the surrounding font size.
example=../code/components/text/basic.vue
:::

::: example Sizes || The size prop maps onto the Flux type scale, from small captions up to display numbers.
example=../code/components/text/sizes.vue
:::

::: example Weights || Adjust the emphasis of text with the weight prop.
example=../code/components/text/weights.vue
:::

::: example Colors || Use a semantic keyword like muted, or any FluxColor.
example=../code/components/text/colors.vue
:::

::: example Numbers || Combine tabular figures with a display size for metrics and KPIs.
example=../code/components/text/numbers.vue
:::
