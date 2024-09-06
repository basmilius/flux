<template>
    <BaseButton
        :="{type, disabled, iconAfter, iconBefore, isLoading, label, href, rel, target, to}"
        :css-class="styles.menuItem"
        :css-class-icon="styles.menuItemIcon"
        :css-class-label="styles.menuItemLabel"
        :role="isSelectable ? 'menuitemradio' : 'menuitem'"
        :class="{
            [styles.menuItemActive]: isActive,
            [styles.menuItemDestructive]: isDestructive,
            [styles.menuItemHighlighted]: isHighlighted,
            [styles.menuItemIndented]: isIndented,
            [styles.menuItemSelected]: isSelectable && isSelected
        }"
        :aria-checked="isSelectable ? isSelected : undefined"
        @click="$emit('click', $event)">
        <template
            v-if="isSelectable"
            #iconBefore>
            <FluxIcon
                :class="styles.menuItemSelectableIcon"
                :variant="isSelected ? 'circle-check' : 'flux-empty'"/>
        </template>

        <template
            v-else-if="imageUrl"
            #iconBefore>
            <img
                :class="styles.menuItemImage"
                :src="imageUrl"
                alt=""/>
        </template>

        <template
            v-if="command || commandIcon || commandLoading"
            #after>
            <FluxSpinner
                v-if="commandLoading"
                :class="styles.menuItemCommandIcon"
                :size="16"/>

            <template v-else>
                <kbd
                    v-if="command"
                    :class="styles.menuItemCommand">
                    {{ command }}
                </kbd>

                <FluxIcon
                    v-if="commandIcon"
                    :class="styles.menuItemCommandIcon"
                    :variant="commandIcon"/>
            </template>
        </template>
    </BaseButton>
</template>

<script
    lang="ts"
    setup>
    import type { ButtonEmits, ButtonProps,  IconName } from '@/types';
    import BaseButton from './primitive/BaseButton.vue';
    import FluxIcon from './FluxIcon.vue';
    import FluxSpinner from './FluxSpinner.vue';
    import styles from '@/css/component/Menu.module.scss';

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
