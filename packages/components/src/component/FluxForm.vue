<template>
    <form
        :class="$style.form"
        :aria-disabled="disabled ? true : undefined"
        @submit.prevent="onSubmit()">
        <FluxDisabled :disabled="disabled">
            <slot/>
        </FluxDisabled>
    </form>
</template>

<script
    lang="ts"
    setup>
    import FluxDisabled from './FluxDisabled.vue';
    import $style from '$flux/css/component/Form.module.scss';

    const emit = defineEmits<{
        submit: [];
    }>();

    const {
        disabled = false
    } = defineProps<{
        readonly disabled?: boolean;
    }>();

    defineSlots<{
        default(): any;
    }>();

    function onSubmit(): void {
        emit('submit');
    }
</script>
