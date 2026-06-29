<template>
    <main
        :class="clsx(
            layout === 'default' && $style.applicationContentDefault,
            layout === 'dashboard' && $style.applicationContentDashboard,
            layout === 'full' && $style.applicationContentFull,
            layout === 'medium' && $style.applicationContentMedium,
            layout === 'narrow' && $style.applicationContentNarrow
        )">
        <slot/>
    </main>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import { watch } from 'vue';
    import { useApplicationInjection } from '../composable';
    import type { FluxApplicationLayout } from '../data';
    import $style from '~flux/application/css/component/ApplicationContent.module.scss';

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
