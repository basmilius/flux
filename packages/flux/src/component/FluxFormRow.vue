<template>
    <div :class="styles.formRow">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import styles from '@/css/component/Form.module.scss';

    defineSlots<{
        default(): any;
    }>();
</script>
