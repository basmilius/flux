<template>
    <FluxButton
        :="{type, disabled, iconAfter, iconBefore, isLoading, label, href, rel, target, to}"
        :css-class="$style.menuItem"
        :css-class-icon="$style.menuItemIcon"
        :css-class-label="$style.menuItemLabel"
        :role="isSelectable ? 'menuitemradio' : 'menuitem'"
        :class="{
            [$style.menuItemActive]: isActive,
            [$style.menuItemDestructive]: isDestructive,
            [$style.menuItemHighlighted]: isHighlighted,
            [$style.menuItemIndented]: isIndented,
            [$style.menuItemSelected]: isSelectable && isSelected
        }"
        :aria-checked="isSelectable ? isSelected : undefined"
        @click="$emit('click', $event)">
        <template
            v-if="isSelectable"
            #iconBefore>
            <FluxIcon
                :class="$style.menuItemSelectableIcon"
                :variant="isSelected ? 'circle-check' : 'flux-empty'"/>
        </template>

        <template
            v-else-if="imageUrl"
            #iconBefore>
            <img
                :class="$style.menuItemImage"
                :src="imageUrl"
                alt=""/>
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
                    :variant="commandIcon"/>
            </template>
        </template>
    </FluxButton>
</template>

<script
    lang="ts"
    setup>
    import type { ButtonEmits, ButtonProps,  IconName } from '@/types';
    import FluxButton from './FluxButton.vue';
    import FluxIcon from './FluxIcon.vue';
    import FluxSpinner from './FluxSpinner.vue';
    import $style from '@/css/component/Menu.module.scss';

    defineEmits<ButtonEmits>();

    const {
        type = 'button'
    } = defineProps<Omit<ButtonProps, 'isSubmit' | 'size'> & {
        readonly command?: string;
        readonly commandIcon?: IconName;
        readonly commandLoading?: boolean;
        readonly imageUrl?: string;
        readonly isActive?: boolean;
        readonly isDestructive?: boolean;
        readonly isHighlighted?: boolean;
        readonly isIndented?: boolean;
        readonly isSelectable?: boolean;
        readonly isSelected?: boolean;
    }>();
</script>
