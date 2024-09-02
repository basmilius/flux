<template>
    <svg
        :viewBox="`0 0 ${width} ${height}`"
        :class="styles.icon"
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
    import { type IconNames, iconRegistry } from '@/data';
    import styles from '@/css/component/Icon.module.scss';

    export type Emits = {
        click: [MouseEvent];
    };

    export type Props = {
        readonly size?: number | string;
        readonly variant: IconNames;
    };

    const emit = defineEmits<Emits>();
    const props = defineProps<Props>();

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
    const scale = computed(() => Math.max(1, unref(width) / 512));

    const onClick = (evt: MouseEvent) => emit('click', evt);
</script>
