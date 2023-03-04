<template>
    <div class="page-title">
        <span class="page-title-section">{{ section }}</span>
        <h1>{{ title }}</h1>
    </div>
</template>

<script
    lang="ts"
    setup>
    export interface Props {
        readonly section: string;
        readonly title: string;
    }

    defineProps<Props>();
</script>

<style lang="scss">
    .page-title {
        display: flex;
        flex-flow: column;
        gap: 3px;

        &-section {
            color: var(--primary-6);
            font-size: 16px;
            font-weight: 500;
        }
    }
</style>
