<template>
    <FluxDropZone
        accept="image/*"
        :is-disabled="!isEditable"
        :is-empty="items && items.length === 0"
        is-multiple
        placeholder-icon="image"
        :placeholder-button="translate('flux_gallery_placeholder_button')"
        :placeholder-message="translate('flux_gallery_placeholder_message')"
        :placeholder-title="translate('flux_gallery_placeholder_title')"
        @select="onFilesSelected">
        <template #default="{showPicker}">
            <TransitionGroup
                class="flux-gallery"
                name="flux-gallery"
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
                    class="flux-placeholder flux-gallery-add"
                    type="button"
                    @click="showPicker()">
                    <FluxIcon variant="plus"/>
                </button>
            </TransitionGroup>
        </template>
    </FluxDropZone>
</template>

<script
    lang="ts"
    setup>
    import type { FluxFocalPoint } from '@/data';
    import { useTranslate } from '@/composables';
    import FluxDropZone from './FluxDropZone.vue';
    import FluxGalleryItem from './FluxGalleryItem.vue';
    import FluxIcon from './FluxIcon.vue';

    export interface Emits {
        (e: 'delete', index: number): void;

        (e: 'upload', files: File[]): void;
    }

    export interface Props {
        readonly isEditable?: boolean;
        readonly items?: (string | (FluxFocalPoint & { readonly url: string; }))[];
        readonly pendingItems?: string[];
    }

    const emit = defineEmits<Emits>();
    defineProps<Props>();

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

<style lang="scss">
    .flux-gallery {
        display: grid;
        gap: 9px;
        grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));

        &-add {
            aspect-ratio: 1 / 1;
            color: rgb(var(--gray-7));

            &:hover {
                background: rgb(var(--gray-3));
                border-color: rgb(var(--gray-5));
            }
        }

        &-move {
            transition: 360ms var(--swift-out);
        }
    }
</style>
