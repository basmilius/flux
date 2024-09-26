<template>
    <div :class="CLASS_MAP[variant]">
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

    const CLASS_MAP = {
        default: styles.paneDefault,
        flat: styles.paneFlat,
        well: styles.paneWell
    } as const;

    const {
        variant = 'default'
    } = defineProps<{
        readonly isLoading?: boolean;
        readonly tag?: string;
        readonly variant?: 'default' | 'flat' | 'well';
    }>();

    defineSlots<{
        default(): any;
    }>();
</script>
