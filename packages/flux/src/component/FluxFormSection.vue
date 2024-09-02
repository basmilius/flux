<template>
    <div :class="styles.formSection">
        <div :class="styles.formSectionTitle">
            {{ title }}
        </div>

        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import styles from '@/css/component/Form.module.scss';

    export type Props = {
        readonly title: string;
    };

    defineProps<Props>();
</script>
