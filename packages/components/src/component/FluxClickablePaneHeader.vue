<template>
    <FluxPressable
        :class="clsx($style.paneHeader, $style.paneHeaderClickable)"
        :aria-disabled="disabled ? true : undefined"
        :tabindex="disabled ? -1 : tabindex"
        :component-type="type"
        :href="href"
        :rel="rel"
        :target="target"
        :to="to"
        @click="onClick">
        <slot name="before"/>

        <FluxIcon
            v-if="icon"
            :class="$style.paneHeaderIcon"
            :size="20"
            :name="icon"/>

        <div
            v-if="title || subtitle"
            :class="$style.paneHeaderCaption">
            <strong v-if="title">
                {{ title }}
            </strong>

            <span v-if="subtitle">
                {{ subtitle }}
            </span>
        </div>

        <FluxIcon
            :class="$style.paneHeaderChevron"
            :size="20"
            name="angle-right"/>
    </FluxPressable>
</template>

<script
    lang="ts"
    setup>
    import type { FluxIconName, FluxPressableType, FluxTo } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { toRef, unref, type VNode } from 'vue';
    import { useDisabled } from '~flux/components/composable';
    import FluxIcon from './FluxIcon.vue';
    import FluxPressable from './FluxPressable.vue';
    import $style from '~flux/components/css/component/Pane.module.scss';

    const emit = defineEmits<{
        click: [MouseEvent];
    }>();

    const {
        disabled: componentDisabled,
        type = 'button'
    } = defineProps<{
        readonly disabled?: boolean;
        readonly href?: string;
        readonly icon?: FluxIconName;
        readonly rel?: string;
        readonly subtitle?: string;
        readonly tabindex?: string | number;
        readonly target?: string;
        readonly title?: string;
        readonly to?: FluxTo;
        readonly type?: FluxPressableType;
    }>();

    defineSlots<{
        before(): VNode[];
    }>();

    const disabled = useDisabled(toRef(() => componentDisabled));

    function onClick(evt: MouseEvent): void {
        if (unref(disabled)) {
            evt.preventDefault();
            evt.stopPropagation();
            return;
        }

        emit('click', evt);
    }
</script>
