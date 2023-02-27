<template>
    <nav
        ref="controlRef"
        class="flux-segmented-control">
        <div class="flux-segmented-control-highlight"/>

        <template v-for="(item, index) of items">
            <div
                v-if="index > 0"
                class="flux-segmented-control-separator"
                :class="{'active': index === value || index === value + 1}"/>

            <button
                ref="itemRefs"
                class="flux-segmented-control-item"
                :class="{'active': index === value}"
                @click="activate(index)">
                <span>{{ item }}</span>
            </button>
        </template>
    </nav>
</template>

<script
    lang="ts"
    setup>
    import { onMounted, onUpdated, ref } from 'vue-demi';

    interface Emits {
        (e: 'input', index: number): void;
    }

    interface Props {
        readonly items: string[];
        readonly value: number;
    }

    const emit = defineEmits<Emits>();
    const props = defineProps<Props>();

    onMounted(() => activate(props.value));
    onUpdated(() => activate(props.value));

    const activeItemX = ref(0);
    const activeItemWidth = ref(0);
    const controlRef = ref<HTMLDivElement>();
    const itemRefs = ref<HTMLButtonElement[]>([]);

    function activate(index: number): void {
        emit('input', index);

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
        display: flex;
        padding: 3px;
        align-items: center;
        gap: 1px;
        background: var(--segmented-control-background);
        border-radius: var(--radius);

        &-highlight {
            position: absolute;
            top: 3px;
            left: calc(v-bind(activeItemX) * 1px);
            height: 30px;
            width: calc(v-bind(activeItemWidth) * 1px);
            background: var(--segmented-control-highlight);
            border-radius: calc(var(--radius) - 3px);
            box-shadow: var(--shadow-small);
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
            color: var(--segmented-control-foreground);
            font-size: 13px;
            font-weight: 600;
            text-align: center;
            transition: color 300ms var(--swift-out);

            &:hover {
                background: var(--segmented-control-hover);
            }

            &.active {
                color: var(--segmented-control-foreground-active);
            }

            span {
                position: relative;
            }
        }

        &-separator {
            height: 18px;
            width: 1px;
            flex-shrink: 0;
            background: var(--segmented-control-separator);
            transition: opacity 300ms var(--swift-out);

            &.active {
                opacity: 0;
            }
        }

        //@include media-breakpoint-up(md) {
        //    &-highlight,
        //    &-item {
        //        height: 36px;
        //    }
        //
        //    &-item {
        //        font-size: 14px;
        //    }
        //}
    }
</style>
