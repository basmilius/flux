<template>
    <div :class="$style.commandPaletteGroup">
        <FluxIcon
            v-if="icon"
            :class="$style.commandPaletteGroupIcon"
            :name="icon"/>

        <span>{{ label }}</span>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxIconName } from '@flux-ui/types';
    import FluxIcon from './FluxIcon.vue';
    import $style from '$flux/css/component/CommandPalette.module.scss';

    defineProps<{
        readonly icon?: FluxIconName;
        readonly label: string;
    }>();
</script>
