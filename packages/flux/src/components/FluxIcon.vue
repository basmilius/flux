<template>
    <svg
        :viewBox="`0 0 ${width} ${height}`"
        class="flux-icon"
        focusable="false"
        role="img"
        aria-hidden="true"
        :style="{'--size': size}"
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

<script lang="ts">
    import { computed, defineComponent, PropType } from 'vue-demi';
    import { IconNames, iconRegistry } from '../data';

    export default defineComponent({
        emits: ['click'],

        props: {
            size: {default: 20, type: [Number, String]},
            variant: {required: true, type: String as PropType<IconNames>}
        },

        setup(props, {emit}) {
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

            return {
                width,
                height,
                paths,
                onClick
            };
        }
    });
</script>

<style lang="scss">
    .flux-icon {
        --size: 20;

        height: 1em;
        width: 1em;
        font-size: calc(var(--size) * 1px);
        line-height: 1em;
    }
</style>
