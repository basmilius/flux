<template>
    <svg
        :viewBox="`0 0 ${width} ${height}`"
        class="flux-icon"
        focusable="false"
        role="img"
        aria-hidden="true"
        @click="onClick">
        <template
            v-for="(path, index) in paths"
            :key="index">
            <path
                :d="path"
                fill="currentColor"/>
        </template>
    </svg>
</template>

<script
    lang="ts"
    setup>
    import { computed, toRefs } from 'vue-demi';
    import { IconNames, iconRegistry } from '../data';

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
    const {size, variant} = toRefs(props);

    const definition = computed(() => {
        const variant = iconRegistry[props.variant];

        if (!variant) {
            throw new Error(`[Flux] Icon variant "${props.variant}" is not defined`);
        }

        return variant;
    });

    const width = computed(() => definition.value[0]);
    const height = computed(() => definition.value[1]);
    const paths = computed(() => Array.isArray(definition.value[4]) ? definition.value[4] : [definition.value[4]]);

    const onClick = (evt: MouseEvent) => emit('click', evt);
</script>

<style lang="scss">
    .flux-icon {
        height: 1em;
        width: 1em;
        font-size: calc(v-bind(size) * 1px);
        line-height: 1em;
    }
</style>
