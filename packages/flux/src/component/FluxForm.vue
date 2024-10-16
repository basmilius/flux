<template>
    <form
        :class="$style.form"
        @submit.prevent="onSubmit()">
        <slot/>
    </form>
</template>

<script
    lang="ts"
    setup>
    import $style from '@/css/component/Form.module.scss';

    const emit = defineEmits<{
        submit: [];
    }>();

    defineSlots<{
        default(): any;
    }>();

    function onSubmit(): void {
        emit('submit');
    }
</script>
