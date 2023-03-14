<template>
    <transition-group
        class="flux-pips-pager"
        name="gallery"
        tag="nav">
        <button
            v-if="arrows"
            key="left"
            class="flux-pips-pager-arrow"
            @click="previous">
            <flux-icon
                :size="16"
                variant="angle-left"/>
        </button>

        <button
            v-for="page of visiblePages"
            :key="page"
            class="flux-pips-pager-pip"
            :class="{'is-current': page === modelValue}"
            @click="navigate(page)"/>

        <button
            v-if="arrows"
            key="right"
            class="flux-pips-pager-arrow"
            @click="next">
            <flux-icon
                :size="16"
                variant="angle-right"/>
        </button>
    </transition-group>
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
    import { computed, toRefs, unref } from 'vue-demi';
    import { FluxIcon } from '.';

    export interface Emits {
        (e: 'update:modelValue', page: number): void;
    }

    export interface Props {
        readonly arrows?: boolean;
        readonly modelValue: number;
        readonly pages: number;
        readonly visible?: number;
    }

    const emit = defineEmits<Emits>();
    const props = withDefaults(defineProps<Props>(), {
        visible: 5
    });
    const {modelValue, pages, visible} = toRefs(props);

    const visiblePages = computed(() => {
        const value = unref(modelValue);
        const displayPages = unref(visible);
        const displayPagesHalf = Math.floor(displayPages / 2);
        const totalPages = unref(pages);
        const visiblePages: number[] = [];

        if (totalPages <= displayPages) {
            return Array(totalPages).fill(null).map((_, index) => index + 1);
        }

        let lower = value - displayPagesHalf;
        let upper = value + displayPagesHalf;

        if (upper > totalPages) {
            const overflow = totalPages - upper;
            upper += overflow;
            lower = Math.max(1, lower + overflow);
        }

        for (let p = lower; p <= upper && visiblePages.length < displayPages; ++p) {
            visiblePages.push(p);
        }

        return visiblePages;
    });

    function navigate(page: number): void {
        emit('update:modelValue', page);
    }

    function next(): void {
        emit('update:modelValue', Math.min(unref(pages), unref(modelValue) + 1));
    }

    function previous(): void {
        emit('update:modelValue', Math.max(1, unref(modelValue) - 1));
    }
</script>

<style lang="scss">
    .flux-pips-pager {
        display: flex;
        place-items: center;
        gap: 6px;

        &-arrow,
        &-pip {
            display: flex;
            padding: 0;
            align-items: center;
            justify-content: center;
            background: transparent;
            border: 0;
            cursor: pointer;
            outline: 0;
        }

        &-arrow {
            height: 16px;
            width: 16px;
            color: rgb(var(--gray-6));
        }

        &-pip {
            height: 9px;
            width: 9px;
            background: rgb(var(--gray-5));
            border-radius: 99px;
            transition: width 150ms var(--swift-out);

            &.is-current {
                width: 24px;
            }

            &:hover {
                background: rgb(var(--gray-6));
            }
        }
    }
</style>
