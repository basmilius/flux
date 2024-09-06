<template>
    <div
        :class="styles.galleryItem"
        @mouseenter.capture="isDeleteVisible = true"
        @mouseout.capture="isDeleteVisible = false">
        <FluxFocalPointImage
            :class="styles.galleryItemImage"
            :focal-point="focalPoint"
            :src="url"/>

        <FluxRemove
            v-if="isDeletable"
            :is-hidden="!isDeleteVisible"
            tabindex="-1"
            @click="emit('delete')"/>

        <div
            v-if="isPending"
            :class="styles.galleryItemLoader">
            <FluxSpinner :size="24"/>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { ref } from 'vue';
    import type { FluxFocalPointObject } from '@/types';
    import FluxFocalPointImage from './FluxFocalPointImage.vue';
    import FluxRemove from './FluxRemove.vue';
    import FluxSpinner from './FluxSpinner.vue';
    import styles from '@/css/component/Gallery.module.scss';

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
