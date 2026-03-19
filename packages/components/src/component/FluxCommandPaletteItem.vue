<template>
    <button
        :class="isHighlighted ? $style.commandPaletteItemHighlighted : $style.commandPaletteItem"
        tabindex="-1"
        type="button"
        @click="$emit('activate')"
        @mousedown.prevent
        @mouseenter="$emit('highlight')">
        <div
            v-if="icon"
            :class="$style.commandPaletteItemIcon">
            <FluxIcon :name="icon"/>
        </div>

        <div :class="$style.commandPaletteItemContent">
            <div :class="$style.commandPaletteItemLabel">
                {{ label }}
            </div>

            <div
                v-if="subLabel"
                :class="$style.commandPaletteItemSubLabel">
                {{ subLabel }}
            </div>
        </div>

        <kbd
            v-if="command"
            :class="$style.commandPaletteItemCommand">
            {{ command }}
        </kbd>

        <FluxIcon
            v-if="hasSubActions"
            :class="$style.commandPaletteItemSubActionIndicator"
            name="chevron-right"/>
    </button>
</template>

<script
    lang="ts"
    setup>
    import type { FluxIconName } from '@flux-ui/types';
    import FluxIcon from './FluxIcon.vue';
    import $style from '$flux/css/component/CommandPalette.module.scss';

    defineEmits<{
        activate: [];
        highlight: [];
    }>();

    defineProps<{
        readonly command?: string;
        readonly hasSubActions?: boolean;
        readonly icon?: FluxIconName;
        readonly isHighlighted?: boolean;
        readonly label: string;
        readonly subLabel?: string;
    }>();
</script>
