<template>
    <div :class="$style.formRow">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { VNode } from 'vue';
    import $style from '$flux/css/component/Form.module.scss';

    defineSlots<{
        default(): VNode[];
    }>();
</script>
