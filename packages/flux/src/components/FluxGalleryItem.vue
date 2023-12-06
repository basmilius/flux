<template>
    <div
        class="flux-gallery-item"
        @mouseenter.capture="isDeleteVisible = true"
        @mouseout.capture="isDeleteVisible = false">
        <FluxFocalPointImage
            class="flux-gallery-item-image"
            :focal-point="focalPoint"
            :src="url"/>

        <FluxRemove
            v-if="isDeletable"
            :is-hidden="!isDeleteVisible"
            tabindex="-1"
            @click="$emit('delete')"/>

        <div
            v-if="isPending"
            class="flux-pane-overlay">
            <FluxSpinner :size="24"/>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { ref } from 'vue';
    import type { FluxFocalPoint } from '@/data';
    import FluxFocalPointImage from './FluxFocalPointImage.vue';
    import FluxRemove from './FluxRemove.vue';
    import FluxSpinner from './FluxSpinner.vue';

    export interface Emits {
        (e: 'delete'): void;
    }

    export interface Props {
        readonly focalPoint?: FluxFocalPoint | null;
        readonly isDeletable?: boolean;
        readonly isPending?: boolean;
        readonly url: string;
    }

    defineEmits<Emits>();
    withDefaults(defineProps<Props>(), {
        focalPoint: null
    });

    const isDeleteVisible = ref(false);
</script>

<style lang="scss">
    .flux-gallery-item {
        position: relative;
        aspect-ratio: 1 / 1;

        &-image {
            position: absolute;
            display: block;
            inset: 0;
            height: 100%;
            width: 100%;
            border-radius: var(--radius);
            object-fit: cover;
            object-position: center;
            outline: 1px solid rgb(0 0 0 / .025);
            outline-offset: -1px;
        }

        .flux-pane-overlay {
            inset: 1px;
            border-radius: calc(var(--radius) - 1px);
            z-index: 0;
        }

        .flux-remove {
            z-index: 1;
        }
    }
</style>
