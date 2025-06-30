<template>
    <nav
        :class="$style.pagination"
        role="navigation"
        :aria-label="translate('flux.pagination')">
        <FluxPaginationButton
            v-if="arrows || isCompact"
            :disabled="isPreviousDisabled"
            icon-leading="angle-left"
            is-arrow
            :aria-label="translate('flux.previous')"
            @click="previous"/>

        <template
            v-if="!isCompact"
            v-for="p of visiblePages">
            <FluxPaginationButton
                v-if="p === 'dots'"
                disabled
                icon-leading="ellipsis-h"
                is-spacer/>

            <FluxPaginationButton
                v-else-if="p === page"
                is-current
                :label="`${p}`"
                aria-current="page"/>

            <FluxPaginationButton
                v-else
                :label="`${p}`"
                @click="navigate(p)"/>
        </template>

        <template v-else>
            <FluxPaginationButton
                :class="$style.paginationCurrentZZ"
                @click="prompt"
                #before>
                <strong>{{ page }}</strong>
                <span>/</span>
                <span>{{ pages }}</span>
            </FluxPaginationButton>
        </template>

        <FluxPaginationButton
            v-if="arrows || isCompact"
            :disabled="isNextDisabled"
            icon-leading="angle-right"
            is-arrow
            :aria-label="translate('flux.next')"
            @click="next"/>
    </nav>
</template>

<script
    lang="ts"
    setup>
    import { computed, unref } from 'vue';
    import { useTranslate } from '$flux/composable/private';
    import { showPrompt } from '$flux/data';
    import FluxPaginationButton from './FluxPaginationButton.vue';
    import $style from '$flux/css/component/Pagination.module.scss';

    const emit = defineEmits<{
        navigate: [number];
    }>();

    const {
        page,
        perPage,
        total
    } = defineProps<{
        readonly arrows?: boolean;
        readonly isCompact?: boolean;
        readonly page: number;
        readonly perPage: number;
        readonly total: number;
    }>();

    const translate = useTranslate();

    const pages = computed(() => Math.ceil(total / perPage));
    const isNextDisabled = computed(() => page >= unref(pages));
    const isPreviousDisabled = computed(() => page <= 1);

    const visiblePages = computed(() => {
        if (unref(pages) === 0) {
            return [];
        }

        const sizes = {
            end: 1,
            middle: 2
        } as const;

        let dots = false;
        let visible: (number | 'dots')[] = [];

        if (unref(pages) === (sizes.end + sizes.middle + 2)) {
            for (let n = 1; n <= unref(pages); ++n) {
                visible.push(n);
            }
        } else {
            for (let n = 1; n <= unref(pages); ++n) {
                if (page === n) {
                    dots = true;
                    visible.push(n);
                } else if (n <= sizes.end || (n >= page - sizes.middle && n <= page + sizes.middle) || n > unref(pages) - sizes.end) {
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
        navigate(page + 1);
    }

    function previous(): void {
        navigate(page - 1);
    }

    async function prompt(): Promise<void> {
        const pageStr = await showPrompt({
            icon: 'ellipsis',
            title: translate('flux.paginationNavigateTitle'),
            message: translate('flux.paginationNavigateMessage'),
            fieldLabel: translate('flux.paginationNavigatePage')
        });

        const page = Number(pageStr);

        if (isNaN(page) || page > unref(pages) || page <= 0) {
            return;
        }

        navigate(page);
    }
</script>
