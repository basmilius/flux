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
        </label>

        <slot v-bind="{id}"/>

        <span
            v-if="currentLength && maxLength && maxLength > 0"
            class="flux-form-field-counter">
            {{ currentLength }} / {{ maxLength }}
        </span>

        <div
            v-if="error"
            class="flux-form-field-addition flux-form-field-addition-error">
            <FluxIcon
                :size="16"
                class="flux-form-field-addition-icon"
                variant="circle-exclamation"/>

            <span>{{ error }}</span>
        </div>

        <div
            v-if="hint"
            class="flux-form-field-addition flux-form-field-addition-hint">
            <FluxIcon
                :size="16"
                class="flux-form-field-addition-icon"
                variant="circle-info"/>

            <span>{{ hint }}</span>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { provide } from 'vue-demi';
    import { useId, useTranslate } from '@/composables';
    import { FluxFormFieldInjectionKey } from '@/data';
    import FluxIcon from './FluxIcon.vue';

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

        &-addition {
            display: flex;
            gap: 9px;
            font-size: 14px;

            &-icon {
                margin-top: 2px;
                flex-shrink: 0;
            }

            &-error {
                color: rgb(var(--danger-7));
            }

            &-hint {
                color: var(--foreground-secondary);
            }
        }
    }
</style>
