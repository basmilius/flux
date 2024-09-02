<template>
    <div :class="styles.pane">
        <slot/>

        <div
            v-if="isLoading"
            :class="styles.paneLoader">
            <FluxSpinner/>
        </div>

        <div
            v-if="tag"
            :class="styles.paneTag">
            {{ tag }}
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import FluxSpinner from './FluxSpinner.vue';
    import styles from '@/css/component/Pane.module.scss';

    export type Props = {
        readonly isLoading?: boolean;
        readonly tag?: string;
    };

    defineProps<Props>();
</script>
