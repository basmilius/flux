<template>
    <div
        :class="$style.dropZone"
        :aria-disabled="disabled ? true : undefined"
        @dragleave.capture="onDragLeave"
        @dragover.capture="onDragEnter"
        @drop="onDrop">
        <slot
            v-bind="{isDragging, isDraggingOver, showPicker}"
            v-if="isEmpty"
            name="placeholder">
            <FluxPlaceholder
                :icon="placeholderIcon"
                :message="placeholderMessage"
                :title="placeholderTitle"
                :variant="placeholderVariant">
                <FluxSecondaryButton
                    :label="placeholderButton"
                    @click="showPicker"/>
            </FluxPlaceholder>
        </slot>

        <slot
            v-bind="{isDragging, isDraggingOver, showPicker}"
            v-else/>

        <FluxFadeTransition>
            <div
                v-if="isDragging && !disabled"
                :class="clsx(
                    $style.dropZoneHint,
                    isDraggingOver && $style.isOver
                )"
                role="presentation"/>
        </FluxFadeTransition>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import { onMounted, onUnmounted, ref, toRef, unref } from 'vue';
    import { useDisabled } from '@/composable';
    import { FluxFadeTransition } from '@/transition';
    import type { IconName } from '@/types';
    import FluxPlaceholder from './FluxPlaceholder.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import $style from '@/css/component/DropZone.module.scss';

    const emit = defineEmits<{
        select: [FileList];
    }>();

    const {
        accept,
        disabled: componentDisabled,
        isMultiple,
        placeholderVariant = 'extended'
    } = defineProps<{
        readonly accept?: string;
        readonly disabled?: boolean;
        readonly isEmpty?: boolean;
        readonly isMultiple?: boolean;
        readonly placeholderButton?: string;
        readonly placeholderIcon?: IconName;
        readonly placeholderMessage?: string;
        readonly placeholderTitle?: string;
        readonly placeholderVariant?: 'extended' | 'simple' | 'small';
    }>();

    const disabled = useDisabled(toRef(() => componentDisabled));

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
        if (unref(disabled)) {
            return;
        }

        let input: HTMLInputElement | undefined = document.createElement('input');
        input.accept = accept ?? '*';
        input.multiple = isMultiple ?? false;
        input.type = 'file';

        input.addEventListener('change', onFileSelected, {once: true});
        input.showPicker();
    }
</script>

