<template>
    <h2 id="variants">Variants</h2>

    <ul>
        <li
            v-for="variant of variants"
            :key="variant">
            <strong><code>&lt;{{ variant }}/&gt;</code></strong>
        </li>
    </ul>
</template>

<script
    lang="ts"
    setup>
    import { useData } from 'vitepress';
    import { computed, unref } from 'vue';

    const {frontmatter} = useData();

    const variants = computed(() => unref(frontmatter).variants || []);
</script>
