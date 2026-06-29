<template>
    <div
        :class="$style.galleryItem"
        @mouseenter="isDeleteVisible = true"
        @mouseleave="isDeleteVisible = false"
        @focusin="isDeleteVisible = true"
        @focusout="isDeleteVisible = false">
        <FluxFocalPointImage
            :class="$style.galleryItemImage"
            :focal-point="focalPoint"
            :src="url"/>

        <FluxRemove
            v-if="isDeletable"
            :is-hidden="!isDeleteVisible"
            @click="emit('delete')"/>

        <div
            v-if="isPending"
            :class="$style.galleryItemLoader">
            <FluxSpinner :size="24"/>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { isSSR } from '@flux-ui/internals';
    import type { FluxFocalPointObject } from '@flux-ui/types';
    import { ref } from 'vue';
    import FluxFocalPointImage from './FluxFocalPointImage.vue';
    import FluxRemove from './FluxRemove.vue';
    import FluxSpinner from './FluxSpinner.vue';
    import $style from '~flux/components/css/component/Gallery.module.scss';

    const emit = defineEmits<{
        delete: [];
    }>();

    const {
        focalPoint
    } = defineProps<{
        readonly focalPoint?: FluxFocalPointObject;
        readonly isDeletable?: boolean;
        readonly isPending?: boolean;
        readonly url: string;
    }>();

    // The delete button reveals on hover/focus, but touch devices can't hover, so show it from the
    // start there (mouseenter/mouseleave never fire on touch, keeping it visible).
    const isDeleteVisible = ref(!isSSR && !matchMedia('(hover: hover)').matches);
</script>
