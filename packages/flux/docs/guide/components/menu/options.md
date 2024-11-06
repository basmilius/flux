---
outline: deep

props:
    -   name: is-horizontal
        description: Indicates that the items should flow horizontally.
        type: boolean
        optional: true
        
slots:
    -   name: default
        description: The content of the options group.
---

<script
    lang="ts"
    setup>
    import { ref } from 'vue';
    import { FluxMenu, FluxMenuItem, FluxMenuOptions, FluxPane, FluxSeparator } from '@basmilius/flux';
    import BothExample from '../../../code/guide/components/menu/group/both.vue';
    import HorizontalExample from '../../../code/guide/components/menu/group/horizontal.vue';
    import VerticalExample from '../../../code/guide/components/menu/group/vertical.vue';
    import SeparatedExample from '../../../code/guide/components/menu/group/separated.vue';

    const alignment = ref(0);
    const variant = ref(0);
</script>

# Menu options

This component provides a container for grouping menu items that behave like options, allowing only one to be selected at a time. Its layout can be adjusted based on the `isHorizontal` prop. When set to horizontal, it applies a specific style; otherwise, it defaults to a vertical layout.

<Preview>
    <FluxPane style="width: 270px">
        <FluxMenu>
            <FluxMenuOptions v-model="alignment" is-horizontal>
                <FluxMenuItem icon-before="align-left"/>
                <FluxMenuItem icon-before="align-center"/>
                <FluxMenuItem icon-before="align-right"/>
                <FluxMenuItem icon-before="align-justify"/>
            </FluxMenuOptions>
            <FluxSeparator/>
            <FluxMenuOptions v-model="variant" mode="select">
                <FluxMenuItem
                    v-for="i of 5"
                    :label="`Menu item ${i}`"/>
            </FluxMenuOptions>
        </FluxMenu>
    </FluxPane>
</Preview>

<FrontmatterDocs/>

## Examples

### Vertical

Vertical groups are for combining menu items that share context.

<Preview>
    <VerticalExample style="width: 270px"/>
</Preview>

<<< @/code/guide/components/menu/group/vertical.vue

### Horizontal

Horizontal groups are perfect for menu items that together form a single state, such as the alignment of text.

<Preview>
    <HorizontalExample style="width: 270px"/>
</Preview>

<<< @/code/guide/components/menu/group/horizontal.vue

### Separated

Groups can also be separated using the [Separator](../separator).

<Preview>
    <SeparatedExample style="width: 270px"/>
</Preview>

<<< @/code/guide/components/menu/group/separated.vue

### Both

Menu's can also have both horizontal and vertical groups in them.

<Preview>
    <BothExample style="width: 270px"/>
</Preview>

<<< @/code/guide/components/menu/group/both.vue
