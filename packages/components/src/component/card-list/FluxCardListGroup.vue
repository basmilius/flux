<template>
    <div :class="$style.cardListGroup">
        <FluxCardListSeparator
            v-if="isSeparated"
            :class="$style.cardListGroupSeparator"
            :is-tall="isCollapsible"/>

        <button
            v-if="isCollapsible"
            :class="$style.cardListGroupHeader"
            type="button"
            :aria-controls="bodyId"
            :aria-expanded="expanded"
            @click="expanded = !expanded">
            <slot name="header">
                <FluxIcon
                    v-if="icon"
                    :name="icon"
                    :size="12"/>

                <span>{{ label }}</span>
            </slot>

            <FluxIcon
                :class="[$style.cardListGroupToggle, expanded && $style.isExpanded]"
                name="angle-down"
                :size="12"/>
        </button>

        <div
            v-else-if="label || icon || 'header' in slots"
            :class="$style.cardListGroupHeader">
            <slot name="header">
                <FluxIcon
                    v-if="icon"
                    :name="icon"
                    :size="12"/>

                <span>{{ label }}</span>
            </slot>
        </div>

        <div
            v-if="expanded || !isCollapsible"
            :id="bodyId">
            <slot/>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxIconName } from '@flux-ui/types';
    import { useId, type VNode } from 'vue';
    import FluxIcon from '../FluxIcon.vue';
    import FluxCardListSeparator from './FluxCardListSeparator.vue';
    import $style from '~flux/components/css/component/CardList.module.scss';

    const expanded = defineModel<boolean>('expanded', {
        default: true
    });

    const {
        isSeparated = true
    } = defineProps<{
        readonly icon?: FluxIconName;
        readonly isCollapsible?: boolean;
        readonly isSeparated?: boolean;
        readonly label?: string;
    }>();

    const slots = defineSlots<{
        default(): VNode[];
        header(): VNode[];
    }>();

    const bodyId = useId();
</script>
