<template>
    <nav
        ref="controlRef"
        class="flux-segmented-control">
        <div class="flux-segmented-control-highlight"/>

        <template v-for="(item, index) of items">
            <div
                v-if="index > 0"
                class="flux-segmented-control-separator"
                :class="{
                    'active': index === modelValue || index === modelValue + 1
                }"/>

            <button
                ref="itemRefs"
                class="flux-segmented-control-item"
                :class="{
                    'active': index === modelValue
                }"
                type="button"
                @click="activate(index)">
                <span>{{ item }}</span>
            </button>
        </template>
    </nav>
</template>

<script lang="ts">
    export default {
        model: {
            prop: 'model-value',
            event: 'update:model-value'
        }
    };
</script>

<script
    lang="ts"
    setup>
    import { onMounted, onUpdated, ref } from 'vue-demi';

    export interface Emits {
        (e: 'update:model-value', index: number): void;
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
        emit('update:model-value', index);

        const itemRef = itemRefs.value[index];
        const {left: controlX} = controlRef.value!.getBoundingClientRect();
        const {width, left: x} = itemRef.getBoundingClientRect();

        activeItemX.value = x - controlX;
        activeItemWidth.value = width;
    }
</script>

<style lang="scss">
    @use '../css/mixin' as flux;

    .flux-segmented-control {
        position: relative;
        display: flex;
        padding: 3px;
        align-items: center;
        gap: 1px;
        background: rgb(var(--gray-2));
        border: 1px solid rgb(var(--gray-4) / .75);
        border-radius: var(--radius);

        &-highlight,
        &-item {
            height: 33px;
            border-radius: calc(var(--radius) - 3px);
            transition: 300ms var(--swift-out);
        }

        &-highlight {
            position: absolute;
            top: 3px;
            left: calc(v-bind(activeItemX) * 1px);
            width: calc(v-bind(activeItemWidth) * 1px);
            background: rgb(var(--gray-0));
            border: 1px solid rgb(var(--gray-4) / .75);
            box-shadow: var(--shadow-sm);
            pointer-events: none;
            transition-property: left, width;
        }

        &-item {
            flex: 1 1 0;
            background: none;
            border: 0;
            color: var(--foreground);
            cursor: pointer;
            font-size: 13px;
            font-weight: 500;
            text-align: center;
            transition-property: background, color;

            &:hover {
                background: rgb(var(--gray-4));
            }

            &.active {
                background: none;
                color: var(--foreground-prominent);
                cursor: default;
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
