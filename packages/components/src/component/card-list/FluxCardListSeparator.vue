<template>
    <div
        :class="[$style.cardListSeparator, isTall && $style.isTall]"
        aria-hidden="true"/>
</template>

<script
    lang="ts"
    setup>
    import $style from '~flux/components/css/component/CardList.module.scss';

    defineProps<{
        readonly isTall?: boolean;
    }>();
</script>
