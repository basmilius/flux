<template>
    <svg
        :viewBox="`0 0 ${width} ${height}`"
        :class="$style.icon"
        :style="{
            fontSize: size && `${size}px`,
            scale: scale > 1 ? scale : undefined
        }"
        focusable="false"
        role="img"
        aria-hidden="true"
        @click="onClick">
        <path
            v-for="path in paths"
            :d="path"
            fill="currentColor"/>
    </svg>
</template>

<script
    lang="ts"
    setup>
    import { computed, unref } from 'vue';
    import { iconRegistry } from '@/data';
    import type { IconName } from '@/types';
    import $style from '@/css/component/Icon.module.scss';

    const emit = defineEmits<{
        click: [MouseEvent];
    }>();

    const {
        variant
    } = defineProps<{
        readonly size?: number | string;
        readonly variant: IconName;
    }>();

    const definition = computed(() => {
        const definition = iconRegistry[variant];

        if (!definition && variant === 'flux-empty') {
            return [512, 512, null, []];
        }

        if (!definition) {
            throw new Error(`[Flux] Icon variant "${variant}" is not defined`);
        }

        return definition;
    });

    const width = computed(() => definition.value[0] as number);
    const height = computed(() => definition.value[1] as number);
    const paths = computed(() => (Array.isArray(definition.value[4]) ? definition.value[4] : [definition.value[4]]) as string[]);
    const scale = computed(() => Math.max(1, unref(width) / 512));

    const onClick = (evt: MouseEvent) => emit('click', evt);
</script>
