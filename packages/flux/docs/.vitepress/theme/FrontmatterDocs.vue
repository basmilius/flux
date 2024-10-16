<template>
    <Variants v-if="frontmatter.variants"/>
    <RequiredIcons v-if="frontmatter.requiredIcons"/>
    <Props v-if="frontmatter.props"/>
    <Emits v-if="frontmatter.emits"/>
    <Slots v-if="frontmatter.slots"/>
</template>

<script
    lang="ts"
    setup>
    import { useData } from 'vitepress';
    import Emits from './Emits.vue';
    import Props from './Props.vue';
    import RequiredIcons from './RequiredIcons.vue';
    import Slots from './Slots.vue';
    import Variants from './Variants.vue';

    const {frontmatter} = useData();
</script>
