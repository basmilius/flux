<template>
    <ComponentGrid>
        <ComponentGridItem
            v-for="component in components"
            :image-url="component.image"
            :title="component.text"
            :url="component.link"/>
    </ComponentGrid>
</template>

<script
    lang="ts"
    setup>
    import { computed } from 'vue';
    import ComponentGrid from './ComponentGrid.vue';
    import ComponentGridItem from './ComponentGridItem.vue';
    import navigation, { type SidebarItem } from '../component-navigation';

    type Card = {
        readonly text: string;
        readonly link?: string;
        readonly image?: string;
    };

    const {category} = defineProps<{
        readonly category?: string;
    }>();

    function collect(items: SidebarItem[], matched: boolean, parent?: SidebarItem): Card[] {
        const cards: Card[] = [];

        for (const item of items) {
            const isMatch = matched || item.text === category;

            if (item.items) {
                if (item.image && (!category || isMatch)) {
                    cards.push({text: item.text ?? '', link: item.link, image: item.image});
                }

                cards.push(...collect(item.items, isMatch, item));
            } else if (item.link && !item.link.endsWith('/') && (!category || matched)) {
                const prefixed = !!parent && parent.text !== category;
                const text = prefixed ? `${parent!.text} / ${item.text}` : item.text ?? '';

                cards.push({text, link: item.link, image: item.image});
            }
        }

        return cards;
    }

    const components = computed(() => collect(navigation, !category)
        .toSorted((a, b) => a.text.localeCompare(b.text)));
</script>
