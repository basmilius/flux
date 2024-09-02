<template>
    <div :class="styles.formField">
        <label
            :for="id"
            :class="styles.formFieldHeader">
            <span :class="styles.formFieldLabel">
                {{ label }}
            </span>

            <span
                v-if="isOptional"
                :class="styles.formFieldOptional">
                ({{ translate('flux.optional') }})
            </span>

            <span
                v-if="$slots.value"
                :class="styles.formFieldValue">
                <slot name="value"/>
            </span>
        </label>

        <slot v-bind="{id}"/>

        <span
            v-if="currentLength && maxLength && maxLength > 0"
            :class="styles.formFieldCounter">
            {{ currentLength }} / {{ maxLength }}
        </span>

        <FluxFormFieldAddition
            v-if="error"
            icon="circle-exclamation"
            mode="error"
            :message="error"/>

        <FluxFormFieldAddition
            v-if="hint"
            icon="circle-info"
            :message="hint"/>

        <slot
            v-bind="{currentLength, error, hint, isOptional, label, maxLength}"
            name="addition"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { provide } from 'vue';
    import { useId } from '@/composable';
    import { useTranslate } from '@/composable/private';
    import { FluxFormFieldInjectionKey } from '@/data';
    import FluxFormFieldAddition from './FluxFormFieldAddition.vue';
    import styles from '@/css/component/Form.module.scss';

    export type Props = {
        readonly currentLength?: number;
        readonly error?: string;
        readonly hint?: string;
        readonly isOptional?: boolean;
        readonly label: string;
        readonly maxLength?: number;
    };

    defineProps<Props>();

    const id = useId();
    const translate = useTranslate();

    provide(FluxFormFieldInjectionKey, {
        id
    });
</script>
