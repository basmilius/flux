<template>
    <FluxButton
        :="{type, disabled, iconLeading, iconTrailing, isLoading, label, href, rel, target, to}"
        :css-class="$style.menuItem"
        :css-class-icon="$style.menuItemIcon"
        :css-class-label="$style.menuItemLabel"
        is-filled
        :role="isSelectable ? 'menuitemradio' : 'menuitem'"
        :class="{
            [$style.menuItemActive]: isActive,
            [$style.menuItemDestructive]: isDestructive,
            [$style.menuItemHighlighted]: isHighlighted,
            [$style.menuItemIndented]: isIndented,
            [$style.menuItemSelected]: isSelectable && isSelected
        }"
        :aria-checked="isSelectable ? isSelected : undefined"
        :tabindex="tabindex"
        @click="onClick">
        <template
            v-if="isSelectable && (!iconLeading || isSelected)"
            #iconLeading>
            <FluxIcon
                :class="$style.menuItemSelectableIcon"
                :name="isSelected ? 'circle-check' : undefined"/>
        </template>

        <template
            v-else-if="imageSrc"
            #iconLeading>
            <img
                :class="$style.menuItemImage"
                :src="imageSrc"
                :alt="imageAlt ?? ''"/>
        </template>

        <template
            v-else-if="slots.before"
            #iconLeading>
            <slot name="before"/>
        </template>

        <template
            v-if="command || commandIcon || commandLoading || slots.after"
            #after>
            <FluxSpinner
                v-if="commandLoading"
                :class="$style.menuItemCommandIcon"
                :size="16"/>

            <template v-else>
                <kbd
                    v-if="command"
                    :class="$style.menuItemCommand">
                    {{ command }}
                </kbd>

                <FluxIcon
                    v-if="commandIcon"
                    :class="$style.menuItemCommandIcon"
                    :name="commandIcon"/>
            </template>

            <slot name="after"/>
        </template>
    </FluxButton>
</template>

<script
    lang="ts"
    setup>
    import type { FluxButtonEmits, FluxButtonProps, FluxIconName } from '@flux-ui/types';
    import { computed, inject, type VNode } from 'vue';
    import { FluxMenuFlyoutInjectionKey, FluxMenuPersistentInjectionKey } from '~flux/components/data';
    import FluxButton from './FluxButton.vue';
    import FluxIcon from './FluxIcon.vue';
    import FluxSpinner from './FluxSpinner.vue';
    import $style from '~flux/components/css/component/Menu.module.scss';

    const emit = defineEmits<FluxButtonEmits>();

    const slots = defineSlots<{
        after(): VNode[];
        before(): VNode[];
    }>();

    const {
        isPersistent,
        type = 'button'
    } = defineProps<Omit<FluxButtonProps, 'isFilled' | 'isSubmit' | 'size'> & {
        readonly command?: string;
        readonly commandIcon?: FluxIconName;
        readonly commandLoading?: boolean;
        readonly imageAlt?: string;
        readonly imageSrc?: string;
        readonly isActive?: boolean;
        readonly isDestructive?: boolean;
        readonly isHighlighted?: boolean;
        readonly isIndented?: boolean;
        readonly isPersistent?: boolean;
        readonly isSelectable?: boolean;
        readonly isSelected?: boolean;
    }>();

    const persistentPolicy = inject(FluxMenuPersistentInjectionKey, null);
    const menu = inject(FluxMenuFlyoutInjectionKey, null);

    // Boolean props coerce to false when absent (never undefined), so a `??` cascade can never reach
    // the policy. Instead persistence flows down as an OR: the item stays open when its own prop is
    // true or the nearest container (FluxMenu / FluxMenuOptions / FluxContextMenu) opts in.
    const isPersistentResolved = computed(() => isPersistent || (persistentPolicy?.value ?? false));

    function onClick(evt: MouseEvent): void {
        emit('click', evt);

        if (!isPersistentResolved.value) {
            menu?.closeAll();
        }
    }
</script>
