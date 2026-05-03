<template>
    <FluxPressable
        ref="tab"
        :component-type="type"
        :class="itemClass"
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
            :name="icon"
            :size="16"/>

        <span v-if="label">{{ label }}</span>
    </FluxPressable>
</template>

<script
    lang="ts"
    setup>
    import type { FluxIconName, FluxPressableType, FluxTo } from '@flux-ui/types';
    import { type ComponentPublicInstance, computed, onBeforeUnmount, onMounted, toRef, unref, useTemplateRef, watch } from 'vue';
    import { useDisabled, useTabBarInjection } from '~flux/components/composable';
    import FluxIcon from './FluxIcon.vue';
    import FluxPressable from './FluxPressable.vue';
    import $style from '~flux/components/css/component/Tab.module.scss';

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
    const tabBar = useTabBarInjection();
    const tabRef = useTemplateRef<ComponentPublicInstance>('tab');

    const itemClass = computed(() => {
        if (tabBar.isPills.value) {
            return isActive ? $style.tabBarItemPillsActive : $style.tabBarItemPills;
        }

        return isActive ? $style.tabBarItemDefaultActive : $style.tabBarItemDefault;
    });

    let registeredElement: Element | null = null;

    onMounted(() => {
        const tab = unref(tabRef);

        if (!tab) {
            return;
        }

        registeredElement = tab.$el;
        tabBar.registerItem(registeredElement!, toRef(() => !!isActive));
    });

    onBeforeUnmount(() => {
        if (!registeredElement) {
            return;
        }

        tabBar.unregisterItem(registeredElement);
        registeredElement = null;
    });

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
