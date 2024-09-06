<template>
    <div
        :class="styles.container"
        :style="{
            '--gutter': `${gutter}px`,
            maxWidth: `${maxWidth}px`
        }">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { useBreakpoints } from '@/composable';
    import styles from '@/css/component/Layout.module.scss';

    const {
        gutter = 30
    } = defineProps<{
        readonly gutter?: number;
    }>();

    defineSlots<{
        default(): any;
    }>();

    const {maxWidth} = useBreakpoints();
</script>
