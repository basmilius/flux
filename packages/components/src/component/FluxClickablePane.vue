<template>
    <FluxPressable
        :component-type="type"
        :class="CLASS_MAP[variant]"
        type="button"
        :aria-disabled="disabled ? true : undefined"
        :disabled="disabled && type === 'button' ? true : undefined"
        :tabindex="disabled ? -1 : tabindex"
        :href="href"
        :rel="rel"
        :target="target"
        :to="to"
        @click="onClick">
        <slot/>

        <slot
            v-if="isLoading"
            name="loader">
            <div :class="$style.paneLoader">
                <FluxSpinner/>
            </div>
        </slot>

        <div
            v-if="tag"
            :class="$style.paneTag">
            {{ tag }}
        </div>
    </FluxPressable>
</template>

<script
    lang="ts"
    setup>
    import type { FluxPressableType, FluxTo } from '@flux-ui/types';
    import { toRef, unref, type VNode } from 'vue';
    import { useDisabled } from '~flux/components/composable';
    import FluxPressable from './FluxPressable.vue';
    import FluxSpinner from './FluxSpinner.vue';
    import $style from '~flux/components/css/component/Pane.module.scss';

    const CLASS_MAP = {
        default: $style.paneDefault,
        flat: $style.paneFlat,
        well: $style.paneWell
    } as const;

    const emit = defineEmits<{
        click: [MouseEvent];
    }>();

    const {
        disabled: componentDisabled,
        isLoading,
        variant = 'default'
    } = defineProps<{
        readonly disabled?: boolean;
        readonly isLoading?: boolean;
        readonly tag?: string;
        readonly variant?: 'default' | 'flat' | 'well';
        readonly type?: FluxPressableType;
        readonly tabindex?: string | number;
        readonly href?: string;
        readonly rel?: string;
        readonly target?: string;
        readonly to?: FluxTo;
    }>();

    defineSlots<{
        default(): VNode[];
        loader(): VNode[];
    }>();

    const disabled = useDisabled(toRef(() => componentDisabled));

    function onClick(evt: MouseEvent): void {
        if (unref(disabled) || isLoading) {
            evt.preventDefault();
            evt.stopPropagation();
            return;
        }

        emit('click', evt);
    }
</script>
