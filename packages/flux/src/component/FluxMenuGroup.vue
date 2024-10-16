<template>
    <div
        :class="isHorizontal ? $style.menuGroupHorizontal : $style.menuGroupVertical"
        role="group">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import $style from '@/css/component/Menu.module.scss';

    defineProps<{
        readonly isHorizontal?: boolean;
    }>();

    defineSlots<{
        default(): any;
    }>();
</script>
