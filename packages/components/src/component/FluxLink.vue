<template>
    <FluxPressable
        :component-type="type"
        :class="clsx(
            $style.link,
            isPrimary && $style.isPrimary
        )"
        :aria-disabled="isDisabled ? true : undefined"
        :disabled="isDisabled && type === 'button' ? true : undefined"
        :tabindex="isDisabled ? -1 : undefined"
        :href="href"
        :rel="rel"
        :target="target"
        :to="to"
        @click="onClick"
        @mouseenter="emit('mouseenter', $event)"
        @mouseleave="emit('mouseleave', $event)">
        <slot name="iconLeading">
            <FluxIcon
                v-if="iconLeading"
                :class="$style.linkIcon"
                :name="iconLeading"/>
        </slot>

        <slot>{{ label }}</slot>

        <slot name="iconTrailing">
            <FluxIcon
                v-if="iconTrailing"
                :class="$style.linkIcon"
                :name="iconTrailing"/>
        </slot>
    </FluxPressable>
</template>

<script
    lang="ts"
    setup>
    import type { FluxIconName, FluxPressableType, FluxTo } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { toRef, unref } from 'vue';
    import { useDisabled } from '~flux/components/composable';
    import FluxIcon from './FluxIcon.vue';
    import FluxPressable from './FluxPressable.vue';
    import $style from '~flux/components/css/component/Link.module.scss';

    const emit = defineEmits<{
        click: [MouseEvent];
        mouseenter: [MouseEvent];
        mouseleave: [MouseEvent];
    }>();

    const {
        disabled: componentDisabled,
        type = 'button'
    } = defineProps<{
        readonly type?: FluxPressableType;
        readonly disabled?: boolean;
        readonly iconLeading?: FluxIconName;
        readonly iconTrailing?: FluxIconName;
        readonly isPrimary?: boolean;
        readonly label?: string;
        readonly href?: string;
        readonly rel?: string;
        readonly target?: string;
        readonly to?: FluxTo;
    }>();

    defineSlots<{
        default(): any;
        iconLeading(): any;
        iconTrailing(): any;
    }>();

    const isDisabled = useDisabled(toRef(() => componentDisabled));

    function onClick(evt: MouseEvent): void {
        if (unref(isDisabled)) {
            evt.preventDefault();
            evt.stopPropagation();
            return;
        }

        emit('click', evt);
    }
</script>
