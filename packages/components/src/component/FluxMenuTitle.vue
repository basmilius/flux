<template>
    <div
        :class="$style.menuTitle"
        role="presentation">
        {{ title }}
    </div>
</template>

<script
    lang="ts"
    setup>
    import $style from '$flux/css/component/Menu.module.scss';

    defineProps<{
        readonly title: string;
    }>();
</script>
