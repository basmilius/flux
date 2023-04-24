<template>
    <nav
        ref="controlRef"
        class="flux-segmented-control">
        <div class="flux-segmented-control-highlight"/>

        <template v-for="(item, index) of items">
            <div
                v-if="index > 0"
                class="flux-segmented-control-separator"
                :class="{'active': index === modelValue || index === modelValue + 1}"/>

            <button
                ref="itemRefs"
                class="flux-segmented-control-item"
                :class="{'active': index === modelValue}"
                @click="activate(index)">
                <span>{{ item }}</span>
            </button>
        </template>
    </nav>
</template>

<script lang="ts">
    export default {
        model: {
            prop: 'modelValue',
            event: 'update:modelValue'
        }
    };
</script>

<script
    lang="ts"
    setup>
    import { onMounted, onUpdated, ref } from 'vue-demi';

    export interface Emits {
        (e: 'update:modelValue', index: number): void;
    }

    export interface Props {
        readonly items: string[];
        readonly modelValue: number;
    }

    const emit = defineEmits<Emits>();
    const props = defineProps<Props>();

    onMounted(() => activate(props.modelValue));
    onUpdated(() => activate(props.modelValue));

    const activeItemX = ref(0);
    const activeItemWidth = ref(0);
    const controlRef = ref<HTMLDivElement>();
    const itemRefs = ref<HTMLButtonElement[]>([]);

    function activate(index: number): void {
        emit('update:modelValue', index);

        const itemRef = itemRefs.value[index];
        const {left: controlX} = controlRef.value!.getBoundingClientRect();
        const {width, left: x} = itemRef.getBoundingClientRect();

        activeItemX.value = x - controlX;
        activeItemWidth.value = width;
    }
</script>

<style lang="scss">
    @use '../scss/mixin' as flux;

    .flux-segmented-control {
        position: relative;
        display: flex;
        padding: 3px;
        align-items: center;
        gap: 1px;
        background: rgb(var(--gray-3));
        border-radius: var(--radius);

        &-highlight {
            position: absolute;
            top: 3px;
            left: calc(v-bind(activeItemX) * 1px);
            height: 30px;
            width: calc(v-bind(activeItemWidth) * 1px);
            background: rgb(var(--gray-0));
            border-radius: calc(var(--radius) - 3px);
            box-shadow: var(--shadow-md);
            pointer-events: none;
            transition: 300ms var(--swift-out);
            transition-property: left, width;
        }

        &-item {
            height: 30px;
            flex: 1 1 0;
            background: none;
            border: 0;
            border-radius: calc(var(--radius) - 3px);
            color: var(--foreground);
            font-size: 13px;
            font-weight: 600;
            text-align: center;
            transition: color 300ms var(--swift-out);

            &:hover {
                background: rgb(var(--gray-4));
            }

            &.active {
                color: var(--foreground-prominent);
            }

            span {
                position: relative;
            }
        }

        &-separator {
            height: 18px;
            width: 1px;
            flex-shrink: 0;
            background: rgb(var(--gray-5));
            transition: opacity 300ms var(--swift-out);

            &.active {
                opacity: 0;
            }
        }

        [md] & {
            padding: 6px;
            gap: 3px;

            &-highlight {
                top: 6px;
            }

            &-highlight,
            &-item {
                height: 36px;
            }

            &-item {
                font-size: 14px;
            }
        }
    }

    @include flux.dark-mode {
        .flux-segmented-control {
            background: rgb(var(--gray-2));

            &-highlight {
                background: rgb(var(--gray-3));
            }
        }
    }
</style>
