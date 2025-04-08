<template>
    <label
        :class="$style.checkbox"
        :for="id">
        <input
            v-model="modelValue"
            ref="input"
            type="checkbox"
            :class="$style.checkboxNative"
            :id="id"/>

        <button
            :class="$style.checkboxElement"
            role="checkbox"
            :aria-checked="modelValue ?? false">
            <FluxIcon
                v-if="isIndeterminate"
                name="minus"
                :size="16"/>

            <FluxIcon
                v-else
                name="check"
                :size="16"/>
        </button>

        <span
            v-if="label"
            :class="$style.checkboxLabel">
            {{ label }}
        </span>
    </label>
</template>

<script
    lang="ts"
    setup>
    import { computed, unref, useTemplateRef, watchEffect } from 'vue';
    import { useFormFieldInjection } from '$flux/composable';
    import FluxIcon from './FluxIcon.vue';
    import $style from '$flux/css/component/Form.module.scss';

    const modelValue = defineModel<boolean | null>({
        default: false
    });

    defineProps<{
        readonly label?: string;
    }>();

    const inputRef = useTemplateRef('input');
    const {id} = useFormFieldInjection();

    const isIndeterminate = computed(() => unref(modelValue) === null);

    watchEffect(() => {
        const input = unref(inputRef);
        input && (input.indeterminate = unref(isIndeterminate));
    });
</script>
