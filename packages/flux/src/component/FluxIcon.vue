<template>
    <svg
        v-if="definition"
        :viewBox="`0 0 ${definition.width} ${definition.height}`"
        :class="$style.fontAwesomeIcon"
        :style="{
            fontSize: size && `${size}px`,
            scale: definition.scale > 1 ? definition.scale : undefined
        }"
        focusable="false"
        role="img"
        aria-hidden="true"
        @click="onClick">
        <path
            v-for="path in definition.paths"
            :d="path"
            fill="currentColor"/>
    </svg>

    <i
        v-else-if="variant !== 'flux-empty'"
        :class="$style.materialSymbolIcon"
        :style="{
            fontSize: size && `${size}px`
        }"
        role="img"
        aria-hidden="true"
        @click="onClick">
        {{ variant }}
    </i>

    <i
        v-else
        :class="$style.icon"/>
</template>

<script
    lang="ts"
    setup>
    import { computed } from 'vue';
    import { iconRegistry } from '@/data';
    import type { FluxIconName } from '@/types';
    import $style from '@/css/component/Icon.module.scss';

    const emit = defineEmits<{
        click: [MouseEvent];
    }>();

    const {
        variant
    } = defineProps<{
        readonly size?: number | string;
        readonly variant: FluxIconName;
    }>();

    const definition = computed(() => {
        const icon = iconRegistry[variant];

        if (!icon || variant === 'flux-empty') {
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
