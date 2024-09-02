<template>
    <form
        :class="styles.form"
        @submit.prevent="onSubmit()">
        <slot/>
    </form>
</template>

<script
    lang="ts"
    setup>
    import styles from '@/css/component/Form.module.scss';

    export type Emits = {
        submit: [];
    };

    const emit = defineEmits<Emits>();

    function onSubmit(): void {
        emit('submit');
    }
</script>
