<template>
    <nav
        ref="controlRef"
        class="flux-segmented-control"
        :class="{'is-fill': isFill}">
        <div
            class="flux-segmented-control-highlight"
            :style="{
                left: `${activeItemX}px`,
                width: `${activeItemWidth}px`
            }"/>

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
                <FluxIcon
                    v-if="item.icon"
                    :size="15"
                    :variant="item.icon"/>

                <span>{{ item.label }}</span>
            </button>
        </template>
    </nav>
</template>

<script
    lang="ts"
    setup>
    import { onMounted, onUpdated, ref } from 'vue';
    import type { FluxSegmentedControlItemSpec } from '@/data';
    import FluxIcon from './FluxIcon.vue';

    export interface Emits {
        (e: 'update:model-value', index: number): void;
    }

    export interface Props {
        readonly isFill?: boolean;
        readonly items: FluxSegmentedControlItemSpec[];
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
    .flux-segmented-control {
        position: relative;
        display: inline-flex;
        padding: 3px;
        width: min-content;
        align-items: center;
        gap: 1px;
        background: rgb(var(--gray-3));
        border-radius: var(--radius);

        &.is-fill {
            display: flex;
            width: unset;
        }

        &-highlight,
        &-item {
            height: 33px;
            border-radius: calc(var(--radius) - 3px);
            transition: 300ms var(--swift-out);
        }

        &-highlight {
            position: absolute;
            top: 3px;
            background: rgb(var(--gray-0));
            border: 1px solid rgb(var(--gray-5) / .5);
            box-shadow: var(--shadow-sm);
            pointer-events: none;
            transition-property: left, width;
        }

        &-item {
            display: flex;
            padding-left: 12px;
            padding-right: 12px;
            align-items: center;
            flex: 1 1 0;
            gap: 9px;
            justify-content: center;
            background: none;
            border: 0;
            color: var(--foreground);
            cursor: pointer;
            font-size: 12px;
            font-weight: 500;
            text-align: center;
            text-transform: uppercase;
            transition-property: background, color;

            &:hover {
                background: rgb(var(--gray-4));
            }

            &.active {
                background: none;
                color: var(--foreground-prominent);
                cursor: default;
            }

            > * {
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

    [dark] .flux-segmented-control {
        background: rgb(var(--gray-2));

        &-highlight {
            background: rgb(var(--gray-3));
        }
    }
</style>
