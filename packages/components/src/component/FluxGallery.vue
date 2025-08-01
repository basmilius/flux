<template>
    <FluxDropZone
        :class="$style.gallery"
        accept="image/*"
        :disabled="!isEditable"
        is-multiple
        placeholder-icon="image"
        :placeholder-button="translate('flux.galleryPlaceholderButton')"
        :placeholder-message="translate('flux.galleryPlaceholderMessage')"
        :placeholder-title="translate('flux.galleryPlaceholderTitle')"
        @select-multiple="onFilesSelected">
        <template #default="{showPicker}">
            <TransitionGroup
                :class="$style.galleryGrid"
                :move-class="$style.galleryMove"
                tag="div">
                <template
                    v-if="items"
                    v-for="(item, index) of items">
                    <FluxGalleryItem
                        v-if="typeof item === 'string'"
                        :is-deletable="isEditable"
                        :key="item"
                        :url="item"
                        @delete="$emit('delete', index)"/>

                    <FluxGalleryItem
                        v-else
                        :is-deletable="isEditable"
                        :key="item.url"
                        :focal-point="item"
                        :url="item.url"
                        @delete="$emit('delete', index)"/>
                </template>

                <slot/>

                <FluxGalleryItem
                    v-for="item of pendingItems"
                    is-pending
                    :key="item"
                    :url="item"/>

                <button
                    v-if="isEditable"
                    key="gallery-add"
                    :class="$style.galleryAdd"
                    type="button"
                    @click="showPicker()">
                    <FluxIcon name="plus"/>
                </button>
            </TransitionGroup>
        </template>
    </FluxDropZone>
</template>

<script
    lang="ts"
    setup>
    import type { FluxFocalPointObject } from '@flux-ui/types';
    import { useTranslate } from '$flux/composable/private';
    import FluxDropZone from './FluxDropZone.vue';
    import FluxGalleryItem from './FluxGalleryItem.vue';
    import FluxIcon from './FluxIcon.vue';
    import $style from '$flux/css/component/Gallery.module.scss';

    const emit = defineEmits<{
        delete: [number];
        upload: [File[]];
    }>();

    defineProps<{
        readonly isEditable?: boolean;
        readonly items?: (string | (FluxFocalPointObject & { readonly url: string; }))[];
        readonly pendingItems?: string[];
    }>();

    defineSlots<{
        default(): any;
    }>();

    const translate = useTranslate();

    function onFilesSelected(files: FileList): void {
        const images: File[] = [];

        for (let i = 0; i < files.length; ++i) {
            const file = files.item(i);

            if (!file || !file.type.startsWith('image/')) {
                continue;
            }

            images.push(file);
        }

        emit('upload', images);
    }
</script>
