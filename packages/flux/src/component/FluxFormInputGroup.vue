<template>
    <div :class="styles.formInputGroup">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import styles from '@/css/component/Form.module.scss';
</script>
