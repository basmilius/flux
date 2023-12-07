<template>
    <FluxPane>
        <FluxFadeTransition mode="out-in">
            <FluxPaneBody
                v-if="isPreviewing"
                key="preview">
                <div class="flux-focal-point-preview">
                    <div
                        class="flux-focal-point-preview-image"
                        :style="{
                            'background-image': `url(${url})`
                        }"/>
                </div>
            </FluxPaneBody>

            <FluxPaneBody
                v-else
                key="editor">
                <div
                    class="flux-focal-point-editor"
                    @pointerdown="onPointerDown"
                    @pointermove="onPointerMove">
                    <img
                        ref="imageRef"
                        class="flux-focal-point-editor-image"
                        :src="url"
                        alt=""
                        @load="onImageLoaded"/>

                    <div class="flux-focal-point-editor-area"/>
                </div>
            </FluxPaneBody>
        </FluxFadeTransition>

        <FluxPaneFooter>
            <slot name="footer-before"/>

            <FluxSecondaryButton
                :label="translate(isPreviewing ? 'flux_preview_close' : 'flux_preview')"
                @click="onShowPreviewClicked"/>

            <FluxSpacer/>

            <slot name="footer"/>
        </FluxPaneFooter>
    </FluxPane>
</template>

<script lang="ts">
    export default {
        model: {
            prop: 'model-value',
            event: 'update:model-value'
        }
    };
</script>

<script
    lang="ts"
    setup>
    import { computed, onMounted, onUnmounted, ref, toRefs, unref, watch } from 'vue';
    import { useTranslate } from '@/composables';
    import { FluxFadeTransition } from '@/transition';
    import FluxPane from './FluxPane.vue';
    import FluxPaneBody from './FluxPaneBody.vue';
    import FluxPaneFooter from './FluxPaneFooter.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import FluxSpacer from './FluxSpacer.vue';

    export interface Emits {
        (e: 'update:model-value', focalPoint: [number, number]): void;
    }

    export interface Props {
        readonly modelValue: [number, number];
        readonly url: string;
    }

    const emit = defineEmits<Emits>();
    const props = defineProps<Props>();
    const {modelValue} = toRefs(props);

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

        emit('update:model-value', dragging.value!);
        dragging.value = null;
    }

    function onShowPreviewClicked(): void {
        isPreviewing.value = !isPreviewing.value;
    }

    watch(() => props.url, () => isPreviewing.value = false);
</script>

<style lang="scss">
    .flux-focal-point {
        &-editor {
            position: relative;
            margin-left: auto;
            margin-right: auto;
            max-height: 210px;
            max-width: 100%;
            aspect-ratio: v-bind(aspectRatio);
            user-select: none;

            &-area {
                position: absolute;
                height: 42px;
                width: 42px;
                top: calc(v-bind(focalPointY) * 1%);
                left: calc(v-bind(focalPointX) * 1%);
                background: rgb(0 0 0 / .1);
                border: 4px solid white;
                border-radius: 99px;
                box-shadow: var(--shadow-md);
                cursor: move;
                transform: translate3d(-50%, -50%, 0);
            }

            &-image {
                position: relative;
                display: block;
                height: 100%;
                width: 100%;
                border-radius: var(--radius);
                box-shadow: var(--shadow-lg);
                pointer-events: none;
            }
        }

        &-preview {
            position: relative;
            height: 210px;
            width: 100%;
            margin-left: auto;
            margin-right: auto;

            &-image {
                position: absolute;
                top: 50%;
                left: 50%;
                right: -50%;
                bottom: -50%;
                max-height: 210px;
                max-width: 100%;
                background-position: calc(v-bind(focalPointX) * 1%) calc(v-bind(focalPointY) * 1%);
                background-size: cover;
                border-radius: var(--radius);
                box-shadow: var(--shadow-lg);
                transform: translate3d(-50%, -50%, 0);
                animation: flux-focal-point-preview 6s var(--swift-out) infinite;
            }
        }
    }

    @keyframes flux-focal-point-preview {
        0% {
            aspect-ratio: v-bind(aspectRatio);
        }

        20% {
            aspect-ratio: 1;
        }

        40% {
            aspect-ratio: 16 / 9;
        }

        60% {
            aspect-ratio: 3 / 4;
        }

        80% {
            aspect-ratio: 3 / 1;
        }

        100% {
            aspect-ratio: v-bind(aspectRatio);
        }
    }
</style>
