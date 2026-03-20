<template>
    <div :class="$style.formSection">
        <h3 :class="$style.formSectionTitle">
            {{ title }}
        </h3>

        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import $style from '$flux/css/component/Form.module.scss';

    defineProps<{
        readonly title: string;
    }>();

    defineSlots<{
        default(): any;
    }>();
</script>
