<template>
    <div
        :class="$style.cardList"
        role="list"
        :aria-busy="isLoading || undefined"
        :style="columns ? {'--card-list-columns': columns} : undefined">
        <slot name="empty" v-if="isEmpty && !isLoading"/>

        <slot/>

        <div
            v-if="hasMore || isLoadingMore"
            ref="sentinel"
            :class="$style.cardListMore"
            aria-hidden="true">
            <FluxSpinner v-if="isLoadingMore"/>
        </div>

        <div
            v-if="isLoading && !isLoadingMore"
            :class="$style.cardListLoader">
            <div :class="$style.cardListLoaderBox">
                <FluxSpinner/>
            </div>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { useInView } from '@basmilius/common';
    import { provide, useTemplateRef, type VNode, watch } from 'vue';
    import FluxSpinner from '../FluxSpinner.vue';
    import { FluxCardListInjectionKey } from '~flux/components/data';
    import $style from '~flux/components/css/component/CardList.module.scss';

    const emit = defineEmits<{
        loadMore: [];
    }>();

    const {
        expandMode = 'multiple',
        hasMore = false,
        isEmpty = false,
        isLoading = false,
        isLoadingMore = false
    } = defineProps<{
        readonly columns?: string;
        readonly expandMode?: 'single' | 'multiple';
        readonly hasMore?: boolean;
        readonly isEmpty?: boolean;
        readonly isLoading?: boolean;
        readonly isLoadingMore?: boolean;
    }>();

    defineSlots<{
        default(): VNode[];
        empty(): VNode[];
    }>();

    const closers = new Map<string, () => void>();

    const sentinel = useTemplateRef<HTMLElement>('sentinel');

    const isAtEnd = useInView(sentinel);

    provide(FluxCardListInjectionKey, {
        opened: uid => {
            if (expandMode !== 'single') {
                return;
            }

            closers.forEach((close, other) => other !== uid && close());
        },
        register: (uid, close) => void closers.set(uid, close),
        unregister: uid => void closers.delete(uid)
    });

    // Also after a page arrived, since a short page can leave the end in view.
    watch([isAtEnd, () => hasMore, () => isLoading, () => isLoadingMore], () => {
        if (isAtEnd.value && hasMore && !isLoading && !isLoadingMore) {
            emit('loadMore');
        }
    });
</script>
