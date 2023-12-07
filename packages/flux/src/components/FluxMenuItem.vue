<template>
    <BaseButton
        v-bind="{type, disabled, iconAfter, iconBefore, isLoading, label, href, rel, target, to}"
        :class="{
            [styles.menuItemActive]: isActive,
            [styles.menuItemDestructive]: isDestructive,
            [styles.menuItemHighlighted]: isHighlighted,
            [styles.menuItemIndented]: isIndented,
            [styles.menuItemSelected]: isSelectable && isSelected
        }"
        :css-class="styles.menuItem"
        :css-class-icon="styles.menuItemIcon"
        :css-class-label="styles.menuItemLabel"
        tabindex="0"
        @click="$emit('click', $event)">
        <template
            v-if="isSelectable"
            #icon-before>
            <FluxIcon
                :class="styles.menuItemSelectableIcon"
                :variant="isSelected ? 'circle-check' : 'flux-empty'"/>
        </template>

        <template
            v-else-if="imageUrl"
            #icon-before>
            <img
                :class="styles.menuItemImage"
                :src="imageUrl"
                alt=""/>
        </template>

        <template
            v-if="command || commandIcon"
            #after>
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
    </BaseButton>
</template>

<script
    lang="ts"
    setup>
    import type { FluxRoutingLocation, IconNames } from '@/data';
    import { BaseButton } from './primitive';
    import FluxIcon from './FluxIcon.vue';
    import styles from '@/css/components/Menu.module.scss';

    // note: It is currently not possible to reuse Emits and Props from
    //  base button, because of a limitation of vite and vue compiler-sfc.
    //  Extending from those types is also not possible.
    //  https://vuejs.org/api/sfc-script-setup.html#typescript-only-features

    export interface Emits {
        (e: 'click', evt: MouseEvent): void;
    }

    export interface Props {
        readonly type?: 'button' | 'link' | 'route';
        readonly command?: string;
        readonly commandIcon?: IconNames | null;
        readonly disabled?: boolean;
        readonly iconAfter?: IconNames | null;
        readonly iconBefore?: IconNames | null;
        readonly imageUrl?: string;
        readonly isActive?: boolean;
        readonly isDestructive?: boolean;
        readonly isHighlighted?: boolean;
        readonly isIndented?: boolean;
        readonly isLoading?: boolean;
        readonly isSelectable?: boolean;
        readonly isSelected?: boolean;
        readonly label?: string;
        readonly href?: string;
        readonly rel?: string;
        readonly target?: string;
        readonly to?: FluxRoutingLocation;
    }

    defineEmits<Emits>();

    withDefaults(defineProps<Props>(), {
        type: 'link'
    });
</script>
