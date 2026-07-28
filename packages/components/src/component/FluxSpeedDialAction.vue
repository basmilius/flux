<template>
    <button
        :class="$style.speedDialAction"
        type="button"
        role="menuitem"
        @click="$emit('click', $event)">
        <span :class="$style.speedDialActionLabel">
            {{ label }}
        </span>

        <span :class="$style.speedDialActionIcon">
            <FluxIcon
                :name="icon"
                :size="18"/>
        </span>
    </button>
</template>

<script
    lang="ts"
    setup>
    import type { FluxIconName } from '@flux-ui/types';
    import FluxIcon from './FluxIcon.vue';
    import $style from '~flux/components/css/component/SpeedDial.module.scss';

    defineEmits<{
        click: [MouseEvent];
    }>();

    defineProps<{
        readonly icon: FluxIconName;
        readonly label: string;
    }>();
</script>
