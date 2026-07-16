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
        :tabindex="resolvedTabindex"
        :href="href"
        :rel="rel"
        :target="target"
        :to="to"
        @click="onClick"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave">
        <slot name="start"/>

        <FluxIcon
            v-if="icon"
            :name="icon"
            :size="16"/>

        <span v-if="label">{{ label }}</span>

        <slot name="end"/>
    </FluxPressable>
</template>

<script
    lang="ts"
    setup>
    import { useMutationObserver } from '@basmilius/common';
    import type { FluxIconName, FluxPressableType, FluxTo } from '@flux-ui/types';
    import { type ComponentPublicInstance, computed, onBeforeUnmount, onMounted, ref, toRef, unref, useTemplateRef, type VNode, watch } from 'vue';
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
        isActive,
        tabindex
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

    defineSlots<{
        start?(): VNode[];
        end?(): VNode[];
    }>();

    const tabRef = useTemplateRef<ComponentPublicInstance>('tab');
    const isFirstEnabled = ref(false);

    let registeredElement: Element | null = null;

    const disabled = useDisabled(toRef(() => componentDisabled));
    const tabBar = useTabBarInjection();

    const itemClass = computed(() => {
        if (tabBar.isPills.value) {
            return isActive ? $style.tabBarItemPillsActive : $style.tabBarItemPills;
        }

        return isActive ? $style.tabBarItemDefaultActive : $style.tabBarItemDefault;
    });

    const resolvedTabindex = computed(() => {
        if (componentDisabled || unref(disabled)) {
            return -1;
        }

        if (tabindex !== undefined) {
            return tabindex;
        }

        if (isActive || isFirstEnabled.value) {
            return 0;
        }

        return -1;
    });

    const tabListRef = computed(() => (unref(tabRef)?.$el as Element | undefined)?.parentElement ?? null);

    useMutationObserver(tabListRef, () => updateFirstEnabled(), {attributeFilter: ['aria-disabled', 'aria-selected'], attributes: true, childList: true, subtree: true});

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

    onMounted(() => {
        const tab = unref(tabRef);

        if (!tab) {
            return;
        }

        registeredElement = tab.$el;
        tabBar.registerItem(registeredElement!, toRef(() => !!isActive));
        updateFirstEnabled();
    });

    onBeforeUnmount(() => {
        if (!registeredElement) {
            return;
        }

        tabBar.unregisterItem(registeredElement);
        registeredElement = null;
    });

    function updateFirstEnabled(): void {
        const parent = registeredElement?.parentElement;

        if (!registeredElement || !parent) {
            isFirstEnabled.value = false;
            return;
        }

        if (parent.querySelector('[role=tab][aria-selected=true]')) {
            isFirstEnabled.value = false;
            return;
        }

        const firstEnabled = parent.querySelector<HTMLElement>('[role=tab]:not([aria-disabled=true])');
        isFirstEnabled.value = firstEnabled === registeredElement;
    }

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
</script>
