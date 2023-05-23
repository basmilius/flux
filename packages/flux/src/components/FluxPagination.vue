<template>
    <FluxButtonGroup class="flux-pagination">
        <FluxSecondaryButton
            v-if="arrows || isCompact"
            :disabled="isPreviousDisabled"
            icon-before="angle-left"
            @click="previous"/>

        <template v-if="!isCompact">
            <template v-for="p of visiblePages">
                <FluxSecondaryButton
                    v-if="p === 'dots'"
                    disabled
                    icon-before="ellipsis-h"/>

                <FluxPrimaryButton
                    v-else-if="p === page"
                    :label="`${p}`"/>

                <FluxSecondaryButton
                    v-else
                    :label="`${p}`"
                    @click="navigate(p)"/>
            </template>
        </template>

        <template v-else>
            <FluxSecondaryButton
                v-slot:before
                class="flux-pagination-current"
                @click="prompt">
                <strong>{{ page }}</strong>
                <span>/</span>
                <span>{{ pages }}</span>
            </FluxSecondaryButton>
        </template>

        <FluxSecondaryButton
            v-if="arrows || isCompact"
            :disabled="isNextDisabled"
            icon-before="angle-right"
            @click="next"/>
    </FluxButtonGroup>
</template>

<script
    lang="ts"
    setup>
    import { computed, toRefs, unref } from 'vue-demi';
    import { useTranslate } from '@/composables';
    import { fluxPrompt } from '@/data';
    import FluxButtonGroup from './FluxButtonGroup.vue';
    import FluxPrimaryButton from './FluxPrimaryButton.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';

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

    const translate = useTranslate();

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

    async function prompt(): Promise<void> {
        const pageStr = await fluxPrompt({
            icon: 'ellipsis',
            title: translate('flux_pagination_navigate_title'),
            message: translate('flux_pagination_navigate_message'),
            fieldLabel: translate('flux_pagination_navigate_page')
        });

        const page = Number(pageStr);

        if (isNaN(page) || page > unref(pages) || page <= 0) {
            return;
        }

        navigate(page);
    }
</script>

<style lang="scss">
    .flux-pagination {
        z-index: 0;

        &-current {
            gap: 3px;
            font-variant-numeric: tabular-nums;
        }

        .flux-button span {
            min-width: 18px;

            &:nth-child(2) {
                min-width: unset;
            }
        }

        .flux-primary-button {
            z-index: 1;
        }
    }
</style>
