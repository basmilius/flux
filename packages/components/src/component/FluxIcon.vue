<template>
    <svg
        v-if="definition"
        :viewBox="`0 0 ${definition.width} ${definition.height}`"
        :class="clsx(
            $style.fontAwesomeIcon,
            color === 'gray' && $style.iconGray,
            color === 'primary' && $style.iconPrimary,
            color === 'danger' && $style.iconDanger,
            color === 'info' && $style.iconInfo,
            color === 'success' && $style.iconSuccess,
            color === 'warning' && $style.iconWarning
        )"
        :style="{
            fontSize: size && `${size}px`,
            scale: definition.scale > 1 ? definition.scale : undefined
        }"
        focusable="false"
        :role="ariaLabel ? 'img' : undefined"
        :aria-hidden="ariaLabel ? undefined : true"
        :aria-label="ariaLabel"
        @click="onClick">
        <path
            v-for="path in definition.paths"
            :d="path"
            fill="currentColor"/>
    </svg>

    <i
        v-else
        :class="$style.icon"/>
</template>

<script
    lang="ts"
    setup>
    import { warn } from '@flux-ui/internals';
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed } from 'vue';
    import { iconRegistry } from '~flux/components/data';
    import $style from '~flux/components/css/component/Icon.module.scss';

    const emit = defineEmits<{
        click: [MouseEvent];
    }>();

    const {
        name
    } = defineProps<{
        readonly ariaLabel?: string;
        readonly color?: FluxColor;
        readonly size?: number | string;
        readonly name?: FluxIconName;
    }>();

    const definition = computed(() => {
        if (!name) {
            return null;
        }

        const icon = iconRegistry[name];

        if (!icon) {
            warn(`Unknown icon: ${name}`);

            return null;
        }

        return {
            width: icon[0],
            height: icon[1],
            paths: (Array.isArray(icon[4]) ? icon[4] : [icon[4]]) as string[],
            scale: Math.max(1, icon[0] / 512)
        };
    });

    const onClick = (evt: MouseEvent) => emit('click', evt);
</script>
