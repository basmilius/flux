<template>
    <div
        :class="$style.galleryItem"
        @mouseenter.capture="isDeleteVisible = true"
        @mouseout.capture="isDeleteVisible = false">
        <FluxFocalPointImage
            :class="$style.galleryItemImage"
            :focal-point="focalPoint"
            :src="url"/>

        <FluxRemove
            v-if="isDeletable"
            :is-hidden="!isDeleteVisible"
            tabindex="-1"
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
    import type { FluxFocalPointObject } from '@flux-ui/types';
    import { ref } from 'vue';
    import FluxFocalPointImage from './FluxFocalPointImage.vue';
    import FluxRemove from './FluxRemove.vue';
    import FluxSpinner from './FluxSpinner.vue';
    import $style from '$flux/css/component/Gallery.module.scss';

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

    const isDeleteVisible = ref(false);
</script>
