<template>
    <a
        :class="$style.componentGridItem"
        :href="url">
        <img
            :src="imageUrl ?? '/assets/components/blank.svg'"
            alt="">

        <strong>{{ title }}</strong>
        <p v-if="description">{{ description }}</p>
    </a>
</template>

<script
    lang="ts"
    setup>
    defineProps<{
        readonly imageUrl?: string;
        readonly title: string;
        readonly description?: string;
        readonly url: string;
    }>();
</script>

<style
    lang="scss"
    module>
    a.componentGridItem {
        display: flex;
        flex-flow: column;
        gap: 12px;
        color: var(--vp-c-text-1);
        font-size: .9rem;

        &:hover {
            color: var(--vp-c-brand-1);
        }
    }
</style>
