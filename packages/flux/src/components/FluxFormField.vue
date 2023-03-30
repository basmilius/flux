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

        <div
            v-if="error"
            class="flux-form-field-addition flux-form-field-addition-error">
            <flux-icon
                :size="16"
                class="flux-form-field-addition-icon"
                variant="circle-exclamation"/>

            <span>{{ error }}</span>
        </div>

        <div
            v-if="hint"
            class="flux-form-field-addition flux-form-field-addition-hint">
            <flux-icon
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
    import { useId, useTranslate } from '../composables';
    import { FluxIcon } from '.';

    export interface Props {
        readonly error?: string;
        readonly hint?: string;
        readonly isOptional?: boolean;
        readonly label: string;
    }

    defineProps<Props>();

    const id = useId();
    const translate = useTranslate();

    provide('flux-form-field-id', id);
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
            gap: 6px;
            font-size: unset;
        }

        &-label {
            min-height: 1.6em;
            color: var(--foreground-prominent);
            font-size: 15px;
            font-weight: 600;
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
