<template>
    <FluxPane :style="{'--aspect-ratio': aspectRatio}">
        <FluxFadeTransition mode="out-in">
            <FluxPaneBody
                v-if="isPreviewing"
                key="preview">
                <div :class="styles.focalPointPreview">
                    <div
                        :class="styles.focalPointPreviewImage"
                        :style="{
                            backgroundImage: `url(${url})`,
                            backgroundPosition: `${focalPointX}% ${focalPointY}%`
                        }"/>
                </div>
            </FluxPaneBody>

            <FluxPaneBody
                v-else
                key="editor">
                <div
                    :class="styles.focalPointEditor"
                    @pointerdown="onPointerDown"
                    @pointermove="onPointerMove">
                    <img
                        ref="imageRef"
                        :class="styles.focalPointEditorImage"
                        :src="url"
                        alt=""
                        @load="onImageLoaded"/>

                    <div
                        :class="styles.focalPointEditorArea"
                        :style="{
                            top: `${focalPointY}%`,
                            left: `${focalPointX}%`
                        }"/>
                </div>
            </FluxPaneBody>
        </FluxFadeTransition>

        <FluxPaneFooter>
            <slot name="footer-before"/>

            <FluxSecondaryButton
                :label="translate(isPreviewing ? 'flux.previewClose' : 'flux.preview')"
                @click="onShowPreviewClicked"/>

            <FluxSpacer/>

            <slot name="footer"/>
        </FluxPaneFooter>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { computed, onMounted, onUnmounted, ref, unref, watch } from 'vue';
    import { useTranslate } from '@/composable/private';
    import { FluxFadeTransition } from '@/transition';
    import FluxPane from './FluxPane.vue';
    import FluxPaneBody from './FluxPaneBody.vue';
    import FluxPaneFooter from './FluxPaneFooter.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import FluxSpacer from './FluxSpacer.vue';
    import styles from '@/css/component/FocalPoint.module.scss';

    export type Props = {
        readonly url: string;
    };

    const modelValue = defineModel<[number, number]>({required: true});
    const props = defineProps<Props>();

    const translate = useTranslate();

    const imageRef = ref<HTMLImageElement>();
    const aspectRatio = ref(1);
    const dragging = ref<[number, number] | null>(null);
    const isPreviewing = ref(false);

    const focalPointX = computed(() => unref(dragging) ? unref(dragging)![0] : unref(modelValue)[0]);
    const focalPointY = computed(() => unref(dragging) ? unref(dragging)![1] : unref(modelValue)[1]);

    onMounted(() => window.addEventListener('pointerup', onPointerUp, {passive: true}));

    onUnmounted(() => window.removeEventListener('pointerup', onPointerUp));

    function onImageLoaded(): void {
        const image = unref(imageRef);

        if (!image) {
            return;
        }

        aspectRatio.value = image.width / image.height;
    }

    function onPointerDown(evt: PointerEvent): void {
        dragging.value = [0, 0];
        onPointerMove(evt);
    }

    function onPointerMove(evt: PointerEvent): void {
        const image = unref(imageRef);

        if (!image || !dragging.value) {
            return;
        }

        const {top, left, width, height} = image.getBoundingClientRect();
        const {pageX, pageY} = evt;

        dragging.value = [
            Math.max(0, Math.min(1, (pageX - left) / width)) * 100,
            Math.max(0, Math.min(1, (pageY - top) / height)) * 100
        ];
    }

    function onPointerUp(): void {
        if (!dragging.value) {
            return;
        }

        modelValue.value = dragging.value!;
        dragging.value = null;
    }

    function onShowPreviewClicked(): void {
        isPreviewing.value = !isPreviewing.value;
    }

    watch(() => props.url, () => isPreviewing.value = false);
</script>
