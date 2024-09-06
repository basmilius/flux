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
                <slot
                    name="value"
                    v-bind="{currentLength, error, hint, id, isOptional, label, maxLength}"/>
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
            name="addition"
            v-bind="{currentLength, error, hint, id, isOptional, label, maxLength}"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { provide, useId } from 'vue';
    import { useTranslate } from '@/composable/private';
    import { FluxFormFieldInjectionKey } from '@/data';
    import FluxFormFieldAddition from './FluxFormFieldAddition.vue';
    import styles from '@/css/component/Form.module.scss';

    defineProps<{
        readonly currentLength?: number;
        readonly error?: string;
        readonly hint?: string;
        readonly isOptional?: boolean;
        readonly label: string;
        readonly maxLength?: number;
    }>();

    defineSlots<{
        default(props: {
            readonly id?: string;
        }): any;

        addition(props: {
            readonly currentLength?: number;
            readonly error?: string;
            readonly hint?: string;
            readonly isOptional?: boolean;
            readonly label: string;
            readonly maxLength?: number;
        }): any;

        value(props: {
            readonly currentLength?: number;
            readonly error?: string;
            readonly hint?: string;
            readonly isOptional?: boolean;
            readonly label: string;
            readonly maxLength?: number;
        }): any;
    }>();

    const id = useId();
    const translate = useTranslate();

    provide(FluxFormFieldInjectionKey, {
        id
    });
</script>
