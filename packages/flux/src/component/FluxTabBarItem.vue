<template>
    <ButtonComponent
        ref="tab"
        :component-type="type"
        :class="isActive ? styles.tabBarItemActive : styles.tabBarItem"
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
    </ButtonComponent>
</template>

<script
    lang="ts"
    setup>
    import { unref, useTemplateRef, watch } from 'vue';
    import type { ButtonType, IconName, To } from '@/types';
    import ButtonComponent from '@/component/primitive/ButtonComponent.vue';
    import FluxIcon from './FluxIcon.vue';
    import styles from '@/css/component/Tab.module.scss';

    const emit = defineEmits<{
        click: [MouseEvent];
        mouseenter: [MouseEvent];
        mouseleave: [MouseEvent];
    }>();

    const {
        disabled,
        isActive
    } = defineProps<{
        readonly type?: ButtonType;
        readonly disabled?: boolean;
        readonly icon?: IconName;
        readonly isActive?: boolean;
        readonly label?: string;
        readonly tabindex?: string | number;
        readonly href?: string;
        readonly rel?: string;
        readonly target?: string;
        readonly to?: To;
    }>();

    const tabRef = useTemplateRef('tab');

    function onClick(evt: MouseEvent): void {
        if (disabled) {
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
