<template>
    <label
        :class="styles.checkbox"
        :for="id">
        <input
            v-model="modelValue"
            ref="input"
            type="checkbox"
            :class="styles.checkboxNative"
            :id="id"/>

        <button
            :class="styles.checkboxElement"
            role="checkbox"
            :aria-checked="modelValue ?? false">
            <FluxIcon
                v-if="isIndeterminate"
                :size="16"
                variant="minus"/>

            <FluxIcon
                v-else
                :size="16"
                variant="check"/>
        </button>

        <span
            v-if="label"
            :class="styles.checkboxLabel">
            {{ label }}
        </span>
    </label>
</template>

<script
    lang="ts"
    setup>
    import { computed, unref, useTemplateRef, watchEffect } from 'vue';
    import { useFormFieldInjection } from '@/composable';
    import FluxIcon from './FluxIcon.vue';
    import styles from '@/css/component/Form.module.scss';

    export type Props = {
        readonly label?: string;
    };

    const modelValue = defineModel<boolean | null>({default: false});
    defineProps<Props>();

    const inputRef = useTemplateRef('input');
    const {id} = useFormFieldInjection();

    const isIndeterminate = computed(() => unref(modelValue) === null);

    watchEffect(() => {
        const input = unref(inputRef);
        input && (input.indeterminate = unref(isIndeterminate));
    });
</script>
