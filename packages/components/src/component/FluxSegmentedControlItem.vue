<template>
    <button
        ref="item"
        :class="itemClass"
        role="radio"
        :aria-checked="isActive"
        :aria-disabled="disabled ? true : undefined"
        :disabled="disabled ? true : undefined"
        :tabindex="isActive ? 0 : -1"
        type="button"
        @click="onClick">
        <slot>
            <FluxIcon
                v-if="icon"
                :name="icon"
                :size="iconSize"/>

            <span v-if="label">{{ label }}</span>
        </slot>
    </button>
</template>

<script
    lang="ts"
    setup>
    import type { FluxIconName } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed, onBeforeUnmount, onMounted, toRef, unref, useTemplateRef } from 'vue';
    import { useDisabled, useSegmentedControlInjection } from '~flux/components/composable';
    import type { FluxSegmentedControlValue } from '~flux/components/data';
    import FluxIcon from './FluxIcon.vue';
    import $style from '~flux/components/css/component/SegmentedControl.module.scss';

    const { value, disabled: componentDisabled } = defineProps<{
        readonly value: FluxSegmentedControlValue;
        readonly disabled?: boolean;
        readonly icon?: FluxIconName;
        readonly label?: string;
    }>();

    defineSlots<{
        default(): any;
    }>();

    const control = useSegmentedControlInjection();
    const disabled = useDisabled(toRef(() => componentDisabled));
    const itemRef = useTemplateRef<HTMLButtonElement>('item');

    const sizeClasses = {
        small: $style.isSmall,
        medium: $style.isMedium,
        large: $style.isLarge
    };
    const iconSizes = {
        small: 14,
        medium: 16,
        large: 18
    };

    const isActive = computed(() => control.modelValue.value === value);
    const iconSize = computed(() => iconSizes[unref(control.size)]);
    const itemClass = computed(() => clsx(
        $style.segmentedControlItem,
        sizeClasses[unref(control.size)],
        isActive.value && $style.isActive
    ));

    onMounted(() => {
        const element = unref(itemRef);

        if (!element) {
            return;
        }

        control.registerItem(element, value);

        if (control.modelValue.value === undefined && !unref(disabled)) {
            control.select(value);
        }
    });

    onBeforeUnmount(() => {
        const element = unref(itemRef);

        if (element) {
            control.unregisterItem(element);
        }
    });

    function onClick(evt: MouseEvent): void {
        if (unref(disabled)) {
            evt.preventDefault();
            return;
        }

        control.select(value);
    }
</script>
