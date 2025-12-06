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
        @click="$emit('click', $event)">
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
            v-if="command || commandIcon || commandLoading"
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
        </template>
    </FluxButton>
</template>

<script
    lang="ts"
    setup>
    import type { FluxButtonEmits, FluxButtonProps, FluxIconName } from '@flux-ui/types';
    import FluxButton from './FluxButton.vue';
    import FluxIcon from './FluxIcon.vue';
    import FluxSpinner from './FluxSpinner.vue';
    import $style from '$flux/css/component/Menu.module.scss';

    defineEmits<FluxButtonEmits>();

    const {
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
        readonly isSelectable?: boolean;
        readonly isSelected?: boolean;
    }>();
</script>
