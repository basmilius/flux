<template>
    <FluxApplicationContent layout="default">
        <FluxLayerPane>
            <FluxActionBar>
                <template #primary>
                    <FluxBreadcrumb>
                        <FluxBreadcrumbItem
                            icon="folder"
                            label="Files"/>
                        <FluxBreadcrumbItem label="All files"/>
                    </FluxBreadcrumb>
                </template>

                <template #actionsEnd>
                    <FluxSecondaryButton
                        icon-leading="plus"
                        label="New folder"
                        @click="onNewFolder()"/>
                    <FluxSecondaryButton
                        icon-leading="arrow-up-from-bracket"
                        label="Upload"
                        @click="onUpload()"/>
                </template>
            </FluxActionBar>

            <FluxPane>
                <FluxSplitView remember-key="project-files">
                    <FluxSplitViewPane
                        :default-size="312"
                        :min-size="228">
                        <div class="tree-pane">
                            <div
                                v-if="isLoading"
                                class="skeletons">
                                <FluxSkeleton
                                    v-for="n of 6"
                                    :key="n"
                                    height="24"
                                    variant="rounded"/>
                            </div>
                            <FluxTreeView
                                v-else
                                :options="files"
                                @click="onSelect"/>
                        </div>
                    </FluxSplitViewPane>

                    <FluxSplitViewPane>
                        <div class="preview-pane">
                            <div
                                v-if="isLoading"
                                class="loading">
                                <FluxSpinner :size="36"/>
                            </div>

                            <template v-else>
                                <strong class="preview-title">Recent assets</strong>
                                <FluxGallery>
                                    <FluxGalleryItem
                                        v-for="asset of assets"
                                        :key="asset.id"
                                        :url="asset.url"/>
                                </FluxGallery>

                                <strong class="preview-title">Cover</strong>
                                <FluxAspectRatio :aspect-ratio="16 / 9">
                                    <FluxFocalPointImage
                                        alt="Project cover"
                                        :src="cover"/>
                                </FluxAspectRatio>
                            </template>
                        </div>
                    </FluxSplitViewPane>
                </FluxSplitView>
            </FluxPane>
        </FluxLayerPane>
    </FluxApplicationContent>
</template>

<script
    lang="ts"
    setup>
    import { FluxApplicationContent } from '@flux-ui/application';
    import { FluxActionBar, FluxAspectRatio, FluxBreadcrumb, FluxBreadcrumbItem, FluxFocalPointImage, FluxGallery, FluxGalleryItem, FluxLayerPane, FluxPane, FluxSecondaryButton, FluxSkeleton, FluxSpinner, FluxSplitView, FluxSplitViewPane, FluxTreeView, showSnackbar } from '@flux-ui/components';
    import type { FluxTreeViewOption } from '@flux-ui/types';
    import { computed, onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { useFilesStore, useProjectsStore } from '@/store';
    import { coverImage } from '@/util';

    const route = useRoute();
    const {filesForProject} = useFilesStore();
    const {getProject} = useProjectsStore();

    const isLoading = ref(true);

    const project = computed(() => getProject(String(route.params.id)));
    const files = computed(() => filesForProject(String(route.params.id)));
    const cover = computed(() => coverImage(project.value?.name ?? 'Project', project.value?.color ?? 'primary'));

    const assets = computed(() => ['primary', 'info', 'success', 'warning', 'danger', 'gray']
        .map((color, index) => ({id: `asset-${index}`, url: coverImage(`Asset ${index + 1}`, color)})));

    onMounted(() => {
        // Simulate fetching the file tree so the loading skeletons are visible.
        setTimeout(() => {
            isLoading.value = false;
        }, 600);
    });

    function onSelect(option: FluxTreeViewOption): void {
        if (option.children?.length) {
            return;
        }

        showSnackbar({icon: 'file-lines', message: `Opened “${option.label}”.`});
    }

    function onUpload(): void {
        showSnackbar({icon: 'circle-info', message: 'Uploading is not available in this demo.'});
    }

    function onNewFolder(): void {
        showSnackbar({icon: 'circle-info', message: 'Folder creation is not available in this demo.'});
    }
</script>

<style scoped>
    .tree-pane {
        padding: 12px;
    }

    .skeletons {
        display: flex;
        flex-flow: column;
        gap: 12px;
    }

    .preview-pane {
        display: flex;
        flex-flow: column;
        gap: 12px;
        padding: 15px;
    }

    .preview-title {
        font-size: 13px;
        color: var(--gray-500);
    }

    .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 240px;
    }
</style>
