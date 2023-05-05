<template>
    <button
        ref="tabRef"
        class="flux-tab-bar-item"
        :class="{'is-active': isActive}"
        @click="$emit('click', $event)">
        <FluxIcon
            v-if="icon"
            :size="16"
            :variant="icon"/>

        <span v-if="label">{{ label }}</span>
    </button>
</template>

<script
    lang="ts"
    setup>
    import type { IconNames } from '../data';
    import { ref, toRefs, unref, watch } from 'vue-demi';
    import FluxIcon from './FluxIcon.vue';

    export interface Emits {
        (e: 'click', evt: MouseEvent): void;
    }

    export interface Props {
        readonly icon?: IconNames;
        readonly isActive?: boolean;
        readonly label?: string;
    }

    defineEmits<Emits>();
    const props = defineProps<Props>();
    const {isActive} = toRefs(props);

    const tabRef = ref<HTMLButtonElement>();

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

<style lang="scss">
    @use '../scss/mixin' as flux;

    .flux-tab-bar-item {
        position: relative;
        display: inline-flex;
        padding: var(--tab-padding) 0;
        align-items: center;
        gap: 9px;
        background: unset;
        border: 0;
        border-bottom: 2px solid transparent;
        color: var(--foreground);
        contain: layout;
        cursor: pointer;
        font-weight: 500;
        outline: 0;
        transition: 180ms var(--swift-out);
        transition-property: border-color, color;
        white-space: nowrap;

        &::before {
            position: absolute;
            inset: 0;
            content: '';
            border-radius: var(--radius);
            pointer-events: none;
            transition: 180ms var(--swift-out) flux.focus-ring-transition-properties();
        }

        @include flux.focus-ring-pseudo(before);

        &:hover {
            border-color: var(--foreground);
        }

        &.is-active {
            border-color: rgb(var(--primary-7));
            color: var(--foreground-prominent);
        }
    }
</style>
