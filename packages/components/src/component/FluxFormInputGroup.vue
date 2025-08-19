<template>
    <div
        :class="clsx(
            $style.formInputGroup,
            isCondensed && $style.isCondensed,
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
    import $style from '$flux/css/component/Form.module.scss';

    defineProps<{
        readonly isSecondary?: boolean;
        readonly isCondensed?: boolean;
    }>();

    defineSlots<{
        default(): any;
    }>();
</script>
