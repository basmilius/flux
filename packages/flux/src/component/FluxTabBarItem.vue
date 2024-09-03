<template>
    <ButtonComponent
        ref="tabRef"
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
    import { ref, toRefs, unref, watch } from 'vue';
    import type { FluxRoutingLocation, IconNames } from '@/data';
    import ButtonComponent from '@/component/primitive/ButtonComponent.vue';
    import FluxIcon from './FluxIcon.vue';
    import styles from '@/css/component/Tab.module.scss';

    export type Emits = {
        click: [MouseEvent];
        mouseenter: [MouseEvent];
        mouseleave: [MouseEvent];
    };

    export type Props = {
        readonly type?: 'button' | 'link' | 'route';
        readonly disabled?: boolean;
        readonly icon?: IconNames;
        readonly isActive?: boolean;
        readonly label?: string;
        readonly tabindex?: string | number;
        readonly href?: string;
        readonly rel?: string;
        readonly target?: string;
        readonly to?: FluxRoutingLocation;
    };

    const emit = defineEmits<Emits>();
    const props = defineProps<Props>();
    const {disabled, isActive} = toRefs(props);

    const tabRef = ref<HTMLButtonElement>();

    function onClick(evt: MouseEvent): void {
        if (unref(disabled)) {
            evt.preventDefault();
            evt.stopPropagation();
        }

        emit('click', evt);
    }

    function onMouseEnter(evt: MouseEvent): void {
        emit('mouseenter', evt);
    }

    function onMouseLeave(evt: MouseEvent): void {
        emit('mouseleave', evt);
    }

    watch(isActive, isActive => {
        if (!isActive) {
            return;
        }

        const tab = unref(tabRef);

        if (!tab) {
            return;
        }

        if (tab.parentElement?.offsetWidth === tab.parentElement?.scrollWidth) {
            return;
        }

        tab.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    }, {immediate: true});
</script>
