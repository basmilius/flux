<template>
    <h2 id="required-icons">Required icons</h2>

    <div :class="$style.requiredIcons">
        <div
            v-for="icon of icons"
            :class="$style.requiredIcon">
            <FluxIcon
                :name="icon"
                :size="24"/>

            <span>{{ icon }}</span>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxIcon } from '@flux-ui/components';
    import { useData } from 'vitepress';
    import { computed, unref } from 'vue';

    const {frontmatter} = useData();

    const icons = computed(() => unref(frontmatter).requiredIcons || []);
</script>

<style
    lang="scss"
    module>
    .requiredIcons {
        display: grid;
        width: 100%;
        align-items: stretch;
        gap: 15px;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }

    .requiredIcon {
        display: flex;
        padding: 15px;
        flex-flow: column;
        gap: 15px;
        justify-content: space-between;
        background: var(--vp-c-bg-soft);
        border-radius: 8px;

        :global(svg) {
            color: var(--vp-c-brand-3);
        }

        :global(span) {
            color: var(--vp-c-text-1);
            font-family: var(--vp-font-family-mono), monospace;
            font-size: 12px;
            font-weight: 600;
        }
    }
</style>
