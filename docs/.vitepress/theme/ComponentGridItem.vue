<template>
    <a
        :class="$style.componentGridItem"
        :href="withFramework(url)">
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
    import { useData } from 'vitepress';

    defineProps<{
        readonly imageUrl?: string;
        readonly title: string;
        readonly description?: string;
        readonly url: string;
    }>();

    const {localeIndex} = useData();

    function withFramework(url: string): string {
        return localeIndex.value === 'react' && url.startsWith('/') && !url.startsWith('/react/') ? `/react${url}` : url;
    }
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
