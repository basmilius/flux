<template>
    <div
        :class="[$style.itemMedia, isCenter && $style.isCenter]"
        :style="{
            '--size': size && `${size}px`
        }">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import $style from '$flux/css/component/Item.module.scss';

    defineProps<{
        readonly isCenter?: boolean;
        readonly size?: number;
    }>();
</script>
