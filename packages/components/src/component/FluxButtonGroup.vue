<template>
    <div
        :class="$style.buttonGroup"
        role="group"
        :aria-label="label">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { VNode } from 'vue';
    import $style from '~flux/components/css/component/Button.module.scss';

    defineProps<{
        readonly label?: string;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();
</script>
