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

Todo
