<template>
    <Preview>
        <FluxGrid
            :columns="12"
            :gap="18">
            <FluxGridColumn
                :xs="12"
                :md="7">
                <FluxFocalPointEditor
                    v-model="focalPoint"
                    src="/assets/demo/image-2.jpg">
                    <template #footer-before>
                        <FluxSecondaryButton icon-leading="question"/>
                    </template>

                    <template #footer>
                        <FluxPrimaryButton
                            icon-leading="floppy-disk"
                            label="Save"/>
                    </template>
                </FluxFocalPointEditor>
            </FluxGridColumn>

            <FluxGridColumn
                :xs="12"
                :md="5">
                <FluxPane style="height: 100%">
                    <FluxPaneHeader title="Thumbnail">
                        <template #after>
                            <FluxSecondaryButton
                                icon-leading="arrow-up-right-from-square"
                                label="Enlarge"
                                @click="isOpen = true"/>
                        </template>
                    </FluxPaneHeader>

                    <FluxPaneBody>
                        <FluxFlex
                            direction="vertical"
                            :gap="12">
                            <FluxFocalPointImage
                                :focal-point="focalPointObject"
                                src="/assets/demo/image-2.jpg"
                                style="width: 100%; height: 180px; border-radius: 12px"/>

                            <FluxFlex
                                align="center"
                                :gap="6"
                                style="opacity: .6">
                                <FluxIcon name="circle-info"/>
                                <span>Focal point: {{ Math.round(focalPoint[0]) }}% / {{ Math.round(focalPoint[1]) }}%</span>
                            </FluxFlex>
                        </FluxFlex>
                    </FluxPaneBody>
                </FluxPane>
            </FluxGridColumn>
        </FluxGrid>
    </Preview>

    <FluxOverlay size="large">
        <FluxPane v-if="isOpen">
            <FluxPaneHeader title="Preview"/>

            <FluxPaneBody>
                <FluxFocalPointImage
                    :focal-point="focalPointObject"
                    src="/assets/demo/image-2.jpg"
                    style="width: 100%; height: 420px; border-radius: 12px"/>
            </FluxPaneBody>

            <FluxPaneFooter>
                <FluxSecondaryButton
                    label="Close"
                    @click="isOpen = false"/>
            </FluxPaneFooter>
        </FluxPane>
    </FluxOverlay>
</template>

<script
    lang="ts"
    setup>
    import type { FluxFocalPointObject } from '@flux-ui/types';
    import { FluxFlex, FluxFocalPointEditor, FluxFocalPointImage, FluxGrid, FluxGridColumn, FluxIcon, FluxOverlay, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxPrimaryButton, FluxSecondaryButton } from '@flux-ui/components';
    import { computed, ref } from 'vue';

    const focalPoint = ref<[number, number]>([75, 50]);
    const isOpen = ref(false);

    const focalPointObject = computed<FluxFocalPointObject>(() => ({
        x: focalPoint.value[0],
        y: focalPoint.value[1]
    }));
</script>
