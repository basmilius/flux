<template>
    <div :class="$style.filterSearch">
        <FluxFormInput
            ref="input"
            v-model="modelValue"
            auto-complete="off"
            icon-leading="magnifying-glass"
            is-secondary
            :placeholder="placeholder"
            type="search"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { onMounted, useTemplateRef } from 'vue';
    import FluxFormInput from '../form/FluxFormInput.vue';
    import $style from '~flux/components/css/component/Filter.module.scss';

    const modelValue = defineModel<string>({
        default: ''
    });

    defineProps<{
        readonly placeholder?: string;
    }>();

    const inputRef = useTemplateRef<{ focus(): void }>('input');

    onMounted(() => {
        requestAnimationFrame(() => inputRef.value?.focus());
    });
</script>
