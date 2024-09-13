<template>
    <div
        :class="styles.menuTitle"
        role="presentation">
        {{ title }}
    </div>
</template>

<script
    lang="ts"
    setup>
    import styles from '@/css/component/Menu.module.scss';

    defineProps<{
        readonly title: string;
    }>();
</script>
