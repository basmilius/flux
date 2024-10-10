<template>
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

    const {frontmatter} = useData();
</script>
