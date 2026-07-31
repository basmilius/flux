<template>
    <FluxMenuItem
        :="{command, commandIcon, disabled, iconLeading, isIndented, isPersistent, label}"
        role="menuitemcheckbox"
        :aria-checked="modelValue"
        @click="onClick">
        <template
            v-if="slots.before"
            #before>
            <slot name="before"/>
        </template>

        <template #after>
            <span
                :class="clsx($formStyle.formToggle, modelValue && $formStyle.isChecked)"
                aria-hidden="true">
                <span :class="$formStyle.formToggleInput"/>
            </span>
        </template>
    </FluxMenuItem>
</template>

<script
    lang="ts"
    setup>
    import type { FluxIconName } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import type { VNode } from 'vue';
    import FluxMenuItem from './FluxMenuItem.vue';
    import $formStyle from '~flux/components/css/component/Form.module.scss';

    const emit = defineEmits<{
        click: [MouseEvent];
    }>();

    const modelValue = defineModel<boolean>({
        default: false
    });

    const {isPersistent = true} = defineProps<{
        readonly command?: string;
        readonly commandIcon?: FluxIconName;
        readonly disabled?: boolean;
        readonly iconLeading?: FluxIconName;
        readonly isIndented?: boolean;
        readonly isPersistent?: boolean;
        readonly label?: string;
    }>();

    const slots = defineSlots<{
        before(): VNode[];
    }>();

    function onClick(evt: MouseEvent): void {
        modelValue.value = !modelValue.value;
        emit('click', evt);
    }
</script>
