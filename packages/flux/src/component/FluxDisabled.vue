<template>
    <slot/>
</template>

<script
    lang="ts"
    setup>
    import { provide, toRef } from 'vue';
    import { FluxDisabledInjectionKey } from '@/data';

    defineOptions({
        inheritAttrs: false
    });

    const {
        disabled = true
    } = defineProps<{
        readonly disabled?: boolean;
    }>();

    provide(FluxDisabledInjectionKey, toRef(() => disabled));
</script>
