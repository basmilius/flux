<template>
    <FluxHoverCard :label="sourceLabel">
        <template #opener="{close, open, isOpen}">
            <button
                :class="$style.aiCitationMarker"
                type="button"
                :aria-describedby="description ? descriptionId : undefined"
                :aria-expanded="isOpen"
                :aria-label="sourceLabel"
                @click="isOpen ? close() : open()">{{ index }}</button>

            <span
                v-if="description"
                :id="descriptionId"
                :class="$style.aiCitationDescription">{{ description }}</span>
        </template>

        <template #default="{close}">
            <slot v-bind="{close}">
                <a
                    v-if="url"
                    :class="$style.aiCitationTitle"
                    :href="url"
                    rel="noopener noreferrer"
                    target="_blank">
                    <span>{{ title ?? url }}</span>

                    <FluxIcon
                        name="arrow-up-right-from-square"
                        :size="12"/>
                </a>

                <span
                    v-else-if="title"
                    :class="$style.aiCitationTitle">{{ title }}</span>

                <p
                    v-if="excerpt"
                    :class="$style.aiCitationExcerpt">{{ excerpt }}</p>
            </slot>
        </template>
    </FluxHoverCard>
</template>

<script
    lang="ts"
    setup>
    import { FluxHoverCard, FluxIcon } from '@flux-ui/components';
    import { computed, useId, type VNode } from 'vue';
    import { useTranslate } from '~flux/ai/composable/private';
    import $style from '~flux/ai/css/component/AiCitation.module.scss';

    const {
        excerpt,
        index,
        title
    } = defineProps<{
        readonly excerpt?: string;
        readonly index: number;
        readonly title?: string;
        readonly url?: string;
    }>();

    defineSlots<{
        default(props: { close(): void }): VNode[];
    }>();

    const translate = useTranslate();

    const descriptionId = useId();

    const description = computed(() => [title, excerpt].filter(Boolean).join('. '));
    const sourceLabel = computed(() => translate('flux.ai.citationSource', {index}));
</script>
