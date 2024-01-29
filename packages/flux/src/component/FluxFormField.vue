<template>
    <div class="flux-form-field">
        <label
            :for="id"
            class="flux-form-field-header">
            <span class="flux-form-field-label">
                {{ label }}
            </span>

            <span
                v-if="isOptional"
                class="flux-form-field-optional">
                ({{ translate('flux_optional') }})
            </span>

            <span
                v-if="$slots.value"
                class="flux-form-field-value">
                <slot name="value"/>
            </span>
        </label>

        <slot v-bind="{id}"/>

        <span
            v-if="currentLength && maxLength && maxLength > 0"
            class="flux-form-field-counter">
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

    export interface Props {
        readonly currentLength?: number;
        readonly error?: string;
        readonly hint?: string;
        readonly isOptional?: boolean;
        readonly label: string;
        readonly maxLength?: number;
    }

    defineProps<Props>();

    const id = useId();
    const translate = useTranslate();

    provide(FluxFormFieldInjectionKey, {
        id
    });
</script>

<style lang="scss">
    .flux-form-field {
        display: flex;
        flex-flow: column;
        flex: 1 1 0;
        gap: 6px;

        &-header {
            display: flex;
            margin-bottom: 0;
            width: 100%;
            align-items: center;
            align-self: start;
            gap: 6px;
            font-size: unset;
        }

        &-label {
            min-height: 1.6em;
            color: var(--foreground-prominent);
            font-size: 15px;
            font-weight: 600;
        }

        &-counter {
            margin-left: auto;
            color: var(--foreground-secondary);
            font-size: .85em;
            white-space: nowrap;
        }

        &-optional {
            color: var(--foreground-secondary);
            font-size: .85em;
        }

        &-value {
            margin-left: auto;
            color: var(--foreground-secondary);
            font-size: .85em;
        }
    }
</style>
