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
    import type { FluxIconName } from '@flux-ui/types';
    import $style from '$flux/css/component/Tab.module.scss';

    defineProps<{
        readonly icon?: FluxIconName;
        readonly label?: string;
    }>();

    defineSlots<{
        default(): any;
    }>();
</script>
