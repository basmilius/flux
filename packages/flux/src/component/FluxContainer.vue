<template>
    <div
        :class="styles.container"
        :style="{
            '--gutter': `${gutter}px`,
            '--max-width': `${maxWidth}px`
        }">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { useBreakpoints } from '@/composable';
    import styles from '@/css/components/Layout.module.scss';

    export interface Props {
        readonly gutter?: number;
    }

    withDefaults(defineProps<Props>(), {
        gutter: 30
    });

    const {maxWidth} = useBreakpoints();
</script>
