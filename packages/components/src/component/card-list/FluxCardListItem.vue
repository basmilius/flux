<template>
    <div
        :class="[$style.cardListItem, expanded && $style.isExpanded, expanded && isExpandLoading && $style.isLoading]"
        role="listitem">
        <div
            :class="[$style.cardListItemSummary, isExpandable && $style.isExpandable]"
            :role="isExpandable ? 'button' : undefined"
            :tabindex="isExpandable ? 0 : undefined"
            :aria-controls="isExpandable ? bodyId : undefined"
            :aria-expanded="isExpandable ? expanded : undefined"
            :style="color ? {'--card-list-item-fill': `var(--${color}-soft)`} : undefined"
            @click="onClick"
            @focus="emit('intent')"
            @keydown.enter.self.prevent="toggle"
            @keydown.space.self.prevent="toggle"
            @pointerenter="onPointerEnter"
            @pointerleave="clearIntent">
            <slot/>
        </div>

        <FluxAutoHeightTransition>
            <div
                v-if="isExpandable && expanded && !isExpandLoading"
                :id="bodyId"
                :class="$style.cardListItemBody">
                <div :class="$style.cardListItemContent">
                    <slot name="expandable"/>
                </div>
            </div>
        </FluxAutoHeightTransition>

        <div
            v-if="expanded && isExpandLoading"
            :class="$style.cardListItemLoader">
            <FluxSpinner/>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor } from '@flux-ui/types';
    import { computed, onBeforeUnmount, useId, type VNode, watch } from 'vue';
    import { useCardListInjection } from '~flux/components/composable';
    import { FluxAutoHeightTransition } from '~flux/components/transition';
    import FluxSpinner from '../FluxSpinner.vue';
    import $style from '~flux/components/css/component/CardList.module.scss';

    const emit = defineEmits<{
        intent: [];
    }>();

    const expanded = defineModel<boolean>('expanded', {
        default: false
    });

    const {
        isExpandLoading = false
    } = defineProps<{
        readonly color?: FluxColor;
        readonly isExpandLoading?: boolean;
    }>();

    const slots = defineSlots<{
        default(): VNode[];
        expandable(): VNode[];
    }>();

    const INTERACTIVE_SELECTOR = 'a, button, input, label, select, textarea, [role="button"]';

    // Long enough to skip the items a pointer only passes over on its way.
    const INTENT_DELAY = 150;

    let intentTimer = 0;

    const bodyId = useId();
    const uid = useId();

    const {opened, register, unregister} = useCardListInjection();

    register(uid, () => expanded.value = false);

    watch(expanded, value => value && opened(uid));

    const isExpandable = computed(() => 'expandable' in slots);

    onBeforeUnmount(() => {
        clearIntent();
        unregister(uid);
    });

    function clearIntent(): void {
        window.clearTimeout(intentTimer);
    }

    function onClick(evt: MouseEvent): void {
        const interactive = (evt.target as HTMLElement).closest(INTERACTIVE_SELECTOR);

        // The summary is a button itself, so only another control inside it is left alone.
        if (interactive && interactive !== evt.currentTarget) {
            return;
        }

        toggle();
    }

    function onPointerEnter(): void {
        clearIntent();
        intentTimer = window.setTimeout(() => emit('intent'), INTENT_DELAY);
    }

    function toggle(): void {
        if (isExpandable.value) {
            expanded.value = !expanded.value;
        }
    }
</script>
