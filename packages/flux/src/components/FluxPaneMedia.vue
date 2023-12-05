<template>
    <div
        class="flux-pane-media"
        :class="{
            'is-inset': isInset
        }">
        <img
            v-if="imageUrl"
            class="flux-pane-media-image"
            :src="imageUrl"
            :alt="imageAlt">
    </div>
</template>

<script
    lang="ts"
    setup>
    import { computed } from 'vue';

    export interface Props {
        readonly imageAlt?: string;
        readonly imageFocalPoint?: [number, number];
        readonly imageUrl?: string;
        readonly isInset?: boolean;
        readonly span?: number;
    }

    const props = withDefaults(defineProps<Props>(), {
        span: 1
    });

    const focalPointX = computed(() => props.imageFocalPoint ? props.imageFocalPoint[0] : 50);
    const focalPointY = computed(() => props.imageFocalPoint ? props.imageFocalPoint[1] : 50);
</script>

<style lang="scss">
    .flux-pane-media {
        position: relative;
        overflow: hidden;

        &.is-inset {
            margin: 21px;
            border-radius: var(--radius);
        }

        &-image {
            display: block;
            height: 100%;
            width: 100%;
            margin: 0;
            object-fit: cover;
            object-position: calc(v-bind(focalPointX) * 1%) calc(v-bind(focalPointY) * 1%);
        }
    }

    .flux-pane:not(.is-grid) > .flux-pane-media:not(.is-inset) {
        &:first-child {
            border-top-left-radius: var(--radius);
            border-top-right-radius: var(--radius);
        }

        &:last-child {
            border-bottom-left-radius: var(--radius);
            border-bottom-right-radius: var(--radius);
        }
    }

    .flux-pane:not(.is-grid) > .flux-pane-media.is-inset {
        &:not(:first-child) {
            margin-top: 0;
        }

        &:not(:last-child) {
            margin-bottom: 0;
        }
    }

    .flux-pane.is-grid > .flux-pane-media:not(.is-inset) {
        grid-column: span v-bind(span);

        &:first-child {
            border-top-left-radius: var(--radius);
            border-bottom-left-radius: var(--radius);
        }

        &:last-child {
            border-top-right-radius: var(--radius);
            border-bottom-right-radius: var(--radius);
        }
    }

    .flux-pane.is-grid > .flux-pane-media.is-inset {
        &:not(:first-child) {
            margin-left: 0;
        }

        &:not(:last-child) {
            margin-right: 0;
        }
    }
</style>
