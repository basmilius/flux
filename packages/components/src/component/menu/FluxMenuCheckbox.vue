<template>
    <FluxMenuItem
        :="{command, commandIcon, disabled, isIndented, isPersistent, label}"
        is-selectable
        :is-selected="modelValue"
        role="menuitemcheckbox"
        @click="onClick"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxIconName } from '@flux-ui/types';
    import FluxMenuItem from './FluxMenuItem.vue';

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
        readonly isIndented?: boolean;
        readonly isPersistent?: boolean;
        readonly label?: string;
    }>();

    function onClick(evt: MouseEvent): void {
        modelValue.value = !modelValue.value;
        emit('click', evt);
    }
</script>
