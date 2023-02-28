<template>
    <flux-drop-zone
        :is-disabled="!isEditable"
        :is-empty="items.length === 0"
        is-multiple
        placeholder-icon="image"
        :placeholder-button="translate('flux_gallery_placeholder_button')"
        :placeholder-message="translate('flux_gallery_placeholder_message')"
        :placeholder-title="translate('flux_gallery_placeholder_title')"
        @select="onFilesSelected">
        <template #default="{showPicker}">
            <transition-group
                class="flux-gallery"
                name="gallery"
                tag="div">
                <flux-gallery-item
                    v-for="(item, index) of items"
                    :is-deletable="isEditable"
                    :key="item"
                    :url="item"
                    @delete="$emit('delete', index)"/>

                <flux-gallery-item
                    v-for="item of pendingItems"
                    is-pending
                    :key="item"
                    :url="item"/>

                <button
                    key="gallery-add"
                    class="flux-placeholder flux-gallery-add"
                    @click="showPicker()">
                    <flux-icon variant="plus"/>
                </button>
            </transition-group>
        </template>
    </flux-drop-zone>
</template>

<script
    lang="ts"
    setup>
    import { useTranslate } from '../composables';
    import { FluxDropZone, FluxGalleryItem, FluxIcon } from '.';

    export interface Emits {
        (e: 'delete', index: number): void;

        (e: 'upload', files: File[]): void;
    }

    export interface Props {
        readonly isEditable?: boolean;
        readonly items: string[];
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
            color: var(--gray-7);

            &:hover {
                background: var(--gray-3);
                border-color: var(--gray-5);
            }
        }
    }

    .gallery-move {
        transition: 360ms var(--swift-out);
    }
</style>
