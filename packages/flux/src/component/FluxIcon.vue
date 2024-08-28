<template>
    <svg
        :viewBox="`0 0 ${width} ${height}`"
        class="flux-icon"
        :style="{
            fontSize: `${size}px`,
            '--margin': `${margin}px`
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
    import type { IconNames } from '@/data';
    import { iconRegistry } from '@/data';

    export interface Emits {
        (e: 'click', evt: MouseEvent): void;
    }

    export interface Props {
        readonly size?: number | string;
        readonly variant: IconNames;
    }

    const emit = defineEmits<Emits>();
    const props = withDefaults(defineProps<Props>(), {
        size: 20
    });

    const definition = computed(() => {
        const variant = iconRegistry[props.variant];

        if (!variant && props.variant === 'flux-empty') {
            return [512, 512, null, []];
        }

        if (!variant) {
            throw new Error(`[Flux] Icon variant "${props.variant}" is not defined`);
        }

        return variant;
    });

    const width = computed(() => definition.value[0] as number);
    const height = computed(() => definition.value[1] as number);
    const paths = computed(() => (Array.isArray(definition.value[4]) ? definition.value[4] : [definition.value[4]]) as string[]);
    const margin = computed(() => Math.min(0, (512 - unref(width)) / 2) * ((props.size as number) / 512) as number);

    const onClick = (evt: MouseEvent) => emit('click', evt);
</script>

<style lang="scss">
    .flux-icon {
        --margin: 0px;

        display: inline-block;
        margin-left: var(--margin);
        margin-right: var(--margin);
        height: 1em;
        width: calc(1em + -2 * var(--margin));
        line-height: 1em;
    }
</style>
