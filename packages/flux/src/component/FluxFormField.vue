<template>
    <div :class="$style.formField">
        <label
            :for="id"
            :class="$style.formFieldHeader">
            <span :class="$style.formFieldLabel">
                {{ label }}
            </span>

            <span
                v-if="isOptional"
                :class="$style.formFieldOptional">
                ({{ translate('flux.optional') }})
            </span>

            <span
                v-if="$slots.value"
                :class="$style.formFieldValue">
                <slot
                    name="value"
                    v-bind="{currentLength, error, hint, id, isOptional, label, maxLength}"/>
            </span>
        </label>

        <slot v-bind="{id}"/>

        <span
            v-if="currentLength && maxLength && maxLength > 0"
            :class="$style.formFieldCounter">
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
    import $style from '@/css/component/Form.module.scss';

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
