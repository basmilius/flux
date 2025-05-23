<template>
    <FluxPane :style="{'--aspect-ratio': aspectRatio}">
        <FluxFadeTransition mode="out-in">
            <FluxPaneBody
                v-if="isPreviewing"
                key="preview">
                <div :class="$style.focalPointPreview">
                    <div
                        :class="$style.focalPointPreviewImage"
                        :style="{
                            backgroundImage: `url(${src})`,
                            backgroundPosition: `${focalPointX}% ${focalPointY}%`
                        }"/>
                </div>
            </FluxPaneBody>

            <FluxPaneBody
                v-else
                key="editor">
                <div
                    :class="$style.focalPointEditor"
                    @pointerdown="onPointerDown"
                    @pointermove="onPointerMove">
                    <img
                        ref="image"
                        :class="$style.focalPointEditorImage"
                        :src="src"
                        alt=""
                        @load="onImageLoaded"/>

                    <div
                        :class="$style.focalPointEditorArea"
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
    import { computed, onMounted, onUnmounted, ref, unref, useTemplateRef, watch } from 'vue';
    import { useTranslate } from '$flux/composable/private';
    import { FluxFadeTransition } from '$flux/transition';
    import FluxPane from './FluxPane.vue';
    import FluxPaneBody from './FluxPaneBody.vue';
    import FluxPaneFooter from './FluxPaneFooter.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import FluxSpacer from './FluxSpacer.vue';
    import $style from '$flux/css/component/FocalPoint.module.scss';

    const modelValue = defineModel<[number, number]>({
        required: true
    });

    const {
        src
    } = defineProps<{
        readonly src: string;
    }>();

    const imageRef = useTemplateRef('image');
    const translate = useTranslate();

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

    watch(() => src, () => isPreviewing.value = false);
</script>
