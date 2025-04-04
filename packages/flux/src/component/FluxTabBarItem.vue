<template>
    <FluxPressable
        ref="tab"
        :component-type="type"
        :class="isActive ? $style.tabBarItemActive : $style.tabBarItem"
        type="button"
        role="tab"
        :aria-disabled="disabled ? true : undefined"
        :aria-selected="isActive"
        :disabled="disabled ? true : undefined"
        :tabindex="disabled ? -1 : tabindex"
        :href="href"
        :rel="rel"
        :target="target"
        :to="to"
        @click="onClick"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave">
        <FluxIcon
            v-if="icon"
            :size="16"
            :variant="icon"/>

        <span v-if="label">{{ label }}</span>
    </FluxPressable>
</template>

<script
    lang="ts"
    setup>
    import { ComponentPublicInstance, toRef, unref, useTemplateRef, watch } from 'vue';
    import { useDisabled } from '$flux/composable';
    import type { FluxIconName, FluxPressableType, FluxTo } from '$flux/types';
    import FluxIcon from './FluxIcon.vue';
    import FluxPressable from './FluxPressable.vue';
    import $style from '$flux/css/component/Tab.module.scss';

    const emit = defineEmits<{
        click: [MouseEvent];
        mouseenter: [MouseEvent];
        mouseleave: [MouseEvent];
    }>();

    const {
        disabled: componentDisabled,
        isActive
    } = defineProps<{
        readonly type?: FluxPressableType;
        readonly disabled?: boolean;
        readonly icon?: FluxIconName;
        readonly isActive?: boolean;
        readonly label?: string;
        readonly tabindex?: string | number;
        readonly href?: string;
        readonly rel?: string;
        readonly target?: string;
        readonly to?: FluxTo;
    }>();

    const disabled = useDisabled(toRef(() => componentDisabled));
    const tabRef = useTemplateRef<ComponentPublicInstance>('tab');

    function onClick(evt: MouseEvent): void {
        if (unref(disabled)) {
            evt.preventDefault();
            evt.stopPropagation();
            return;
        }

        emit('click', evt);
    }

    function onMouseEnter(evt: MouseEvent): void {
        emit('mouseenter', evt);
    }

    function onMouseLeave(evt: MouseEvent): void {
        emit('mouseleave', evt);
    }

    watch(() => isActive, () => {
        if (!isActive) {
            return;
        }

        const tab = unref(tabRef);

        if (!tab) {
            return;
        }

        const el = tab.$el;

        if (el.parentElement?.offsetWidth === el.parentElement?.scrollWidth) {
            return;
        }

        el.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    }, {immediate: true});
</script>
