<template>
    <div
        class="flux-drop-zone"
        @dragleave.capture="onDragLeave"
        @dragover.capture="onDragEnter"
        @drop="onDrop">
        <flux-placeholder
            v-if="isEmpty"
            :icon="placeholderIcon"
            :message="placeholderMessage"
            :title="placeholderTitle"
            variant="extended">
            <flux-secondary-button
                :label="placeholderButton"
                @click="showPicker"/>
        </flux-placeholder>

        <slot v-else/>

        <flux-fade-transition>
            <div
                v-if="isDragging"
                class="flux-drop-zone-hint"
                :class="{'is-over': isDraggingOver}"/>
        </flux-fade-transition>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { onMounted, onUnmounted, ref, toRefs, unref } from 'vue-demi';
    import { IconNames } from '../data';
    import { FluxFadeTransition } from '../transition';
    import { FluxPlaceholder, FluxSecondaryButton } from '.';

    export interface Emits {
        (e: 'select', files: FileList): void;
    }

    export interface Props {
        readonly accept?: string;
        readonly isDisabled?: boolean;
        readonly isEmpty?: boolean;
        readonly isMultiple?: boolean;
        readonly placeholderButton: string;
        readonly placeholderIcon: IconNames;
        readonly placeholderMessage: string;
        readonly placeholderTitle: string;
    }

    const emit = defineEmits<Emits>();
    const props = defineProps<Props>();
    const {accept, isDisabled, isMultiple} = toRefs(props);

    const isDragging = ref(false);
    const isDraggingOver = ref(false);

    onMounted(() => {
        window.addEventListener('dragleave', onWindowDragLeave, {capture: true});
        window.addEventListener('dragover', onWindowDragEnter, {capture: true});
        window.addEventListener('drop', onWindowDrop, {capture: true});
    });

    onUnmounted(() => {
        window.removeEventListener('dragleave', onWindowDragLeave);
        window.removeEventListener('dragover', onWindowDragEnter);
        window.removeEventListener('drop', onWindowDrop);
    });

    function onDragEnter(evt: DragEvent): void {
        isDraggingOver.value = true;
        evt.preventDefault();
    }

    function onDragLeave(): void {
        isDraggingOver.value = false;
    }

    function onDrop(evt: DragEvent): void {
        isDragging.value = false;
        isDraggingOver.value = false;

        if (!evt.dataTransfer) {
            return;
        }

        const files = evt.dataTransfer.files;

        if (files.length === 0) {
            return;
        }

        emit('select', files);

        evt.preventDefault();
        evt.stopPropagation();
    }

    function onWindowDragEnter(): void {
        isDragging.value = true;
    }

    function onWindowDragLeave(): void {
        isDragging.value = false;
    }

    function onWindowDrop(): void {
        isDragging.value = false;
        isDraggingOver.value = false;
    }

    function onFileSelected(evt: Event): void {
        const files = (evt.target as HTMLInputElement).files;

        if (!files || files.length === 0) {
            return;
        }

        emit('select', files);
    }

    function showPicker(): void {
        if (unref(isDisabled)) {
            return;
        }

        let input: HTMLInputElement | undefined = document.createElement('input');
        input.accept = unref(accept) ?? '*';
        input.multiple = unref(isMultiple) ?? false;
        input.type = 'file';

        input.addEventListener('change', onFileSelected, {once: true});
        input.showPicker();
    }

    defineExpose({
        showPicker
    });
</script>

<style lang="scss">
    .flux-drop-zone {
        position: relative;

        &-hint {
            position: absolute;
            inset: 0;
            border-radius: var(--radius);
            outline: 3px dotted var(--primary-7);
            outline-offset: -2px;
            animation: flux-drop-zone-hint 540ms infinite var(--deceleration-curve) alternate;
            transition: background 300ms var(--swift-out);

            &.is-over {
                outline-style: solid;
                animation: none;
            }
        }
    }

    @keyframes flux-drop-zone-hint {
        to {
            outline-offset: 3px;
        }
    }
</style>
