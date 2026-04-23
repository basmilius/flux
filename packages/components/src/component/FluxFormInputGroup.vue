<template>
    <div
        :class="clsx(
            $style.formInputGroup,
            isCondensed && $style.isCondensed,
            isSecondary && $style.isSecondary
        )"
        role="group">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { VNode } from 'vue';
    import { clsx } from 'clsx';
    import $style from '$flux/css/component/Form.module.scss';

    defineProps<{
        readonly isSecondary?: boolean;
        readonly isCondensed?: boolean;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();
</script>
