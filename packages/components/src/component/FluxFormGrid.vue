<template>
    <div
        :class="$style.formGrid"
        :style="{
            '--columns': columns
        }">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import $style from '$flux/css/component/Form.module.scss';

    defineProps<{
        readonly columns?: number;
    }>();

    defineSlots<{
        default(): any;
    }>();
</script>
