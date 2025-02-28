<template>
    <div
        :class="clsx(
            $style.formInputGroup,
            isSecondary && $style.isSecondary
        )"
        role="textbox">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import $style from '@/css/component/Form.module.scss';

    defineProps<{
        readonly isSecondary?: boolean;
    }>();

    defineSlots<{
        default(): any;
    }>();
</script>
