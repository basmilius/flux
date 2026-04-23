<template>
    <main
        :class="clsx(
            layout === 'default' && $style.applicationContentDefault,
            layout === 'full' && $style.applicationContentFull,
            layout === 'medium' && $style.applicationContentMedium,
            layout === 'narrow' && $style.applicationContentNarrow
        )"
        aria-label="Application Content">
        <slot/>
    </main>
</template>

<script
    lang="ts"
    setup>
    import clsx from 'clsx';
    import { useApplicationInjection } from '../composable';
    import type { FluxApplicationLayout } from '../data';
    import $style from '../css/component/ApplicationContent.module.scss';
    import { watch } from 'vue';

    const {
        layout = 'default'
    } = defineProps<{
        readonly layout?: FluxApplicationLayout;
    }>();

    defineSlots<{
        default(): any;
    }>();

    const {layout: layoutRef} = useApplicationInjection();

    watch(() => layout, () => layoutRef.value = layout, {immediate: true});
</script>
