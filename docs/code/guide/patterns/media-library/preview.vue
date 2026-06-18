<template>
    <Preview>
        <FluxPane>
            <FluxPaneHeader
                icon="image"
                title="Media library"
                :subtitle="`${visible.length} assets`">
                <template #after>
                    <FluxPrimaryButton
                        icon-leading="upload"
                        label="Upload"/>
                </template>
            </FluxPaneHeader>

            <FluxPaneBody>
                <FluxGrid
                    :columns="12"
                    :gap="18">
                    <FluxGridColumn
                        v-for="asset in visible"
                        :key="asset.id"
                        :xs="6"
                        :md="3">
                        <div :style="{ position: 'relative' }">
                            <FluxAspectRatio :aspect-ratio="4 / 3">
                                <img
                                    :src="asset.url"
                                    alt=""
                                    style="display: block; width: 100%; height: 100%; border-radius: 12px; object-fit: cover"/>
                            </FluxAspectRatio>

                            <div style="position: absolute; top: 9px; left: 9px">
                                <FluxBadgeStack>
                                    <FluxBadge
                                        :color="asset.color"
                                        :label="asset.type"/>

                                    <FluxBadge
                                        v-if="asset.isNew"
                                        color="primary"
                                        icon="sparkles"
                                        label="New"/>
                                </FluxBadgeStack>
                            </div>

                            <div style="position: absolute; top: 9px; right: 9px">
                                <FluxRemove @click="remove(asset.id)"/>
                            </div>
                        </div>
                    </FluxGridColumn>
                </FluxGrid>
            </FluxPaneBody>

            <FluxPaneBody>
                <FluxFlex
                    align="center"
                    :gap="6"
                    style="opacity: .6">
                    <FluxIcon name="image"/>
                    <span>Recently imported</span>
                </FluxFlex>

                <FluxSpacing :size="9"/>

                <FluxGallery>
                    <FluxGalleryItem
                        v-for="url in recent"
                        :key="url"
                        :url="url"
                        is-deletable/>
                </FluxGallery>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor } from '@flux-ui/types';
    import { FluxAspectRatio, FluxBadge, FluxBadgeStack, FluxFlex, FluxGallery, FluxGalleryItem, FluxGrid, FluxGridColumn, FluxIcon, FluxPane, FluxPaneBody, FluxPaneHeader, FluxPrimaryButton, FluxRemove, FluxSpacing } from '@flux-ui/components';
    import { faker } from '@faker-js/faker';
    import { ref } from 'vue';

    const TYPES: { type: string; color: FluxColor }[] = [
        {type: 'Photo', color: 'info'},
        {type: 'Render', color: 'success'},
        {type: 'Vector', color: 'warning'}
    ];

    const visible = ref(Array.from({length: 8}, (_, index) => {
        const meta = faker.helpers.arrayElement(TYPES);

        return {
            id: index,
            url: `https://picsum.photos/seed/flux-media-${index}/400/300`,
            type: meta.type,
            color: meta.color,
            isNew: faker.datatype.boolean()
        };
    }));

    const recent = [
        '/assets/demo/image-1.jpg',
        '/assets/demo/image-2.jpg',
        '/assets/demo/image-3.jpg',
        '/assets/demo/image-4.jpg',
        '/assets/demo/image-5.jpg'
    ];

    function remove(id: number): void {
        visible.value = visible.value.filter(asset => asset.id !== id);
    }
</script>
