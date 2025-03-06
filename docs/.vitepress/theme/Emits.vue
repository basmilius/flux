<template>
    <h2 id="emits">Emits</h2>

    <p v-for="({name, description, type}) of emits">
        <code><strong>{{ name }}</strong>: [{{ (type ?? []).map(String).join(', ') }}]</code>
        <template v-if="description">
            <br>
            {{ description }}
        </template>
    </p>
</template>

<script
    lang="ts"
    setup>
    import { useData } from 'vitepress';
    import { computed, unref } from 'vue';

    const {frontmatter} = useData();

    const emits = computed(() => unref(frontmatter).emits || []);
</script>
