<template>
    <div :class="$style.pageTitle">
        <span :class="$style.pageTitleSection">{{ section }}</span>
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

<style
    lang="scss"
    module>
    .pageTitle {
        display: flex;
        flex-flow: column;
        gap: 3px;
    }

    .pageTitleSection {
        color: rgb(var(--primary-7));
        font-size: 16px;
        font-weight: 500;
    }
</style>
