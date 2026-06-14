<template>
    <nav
        :class="$style.breadcrumb"
        :aria-label="ariaLabel">
        <ol :class="$style.breadcrumbList">
            <slot/>
        </ol>
    </nav>
</template>

<script
    lang="ts"
    setup>
    import type { VNode } from 'vue';
    import $style from '~flux/components/css/component/Breadcrumb.module.scss';

    const {ariaLabel = 'Breadcrumb'} = defineProps<{
        readonly ariaLabel?: string;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();
</script>
