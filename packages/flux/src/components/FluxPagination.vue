<template>
    <flux-button-group class="flux-pagination">
        <flux-secondary-button
            v-if="arrows || isCompact"
            :disabled="isPreviousDisabled"
            icon-before="angle-left"
            @click="previous"/>

        <template v-if="!isCompact">
            <template v-for="p of visiblePages">
                <flux-secondary-button
                    v-if="p === 'dots'"
                    disabled
                    icon-before="ellipsis-h"/>

                <flux-primary-button
                    v-else-if="p === page"
                    :label="`${p}`"/>

                <flux-secondary-button
                    v-else
                    :label="`${p}`"
                    @click="navigate(p)"/>
            </template>
        </template>

        <template v-else>
            <div class="flux-pagination-current">
                <strong>{{ page }}</strong>
                <span>/</span>
                <span>{{ pages }}</span>
            </div>
        </template>

        <flux-secondary-button
            v-if="arrows || isCompact"
            :disabled="isNextDisabled"
            icon-before="angle-right"
            @click="next"/>
    </flux-button-group>
</template>

<script
    lang="ts"
    setup>
    import { computed, toRefs, unref } from 'vue-demi';
    import { FluxButtonGroup, FluxPrimaryButton, FluxSecondaryButton } from '.';

    export interface Emits {
        (e: 'navigate', page: number): void;
    }

    export interface Props {
        readonly arrows?: boolean;
        readonly isCompact?: boolean;
        readonly page: number;
        readonly perPage: number;
        readonly total: number;
    }

    const emit = defineEmits<Emits>();
    const props = defineProps<Props>();
    const {page, perPage, total} = toRefs(props);

    const pages = computed(() => Math.ceil(unref(total) / unref(perPage)));
    const isNextDisabled = computed(() => unref(page) >= unref(pages));
    const isPreviousDisabled = computed(() => unref(page) <= 1);

    const visiblePages = computed(() => {
        if (unref(pages) === 0) {
            return [];
        }

        const sizes = {
            end: 1,
            middle: 1
        } as const;

        let dots = false;
        let visible: (number | 'dots')[] = [];

        if (unref(pages) === (sizes.end + sizes.middle + 2)) {
            for (let n = 1; n <= unref(pages); ++n) {
                visible.push(n);
            }
        } else {
            for (let n = 1; n <= unref(pages); ++n) {
                if (unref(page) === n) {
                    dots = true;
                    visible.push(n);
                } else if (n <= sizes.end || (n >= unref(page) - sizes.middle && n <= unref(page) + sizes.middle) || n > unref(pages) - sizes.end) {
                    dots = true;
                    visible.push(n);
                } else if (dots) {
                    dots = false;
                    visible.push('dots');
                }
            }
        }

        return visible;
    });

    function navigate(page: number): void {
        emit('navigate', page);
    }

    function next(): void {
        navigate(unref(page) + 1);
    }

    function previous(): void {
        navigate(unref(page) - 1);
    }
</script>

<style lang="scss">
    .flux-pagination {
        z-index: 0;

        &-current {
            display: flex;
            padding-left: 12px;
            padding-right: 12px;
            align-items: center;
            gap: 3px;
            background: rgb(var(--gray-0));
            border: 1px solid rgb(var(--gray-4) / .75);
            border-left: 0;
            border-right: 0;
            color: var(--foreground-prominent);
            font-variant-numeric: tabular-nums;
        }

        .flux-button span {
            min-width: 18px;
        }

        .flux-primary-button {
            z-index: 1;
        }
    }
</style>
