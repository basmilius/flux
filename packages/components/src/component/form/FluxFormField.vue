<template>
    <div
        :class="$style.formField"
        :role="isGroup ? 'group' : undefined"
        :aria-labelledby="isGroup && label ? labelId : undefined">
        <component
            :is="isGroup ? 'div' : 'label'"
            :for="isGroup ? undefined : id"
            :class="$style.formFieldHeader">
            <span
                v-if="label"
                :id="isGroup ? labelId : undefined"
                :class="$style.formFieldLabel">
                {{ label }}
            </span>

            <span
                v-if="isOptional"
                :class="$style.formFieldOptional">
                ({{ translate('flux.optional') }})
            </span>

            <span
                v-if="'value' in slots"
                :class="$style.formFieldValue">
                <slot
                    name="value"
                    v-bind="{currentLength, error, hint, id, isOptional, label, maxLength}"/>
            </span>
        </component>

        <slot v-bind="{id}"/>

        <span
            v-if="currentLength != null && maxLength != null && maxLength > 0"
            :class="$style.formFieldCounter">
            {{ currentLength }} / {{ maxLength }}
        </span>

        <FluxFormFieldAddition
            v-if="error"
            :id="errorId"
            icon="circle-exclamation"
            mode="error"
            :message="error"/>

        <FluxFormFieldAddition
            v-if="hint"
            :id="hintId"
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
    import { computed, provide, useId, type VNode } from 'vue';
    import { useTranslate } from '~flux/components/composable/private';
    import { FluxFormFieldInjectionKey } from '~flux/components/data';
    import FluxFormFieldAddition from './FluxFormFieldAddition.vue';
    import $style from '~flux/components/css/component/Form.module.scss';

    const {
        as = 'field',
        error,
        hint
    } = defineProps<{
        readonly as?: 'field' | 'group';
        readonly currentLength?: number;
        readonly error?: string;
        readonly hint?: string;
        readonly isOptional?: boolean;
        readonly label?: string;
        readonly maxLength?: number;
    }>();

    const slots = defineSlots<{
        default(props: {
            readonly id?: string;
        }): VNode[];

        addition(props: {
            readonly currentLength?: number;
            readonly error?: string;
            readonly hint?: string;
            readonly isOptional?: boolean;
            readonly label: string;
            readonly maxLength?: number;
        }): VNode[];

        value(props: {
            readonly currentLength?: number;
            readonly error?: string;
            readonly hint?: string;
            readonly isOptional?: boolean;
            readonly label: string;
            readonly maxLength?: number;
        }): VNode[];
    }>();

    const id = useId();
    const labelId = useId();
    const errorBaseId = useId();
    const hintBaseId = useId();
    const translate = useTranslate();

    const isGroup = computed(() => as === 'group');
    const errorId = computed(() => error ? errorBaseId : undefined);
    const hintId = computed(() => hint ? hintBaseId : undefined);

    let controlCount = 0;

    provide(FluxFormFieldInjectionKey, {
        id,
        labelId,
        errorId,
        hintId,
        get isGroup() {
            return isGroup.value;
        },
        registerControl: () => controlCount++ === 0 ? id : `${id}-${controlCount - 1}`
    });
</script>
