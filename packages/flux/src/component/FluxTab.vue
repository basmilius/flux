<template>
    <div
        :class="$style.tab"
        role="tabpanel">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { IconName } from '@/types';
    import $style from '@/css/component/Tab.module.scss';

    defineProps<{
        readonly icon?: IconName;
        readonly label?: string;
    }>();

    defineSlots<{
        default(): any;
    }>();
</script>
