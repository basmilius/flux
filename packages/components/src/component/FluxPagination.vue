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
            v-for="(p, index) of visiblePages"
            :key="index">
            <span
                v-if="p === 'dots'"
                :class="$style.paginationDots"
                aria-hidden="true">…</span>

            <FluxPaginationButton
                v-else-if="p === page"
                is-current
                :label="`${p}`"
                aria-current="page"/>

            <FluxPaginationButton
                v-else
                :aria-label="translate('flux.goToPage', {page: p})"
                :label="`${p}`"
                @click="navigate(p)"/>
        </template>

        <template v-else>
            <FluxPaginationButton
                is-current
                :aria-label="translate('flux.goToPage', {page})"
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
    import { useTranslate } from '~flux/components/composable/private';
    import { showPrompt } from '~flux/components/data';
    import FluxPaginationButton from './FluxPaginationButton.vue';
    import $style from '~flux/components/css/component/Pagination.module.scss';

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
        const totalPages = unref(pages);

        if (totalPages === 0) {
            return [];
        }

        const sizes = {
            end: 1,
            middle: 2
        } as const;

        const shouldShow = (n: number): boolean =>
            n <= sizes.end ||
            n > totalPages - sizes.end ||
            (n >= page - sizes.middle && n <= page + sizes.middle);

        const visible: (number | 'dots')[] = [];
        let previous = 0;

        for (let n = 1; n <= totalPages; ++n) {
            if (!shouldShow(n)) {
                continue;
            }

            const gap = n - previous - 1;

            if (gap === 1) {
                visible.push(n - 1);
            } else if (gap > 1) {
                visible.push('dots');
            }

            visible.push(n);
            previous = n;
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

        const target = Number(pageStr);

        if (isNaN(target) || target > unref(pages) || target <= 0) {
            return;
        }

        navigate(target);
    }
</script>
