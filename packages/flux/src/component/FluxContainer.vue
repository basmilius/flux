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

    export type Props = {
        readonly gutter?: number;
    };

    withDefaults(defineProps<Props>(), {
        gutter: 30
    });

    const {maxWidth} = useBreakpoints();
</script>
