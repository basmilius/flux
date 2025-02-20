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
    import navigation from '../component-navigation';

    const {category} = defineProps<{
        readonly category?: string;
    }>();

    const components = computed(() => navigation.items
        .reduce((acc, curr) => {
            if (curr.items) {
                if ('image' in curr) {
                    acc.push(curr);
                }

                curr.items
                    .filter(item => !item.link.endsWith('/') && (!category || curr.text === category))
                    .forEach(item => acc.push({
                        ...item,
                        text: category === curr.text ? item.text : `${curr.text} / ${item.text}`
                    }));
            } else if (!curr.link.endsWith('/') && (!category || curr.text === category)) {
                acc.push(curr);
            }

            return acc;
        }, [])
        .toSorted((a, b) => a.text.localeCompare(b.text)));
</script>
