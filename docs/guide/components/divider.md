---
outline: deep

props:
    -   name: content-placement
        description: The placement of the content.
        type: [ 'start', 'center', 'end' ]
        optional: true

slots:
    -   name: default
        description: The content shown within the divider.
---

<script
    lang="ts"
    setup>
    import { FluxDivider, FluxIcon, FluxPane, FluxPaneBody } from '@basmilius/flux';
</script>

# Divider

This component serves as a horizontal content divider, offering the flexibility to include custom content or default to displaying a simple line. The content alignment can be adjusted to the start, center, or end based on the configuration.

<Preview>
    <FluxPane>
        <FluxPaneBody>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur consequuntur debitis delectus distinctio explicabo nostrum rerum sunt voluptatibus? Alias earum ex facilis illum ipsa magnam provident quia quo sapiente ut.</p>
            <FluxDivider/>
            <p>Ab, deserunt eius eos, eveniet explicabo itaque minima officia optio pariatur perspiciatis provident quaerat qui, quo sapiente temporibus veritatis vero voluptates voluptatibus. Commodi dolore in maiores provident quod ratione repudiandae.</p>
            <FluxDivider content-placement="start">
                <FluxIcon variant="bolt"/>
            </FluxDivider>
            <p>Aliquam aperiam corporis, cupiditate eaque esse fuga, hic inventore odio quam quibusdam quisquam suscipit vel voluptatem! Assumenda cumque distinctio dolorem fugit ipsam maiores numquam provident ratione saepe sunt? Facilis, sapiente.</p>
        </FluxPaneBody>
    </FluxPane>
</Preview>

<FrontmatterDocs/>

## Examples

::: example Clear || A standalone divider.
example=../../code/guide/components/divider/clear.vue
:::

::: example Button || A divider with a button at the end.
example=../../code/guide/components/divider/button.vue
:::

::: example Icon || A divider with a centered icon.
example=../../code/guide/components/divider/icon.vue
:::
