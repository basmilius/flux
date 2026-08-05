<template>
    <h2 id="emits">Emits</h2>

    <p
        v-for="({name, description, signature}) of emits"
        :key="name">
        <code><strong>{{ name }}</strong>: [{{ signature }}]</code>
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

    const emits = computed(() => (unref(frontmatter).emits || []).map(emit => ({
        ...emit,
        signature: (emit.type ?? []).map(String).join(', ')
    })));
</script>
