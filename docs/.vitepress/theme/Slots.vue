<template>
    <h2 id="slots">Slots</h2>

    <p
        v-for="({name, description, type, params}) of slots"
        :key="name">
        <code>
            <strong>{{ name }}</strong>
            <template v-if="type">
                ({
                    <br>

                    <template
                        v-for="param of params"
                        :key="param.key">
                        &nbsp;&nbsp;&nbsp;&nbsp;{{ param.signature }}<br>
                    </template>
                })
            </template>
        </code>
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

    const slots = computed(() => (unref(frontmatter).slots || []).map(slot => ({
        ...slot,
        params: Object.entries(slot.type ?? {}).map(([key, value]) => ({
            key,
            signature: formatParameter(key, String(value))
        }))
    })));

    function formatParameter(key: string, value: string): string {
        if (value.startsWith('(')) {
            return `${key}${value};`;
        }

        const optional = value.includes(' | undefined');

        return `readonly ${key}${optional ? '?' : ''}: ${value.replace(' | undefined', '')};`;
    }
</script>
