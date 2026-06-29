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
                    ref="editor"
                    :class="$style.focalPointEditor"
                    role="slider"
                    aria-roledescription="2D slider"
                    aria-label="Focal point"
                    :aria-valuetext="`${Math.round(focalPointX)}% horizontal, ${Math.round(focalPointY)}% vertical`"
                    tabindex="0"
                    @pointerdown="onPointerDown"
                    @pointermove="onPointerMove"
                    @pointerup="onPointerUp"
                    @keydown="onKeyDown">
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
    import { computed, nextTick, onMounted, onUnmounted, ref, unref, useTemplateRef, watch } from 'vue';
    import { useTranslate } from '~flux/components/composable/private';
    import { FluxFadeTransition } from '~flux/components/transition';
    import FluxPane from './FluxPane.vue';
    import FluxPaneBody from './FluxPaneBody.vue';
    import FluxPaneFooter from './FluxPaneFooter.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import FluxSpacer from './FluxSpacer.vue';
    import $style from '~flux/components/css/component/FocalPoint.module.scss';

    const modelValue = defineModel<[number, number]>({
        required: true
    });

    const {
        src
    } = defineProps<{
        readonly src: string;
    }>();

    const editorRef = useTemplateRef('editor');
    const imageRef = useTemplateRef('image');
    const translate = useTranslate();

    const aspectRatio = ref(1);
    const dragging = ref<[number, number] | null>(null);
    const isPreviewing = ref(false);
    const pointerId = ref<number | null>(null);

    const focalPointX = computed(() => unref(dragging) ? unref(dragging)![0] : unref(modelValue)[0]);
    const focalPointY = computed(() => unref(dragging) ? unref(dragging)![1] : unref(modelValue)[1]);

    onMounted(() => {
        window.addEventListener('pointerup', onPointerUp, {passive: true});
        updateAspectRatio();
    });

    onUnmounted(() => window.removeEventListener('pointerup', onPointerUp));

    function updateAspectRatio(): void {
        const image = unref(imageRef);

        if (!image || !image.naturalWidth || !image.naturalHeight) {
            return;
        }

        aspectRatio.value = image.naturalWidth / image.naturalHeight;
    }

    function onImageLoaded(): void {
        updateAspectRatio();
    }

    function onPointerDown(evt: PointerEvent): void {
        const editor = unref(editorRef);

        pointerId.value = evt.pointerId;
        editor?.setPointerCapture?.(evt.pointerId);
        dragging.value = [0, 0];
        onPointerMove(evt);
    }

    function onPointerMove(evt: PointerEvent): void {
        const image = unref(imageRef);

        if (!image || !dragging.value) {
            return;
        }

        const {top, left, width, height} = image.getBoundingClientRect();
        const {clientX, clientY} = evt;

        dragging.value = [
            Math.max(0, Math.min(1, (clientX - left) / width)) * 100,
            Math.max(0, Math.min(1, (clientY - top) / height)) * 100
        ];
    }

    function onPointerUp(): void {
        const editor = unref(editorRef);

        if (pointerId.value !== null) {
            editor?.releasePointerCapture?.(pointerId.value);
            pointerId.value = null;
        }

        if (!dragging.value) {
            return;
        }

        modelValue.value = dragging.value!;
        dragging.value = null;
    }

    function onKeyDown(evt: KeyboardEvent): void {
        const step = evt.shiftKey ? 10 : 1;
        let [x, y] = unref(modelValue);

        switch (evt.key) {
            case 'ArrowLeft':
                x -= step;
                break;

            case 'ArrowRight':
                x += step;
                break;

            case 'ArrowUp':
                y -= step;
                break;

            case 'ArrowDown':
                y += step;
                break;

            case 'Home':
                x = 0;
                y = 0;
                break;

            case 'End':
                x = 100;
                y = 100;
                break;

            default:
                return;
        }

        evt.preventDefault();

        modelValue.value = [
            Math.max(0, Math.min(100, x)),
            Math.max(0, Math.min(100, y))
        ];
    }

    function onShowPreviewClicked(): void {
        isPreviewing.value = !isPreviewing.value;
    }

    watch(() => src, async () => {
        isPreviewing.value = false;
        aspectRatio.value = 1;

        await nextTick();

        const image = unref(imageRef);

        if (image?.complete) {
            updateAspectRatio();
        }
    });
</script>
