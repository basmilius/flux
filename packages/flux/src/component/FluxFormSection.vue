<template>
    <div :class="$style.formSection">
        <div :class="$style.formSectionTitle">
            {{ title }}
        </div>

        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import $style from '@/css/component/Form.module.scss';

    defineProps<{
        readonly title: string;
    }>();

    defineSlots<{
        default(): any;
    }>();
</script>
